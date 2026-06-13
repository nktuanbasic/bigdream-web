# 🚀 BIG DREAM - ECOSYSTEM (FULL HANDOVER)

Tài liệu này tổng hợp toàn bộ hiện trạng, cấu trúc kiến trúc, các tính năng đã hoàn thiện của hệ sinh thái **BigDream Web**, cùng với quy trình làm việc với Stitch AI tính đến cuối giai đoạn hiện tại. Tài liệu này được dùng để chuyển giao (Handover) cho AI Agent ở phiên (tab) làm việc mới để ngay lập tức hiểu bối cảnh.

---

## 1. TỔNG QUAN DỰ ÁN
- **Tên dự án:** Big Dream Web Ecosystem
- **Mục tiêu:** Xây dựng một Hệ sinh thái AI Tối cao dành cho Kiến trúc & Nghệ thuật. 
- **Trạng thái:** Đã xây dựng hoàn thiện khung logic Next.js cho 8 phân khu. Mã nguồn đã được nén thành HTML tĩnh để gửi cho "Stitch AI" thiết kế lại UI/UX "chuẩn con người".
- **Link Deploy:** `https://bigdream-web.vercel.app/`
- **Kho lưu trữ:** Github (`nktuanbasic/bigdream-web` - deploy tự động lên Vercel qua branch `main`).

## 2. TECH STACK & QUY TẮC LÀM VIỆC (QUAN TRỌNG)
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Database & Auth:** Supabase (PostgreSQL, Google OAuth)
- **Styling:** TailwindCSS v4, thiết kế "Cinematic Glassmorphism" (Đen Obsidian `#050505` & Vàng `#f2ca50`).
- **Icons:** `@phosphor-icons/react` (mix với một số `lucide-react` cũ).

> [!WARNING] QUY TẮC CỦA USER DÀNH CHO AI (PHẢI TUÂN THỦ TUYỆT ĐỐI)
> 1. **Auto-Pilot (Tự động hoá):** Khi User giao việc lớn, hãy tự động code, tự động xử lý. Xong Phase 1 thì tự làm Phase 2, 3... KHÔNG ĐƯỢC DỪNG LẠI HỎI. Cứ làm xong rồi báo cáo một lượt. User rất ghét AI "lười" và bắt họ "tự điền" code.
> 2. **Không chạy Test Local rườm rà:** KHÔNG ĐƯỢC chạy `npm run dev` để test trên server nội bộ nếu tốn thời gian. Cứ code xong, chạy `npm run build` để check lỗi TypeScript. Nếu pass, TỰ ĐỘNG `git add . && git commit && git push` lên branch `main` để Vercel tự động build.
> 3. **Làm việc với STITCH:** Các giao diện lập trình bằng React/Tailwind mặc định bị chê là "sặc mùi AI" (Bento grid rập khuôn). User sẽ dùng code HTML tĩnh xuất ra từ dự án này ném lên Stitch AI để thiết kế lại UI/UX. AI Agent (như tôi) có nhiệm vụ xuất/chuẩn bị dữ liệu HTML tĩnh đút cho Stitch, và sau đó ráp code từ Stitch trả về vào Next.js.

## 3. CÁC TÍNH NĂNG ĐÃ HOÀN THÀNH (8 PHÂN KHU)
Tất cả các trang dưới đây đã được code logic React, lấy data, và xuất ra HTML thô phục vụ việc thiết kế lại.

1. **SEE Engine (`/see`)**: Khung chat AI Đa phương thức tạo prompt kiến trúc (8 nhánh chuyên biệt).
2. **BIG LENS (`/lens`)**: Máy quét nội thất cao cấp (Upload ảnh -> gọi Gemini phân tích -> trừ Coin).
3. **BIG MODEL (`/model`)**: Chợ mua bán Asset 3D cao cấp.
4. **BIG THINK (`/think`)**: Tạp chí/Journal phân tích nghệ thuật không gian.
5. **BIG CLASS (`/class`)**: Các khoá học Video Masterclass về thiết kế kiến trúc AI.
6. **ABOUT/PORTFOLIO (`/about`)**: Hồ sơ cá nhân của kiến trúc sư, giới thiệu năng lực.
7. **ACCOUNT DASHBOARD (`/account`)**: Bảng điều khiển tài khoản siêu cấp (Lịch sử Nạp, Tải, Xem).
8. **TRANG CHỦ (`/`)**: Hub trung tâm dẫn đến các phân khu trên.

## 4. DATABASE SCHEMA (SUPABASE)
Các bảng hiện hành (cần cấu trúc trên Supabase Dashboard):
- `users`: Thông tin người dùng, Ví tiền (Coins).
- `history_scans`: Lịch sử quét nội thất của Lens.
- `search_logs` & `feedbacks`.
- **(MỚI)** `transactions`: Ghi nhận các giao dịch tài chính (Nạp tiền `DEPOSIT`, Mua model `PURCHASE`).
- **(MỚI)** `user_activities`: Ghi nhận các hoạt động tương tác (Tải model `DOWNLOAD`, Xem bài/model `VIEW`).

## 5. THƯ MỤC LÀM VIỆC VỚI STITCH
User sử dụng folder `e:\Flexible\Antigravity\Big_Dream\stitch_web_project_development` làm nơi giao tiếp với phần mềm thiết kế Stitch AI.

- **FULL_WEB_EXPORT_FOR_STITCH/**: Chứa toàn bộ HTML thô của 8 trang (lấy từ dữ liệu tĩnh), cấu trúc `code.html` & `screen.png` ở mỗi thư mục con để Stitch đọc data.
- **BIG_DREAM_STITCH_MASTER_PROMPT.md**: File tài liệu mô tả tóm tắt toàn bộ định hướng nghệ thuật "Cinematic Asymmetry" dành riêng cho Stitch hiểu để vẽ UI.

## 6. NHIỆM VỤ Ở PHIÊN LÀM VIỆC TIẾP THEO
Tuỳ thuộc vào User yêu cầu. Khả năng cao User sẽ mang Code (HTML/CSS) đã được thiết kế cực đẹp từ Stitch thả vào.
Nhiệm vụ của AI mới sẽ là:
1. Nhận code HTML/CSS từ Stitch.
2. Xẻ thịt/bóc tách Component.
3. Ráp logic React (Supabase, State, Fetch API...) đã có sẵn vào lớp áo UI mới này.
4. Push lên Production.

---
*Created by Antigravity AI Agent - Đã Update toàn bộ Context*
