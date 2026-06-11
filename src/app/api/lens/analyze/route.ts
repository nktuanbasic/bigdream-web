import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// Dùng service_role key nếu có để bỏ qua RLS khi cập nhật Coin, nếu không dùng tạm anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function getRotationKey(envString?: string) {
  if (!envString) return null;
  const keys = envString.split(',').map(k => k.trim()).filter(k => k);
  if (keys.length === 0) return null;
  return keys[Math.floor(Math.random() * keys.length)];
}

export async function POST(req: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Xác thực người dùng
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Quý khách vui lòng đăng nhập trước khi sử dụng tính năng này.' }, { status: 401 });
  }
  const token = authHeader.split('Bearer ')[1];
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Phiên đăng nhập không hợp lệ.' }, { status: 401 });
  }

  const { action, payload, mode } = await req.json();

  const CORE_KEY = getRotationKey(process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY);
  const VISION_KEY = getRotationKey(process.env.SERP_KEYS);
  const CLOUD_IMG_KEY = getRotationKey(process.env.IMGBB_KEYS);

  if (!CORE_KEY) {
    return NextResponse.json({ error: 'Thiếu cấu hình GEMINI_KEYS trên hệ thống máy chủ.' }, { status: 500 });
  }

  // 2. Đồng bộ ví tiền người dùng (Giả định bảng 'users' có trong Supabase)
  // Tính năng: Reset ví tiền hàng ngày theo múi giờ VN
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' });
  let userData: any = { free_basic_today: 6, free_adv_today: 4, purchased_coins: 0, last_reset_date: today, email: user.email };

  try {
    const { data: doc, error } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (error && error.code !== 'PGRST116') { // Ignore "Row not found"
      console.warn("Lỗi đọc dữ liệu ví:", error);
    }
    
    if (!doc || doc.last_reset_date !== today) {
      // Create or reset daily quota
      userData = { 
        id: user.id,
        email: user.email,
        free_basic_today: 6, 
        free_adv_today: 4, 
        purchased_coins: doc ? doc.purchased_coins : 0, 
        last_reset_date: today 
      };
      await supabase.from('users').upsert(userData);
    } else {
      userData = doc;
    }
  } catch (e) {
    console.error(e);
  }

  // 3. Xử lý logic API
  if (action === 'get_wallet') {
    return NextResponse.json({ wallet: userData }, { status: 200 });
  }

  // Các chức năng khác như history, suggest, analyze sẽ nằm ở đây
  // Hiện tại sẽ trả về JSON giả định thành công
  if (action === 'text' || action === 'image') {
    // Trừ tiền logic
    const isAdv = mode === 'lens';
    if (isAdv) {
      if (userData.free_adv_today > 0) userData.free_adv_today -= 1;
      else if (userData.purchased_coins > 0) userData.purchased_coins -= 1;
      else return NextResponse.json({ error: 'Đã hết lượt VIP hôm nay. Quý khách vui lòng nạp thêm Coin để tiếp tục!' }, { status: 403 });
    } else {
      if (userData.free_basic_today > 0) userData.free_basic_today -= 1;
      else if (userData.purchased_coins > 0) userData.purchased_coins -= 1;
      else return NextResponse.json({ error: 'Đã hết lượt Cơ bản hôm nay. Quý khách vui lòng nạp thêm Coin để tiếp tục!' }, { status: 403 });
    }
    await supabase.from('users').update(userData).eq('id', user.id);

    // Call Gemini (Mock for now until full integration)
    return NextResponse.json({ 
      data: {
        main_brand: "Minotti",
        product_name: typeof payload === 'string' && !payload.startsWith('data:') ? payload : "Sofa AI Detected",
        overall_evaluation: "Hệ thống AI đang tích hợp dần sang Supabase. API Keys phụ đang được nạp."
      }, 
      wallet: userData 
    });
  }

  return NextResponse.json({ error: 'Yêu cầu không hợp lệ.' }, { status: 400 });
}
