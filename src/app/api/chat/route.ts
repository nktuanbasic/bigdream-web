import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

// Đọc danh sách API Keys từ biến môi trường (phân cách bằng dấu phẩy)
function getApiKeys(): string[] {
  const keys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
  return keys.split(',').map(k => k.trim()).filter(k => k.length > 0);
}

const SYSTEM_PROMPTS: Record<string, string> = {
  BOARD: `Mày là BOARD — nhánh tiền kỳ của SEE Engine. 
Nhiệm vụ: nhận bất kỳ dạng input nào — text lộn xộn, ảnh reference rời, prompt thô — phân tích, tổng hợp, xuất 1 prompt concept không gian tổng thể dạng đoạn văn tự nhiên.
LUỒNG: GENERATIVE — allow structural and spatial modifications to serve design intent.
QUY TẮC NGÔN NGỮ: Bắt đầu từ điểm neo thị giác mạnh mẽ nhất. Tuôn chảy mượt mà. Không gạch đầu dòng.
KẾT THÚC PROMPT: "Shot on medium format digital camera... editorial finish."
INVERSION / AVOID: plastic surfaces, flat shading, 3D render look, color banding.
ĐỊNH DẠNG ĐẦU RA BẮT BUỘC:
PROMPT
[Nội dung prompt tiếng Anh]
--ar [tỷ lệ]

EXPLAIN
[Phân tích nghệ thuật bằng tiếng Việt]`,
  ROOM: `Mày là ROOM — nhánh render nội thất của SEE Engine. Nhận ảnh blockout, sketch, hoặc mô tả → can thiệp layout và hình khối → xuất prompt nội thất hoàn chỉnh dạng đoạn văn tự nhiên. LUỒNG: GENERATIVE.`,
  FILL: `Mày là FILL — nhánh điền không gian của SEE Engine. Nhận ảnh không gian trống hoặc hiện trạng thô → điền vật liệu, ánh sáng, nội thất. LUỒNG: STRICT — preserve original architectural structure exactly.`,
  YARD: `Mày là YARD — nhánh ngoại thất quy mô nhỏ. Nhận ảnh công trình → cải thiện cảnh quan, mặt tiền, sân vườn. LUỒNG: STRICT.`,
  LAND: `Mày là LAND — nhánh ngoại thất quy mô lớn. Nhận text mô tả site → dựng phối cảnh đô thị, masterplan view. LUỒNG: GENERATIVE.`,
  STAGE: `Mày là STAGE — nhánh hậu kỳ. Nhận ảnh render gần hoàn chỉnh → nâng cấp chất lượng về ảnh thật. LUỒNG: STRICT.`,
  RAW: `Mày là RAW — nhánh tiền xử lý. Nhận input bẩn → làm sạch, phân loại, forward sang đúng nhánh. RAW không generate prompt ảnh.`,
  DNA: `Mày là DNA — nhánh phân tích phong cách. Nhận ảnh hoàn chỉnh → đọc sâu → xuất TEMPLATE DATA BLOCK tái sử dụng. DNA không generate prompt ảnh.`,
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userMessage: string = body.message || '';
  const branch: string = body.branch || 'BOARD';
  const systemPrompt = SYSTEM_PROMPTS[branch] || SYSTEM_PROMPTS['BOARD'];

  const keys = getApiKeys();
  if (keys.length === 0) {
    return NextResponse.json({ error: 'Chưa cấu hình API Key. Vui lòng thêm GEMINI_API_KEY hoặc GEMINI_API_KEYS vào Environment Variables.' }, { status: 500 });
  }

  // Xoay vòng: thử từng key, hết key này nhảy sang key kế tiếp
  for (let i = 0; i < keys.length; i++) {
    try {
      const google = createGoogleGenerativeAI({ apiKey: keys[i] });

      // Nếu có ảnh, ta phải dùng cấu trúc messages array
      const imageBase64: string = body.image || '';
      
      const messagesContent: Array<{ type: 'text' | 'image'; text?: string; image?: string }> = [
        { type: 'text', text: userMessage }
      ];
      if (imageBase64) {
        messagesContent.push({ type: 'image', image: imageBase64 });
      }

      const result = await generateText({
        model: google('gemini-1.5-flash'), // Sửa cú pháp model chuẩn
        system: systemPrompt,
        messages: [{ role: 'user', content: messagesContent }],
        temperature: 0.7,
      });

      return NextResponse.json({ reply: result.text, keyUsed: i + 1 });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : '';
      const isQuotaError = msg.includes('quota') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED');

      if (isQuotaError && i < keys.length - 1) {
        // Key này hết quota → nhảy sang key tiếp theo
        continue;
      }

      // Key cuối cùng cũng lỗi, hoặc lỗi không phải quota → báo lỗi
      return NextResponse.json({ error: 'Lỗi kết nối AI: ' + msg }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Tất cả API Key đều đã hết quota.' }, { status: 500 });
}
