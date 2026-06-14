"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass, Clock, Eye } from "@phosphor-icons/react";

/* ═══════════════════════════════════════════════════════════
   THINK PAGE (BLOG/JOURNAL)
   Layout tham khảo: dangtiendung.com/category/noi-that/
   ═══════════════════════════════════════════════════════════ */

const CATEGORIES = ["Tất cả", "Kiến trúc", "Nội thất", "Đồ hoạ", "Phần mềm", "Tài liệu", "Giải trí", "Khác"];

const MOCK_POSTS = [
  {
    id: 1,
    title: "Sự phổ biến của màu trắng trong nội thất phương Tây: góc nhìn từ kinh tế",
    excerpt: "Trong quá trình tìm hiểu về kiến trúc nội thất trên các tạp chí nước ngoài, tôi nhận ra rằng người phương Tây sử dụng màu trắng cực kỳ nhiều. Họ dường như sơn trắng mọi thứ...",
    date: "15/05/2024",
    views: "379",
    category: "Nội thất",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "3 vấn đề khi thiết kế giá sách",
    excerpt: "Sự thật, tôi không phải là người hay mua sách. Mỗi năm, tôi chỉ thường mua vài cuốn, chủ yếu là sách kỹ thuật và chuyên ngành. Phần lớn thời gian tôi đọc ebook trên...",
    date: "13/03/2024",
    views: "429",
    category: "Kiến trúc",
    thumbnail: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tỷ lệ vàng – cú lừa thế kỷ",
    excerpt: "Tỷ lệ vàng là một con số nổi tiếng. Mỗi năm, chúng ta lại đều đặn có thêm những bằng chứng mới về sự xuất hiện của tỷ lệ vàng trong tự nhiên hay trong nghệ thuật...",
    date: "24/02/2024",
    views: "1K",
    category: "Kiến trúc",
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Hiểu đúng về ánh sáng tự nhiên trong không gian",
    excerpt: "Ánh sáng tự nhiên không chỉ là để chiếu sáng, nó định hình cảm xúc và nhịp điệu của một công trình. Khi đặt một cửa sổ, bạn đang vẽ một vệt sáng lên tường...",
    date: "10/01/2024",
    views: "852",
    category: "Kiến trúc",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Khái niệm 'Negative Space' trong thiết kế hiện đại",
    excerpt: "Khoảng trống không phải là khoảng thừa. Trong thiết kế hiện đại, negative space (không gian âm) đóng vai trò định hướng thị giác và tạo sự nghỉ ngơi cho mắt...",
    date: "05/12/2023",
    views: "1.2K",
    category: "Đồ hoạ",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Xu hướng vật liệu thô mộc năm 2024",
    excerpt: "Sự lên ngôi của Wabi-Sabi kéo theo sự ưa chuộng các vật liệu giữ nguyên bản chất thô mộc: bê tông trần, gỗ không sơn, đá tự nhiên cắt xẻ...",
    date: "20/11/2023",
    views: "640",
    category: "Nội thất",
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
];

const MOCK_SIDEBAR = [
  {
    id: 101,
    title: "Có công mài sắt",
    date: "20/01/2026",
    views: "72",
    thumbnail: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 102,
    title: "Hướng dẫn plugin Board Tools",
    date: "17/10/2025",
    views: "2.7K",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 103,
    title: "Phá Thiên Chùy",
    date: "16/09/2025",
    views: "157",
    thumbnail: "https://images.unsplash.com/photo-1541888086925-920a0b411d33?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 104,
    title: "Thư viện SketchUp Trung Quốc",
    date: "17/06/2025",
    views: "1.5K",
    thumbnail: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 105,
    title: "Phác thảo và vẽ tay",
    date: "10/06/2025",
    views: "318",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop",
  },
];

export default function ThinkPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] pt-[90px]">
      <main className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* ── Page Header & Categories ── */}
        <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline-lg text-4xl md:text-5xl font-black text-white tracking-tight">
              THINK
            </h1>
            <p className="text-sm text-[#a09a8e] mt-2 uppercase tracking-[0.2em]">
              Nhật ký thiết kế kiến trúc
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === cat 
                    ? "text-[#f2ca50] border-b-2 border-[#f2ca50] pb-1" 
                    : "text-[#a09a8e] hover:text-white pb-1"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Two Column Layout ── */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ═══ LEFT: Blog Posts (70%) ═══ */}
          <div className="w-full lg:w-[70%] space-y-12">
            {MOCK_POSTS.map((post) => (
              <article key={post.id} className="flex flex-col md:flex-row gap-8 group">
                
                {/* Thumbnail */}
                <div className="w-full md:w-[320px] aspect-[4/3] relative rounded-md overflow-hidden flex-shrink-0 border border-white/5 group-hover:border-[#f2ca50]/30 transition-colors">
                  <Image 
                    src={post.thumbnail} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#050505]/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Content */}
                <div className="flex flex-col py-2">
                  <Link href={`/think/${post.id}`} className="block">
                    <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#f2ca50] transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <div className="flex items-center gap-4 text-xs text-[#6b6560] mb-4 uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1">
                      <Clock size={14} weight="bold" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} weight="bold" /> {post.views}
                    </span>
                  </div>
                  
                  <p className="text-sm md:text-base text-[#a09a8e] leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div>
                    <Link 
                      href={`/think/${post.id}`}
                      className="inline-flex items-center justify-center px-6 py-2 text-xs font-bold uppercase tracking-wider text-white border border-white/20 rounded-md hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all duration-300"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* Pagination Placeholder */}
            <div className="pt-8 border-t border-white/10 flex justify-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-md border border-[#f2ca50] text-[#f2ca50] font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md border border-white/10 text-[#a09a8e] hover:border-white/30 hover:text-white transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md border border-white/10 text-[#a09a8e] hover:border-white/30 hover:text-white transition-colors">3</button>
            </div>
          </div>

          {/* ═══ RIGHT: Sidebar (30%) ═══ */}
          <aside className="w-full lg:w-[30%] space-y-10">
            
            {/* Search */}
            <div className="relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a09a8e]" size={20} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full bg-[#131313] border border-white/10 rounded-md py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#f2ca50] focus:bg-[#1a1a1a] transition-all"
              />
            </div>

            {/* Popular Posts */}
            <div className="bg-[#131313] border border-white/10 rounded-md p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/10 relative">
                Nhiều lượt xem
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#f2ca50]" />
              </h3>
              
              <div className="space-y-6">
                {MOCK_SIDEBAR.map((item) => (
                  <Link href={`/think/${item.id}`} key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-16 relative rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                      <Image 
                        src={item.thumbnail} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-0.5">
                      <h4 className="text-sm font-bold text-white leading-tight group-hover:text-[#f2ca50] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-[#6b6560] uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Clock size={12} /> {item.date}</span>
                        <span className="flex items-center gap-1"><Eye size={12} /> {item.views}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags / Topics */}
            <div className="bg-[#131313] border border-white/10 rounded-md p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/10 relative">
                Chủ đề phổ biến
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#f2ca50]" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {["3dsmax", "coronarenderer", "photoshop", "wabisabi", "midjourney", "comfyui", "ai-architecture"].map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/tag/${tag}`}
                    className="px-3 py-1.5 text-xs text-[#a09a8e] bg-[#1a1a1a] border border-white/5 rounded-sm hover:border-[#f2ca50]/50 hover:text-white transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}
