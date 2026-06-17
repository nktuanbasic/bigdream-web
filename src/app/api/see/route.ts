import { streamText, Message } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { SEE_INSTRUCTIONS } from '@/lib/see/systemInstructions';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, branchId } = await req.json();

    // Lấy câu lệnh gốc theo nhánh, nếu không có lấy nhánh RAW mặc định
    const systemPrompt = SEE_INSTRUCTIONS[branchId] || SEE_INSTRUCTIONS['raw'];

    const fullSystemPrompt = `
${systemPrompt}

LƯU Ý QUAN TRỌNG VỚI VAI TRÒ CỦA MÀY:
Mày đang giao tiếp trực tiếp với người dùng qua khung chat.
Nếu thông tin người dùng đưa ra bị thiếu trầm trọng theo yêu cầu của TRƯỜNG BẮT BUỘC, hãy hỏi lại họ ngắn gọn, xúc tích.
Nếu thông tin đã đủ, HOẶC mày có thể tự đoán được (Smart Fill), hãy TẠO RA KẾT QUẢ ĐẦU RA ngay lập tức theo định dạng OUTPUT FORMAT (Bao gồm PROMPT và EXPLAIN).
Luôn giao tiếp bằng Tiếng Việt thân thiện, chuyên nghiệp, trừ phần PROMPT bắt buộc bằng Tiếng Anh.
    `;

    // 1. Logic Xoay tua API KEYS (Lấy từ biến GEMINI_API_KEYS phân cách bởi dấu phẩy)
    const rawKeys = process.env.GEMINI_API_KEYS || "";
    const keysArray = rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);
    
    if (keysArray.length === 0) {
      throw new Error("Không tìm thấy GEMINI_API_KEYS trong môi trường.");
    }
    
    const randomKey = keysArray[Math.floor(Math.random() * keysArray.length)];

    // Khởi tạo Google Provider với Key ngẫu nhiên
    const google = createGoogleGenerativeAI({
      apiKey: randomKey,
    });

    // 2. Logic Xoay tua Models tiết kiệm chi phí
    const models = ['gemini-3.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'];
    const randomModelName = models[Math.floor(Math.random() * models.length)];

    const result = streamText({
      model: google(randomModelName),
      system: fullSystemPrompt,
      messages: messages as Message[],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('API Chat Error:', error);
    return new Response('Lỗi khi xử lý AI Chat', { status: 500 });
  }
}
