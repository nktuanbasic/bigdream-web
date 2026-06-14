"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════
   SEE ENGINE — 8 nhánh xử lý chính
   Layout tham khảo: aicomplex.vn
   ═══════════════════════════════════════════════════════════ */

const BRANCHES = [
  {
    id: "stage",
    label: "RENDER AI",
    desc: "Biến ảnh 3D thô thành hình ảnh chân thực như chụp. Hậu kỳ chuyên sâu cho mọi bản render.",
    category: ["architecture", "interior"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "dna",
    label: "PHÂN TÍCH PHONG CÁCH",
    desc: "Quét ảnh tham khảo, trích xuất DNA thiết kế: vật liệu, ánh sáng, bảng màu, cảm xúc không gian.",
    category: ["interior", "architecture"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "board",
    label: "TẠO CONCEPT",
    desc: "Tổng hợp ý tưởng rời rạc thành Concept không gian hoàn chỉnh. Tự do sáng tạo bố cục.",
    category: ["interior", "architecture", "planning"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "room",
    label: "THIẾT KẾ NỘI THẤT",
    desc: "Tạo không gian nội thất hoàn chỉnh từ sketch hoặc mô tả. AI tự do đề xuất layout mới.",
    category: ["interior"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "fill",
    label: "THAY ĐỔI VẬT LIỆU",
    desc: "Thêm vật liệu và nội thất vào không gian thô. Giữ nguyên 100% kiến trúc gốc.",
    category: ["interior", "architecture"],
    image: "https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "yard",
    label: "CẢNH QUAN & MẶT TIỀN",
    desc: "Cải tạo ngoại thất quy mô nhỏ: mặt tiền, sân vườn. Giữ nguyên khung công trình.",
    category: ["landscape", "architecture"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "land",
    label: "QUY HOẠCH ĐÔ THỊ",
    desc: "Tạo phối cảnh đô thị, quy hoạch tổng thể từ mô tả hoặc ảnh địa hình.",
    category: ["planning", "landscape"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "raw",
    label: "TIỀN XỬ LÝ THÔNG MINH",
    desc: "Tự động phân loại input, làm sạch nhiễu, và chuyển đến đúng nhánh xử lý phù hợp.",
    category: ["architecture", "interior", "planning", "landscape"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  { key: "architecture", label: "Kiến trúc" },
  { key: "interior", label: "Nội thất" },
  { key: "planning", label: "Quy hoạch" },
  { key: "landscape", label: "Cảnh quan" },
];

export default function SeePage() {
  const [activeBranch, setActiveBranch] = useState(0);
  const [activeCategory, setActiveCategory] = useState("architecture");
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const current = BRANCHES[activeBranch];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, pos)));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] pt-[72px]">
      <main className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">

        {/* ── Page Header ── */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-headline-lg text-4xl md:text-5xl font-black text-white tracking-tight">
            CÔNG NGHỆ LÕI
          </h1>
          <p className="text-sm text-[#a09a8e] mt-2 uppercase tracking-[0.2em]">
            SEE Engine — 8 nhánh xử lý AI kiến trúc
          </p>
        </div>

        {/* ── Main Layout: Left Menu + Right Preview ── */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">

          {/* ═══ LEFT: Branch List ═══ */}
          <div className="w-full lg:w-[320px] flex-shrink-0 mb-6 lg:mb-0">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-0">
              {BRANCHES.map((branch, index) => (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranch(index)}
                  className={`group flex items-center gap-4 w-full text-left px-4 py-4 border-l-2 transition-all duration-300 flex-shrink-0 lg:flex-shrink ${
                    activeBranch === index
                      ? "border-l-[#f2ca50] bg-[#f2ca50]/5"
                      : "border-l-transparent hover:border-l-[#f2ca50]/30 hover:bg-white/[0.02]"
                  }`}
                >
                  <span className={`text-sm font-mono min-w-[28px] ${
                    activeBranch === index ? "text-[#f2ca50]" : "text-[#6b6560]"
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-sm font-bold uppercase tracking-wider whitespace-nowrap ${
                    activeBranch === index ? "text-[#f2ca50]" : "text-[#a09a8e] group-hover:text-white"
                  }`}>
                    {branch.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ═══ RIGHT: Preview Area ═══ */}
          <div className="flex-1 min-w-0">

            {/* Category Tabs */}
            <div className="flex items-center justify-end gap-2 mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all duration-200 rounded-sm ${
                    activeCategory === cat.key
                      ? "bg-[#f2ca50] text-[#050505] border-[#f2ca50]"
                      : "bg-transparent text-[#a09a8e] border-[#a09a8e]/30 hover:border-white/50 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Image Preview with Before/After Slider */}
            <div
              className="relative w-full aspect-[16/9] bg-[#0e0e0e] overflow-hidden rounded-sm select-none cursor-col-resize"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* "After" layer — full image */}
              <Image
                src={current.image}
                alt={current.label}
                fill
                className="object-cover"
                priority
              />

              {/* "Before" layer — grayscale/sketch overlay clipped by slider */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <Image
                  src={current.image}
                  alt={`${current.label} before`}
                  fill
                  className="object-cover grayscale brightness-75 contrast-110"
                  style={{ minWidth: "100%", width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }}
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 z-20"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-[2px] h-full bg-[#f2ca50]" />
                {/* Slider Handle */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#f2ca50] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(242,202,80,0.4)] z-30"
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8H12" stroke="#050505" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 5L3 8L6 11" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 5L13 8L10 11" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 z-10 bg-[#050505]/70 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-[#a09a8e] rounded-sm">
                Before
              </div>
              <div className="absolute top-4 right-4 z-10 bg-[#050505]/70 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-[#f2ca50] rounded-sm">
                After
              </div>
            </div>

            {/* Branch Description */}
            <div className="mt-4 mb-4">
              <p className="text-sm text-[#a09a8e] leading-relaxed max-w-2xl">
                {current.desc}
              </p>
            </div>

            {/* Bottom Specs Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 border border-white/10 rounded-sm overflow-hidden">
              <div className="flex-1 px-6 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
                <p className="text-[10px] text-[#6b6560] uppercase tracking-widest mb-1">Thời gian xử lý</p>
                <p className="text-xl font-black text-white">30S</p>
              </div>
              <div className="flex-1 px-6 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
                <p className="text-[10px] text-[#6b6560] uppercase tracking-widest mb-1">Độ phân giải</p>
                <p className="text-xl font-black text-white">4K ULTRA</p>
              </div>
              <div className="flex-1 px-6 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
                <p className="text-[10px] text-[#6b6560] uppercase tracking-widest mb-1">AI Engine</p>
                <p className="text-xl font-black text-white">SEE Engine</p>
              </div>
              <div className="flex-none px-6 py-4 flex items-center justify-center">
                <button className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#050505] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(242,202,80,0.3)]">
                  Chi tiết Engine
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
