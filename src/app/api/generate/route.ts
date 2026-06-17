import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const maxDuration = 60; // Render ảnh có thể lâu, cho phép API chạy max 60s

export async function POST(req: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Xác thực người dùng
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Quý khách vui lòng đăng nhập trước khi sử dụng tính năng này.' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Phiên đăng nhập không hợp lệ.' }, { status: 401 });
    }

    const { prompt, imageBase64, messageId } = await req.json();

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

    // 2. Logic Tính Tiền (+30% lợi nhuận)
    const finalPriceUSD = baseCostUSD * 1.3;
    const finalPriceVND = Math.ceil(finalPriceUSD * 25000);

    // 4. Kiểm tra số dư Gem
    let { data: userDoc, error: walletError } = await supabase.from('users').select('purchased_coins').eq('id', user.id).single();
    
    // NẾU CHƯA CÓ VÍ -> TỰ ĐỘNG TẠO VÍ LUÔN TRONG DB
    if (walletError && walletError.code === 'PGRST116') {
      const { data: newDoc } = await supabase.from('users').insert({
        id: user.id,
        email: user.email,
        purchased_coins: 0
      }).select('purchased_coins').single();
      userDoc = newDoc;
    }

    if (!userDoc || userDoc.purchased_coins < finalPriceVND) {
      return NextResponse.json({ error: `Bạn không đủ Gem. Cần ${finalPriceVND} Gem để tạo ảnh này.` }, { status: 402 });
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
    
    // Tương lai khi tích hợp SDK thật, upload ảnh Base64 lên Supabase Storage và lấy link vĩnh viễn ở đây
    let finalImageUrl = fakeGeneratedImageUrl;

    // Lưu thông tin ảnh tạo ra vào Database
    if (messageId) {
      await supabase.from('generated_images').insert({
        message_id: messageId,
        prompt: prompt,
        image_url: finalImageUrl,
        model: modelToUse
      });
    }

    // 3. Trừ tiền thật trên Database
    const newBalance = Math.max(0, userDoc.purchased_coins - finalPriceVND);
    await supabase.from('users').update({ purchased_coins: newBalance }).eq('id', user.id);

    console.log(`[BILLING IMAGE] Giá gốc: $${baseCostUSD} | Giá bán (+30%): $${finalPriceUSD}`);
    console.log(`[BILLING IMAGE] SỐ TIỀN TRỪ VÀO VÍ KHÁCH (${user.email}): -${finalPriceVND} GEM. Số dư mới: ${newBalance}`);

    return NextResponse.json({ 
      success: true, 
      imageUrl: finalImageUrl,
      costVnd: finalPriceVND,
      modelUsed: modelToUse
    });

  } catch (error) {
    console.error('Image Gen Error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi trong quá trình tạo ảnh' }, { status: 500 });
  }
}
