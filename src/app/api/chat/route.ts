import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

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
  try {
    const body = await req.json();
    const userMessage: string = body.message || '';
    const branch: string = body.branch || 'BOARD';

    const systemPrompt = SYSTEM_PROMPTS[branch] || SYSTEM_PROMPTS['BOARD'];

    const result = await generateText({
      model: google('models/gemini-2.0-flash'),
      system: systemPrompt,
      prompt: userMessage,
      temperature: 0.7,
    });

    return NextResponse.json({ reply: result.text });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Lỗi kết nối Gemini:', message);
    return NextResponse.json({ error: 'Lỗi kết nối AI: ' + message }, { status: 500 });
  }
}
