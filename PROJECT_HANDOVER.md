# 🚀 BIG DREAM - SEE ENGINE & BIG LENS (BETA HANDOVER)

Tài liệu này tổng hợp toàn bộ hiện trạng, cấu trúc kiến trúc, và các tính năng đã hoàn thiện của hệ sinh thái **BigDream Web** tính đến cuối giai đoạn Beta (Tháng 6/2026). Tài liệu này được dùng để chuyển giao (Handover) cho các session làm việc tiếp theo hoặc đưa cho một AI Agent mới.

---

## 1. TỔNG QUAN DỰ ÁN
- **Tên dự án:** Big Dream Web
- **Mục tiêu:** Xây dựng một Hệ sinh thái AI Tối cao dành cho Kiến trúc & Nghệ thuật. Bao gồm Workspace **SEE Engine** (render, tạo prompt kiến trúc) và **BIG LENS** (tiền thân là Luxury Curator - nhận diện nội thất cao cấp bằng AI).
- **Trạng thái:** Đã Deploy thành công trên Vercel.
- **Link Deploy:** `https://bigdream-web.vercel.app/`
- **Kho lưu trữ:** Github (`nktuanbasic/bigdream-web`)

## 2. TECH STACK (CÔNG NGHỆ SỬ DỤNG)
- **Framework:** Next.js 14+ (App Router)
- **Database & Auth:** Supabase (PostgreSQL, Google OAuth)
- **Styling:** TailwindCSS v4 (Sử dụng hệ thống màu tùy chỉnh sang trọng, Glassmorphism).
- **AI Integration:** Vercel AI SDK (`ai`, `@ai-sdk/google`) & Direct Gemini API calls cho LENS.
- **Icons:** `lucide-react` và `@phosphor-icons/react` (mix).
- **Ngôn ngữ:** TypeScript.

## 3. CÁC TÍNH NĂNG NỔI BẬT ĐÃ HOÀN THÀNH

### 🎨 3.1. Giao diện & Trải nghiệm (UI/UX)
- **Bento Grid & Glassmorphism:** Giao diện Cinematic siêu thực, Tone Đen - Vàng Đồng. Toàn bộ UI đều được làm mờ (backdrop-blur).
- **Global Auth (Đăng nhập toàn cục):** Tích hợp nút Đăng nhập bằng Google qua Supabase. Nút Đăng nhập và Ví tiền được ghim ở góc trên cùng bên phải (`GlobalAuthNav.tsx`), xuất hiện ở **tất cả** các trang.
- **Cơ chế Xử lý Lỗi Đăng Nhập:** Bổ sung trang trung chuyển `/auth/callback` để bắt an toàn token của Supabase, ngăn chặn lỗi Next.js nuốt hash fragment.

### 🧠 3.2. SEE Engine (Trang `/see`)
- Khung chat AI Đa phương thức hỗ trợ chia làm 8 nhánh AI chuyên biệt (BOARD, ROOM, FILL, YARD, LAND, STAGE, RAW, DNA).
- Hỗ trợ gửi Text và Ảnh đồng thời.
- Cơ chế Auto-Fallback Model (Tự động nhảy sang model phụ nếu model chính không hỗ trợ).

### 🔍 3.3. BIG LENS (Trang `/lens`) - Đã Porting từ Luxury Curator
- **Tính năng:** Máy quét nội thất cao cấp, cho phép Upload ảnh, Paste ảnh, hoặc tìm kiếm bằng Text.
- **API Backend:** Chạy qua `src/app/api/lens/analyze/route.ts` để gọi Gemini phân tích ảnh và trừ Coin/Lượt Vip của User.
- **Đổi tên thương hiệu:** Toàn bộ text "Luxury Curator" cũ đã được tiêu diệt và chuẩn hoá thành **BIG LENS**.

### ⚙️ 3.4. Database Schema (Supabase)
Dự án sử dụng Supabase với các bảng chính sau (đã có trong source cũ của Luxury Curator):
- `users`: Quản lý người dùng, Ví tiền (Coin, Lượt Cơ bản, Lượt VIP).
- `history_scans`: Lưu trữ lịch sử upload và kết quả phân tích AI.
- `search_logs` & `feedbacks`: Lưu log tìm kiếm text và phản hồi của người dùng.

## 4. CẤU TRÚC THƯ MỤC CHÍNH
```text
bigdream-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Cấu trúc chung (Chứa GlobalAuthNav)
│   │   ├── page.tsx          # Trang chủ (Bento Grid)
│   │   ├── auth/callback/    # Route trung chuyển xử lý Login Supabase (Tránh lỗi)
│   │   ├── api/
│   │   │   ├── chat/route.ts # Logic Chat cho SEE Engine (Auto-Fallback)
│   │   │   └── lens/analyze/ # Logic phân tích AI và trừ tiền cho BIG LENS
│   │   ├── see/              # Không gian làm việc SEE Engine
│   │   └── lens/             # Không gian quét nội thất BIG LENS
│   ├── components/
│   │   ├── GlobalAuthNav.tsx # Component Đăng nhập & Ví tiền toàn cục
│   │   └── lens/             # Các Component con cho BIG LENS (LensScanner, vv.)
│   └── lib/
│       └── supabase/         # Khởi tạo Supabase Client
├── public/assets/            # Hình ảnh Background
└── .env.local                # Chứa GEMINI_API_KEYS, SUPABASE_URL, SUPABASE_ANON_KEY
```

## 5. NHỮNG LỖI ĐÃ KHẮC PHỤC (LƯU Ý)
1. **Lỗi Supabase "localhost từ chối kết nối":** Đã fix bằng cách yêu cầu cấu hình `Site URL` là link Vercel và `Redirect URLs` là `https://[vercel-url]/auth/callback`.
2. **Lỗi Vercel nuốt Access Token:** Đã fix bằng cách tạo trang `/auth/callback` với logic chờ lấy Session trước khi redirect về `/`.
3. **Lỗi Quên Key Supabase trên Vercel:** Thêm Alert cảnh báo thiếu `NEXT_PUBLIC_SUPABASE_URL` ở `GlobalAuthNav` để nhắc User phải Redeploy.

## 6. HƯỚNG DẪN DÀNH CHO AI TIẾP THEO
- **Quy định Tool:** Không bao giờ dùng `cat` để viết file, hãy dùng `replace_file_content` hoặc `write_to_file`. Ưu tiên dùng `grep_search`.
- **Nhiệm vụ tiếp theo:** (Tuỳ thuộc vào User yêu cầu). Web hiện tại đã có bộ khung giao diện vững chắc và hệ thống Auth Global hoàn thiện.

---
*Created by Antigravity AI Agent - June 2026*
