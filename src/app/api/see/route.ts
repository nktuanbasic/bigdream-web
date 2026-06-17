import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { SEE_INSTRUCTIONS } from '@/lib/see/systemInstructions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const maxDuration = 60;

// Bảng giá nhập / 1 Triệu Token (Tính bằng USD)
const PRICING: Record<string, { in: number, out: number }> = {
  'gemini-2.5-flash-lite': { in: 0.0375, out: 0.15 },
  'gemini-3.1-flash-lite': { in: 0.0375, out: 0.15 },
  'gemini-2.5-flash':      { in: 0.075,  out: 0.30 },
  'gemini-2.5-pro':        { in: 1.25,   out: 5.00 },
  'gemini-3.5-flash-lite': { in: 1.25,   out: 5.00 },
};

// Hàm lấy Key ngẫu nhiên
function getRandomKey(): string {
  const rawKeys = process.env.GEMINI_API_KEYS || "";
  const keysArray = rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);
  if (keysArray.length === 0) {
    throw new Error("Không tìm thấy GEMINI_API_KEYS");
  }
  return keysArray[Math.floor(Math.random() * keysArray.length)];
}

export async function POST(req: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Xác thực người dùng
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Quý khách vui lòng đăng nhập trước khi sử dụng tính năng này.' }), { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Phiên đăng nhập không hợp lệ.' }), { status: 401 });
    }

    const { messages, branchId, tier, chatId } = await req.json();

    let currentChatId = chatId;
    
    // 1. Tạo Chat mới nếu chưa có
    if (!currentChatId) {
      const title = messages[0]?.content?.substring(0, 50) || 'Dự án mới';
      const { data: newChat, error: chatErr } = await supabase
        .from('chats')
        .insert({ user_id: user.id, branch_id: branchId, title })
        .select('id').single();
      
      if (!chatErr && newChat) {
        currentChatId = newChat.id;
      }
    }

    // 2. Lưu tin nhắn của User vào DB (Upload ảnh nếu có)
    const lastMessage = messages[messages.length - 1];
    if (currentChatId && lastMessage?.role === 'user') {
      const attachmentsUrls: string[] = [];
      
      if (lastMessage.experimental_attachments && lastMessage.experimental_attachments.length > 0) {
        for (const att of lastMessage.experimental_attachments) {
          if (att.url.startsWith('data:')) {
             try {
                const base64Data = att.url.split(',')[1];
                // Using standard Buffer instead of external library
                const buffer = Buffer.from(base64Data, 'base64');
                const contentType = att.contentType || 'image/jpeg';
                const ext = contentType.split('/')[1] || 'jpg';
                const fileName = `chat_${currentChatId}/${crypto.randomUUID()}.${ext}`;
                
                const { error: uploadErr } = await supabase.storage.from('workspace_media').upload(fileName, buffer, {
                  contentType,
                  upsert: true
                });
                
                if (!uploadErr) {
                  const { data: publicUrlData } = supabase.storage.from('workspace_media').getPublicUrl(fileName);
                  attachmentsUrls.push(publicUrlData.publicUrl);
                }
             } catch (e) {
                console.error("Lỗi upload ảnh đính kèm:", e);
             }
          } else {
             attachmentsUrls.push(att.url);
          }
        }
      }

      await supabase.from('messages').insert({
        id: lastMessage.id, // Dùng chung ID của AI SDK
        chat_id: currentChatId,
        role: 'user',
        content: lastMessage.content,
        attachments: attachmentsUrls
      });
    }

    // Kiểm tra số dư trước khi cho phép chat
    const { data: userDoc, error: walletError } = await supabase.from('users').select('purchased_coins').eq('id', user.id).single();
    
    if (walletError || !userDoc || userDoc.purchased_coins <= 0) {
      return new Response(JSON.stringify({ error: 'Tài khoản của quý khách đã hết Gem. Vui lòng nạp thêm để tiếp tục!' }), { status: 402 });
    }

    // --- TỐI ƯU HÓA BỘ NHỚ AI (CONTEXT WINDOW OPTIMIZATION) ---
    let optimizedMessages = [...messages];
    const MAX_MESSAGES = 6;
    
    if (optimizedMessages.length > MAX_MESSAGES) {
      const keptMessages = optimizedMessages.slice(-MAX_MESSAGES);
      const discardedMessages = optimizedMessages.slice(0, -MAX_MESSAGES);
      
      // Giữ lại Anchor Images từ các tin nhắn bị loại bỏ
      const anchorImages: any[] = [];
      discardedMessages.forEach(msg => {
        if (msg.role === 'user' && msg.experimental_attachments) {
          anchorImages.push(...msg.experimental_attachments);
        }
      });
      
      if (anchorImages.length > 0) {
         // Đính kèm ngầm ảnh vào tin nhắn User xa nhất trong kept window
         const firstUserMsgIdx = keptMessages.findIndex(m => m.role === 'user');
         if (firstUserMsgIdx !== -1) {
            keptMessages[firstUserMsgIdx].experimental_attachments = [
               ...(keptMessages[firstUserMsgIdx].experimental_attachments || []),
               ...anchorImages
            ];
         }
      }
      optimizedMessages = keptMessages;
    }

    const modelMessages = await convertToModelMessages(optimizedMessages as UIMessage[]);

    // 1. Phân bổ Model theo Tier
    let mainModel = 'gemini-2.5-flash';
    let backupModel = 'gemini-3.1-flash-lite';

    if (tier === 'basic') {
      mainModel = 'gemini-2.5-flash-lite';
      backupModel = ''; // Basic không có backup
    } else if (tier === 'accurate') {
      mainModel = 'gemini-2.5-pro';
      backupModel = 'gemini-3.5-flash-lite';
    }

    // Lấy câu lệnh gốc
    const systemPrompt = SEE_INSTRUCTIONS[branchId] || SEE_INSTRUCTIONS['raw'];
    const fullSystemPrompt = `
${systemPrompt}

LƯU Ý QUAN TRỌNG VỚI VAI TRÒ CỦA MÀY:
Mày đang giao tiếp trực tiếp với người dùng qua khung chat.
Nếu thông tin người dùng đưa ra bị thiếu trầm trọng, hãy hỏi lại họ ngắn gọn.
Nếu thông tin đã đủ, hãy TẠO RA KẾT QUẢ ĐẦU RA ngay lập tức theo định dạng OUTPUT FORMAT (Bao gồm PROMPT và EXPLAIN).
Luôn giao tiếp bằng Tiếng Việt thân thiện, chuyên nghiệp, trừ phần PROMPT bắt buộc bằng Tiếng Anh.
    `;

    // Hàm gọi AI và Tính Tiền
    const callAI = (modelName: string, apiKey: string) => {
      const googleProvider = createGoogleGenerativeAI({ apiKey });
      
      return streamText({
        model: googleProvider(modelName),
        system: fullSystemPrompt,
        messages: modelMessages,
        onFinish: async ({ text, usage }) => {
          // --- HỆ THỐNG TÍNH TIỀN (BILLING ENGINE) ---
          const promptTokens = usage.inputTokens ?? 0;
          const completionTokens = usage.outputTokens ?? 0;
          const rates = PRICING[modelName] || PRICING['gemini-2.5-flash'];
          
          // Tính giá gốc (USD)
          const rawCostUSD = (promptTokens * rates.in / 1_000_000) + (completionTokens * rates.out / 1_000_000);
          
          // Cộng 30% lợi nhuận
          const finalPriceUSD = rawCostUSD * 1.3;
          
          // Quy đổi ra Gem (Tỷ giá tạm tính: 25,000 Gem)
          const finalPriceVND = Math.ceil(finalPriceUSD * 25000);

          console.log(`[BILLING] Nhánh: ${branchId} | Tier: ${tier} | Model: ${modelName}`);
          console.log(`[BILLING] Input: ${promptTokens} | Output: ${completionTokens}`);
          console.log(`[BILLING] Giá gốc: $${rawCostUSD.toFixed(6)} | Giá thu khách (+30%): $${finalPriceUSD.toFixed(6)}`);

          // Lưu tin nhắn của AI vào DB
          if (currentChatId) {
             await supabase.from('messages').insert({
                chat_id: currentChatId,
                role: 'assistant',
                content: text, // 'text' variable is provided by streamText's onFinish
                attachments: []
             });
          }

          // Trừ tiền thật trên Database
          const { data: currentUser } = await supabase.from('users').select('purchased_coins').eq('id', user.id).single();
          if (currentUser) {
            const newBalance = Math.max(0, currentUser.purchased_coins - finalPriceVND);
            await supabase.from('users').update({ purchased_coins: newBalance }).eq('id', user.id);
            console.log(`[BILLING] SỐ TIỀN TRỪ VÀO VÍ KHÁCH (${user.email}): -${finalPriceVND} GEM. Số dư mới: ${newBalance}`);
          }
        }
      });
    };

    try {
      // Gọi thử Model Chính trước
      const result = callAI(mainModel, getRandomKey());
      return result.toDataStreamResponse({
        headers: {
          'X-Chat-Id': currentChatId || ''
        }
      });
    } catch (error: any) {
      // Nếu lỗi Rate Limit (429) và có Model Dự phòng
      if ((error.statusCode === 429 || error.status === 429) && backupModel) {
        console.log(`[FALLBACK] Model chính ${mainModel} quá tải. Tự động chuyển sang ${backupModel} với Key mới!`);
        const fallbackResult = callAI(backupModel, getRandomKey());
        return fallbackResult.toDataStreamResponse({
          headers: {
            'X-Chat-Id': currentChatId || ''
          }
        });
      }
      throw error;
    }

  } catch (error) {
    console.error('API Chat Error:', error);
    return new Response('Lỗi khi xử lý AI Chat', { status: 500 });
  }
}
