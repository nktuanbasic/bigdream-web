# 🚀 BIG DREAM - SEE ENGINE (BETA HANDOVER)

Tài liệu này tổng hợp toàn bộ hiện trạng, cấu trúc kiến trúc, và các tính năng đã hoàn thiện của dự án **BigDream Web (SEE Engine)** tính đến cuối giai đoạn Beta (Tháng 6/2026). Tài liệu này được dùng để chuyển giao (Handover) cho các session làm việc tiếp theo.

---

## 1. TỔNG QUAN DỰ ÁN
- **Tên dự án:** Big Dream Web
- **Mục tiêu:** Xây dựng một không gian làm việc (Workspace) mang tên **SEE Engine** dùng để phân tích, render, và tạo prompt thiết kế không gian kiến trúc/nội thất/ngoại thất bằng AI (Gemini).
- **Trạng thái:** Hoàn thành giai đoạn Beta. Đã Deploy thành công trên Vercel.
- **Link Deploy:** `https://bigdream-web.vercel.app/`
- **Kho lưu trữ:** Github (`nktuanbasic/bigdream-web`)

## 2. TECH STACK (CÔNG NGHỆ SỬ DỤNG)
- **Framework:** Next.js 14+ (App Router)
- **Styling:** TailwindCSS v4 (Sử dụng hệ thống màu tùy chỉnh sang trọng, Glassmorphism).
- **AI Integration:** Vercel AI SDK (`ai`, `@ai-sdk/google`).
- **Icons:** `lucide-react`.
- **Ngôn ngữ:** TypeScript.

## 3. CÁC TÍNH NĂNG NỔI BẬT ĐÃ HOÀN THÀNH

### 🎨 3.1. Giao diện & Trải nghiệm (UI/UX)
- **Phong cách thiết kế:** Lấy cảm hứng từ **Quixel Megascans** — Đậm chất điện ảnh (Cinematic), sang trọng, ma mị (Tone Đen - Vàng Đồng).
- **Bento Grid:** Trang chủ sử dụng cấu trúc Bento Grid để hiển thị các tính năng lớn (SEE MASTER, BIG MODEL, BIG LENS, BIG THINK, BIG CLASS).
- **Immersive Background:** Các trang con (`/see`, `/model`, `/lens`, `/think`, `/class`) đều được phủ background full-screen (sử dụng các ảnh siêu thực `C_DR_04.png`, `C_LOBBY_007.png`, v.v.).
- **Glassmorphism:** Toàn bộ khung Chat và UI Elements đều được làm mờ (backdrop-blur) với viền kính tinh tế, tạo cảm giác không gian 3 chiều có chiều sâu.
- **Scrollable Layout:** Giao diện có khả năng cuộn mượt mà (như Quixel) khi nội dung chat kéo dài.
- **Footer:** Chứa bản quyền và liên kết trực tiếp tới Facebook của thầy Tuấn.

### 🧠 3.2. SEE Engine (Trang `/see`)
- **Kiến trúc Nhánh (Branches):** Hệ thống chia làm 8 nhánh AI chuyên biệt (BOARD, ROOM, FILL, YARD, LAND, STAGE, RAW, DNA). Mỗi nhánh có một `System Prompt` thiết kế sẵn để đóng vai trò chuyên gia.
- **Khả năng Đa phương thức (Multimodal):** Khung chat hỗ trợ **Paste (Ctrl+V) hình ảnh** trực tiếp hoặc tải ảnh từ máy tính. Gửi đồng thời Text + Ảnh cho AI phân tích.
- **Auto-Scroll & UI:** Nút cuộn xuống cuối tự động, giao diện tin nhắn phân biệt rõ User (vàng đồng) và AI (trắng sáng). Hỗ trợ render Markdown cho kết quả trả về.

### ⚙️ 3.3. Xử lý Logic API (`src/app/api/chat/route.ts`)
- **Cơ chế Xoay vòng API Key (Key Rotation):** 
  - Hệ thống tự động đọc nhiều API Key từ `.env.local` (cách nhau bởi dấu phẩy).
  - Nếu Key 1 hết Quota (429/RESOURCE_EXHAUSTED) hoặc bị lỗi tạch, hệ thống sẽ **tự động nhảy sang Key 2, Key 3...** để đảm bảo máy chủ chạy bất tử.
- **Cơ chế Tự động Rẽ nhánh Model (Auto-Fallback Model):**
  - Tối ưu cho API Key nội bộ (VIP) của Google.
  - Thuật toán ưu tiên gọi theo thứ tự:
    1. `gemini-2.5-pro` (Ưu tiên phân tích sâu)
    2. `gemini-2.5-flash` (Dự phòng tốc độ cao)
    3. `gemini-1.5-pro-latest` (Dự phòng sâu)
    4. `gemini-1.5-flash-latest` 
    5. `gemini-1.5-flash`
  - Đảm bảo tương thích với các API Key thế hệ mới nhất của Google.

## 4. CẤU TRÚC THƯ MỤC CHÍNH
```text
bigdream-web/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Trang chủ (Bento Grid)
│   │   ├── globals.css       # File CSS cấu hình biến màu sắc & Tailwind
│   │   ├── api/chat/route.ts # File xử lý Logic AI, Key Rotation, Auto-Fallback
│   │   ├── see/page.tsx      # Không gian làm việc SEE Engine (Chat UI)
│   │   ├── model/page.tsx    # Trang con BIG MODEL
│   │   ├── lens/page.tsx     # Trang con BIG LENS
│   │   ├── think/page.tsx    # Trang con BIG THINK
│   │   └── class/page.tsx    # Trang con BIG CLASS
│   └── components/
│       └── Footer.tsx        # Chân trang dùng chung
├── public/
│   └── assets/               # Chứa toàn bộ hình ảnh nền siêu thực
├── .env.local                # (Không đưa lên Git) Chứa biến môi trường GEMINI_API_KEYS
└── tailwind.config.ts        # Cấu hình TailwindCSS
```

## 5. NHỮNG LỖI ĐÃ KHẮC PHỤC (LƯU Ý)
1. **Lỗi 404 trên Vercel:** Do cấu hình sai Framework Preset lúc đầu. Hiện đã fix về Next.js.
2. **Lỗi đứt Webhook Github - Vercel:** Xảy ra do đổi Username Github. Nếu gặp lại, cần vào Vercel > Settings > Git để Disconnect và Reconnect.
3. **Lỗi TypeScript Array AI SDK:** Đã Fix lỗi Type khi mix Text và Image trong `messages` của `generateText`.
4. **Lỗi "model not found":** Đã Fix bằng thuật toán Auto-Fallback Model (Do API Key là bản mới nên không hỗ trợ model tên cũ).

## 6. HƯỚNG PHÁT TRIỂN TIẾP THEO (TƯƠNG LAI)
- Xây dựng nội dung thực tế cho các trang `/model`, `/lens`, `/think`, `/class`.
- Kết nối Cơ sở dữ liệu (Supabase/Firebase) để lưu trữ Lịch sử đoạn Chat.
- Chức năng Đăng nhập/Đăng ký (Authentication) nếu muốn thương mại hóa hoặc giới hạn user.
- Thêm tính năng xuất PDF hoặc Copy nhanh đoạn Prompt AI trả về.

---
*Created by Antigravity AI Agent - June 2026*
