import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { SEE_INSTRUCTIONS } from '@/lib/see/systemInstructions';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

type AttachmentLike = {
  url: string;
  contentType?: string;
  mediaType?: string;
  filename?: string;
};

type IncomingMessage = UIMessage & {
  content?: string;
  experimental_attachments?: AttachmentLike[];
};

export const maxDuration = 60;

// Bảng giá nhập / 1 Triệu Token (Tính bằng USD)
const PRICING: Record<string, { in: number, out: number }> = {
  'gemini-2.5-flash-lite': { in: 0.0375, out: 0.15 },
  'gemini-3.1-flash-lite': { in: 0.0375, out: 0.15 },
  'gemini-2.5-flash':      { in: 0.075,  out: 0.30 },
  'gemini-2.5-pro':        { in: 1.25,   out: 5.00 },
  'gemini-3.5-flash-lite': { in: 1.25,   out: 5.00 },
  'glm-4.7-flash':         { in: 0,      out: 0 },
  'glm-4.5-flash':         { in: 0,      out: 0 },
};

// Hàm lấy Key ngẫu nhiên
type SeeProvider = 'gemini' | 'zai';

type SeeModelConfig = {
  provider: SeeProvider;
  modelName: string;
  apiKey: string;
};

function parseKeys(rawKeys = ""): string[] {
  return rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);
}

function pickRandomKey(keysArray: string[]): string {
  return keysArray[Math.floor(Math.random() * keysArray.length)];
}

function getRandomKey(): string {
  const keysArray = parseKeys(process.env.GEMINI_API_KEYS);
  if (keysArray.length === 0) {
    throw new Error("Không tìm thấy GEMINI_API_KEYS");
  }
  return pickRandomKey(keysArray);
}

function getZaiKeys(): string[] {
  return parseKeys(process.env.GLM_API_KEYS || process.env.ZAI_API_KEY || "");
}

function getMessageText(message?: Partial<IncomingMessage>): string {
  if (!message) return "";
  if (typeof message.content === "string") return message.content;

  return message.parts
    ?.filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("") || "";
}

function getMessageAttachments(message?: Partial<IncomingMessage>): AttachmentLike[] {
  if (!message) return [];

  const fileParts = message.parts
    ?.filter((part) => part.type === "file")
    .map((part) => ({
      url: part.url,
      contentType: part.mediaType,
      mediaType: part.mediaType,
      filename: part.filename,
    })) || [];

  return [...fileParts, ...(message.experimental_attachments || [])];
}

function hasAnyAttachments(messages: Partial<IncomingMessage>[]): boolean {
  return messages.some((msg) => getMessageAttachments(msg).length > 0);
}

function shouldUseZai(tier: string, messages: Partial<IncomingMessage>[], zaiKeys: string[]): boolean {
  return tier !== 'accurate' && zaiKeys.length > 0 && !hasAnyAttachments(messages);
}

function getZaiModelName(tier: string): string {
  return tier === 'basic' ? 'glm-4.5-flash' : 'glm-4.7-flash';
}

function getZaiBackupModelName(tier: string): string {
  return tier === 'basic' ? 'glm-4.7-flash' : 'glm-4.5-flash';
}

function getErrorStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) return undefined;
  const maybeError = error as { statusCode?: unknown; status?: unknown };
  if (typeof maybeError.statusCode === 'number') return maybeError.statusCode;
  if (typeof maybeError.status === 'number') return maybeError.status;
  return undefined;
}

function setMessageAttachments(message: IncomingMessage, attachments: AttachmentLike[]) {
  const existingParts = (message.parts || []).filter((part) => part.type !== "file");
  message.parts = [
    ...attachments.map((att) => ({
      type: "file" as const,
      url: att.url,
      mediaType: att.mediaType || att.contentType || "image/jpeg",
      filename: att.filename,
    })),
    ...existingParts,
  ];
}

