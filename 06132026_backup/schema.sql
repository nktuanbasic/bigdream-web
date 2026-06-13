-- Tạo bảng Users để quản lý ví tiền
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  free_basic_today int default 6,
  free_adv_today int default 4,
  purchased_coins int default 0,
  last_reset_date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tắt RLS để API Route (có dùng Anon Key) cũng có thể truy xuất và cập nhật (cho mục đích test ban đầu).
-- Khuyến cáo: Về sau nếu dùng production, nên bật RLS và dùng Service Role Key trên Next.js API.
alter table public.users disable row level security;

-- Tạo bảng History để lưu lịch sử phân tích
create table public.history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id),
  type text,
  brand text,
  model text,
  image_url text,
  result jsonb,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.history disable row level security;

-- Tạo bảng Search Logs để làm Kho báu cộng đồng
create table public.search_logs (
  id uuid default gen_random_uuid() primary key,
  email text,
  brand text,
  model text,
  mode text,
  image_url text,
  official_image text,
  badge_type text,
  result jsonb,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.search_logs disable row level security;

-- ==========================================
-- NEW TABLES FOR ACCOUNT DASHBOARD
-- ==========================================

-- Bảng Transactions: Lưu lịch sử nạp tiền (DEPOSIT) và mua tài sản (PURCHASE)
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id),
  type text check (type in ('DEPOSIT', 'PURCHASE')),
  amount int not null,
  item_id text, -- Có giá trị nếu type = PURCHASE
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.transactions disable row level security;

-- Bảng User Activities: Lưu lịch sử xem (VIEW) và tải (DOWNLOAD) model
create table public.user_activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id),
  action_type text check (action_type in ('VIEW', 'DOWNLOAD')),
  item_id text not null,
  item_name text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.user_activities disable row level security;
