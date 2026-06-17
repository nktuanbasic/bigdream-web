import { streamText, Message } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { SEE_INSTRUCTIONS } from '@/lib/see/systemInstructions';

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
    const { messages, branchId, tier } = await req.json();

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
        messages: messages as Message[],
        onFinish: async ({ usage }) => {
          // --- HỆ THỐNG TÍNH TIỀN (BILLING ENGINE) ---
          const { promptTokens, completionTokens } = usage;
          const rates = PRICING[modelName] || PRICING['gemini-2.5-flash'];
          
          // Tính giá gốc (USD)
          const rawCostUSD = (promptTokens * rates.in / 1_000_000) + (completionTokens * rates.out / 1_000_000);
          
          // Cộng 30% lợi nhuận
          const finalPriceUSD = rawCostUSD * 1.3;
          
          // Quy đổi ra VNĐ (Tỷ giá tạm tính: 25,000đ)
          const finalPriceVND = Math.ceil(finalPriceUSD * 25000);

          // In ra Log Hệ Thống (Sẽ thay bằng code trừ tiền trên Supabase)
          console.log(`[BILLING] Nhánh: ${branchId} | Tier: ${tier} | Model: ${modelName}`);
          console.log(`[BILLING] Input: ${promptTokens} | Output: ${completionTokens}`);
          console.log(`[BILLING] Giá gốc: $${rawCostUSD.toFixed(6)} | Giá thu khách (+30%): $${finalPriceUSD.toFixed(6)}`);
          console.log(`[BILLING] SỐ TIỀN TRỪ VÀO VÍ KHÁCH: -${finalPriceVND} VNĐ`);
        }
      });
    };

    try {
      // Gọi thử Model Chính trước
      const result = callAI(mainModel, getRandomKey());
      return result.toDataStreamResponse();
    } catch (error: any) {
      // Nếu lỗi Rate Limit (429) và có Model Dự phòng
      if ((error.statusCode === 429 || error.status === 429) && backupModel) {
        console.log(`[FALLBACK] Model chính ${mainModel} quá tải. Tự động chuyển sang ${backupModel} với Key mới!`);
        const fallbackResult = callAI(backupModel, getRandomKey());
        return fallbackResult.toDataStreamResponse();
      }
      throw error;
    }

  } catch (error) {
    console.error('API Chat Error:', error);
    return new Response('Lỗi khi xử lý AI Chat', { status: 500 });
  }
}
