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

const PRICING: Record<string, { in: number, out: number }> = {
  'gemini-2.5-flash-lite': { in: 0.0375, out: 0.15 },
  'gemini-2.5-flash':      { in: 0.075,  out: 0.30 },
};

export const maxDuration = 60;

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

  // Lấy dữ liệu ví người dùng
  const { data: userData, error: walletError } = await supabase.from('users').select('*').eq('id', user.id).single();
  if (walletError || !userData) {
    return NextResponse.json({ error: 'Không tìm thấy dữ liệu ví tiền. Vui lòng đăng nhập lại.' }, { status: 400 });
  }

  if (action === 'get_wallet') {
    return NextResponse.json({ wallet: userData }, { status: 200 });
  }

  if (action === 'text' || action === 'image') {
    const isAdv = mode === 'lens';
    let cleanBase64Data = null;
    let imgBuffer = null;
    let currentMimeType = "image/jpeg";

    if (payload && typeof payload === 'string' && payload.startsWith('data:')) {
      const match = payload.match(/^data:(image\/\w+);base64,(.*)$/);
      if (match) { 
        currentMimeType = match[1]; 
        cleanBase64Data = match[2]; 
        imgBuffer = Buffer.from(cleanBase64Data, 'base64');
      }
    }

    const jsonSchema = `{"product_type": "Loại sản phẩm (vd: Sofa, Đèn)", "main_brand": "Tên thương hiệu (BẮT BUỘC: Nếu dưới 95% tự tin, ghi 'Chưa xác định')", "product_name": "Tên Model (Dựa trên chuẩn tên của 3dsky hoặc Hãng, BẮT BUỘC: Nếu không chắc chắn, ghi 'Chưa xác định')", "evidence_link": "Link tham chiếu web hãng hoặc NONE", "designer": "Tên NTK hoặc Chưa xác định", "related_keywords": ["keyword1", "keyword2", "keyword3"], "style": "...", "is_luxury": true, "score_total": 8.5, "form_score": 8, "proportion_score": 8, "color_score": 8, "detail_score": 8, "material_score": 8, "luxury_index": 8, "match_status": "EXACT hoặc GUESS", "overall_evaluation": "Hãy đóng vai một Art Director/Kiến trúc sư khắt khe. Đánh giá tổng thể cấu trúc, tỷ lệ, vật liệu một cách chuyên nghiệp và chính xác bằng tiếng Việt."}`;

    let imgUrlToSave = null;
    let extractedSuggestions: any[] = [];
    let serpApiCount = 0;
    let promptText = "";

    try {
      if (isAdv && cleanBase64Data && VISION_KEY && CLOUD_IMG_KEY) {
        // 1. Upload Imgbb
        const form = new URLSearchParams(); 
        form.append('image', cleanBase64Data);
        const r1 = await fetch(`https://api.imgbb.com/1/upload?key=${CLOUD_IMG_KEY}`, { method: 'POST', body: form });
        const d1 = await r1.json(); 
        imgUrlToSave = d1.data?.url;

        // 2. SerpApi Google Lens
        if (imgUrlToSave) {
          serpApiCount += 1;
          const r2 = await fetch(`https://serpapi.com/search.json?engine=google_lens&url=${encodeURIComponent(imgUrlToSave)}&api_key=${VISION_KEY}`);
          const data2 = await r2.json();
          
          if (data2.visual_matches) {
            extractedSuggestions = data2.visual_matches.slice(1, 11).map((m: any) => ({ title: m.title, thumbnail: m.thumbnail, original: m.link }));
            const matchText = data2.visual_matches.slice(0, 15).map((m: any) => `- ${m.title} | Link: ${m.link}`).join('\n');
            promptText = `Dữ liệu Vector: """${matchText}""". Dựa vào hình ảnh đính kèm và vector trên, hãy định danh chính xác model sản phẩm theo chuẩn 3dsky. CẤM BỊA ĐẶT THÔNG TIN. Nếu không khớp 100%, ghi 'Chưa xác định'. JSON: ${jsonSchema}`;
          } else {
            promptText = `Hãy phân tích hình ảnh và suy đoán hãng sản xuất. Nếu không nhận diện được chính xác, bắt buộc ghi 'Chưa xác định'. Match_status = GUESS. JSON: ${jsonSchema}`;
          }
        } else {
          promptText = `Phân tích hình ảnh này ở chế độ BASIC. Suy đoán tên hãng nếu có thể, nếu không chắc chắn tuyệt đối hãy ghi 'Chưa xác định'. JSON: ${jsonSchema}`;
        }
      } else if (cleanBase64Data) {
         promptText = `Phân tích hình ảnh này ở chế độ BASIC. Suy đoán tên hãng nếu có thể, nếu không chắc chắn tuyệt đối hãy ghi 'Chưa xác định'. JSON: ${jsonSchema}`;
      } else {
         promptText = `Từ khóa: "${payload}". NHIỆM VỤ: ĐỊNH DANH SẢN PHẨM NỘI THẤT CHÍNH XÁC TUYỆT ĐỐI THEO CHUẨN 3DSKY. TRẢ JSON: ${jsonSchema}`;
      }

      // 3. Gọi Gemini
      const googleProvider = createGoogleGenerativeAI({ apiKey: CORE_KEY });
      const modelName = 'gemini-2.5-flash';

      let parts: any[] = [{ type: 'text', text: promptText }];
      if (imgBuffer) {
        parts.push({ type: 'image', image: imgBuffer, mimeType: currentMimeType });
      }

      const { text, usage } = await generateText({
        model: googleProvider(modelName),
        messages: [{ role: 'user', content: parts }],
        temperature: 0.05
      });

      const cleanJson = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1).replace(/[\x00-\x1F\x7F]/g, ' ');
      const finalResult = JSON.parse(cleanJson);
      finalResult._mode = isAdv ? 'advanced' : 'basic';
      if (extractedSuggestions.length > 0) {
        finalResult._suggestions = extractedSuggestions;
      }

      finalResult.official_image = null;
      finalResult.badge_type = 'none';

      // 4. SerpAPI Google Images (Tìm ảnh chuẩn)
      if (finalResult.main_brand !== 'Chưa xác định' && finalResult.product_name !== 'Chưa xác định' && VISION_KEY) {
        try {
            serpApiCount += 1;
            const imgQuery = `"${finalResult.main_brand} ${finalResult.product_name}" (site:3dsky.org OR "official website") high quality`;
            const imgRes = await fetch(`https://serpapi.com/search.json?engine=google_images&q=${encodeURIComponent(imgQuery)}&api_key=${VISION_KEY}`);
            const imgData = await imgRes.json();
            if (imgData.images_results && imgData.images_results.length > 0) {
                const bestImg = imgData.images_results[0];
                finalResult.official_image = bestImg.original;
                if (bestImg.source && bestImg.source.toLowerCase().includes('3dsky')) {
                    finalResult.badge_type = 'blue';
                } else {
                    finalResult.badge_type = 'gold';
                }
            }
        } catch(e) { console.warn("Lỗi tải ảnh Official"); }
      }

      // --- TÍNH TIỀN GEM (Billing Engine) ---
      const promptTokens = usage.inputTokens ?? 0;
      const completionTokens = usage.outputTokens ?? 0;
      const rates = PRICING[modelName];
      
      const aiCostUSD = (promptTokens * rates.in / 1_000_000) + (completionTokens * rates.out / 1_000_000);
      const serpApiCostUSD = serpApiCount * 0.01;
      const totalRawCostUSD = aiCostUSD + serpApiCostUSD;
      
      const finalPriceUSD = totalRawCostUSD * 1.3;
      const finalPriceGEM = Math.ceil(finalPriceUSD * 25000);

      if (userData.purchased_coins < finalPriceGEM) {
         return NextResponse.json({ error: `Quý khách không đủ GEM. Cần ${finalPriceGEM} GEM để thực hiện phân tích này.` }, { status: 402 });
      }

      const newBalance = Math.max(0, userData.purchased_coins - finalPriceGEM);
      await supabase.from('users').update({ purchased_coins: newBalance }).eq('id', user.id);

      console.log(`[LENS BILLING] Tokens In: ${promptTokens}, Tokens Out: ${completionTokens}, SerpApi: ${serpApiCount}`);
      console.log(`[LENS BILLING] Tổng gốc: $${totalRawCostUSD.toFixed(5)} | Thu khách: $${finalPriceUSD.toFixed(5)} -> Trừ ${finalPriceGEM} GEM.`);

      return NextResponse.json({ data: finalResult, user_image: imgUrlToSave, wallet: { ...userData, purchased_coins: newBalance } });

    } catch (err: any) {
      console.error("Lỗi hệ thống LENS:", err);
      return NextResponse.json({ error: err.message || 'Mạng lưới dữ liệu tạm thời nghẽn. Quý khách vui lòng thử lại!' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Yêu cầu không hợp lệ.' }, { status: 400 });
}