export async function POST(req: Request) {
  try {
    // Xác thực người dùng
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Không có quyền truy cập.' }), { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];

    // Khởi tạo Supabase client VỚI TOKEN để vượt qua RLS nếu có
    const supabaseWithAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await supabaseWithAuth.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Phiên đăng nhập không hợp lệ.' }), { status: 401 });
    }

    const { messages, branchId, tier, chatId, projectId } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const zaiKeys = getZaiKeys();
    const useFreeZai = shouldUseZai(tier, messages, zaiKeys);

    let currentChatId = chatId;

    // 1. Tạo Chat mới nếu chưa có
    if (!currentChatId) {
      if (!projectId) {
         return NextResponse.json({ error: 'Project ID is required to create a new chat' }, { status: 400 });
      }
      const title = getMessageText(messages[0])?.substring(0, 50) || 'Đoạn chat mới';
      const { data: newChat, error: chatErr } = await supabaseWithAuth
        .from('chats')
        .insert({ user_id: user.id, branch_id: branchId, project_id: projectId, title })
        .select('id').single();
      
      if (!chatErr && newChat) {
        currentChatId = newChat.id;
      } else {
        console.error("Lỗi tạo chat:", chatErr);
        return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 });
      }
    }

    // 2. Lưu tin nhắn của User vào DB (Upload ảnh nếu có)
    const lastMessage = messages[messages.length - 1];
    if (currentChatId && lastMessage?.role === 'user') {
      const uploadedAttachments: AttachmentLike[] = [];
      
      const messageAttachments = getMessageAttachments(lastMessage);
      if (messageAttachments.length > 0) {
        for (const att of messageAttachments) {
          if (att.url.startsWith('data:')) {
             try {
                const base64Data = att.url.split(',')[1];
                // Using standard Buffer instead of external library
                const buffer = Buffer.from(base64Data, 'base64');
                const contentType = att.contentType || att.mediaType || 'image/jpeg';
                const ext = contentType.split('/')[1] || 'jpg';
                const fileName = `chat_${currentChatId}/${crypto.randomUUID()}.${ext}`;
                
                const { error: uploadErr } = await supabaseWithAuth.storage.from('workspace_media').upload(fileName, buffer, {
                  contentType,
                  upsert: true
                });
                
                if (!uploadErr) {
                  const { data: publicUrlData } = supabaseWithAuth.storage.from('workspace_media').getPublicUrl(fileName);
                  uploadedAttachments.push({ ...att, url: publicUrlData.publicUrl, contentType, mediaType: contentType });
                }
             } catch (e) {
                console.error("Lỗi upload ảnh đính kèm:", e);
             }
          } else {
             uploadedAttachments.push(att);
          }
        }
      }

      if (uploadedAttachments.length > 0) {
        setMessageAttachments(lastMessage, uploadedAttachments);
      }

      await supabaseWithAuth.from('messages').insert({
        id: lastMessage.id, // Dùng chung ID của AI SDK
        chat_id: currentChatId,
        role: 'user',
        content: getMessageText(lastMessage),
        attachments: uploadedAttachments.map((att) => att.url)
      });
    }

    // Kiểm tra số dư trước khi cho phép chat
    const walletResult = await supabaseWithAuth.from('users').select('purchased_coins').eq('id', user.id).single();
    let userDoc = walletResult.data;
    const walletError = walletResult.error;
    
    // NẾU CHƯA CÓ VÍ -> TỰ ĐỘNG TẠO VÍ LUÔN TRONG DB
    if (walletError && walletError.code === 'PGRST116') {
      const { data: newDoc } = await supabaseWithAuth.from('users').insert({
        id: user.id,
        email: user.email,
        purchased_coins: 0
      }).select('purchased_coins').single();
      userDoc = newDoc;
    }

    if ((!userDoc || userDoc.purchased_coins <= 0) && !useFreeZai) {
      return new Response(JSON.stringify({ error: 'Tài khoản của quý khách đã hết GEM. Vui lòng nạp thêm để tiếp tục!' }), { status: 402 });
    }

    // --- TỐI ƯU HÓA BỘ NHỚ AI (CONTEXT WINDOW OPTIMIZATION) ---
    let optimizedMessages = [...messages];
    const MAX_MESSAGES = 6;
    
    if (optimizedMessages.length > MAX_MESSAGES) {
      const keptMessages = optimizedMessages.slice(-MAX_MESSAGES);
      const discardedMessages = optimizedMessages.slice(0, -MAX_MESSAGES);
      
      // Giữ lại Anchor Images từ các tin nhắn bị loại bỏ
      const anchorImages: AttachmentLike[] = [];
      discardedMessages.forEach(msg => {
        if (msg.role === 'user') {
          anchorImages.push(...getMessageAttachments(msg));
        }
      });
      
      if (anchorImages.length > 0) {
         // Đính kèm ngầm ảnh vào tin nhắn User xa nhất trong kept window
         const firstUserMsgIdx = keptMessages.findIndex(m => m.role === 'user');
         if (firstUserMsgIdx !== -1) {
            setMessageAttachments(keptMessages[firstUserMsgIdx], [
               ...getMessageAttachments(keptMessages[firstUserMsgIdx]),
               ...anchorImages
            ]);
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

    let mainModelConfig: SeeModelConfig;
    let backupModelConfig: SeeModelConfig | null;

    if (useFreeZai) {
      mainModelConfig = {
        provider: 'zai',
        modelName: getZaiModelName(tier),
        apiKey: pickRandomKey(zaiKeys),
      };

      backupModelConfig = {
        provider: 'zai',
        modelName: getZaiBackupModelName(tier),
        apiKey: pickRandomKey(zaiKeys),
      };
    } else {
      mainModelConfig = {
        provider: 'gemini',
        modelName: mainModel,
        apiKey: getRandomKey(),
      };

      backupModelConfig = backupModel ? {
        provider: 'gemini',
        modelName: backupModel,
        apiKey: getRandomKey(),
      } : null;
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
    const callAI = ({ provider, modelName, apiKey }: SeeModelConfig) => {
      const model = provider === 'zai'
        ? createOpenAI({
            apiKey,
            baseURL: process.env.ZAI_BASE_URL || process.env.GLM_BASE_URL || 'https://api.z.ai/api/paas/v4/',
            name: 'zai',
          }).chat(modelName)
        : createGoogleGenerativeAI({ apiKey })(modelName);
      
      return streamText({
        model,
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

          console.log(`[BILLING] Nhánh: ${branchId} | Tier: ${tier} | Provider: ${provider} | Model: ${modelName}`);
          console.log(`[BILLING] Input: ${promptTokens} | Output: ${completionTokens}`);
          console.log(`[BILLING] Giá gốc: $${rawCostUSD.toFixed(6)} | Giá thu khách (+30%): $${finalPriceUSD.toFixed(6)}`);

          // Lưu tin nhắn của AI vào DB
          if (currentChatId) {
             await supabaseWithAuth.from('messages').insert({
                chat_id: currentChatId,
                role: 'assistant',
                content: text, // 'text' variable is provided by streamText's onFinish
                attachments: []
             });
          }

          // Trừ tiền thật trên Database
          const { data: currentUser } = await supabaseWithAuth.from('users').select('purchased_coins').eq('id', user.id).single();
          if (currentUser) {
            const newBalance = Math.max(0, currentUser.purchased_coins - finalPriceVND);
            await supabaseWithAuth.from('users').update({ purchased_coins: newBalance }).eq('id', user.id);
            console.log(`[BILLING] SỐ TIỀN TRỪ VÀO VÍ KHÁCH (${user.email}): -${finalPriceVND} GEM. Số dư mới: ${newBalance}`);
          }
        }
      });
    };

    try {
      // Gọi thử Model Chính trước
      const result = callAI(mainModelConfig);
      return result.toUIMessageStreamResponse({
        headers: {
          'X-Chat-Id': currentChatId || ''
        }
      });
    } catch (error: unknown) {
      // Nếu lỗi Rate Limit (429) và có Model Dự phòng
      if (getErrorStatus(error) === 429 && backupModelConfig) {
        console.log(`[FALLBACK] Model chính ${mainModelConfig.modelName} quá tải. Tự động chuyển sang ${backupModelConfig.modelName} với Key mới!`);
        const fallbackResult = callAI(backupModelConfig);
        return fallbackResult.toUIMessageStreamResponse({
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
