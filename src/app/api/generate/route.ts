import { NextResponse } from 'next/server';

export const maxDuration = 60; // Render ảnh có thể lâu, cho phép API chạy max 60s

export async function POST(req: Request) {
  try {
    const { prompt, imageBase64 } = await req.json();

    let modelToUse = '';
    let baseCostUSD = 0;

    // 1. Logic Định Tuyến (Routing) theo PRD
    if (imageBase64) {
      // User có up ảnh gốc -> Chỉnh sửa / Render đè
      modelToUse = 'gemini-2.5-flash-image'; // (Nano Banana Alias)
      baseCostUSD = 0.039;
    } else {
      // User chỉ gõ text -> Tạo ảnh mới hoàn toàn
      modelToUse = 'imagen-4.0-fast-generate-001';
      baseCostUSD = 0.02;
    }

    console.log(`[IMAGE GEN] Bắt đầu render ảnh với Model: ${modelToUse}`);
    
    // --- GẮN SDK TẠO ẢNH THỰC TẾ Ở ĐÂY ---
    // Ví dụ (AI SDK / Google Vertex):
    // const { image } = await generateImage({
    //   model: google.image(modelToUse),
    //   prompt: prompt,
    // });
    
    // GIẢ LẬP ĐỢI API XỬ LÝ (2 giây)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Ảnh kết quả (Tạm thời trả về ảnh Demo từ Picsum)
    const fakeGeneratedImageUrl = `https://picsum.photos/seed/${Math.floor(Math.random()*1000)}/800/450`;

    // 2. Logic Tính Tiền (+30% lợi nhuận)
    const finalPriceUSD = baseCostUSD * 1.3;
    const finalPriceVND = Math.ceil(finalPriceUSD * 25000);

    console.log(`[BILLING IMAGE] Giá gốc: $${baseCostUSD} | Giá bán (+30%): $${finalPriceUSD}`);
    console.log(`[BILLING IMAGE] SỐ TIỀN TRỪ VÀO VÍ KHÁCH: -${finalPriceVND} VNĐ`);

    return NextResponse.json({ 
      success: true, 
      imageUrl: fakeGeneratedImageUrl, // Đổi thành Base64 thực tế sau này
      costVnd: finalPriceVND,
      modelUsed: modelToUse
    });

  } catch (error) {
    console.error('Image Gen Error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi trong quá trình tạo ảnh' }, { status: 500 });
  }
}
