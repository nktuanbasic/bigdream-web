"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function BigAboutPage() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8]" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      <main className="flex-grow pt-0">
        {/* Immersive Hero Section */}
        <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center px-6 md:px-16 overflow-hidden border-b border-[#f2ca50]/10">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-60">
            <div className="bg-cover bg-center w-full h-full mix-blend-luminosity scale-105 animate-[pulse_10s_ease-in-out_infinite]" style={{ backgroundImage: 'url("/assets/about_hero_bg.png")' }}></div>
            {/* Dark vignette & gold bottom gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center mt-24">
            <span className="font-label-caps text-xs md:text-sm text-[#d4af37] tracking-[0.4em] mb-6 uppercase block font-bold">
              {language === 'vi' ? 'Big Dream Ecosystem' : 'Big Dream Ecosystem'}
            </span>
            <h1 className="font-display-lg text-6xl md:text-8xl lg:text-[110px] text-white mb-8 uppercase tracking-tighter leading-none" style={{ fontFamily: '"Metrophobic", sans-serif', color: '#d4af37', textShadow: 'rgba(212, 175, 55, 0.3) 0px 0px 60px' }}>
              {language === 'vi' ? (
                <>Khởi Nguyên<br/><span className="text-white">Kiến Tạo</span></>
              ) : (
                <>The Genesis<br/><span className="text-white">Of Creation</span></>
              )}
            </h1>
            <p className="font-body-lg text-xl md:text-2xl text-[#F5F2E8]/80 max-w-3xl font-light leading-relaxed">
              {language === 'vi' 
                ? 'Hành trình vượt khỏi những giới hạn vật lý để chạm tới điểm giao thoa tối thượng giữa nghệ thuật điện ảnh, triết học và trí tuệ nhân tạo.' 
                : 'A journey beyond physical limits to reach the ultimate intersection of cinematic art, philosophy, and artificial intelligence.'}
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
            <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
              {language === 'vi' ? 'Khám phá' : 'Explore'}
            </span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
          </div>
        </section>

        {/* Content Section (Bento Grid) */}
        <section className="py-[120px] px-0 md:px-16 max-w-[1600px] mx-auto">
          <div className="mb-24 text-center px-6">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-[#F5F2E8] mb-6 uppercase tracking-widest" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
              {language === 'vi' ? 'Câu Chuyện & Triết Lý' : 'Story & Philosophy'}
            </h2>
            <div className="h-px w-24 bg-[#d4af37] mx-auto opacity-50"></div>
          </div>
          
          <div className="flex flex-col gap-32">
            
            {/* Card 1 - Founder (Left align) */}
            <div className="group relative w-full min-h-[80vh] md:min-h-[800px] overflow-hidden flex items-center px-8 md:px-24 border-y md:border border-white/5 md:rounded-sm transition-all duration-700">
              <div className="absolute inset-0 z-0 bg-[#050505]">
                {/* Artistic Image Styling: Grayscale, Luminosity Blend, Gold Overlay */}
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 filter grayscale opacity-40 mix-blend-screen" style={{ backgroundImage: 'url("/assets/founder/founder_1.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#d4af37]/5 z-10"></div>
              </div>
              <div className="relative z-20 max-w-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#d4af37]"></div>
                  <span className="font-label-caps text-sm text-[#d4af37] tracking-[0.4em] uppercase font-bold">
                    {language === 'vi' ? 'Người Sáng Lập' : 'Founder'}
                  </span>
                </div>
                <h3 className="font-display-lg text-6xl md:text-7xl mb-8 uppercase tracking-tighter text-white font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  Nguyễn Khánh<br/><span className="text-[#d4af37]">Tuấn</span>
                </h3>
                <p className="font-body-lg text-xl md:text-2xl text-[#F5F2E8]/90 leading-relaxed mb-6 font-light">
                  {language === 'vi'
                    ? 'Sinh năm 2001. Kiến trúc sư nội thất và chuyên gia diễn hoạ độc lập. Kẻ định hình không gian bằng tư duy nhiếp ảnh và nghệ thuật điện ảnh.'
                    : 'Born in 2001. Independent interior architect and visualization expert. Shaping spaces with photographic and cinematic thinking.'}
                </p>
                <p className="font-body-md text-base md:text-lg text-[#F5F2E8]/60 leading-relaxed max-w-lg">
                  {language === 'vi'
                    ? 'Không có đúng hay sai, chỉ có sự phù hợp. Từ bỏ lối mòn rập khuôn để chạm đến bản chất thật sự của không gian.'
                    : 'There is no right or wrong, only suitability. Abandoning clichés to reach the true essence of space.'}
                </p>
              </div>
            </div>

            {/* Card 2 - Philosophy (Right align) */}
            <div className="group relative w-full min-h-[80vh] md:min-h-[800px] overflow-hidden flex items-center justify-end px-8 md:px-24 border-y md:border border-white/5 md:rounded-sm transition-all duration-700">
              <div className="absolute inset-0 z-0 bg-[#050505]">
                {/* Artistic Image Styling */}
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 filter sepia-[.3] opacity-30 mix-blend-luminosity" style={{ backgroundImage: 'url("/assets/founder/founder_2.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#d4af37]/10 z-10"></div>
              </div>
              <div className="relative z-20 max-w-2xl text-right flex flex-col items-end">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-label-caps text-sm text-[#d4af37] tracking-[0.4em] uppercase font-bold">
                    {language === 'vi' ? 'Triết Lý & Tư Duy' : 'Philosophy & Thinking'}
                  </span>
                  <div className="w-8 h-px bg-[#d4af37]"></div>
                </div>
                <h3 className="font-display-lg text-6xl md:text-7xl mb-8 uppercase tracking-tighter text-[#d4af37] font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  {language === 'vi' ? 'Bản Chất' : 'Essence'} <br/><span className="text-white">& Logic</span>
                </h3>
                <p className="font-body-lg text-xl md:text-2xl text-[#F5F2E8]/90 leading-relaxed mb-6 font-light text-right">
                  {language === 'vi'
                    ? 'Thực hành khắc kỷ, thiền định và lối sống chay tịnh. Đào sâu vào bản chất vấn đề bằng triết học và khoa học phức tạp.'
                    : 'Practicing stoicism, meditation, and veganism. Delving into the essence of problems through philosophy and complex science.'}
                </p>
                <div className="flex gap-4 opacity-60">
                  <span className="border border-[#d4af37]/30 px-4 py-2 text-xs tracking-widest uppercase">3-6-9</span>
                  <span className="border border-[#d4af37]/30 px-4 py-2 text-xs tracking-widest uppercase">Fibonacci</span>
                  <span className="border border-[#d4af37]/30 px-4 py-2 text-xs tracking-widest uppercase">142857</span>
                </div>
              </div>
            </div>

            {/* Card 3 - Style (Left align) */}
            <div className="group relative w-full min-h-[80vh] md:min-h-[800px] overflow-hidden flex items-center px-8 md:px-24 border-y md:border border-white/5 md:rounded-sm transition-all duration-700">
              <div className="absolute inset-0 z-0 bg-[#050505]">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-lighten" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=1600&auto=format&fit=crop")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,transparent_0%,#050505_80%)] z-10"></div>
              </div>
              <div className="relative z-20 max-w-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#d4af37]"></div>
                  <span className="font-label-caps text-sm text-[#d4af37] tracking-[0.4em] uppercase font-bold">
                    {language === 'vi' ? 'Thẩm Mỹ Học' : 'Aesthetics'}
                  </span>
                </div>
                <h3 className="font-display-lg text-6xl md:text-7xl mb-8 uppercase tracking-tighter text-white font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  Modern<br/><span className="text-[#d4af37]">Luxury</span>
                </h3>
                <p className="font-body-lg text-xl md:text-2xl text-[#F5F2E8]/90 leading-relaxed mb-6 font-light">
                  {language === 'vi'
                    ? 'Không gian sang trọng, hiện đại. Ứng dụng khéo léo chất liệu mộc mạc kết hợp nhịp thở của tự nhiên.'
                    : 'Modern luxury space. Masterfully applying rustic materials combined with the breath of nature.'}
                </p>
                <p className="font-body-md text-base text-[#d4af37] tracking-[0.2em] uppercase font-bold">
                  {language === 'vi' ? 'Tone chủ đạo: Vàng - Trắng - Đen' : 'Signature palette: Gold - White - Black'}
                </p>
              </div>
            </div>
            
            {/* Card 4 - Mission (Right align) */}
            <div className="group relative w-full min-h-[80vh] md:min-h-[800px] overflow-hidden flex items-center justify-end px-8 md:px-24 border-y md:border border-white/5 md:rounded-sm transition-all duration-700 mb-12">
              <div className="absolute inset-0 z-0 bg-[#050505]">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 filter grayscale opacity-40 mix-blend-luminosity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcL3-QZeYU5l6HBvLR8xeen7bIxqExEZYR88TUOKlFiR25zM-1sJp1bbU35Rx5N3YokMbYMmerRNXdNQYRfO08dWaCLs99go9uISyFPHmfrfQ0EJgsSl87Ik-1RWr4kMdby-IhG0Dl1Q7VzN4-vScMqJTN75wL1HEGh6VR0eb2L_sGAqcJbqPEeL11uw3OA97RvbJDYmpr4eitkR0puYlQvexoZ8XZQ1yAde-yof4OJz1EmgOU_-s7r5HGS0UdBR70Iccd2Gq6s7tn")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 via-transparent to-transparent z-10"></div>
              </div>
              <div className="relative z-20 max-w-2xl text-right flex flex-col items-end">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-label-caps text-sm text-[#d4af37] tracking-[0.4em] uppercase font-bold">
                    {language === 'vi' ? 'Hệ Sinh Thái' : 'Ecosystem'}
                  </span>
                  <div className="w-8 h-px bg-[#d4af37]"></div>
                </div>
                <h3 className="font-display-lg text-6xl md:text-7xl mb-8 uppercase tracking-tighter text-[#d4af37] font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  Big Dream<br/><span className="text-white">AI Studio</span>
                </h3>
                <p className="font-body-lg text-xl md:text-2xl text-[#F5F2E8]/90 leading-relaxed mb-12 font-light">
                  {language === 'vi'
                    ? 'Xây dựng mạng lưới tư duy cá nhân và hệ sinh thái sáng tạo kiến trúc với Trí tuệ Nhân tạo làm cốt lõi. Khai phóng nghệ thuật thị giác và kiến tạo không gian không giới hạn.'
                    : 'Building a personal thinking network and architectural creative ecosystem with AI at its core. Elevating visual arts and creating boundless spaces.'}
                </p>
                <div className="flex justify-end">
                  <a href="https://www.facebook.com/tuan.khanh.722968?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="border border-[#d4af37] text-[#d4af37] font-label-caps text-sm px-10 py-5 hover:bg-[#d4af37] hover:text-[#050505] transition-all duration-500 uppercase tracking-[0.3em] font-bold shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                    {language === 'vi' ? 'Kết Nối Cùng Chúng Tôi' : 'Connect With Us'}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

