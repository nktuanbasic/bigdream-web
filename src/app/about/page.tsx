"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function BigAboutPage() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8]" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      <main className="flex-grow pt-24 md:pt-32">
        
        {/* Minimalist Hero Section */}
        <section className="relative pt-20 pb-32 px-6 md:px-16 text-center border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <span className="font-label-caps text-xs md:text-sm text-[#d4af37] tracking-[0.4em] mb-8 uppercase block font-bold">
              {language === 'vi' ? 'Hồ Sơ Năng Lực' : 'Company Profile'}
            </span>
            <h1 className="font-display-lg text-5xl md:text-7xl lg:text-8xl text-white mb-8 uppercase tracking-tighter" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
              {language === 'vi' ? (
                <>Khởi Nguyên<br/><span className="text-[#d4af37]">Kiến Tạo</span></>
              ) : (
                <>The Genesis<br/><span className="text-[#d4af37]">Of Creation</span></>
              )}
            </h1>
            <p className="font-body-lg text-lg md:text-xl text-[#F5F2E8]/70 max-w-2xl mx-auto font-light leading-relaxed">
              {language === 'vi' 
                ? 'Hành trình chạm tới điểm giao thoa tối thượng giữa nghệ thuật điện ảnh, triết học và trí tuệ nhân tạo. Kiến tạo những không gian không giới hạn.' 
                : 'A journey reaching the ultimate intersection of cinematic art, philosophy, and artificial intelligence. Creating boundless spaces.'}
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-[1440px] mx-auto w-full">
          
          {/* Founder Section - Left Image, Right Text */}
          <section className="py-24 md:py-32 px-6 md:px-16 flex flex-col md:flex-row items-center gap-16 lg:gap-24 border-b border-white/5">
            <div className="w-full md:w-5/12 relative group">
              {/* Image Container with golden accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b border-l border-[#d4af37]/30 transition-all duration-500 group-hover:-bottom-8 group-hover:-left-8"></div>
              <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-[#111]">
                {/* Use the actual founder image with a clean grayscale effect that reveals on hover */}
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105 filter grayscale-[50%] hover:grayscale-0" style={{ backgroundImage: 'url("/assets/founder/founder_1.png")' }}></div>
              </div>
            </div>
            
            <div className="w-full md:w-7/12 flex flex-col items-start text-left">
              <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 uppercase font-bold">
                {language === 'vi' ? 'Người Sáng Lập' : 'Founder'}
              </span>
              <h2 className="font-display-lg text-5xl md:text-6xl mb-6 uppercase tracking-tighter text-white" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                Nguyễn Khánh Tuấn
              </h2>
              <div className="w-16 h-px bg-[#d4af37]/50 mb-10"></div>
              
              <div className="space-y-6 font-body-lg text-lg md:text-xl text-[#F5F2E8]/80 font-light leading-relaxed">
                <p>
                  {language === 'vi'
                    ? 'Sinh năm 2001. Kiến trúc sư nội thất và chuyên gia diễn hoạ độc lập. Kẻ định hình không gian bằng tư duy nhiếp ảnh và nghệ thuật điện ảnh.'
                    : 'Born in 2001. Independent interior architect and visualization expert. Shaping spaces with photographic and cinematic thinking.'}
                </p>
                <p>
                  {language === 'vi'
                    ? 'Với quan niệm "không có đúng hay sai, chỉ có sự phù hợp", Nguyễn Khánh Tuấn luôn tìm cách từ bỏ lối mòn rập khuôn để chạm đến bản chất thật sự của kiến trúc và nội thất.'
                    : 'With the concept "there is no right or wrong, only suitability", Tuan always seeks to abandon clichés to reach the true essence of architecture and interior.'}
                </p>
              </div>
              
              <a href="https://www.facebook.com/tuan.khanh.722968?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="mt-12 inline-block border border-[#d4af37]/50 text-[#d4af37] px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4af37] hover:text-[#050505] transition-all duration-300">
                {language === 'vi' ? 'Kết nối trên Facebook' : 'Connect on Facebook'}
              </a>
            </div>
          </section>

          {/* Philosophy Section - Left Text, Right Image */}
          <section className="py-24 md:py-32 px-6 md:px-16 flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24 border-b border-white/5">
            <div className="w-full md:w-6/12 relative group">
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-[#d4af37]/30 transition-all duration-500 group-hover:-top-8 group-hover:-right-8"></div>
              <div className="aspect-[16/10] relative overflow-hidden rounded-sm bg-[#111]">
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105 filter sepia-[.2] hover:sepia-0" style={{ backgroundImage: 'url("/assets/founder/founder_2.png")' }}></div>
              </div>
            </div>
            
            <div className="w-full md:w-6/12 flex flex-col items-start md:items-end text-left md:text-right">
              <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 uppercase font-bold">
                {language === 'vi' ? 'Triết Lý & Tư Duy' : 'Philosophy & Logic'}
              </span>
              <h2 className="font-display-lg text-5xl md:text-6xl mb-6 uppercase tracking-tighter text-white" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                Bản Chất & Logic
              </h2>
              <div className="w-16 h-px bg-[#d4af37]/50 mb-10"></div>
              
              <p className="font-body-lg text-lg md:text-xl text-[#F5F2E8]/80 font-light leading-relaxed mb-8">
                {language === 'vi'
                  ? 'Thực hành khắc kỷ, thiền định và lối sống chay tịnh. Đào sâu vào bản chất vấn đề bằng góc nhìn đa chiều, ứng dụng triết học và khoa học phức tạp vào quy trình sáng tạo.'
                  : 'Practicing stoicism, meditation, and veganism. Delving into the essence of problems through multi-dimensional perspectives, philosophy, and complex science.'}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="border border-white/10 text-white/50 px-4 py-2 text-xs tracking-widest uppercase">3-6-9</span>
                <span className="border border-white/10 text-white/50 px-4 py-2 text-xs tracking-widest uppercase">Fibonacci</span>
                <span className="border border-white/10 text-white/50 px-4 py-2 text-xs tracking-widest uppercase">142857</span>
              </div>
            </div>
          </section>

          {/* Aesthetics Section - Left Image, Right Text */}
          <section className="py-24 md:py-32 px-6 md:px-16 flex flex-col md:flex-row items-center gap-16 lg:gap-24 border-b border-white/5">
            <div className="w-full md:w-6/12 relative group">
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b border-l border-[#d4af37]/30 transition-all duration-500 group-hover:-bottom-8 group-hover:-left-8"></div>
              <div className="aspect-[16/10] relative overflow-hidden rounded-sm bg-[#111]">
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105 opacity-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=1200&auto=format&fit=crop")' }}></div>
              </div>
            </div>
            
            <div className="w-full md:w-6/12 flex flex-col items-start text-left">
              <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 uppercase font-bold">
                {language === 'vi' ? 'Thẩm Mỹ Học' : 'Aesthetics'}
              </span>
              <h2 className="font-display-lg text-5xl md:text-6xl mb-6 uppercase tracking-tighter text-white" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                Modern Luxury
              </h2>
              <div className="w-16 h-px bg-[#d4af37]/50 mb-10"></div>
              
              <div className="space-y-6 font-body-lg text-lg md:text-xl text-[#F5F2E8]/80 font-light leading-relaxed">
                <p>
                  {language === 'vi'
                    ? 'Không gian sang trọng, hiện đại. Trọng tâm thiết kế hướng đến sự đẳng cấp nhưng vẫn giữ được nhịp thở tự nhiên thông qua việc ứng dụng khéo léo các chất liệu mộc mạc và mảng xanh.'
                    : 'Modern luxury spaces. Design focus heavily leans on prestige while keeping the natural breath alive through masterful application of rustic materials.'}
                </p>
                <p className="text-[#d4af37] font-medium tracking-wide">
                  {language === 'vi' ? 'Tone màu chủ đạo: VÀNG - TRẮNG - ĐEN' : 'Signature Palette: GOLD - WHITE - BLACK'}
                </p>
              </div>
            </div>
          </section>

          {/* CTA / Mission Section - Centered */}
          <section className="py-32 px-6 md:px-16 text-center max-w-4xl mx-auto">
            <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.4em] mb-6 uppercase block font-bold">
              {language === 'vi' ? 'Hệ Sinh Thái' : 'Ecosystem'}
            </span>
            <h2 className="font-display-lg text-5xl md:text-7xl mb-12 uppercase tracking-tighter text-white" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
              Big Dream <br className="hidden md:block"/> <span className="text-[#d4af37]">AI Studio</span>
            </h2>
            <p className="font-body-lg text-xl text-[#F5F2E8]/70 font-light leading-relaxed mb-16">
              {language === 'vi'
                ? 'Xây dựng mạng lưới tư duy cá nhân và hệ sinh thái sáng tạo kiến trúc với Trí tuệ Nhân tạo làm cốt lõi. Cùng nhau nâng tầm nghệ thuật thị giác.'
                : 'Building a personal thinking network and architectural creative ecosystem with AI at its core. Elevating visual arts together.'}
            </p>
            <a href="mailto:tuankhanh@bigdream.vn" className="inline-block border-2 border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] px-12 py-5 text-sm tracking-[0.3em] uppercase hover:bg-[#d4af37] hover:text-[#050505] transition-all duration-500 font-bold">
              {language === 'vi' ? 'Hợp Tác Cùng Chúng Tôi' : 'Collaborate With Us'}
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}

