import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Đọc System Prompt (Master Context) cho nhánh BOARD
// Trong tương lai ta có thể đọc file .md thực tế, tạm thời ta hardcode context xương sống.
const BOARD_SYSTEM_PROMPT = `Mày là BOARD — nhánh tiền kỳ của SEE Engine. 
Nhiệm vụ: nhận bất kỳ dạng input nào — text lộn xộn, ảnh reference rời, prompt thô — phân tích, tổng hợp, xuất 1 prompt concept không gian tổng thể dạng đoạn văn tự nhiên.
LUỒNG: GENERATIVE — allow structural and spatial modifications to serve design intent.
QUY TẮC NGÔN NGỮ: Bắt đầu từ điểm neo thị giác mạnh mẽ nhất. Tuôn chảy mượt mà. Không gạch đầu dòng.
KẾT THÚC PROMPT: "Shot on medium format digital camera... editorial finish."
INVERSION / AVOID: plastic surfaces, flat shading, 3D render look, color banding.
ĐỊNH DẠNG ĐẦU RA BẮT BUỘC:
PROMPT
[Nội dung prompt tiếng Anh]
EXPLAIN
[Phân tích nghệ thuật và quyết định hệ màu/ánh sáng bằng tiếng Việt]`;

export async function POST(req: Request) {
  try {
    // Trích xuất mảng messages từ client gửi lên
    const { messages } = await req.json();

    // Khởi chạy Vercel AI SDK kết nối với Gemini 1.5 Pro
    const result = await streamText({
      model: google('models/gemini-1.5-pro-latest'),
      system: BOARD_SYSTEM_PROMPT,
      messages,
      temperature: 0.7, // Tỷ lệ sáng tạo vừa phải cho BOARD
    });

    // Trả về dòng chảy text (streaming) cho client
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi khi kết nối Gemini:", error);
    return new Response(JSON.stringify({ error: "Lỗi kết nối AI" }), { status: 500 });
  }
}
