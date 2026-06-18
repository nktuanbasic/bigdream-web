"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function BigAboutPage() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8]" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      <main className="flex-grow pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center px-6 md:px-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="bg-cover bg-center w-full h-full mix-blend-luminosity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcL3-QZeYU5l6HBvLR8xeen7bIxqExEZYR88TUOKlFiR25zM-1sJp1bbU35Rx5N3YokMbYMmerRNXdNQYRfO08dWaCLs99go9uISyFPHmfrfQ0EJgsSl87Ik-1RWr4kMdby-IhG0Dl1Q7VzN4-vScMqJTN75wL1HEGh6VR0eb2L_sGAqcJbqPEeL11uw3OA97RvbJDYmpr4eitkR0puYlQvexoZ8XZQ1yAde-yof4OJz1EmgOU_-s7r5HGS0UdBR70Iccd2Gq6s7tn")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
            <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.2em] mb-6 uppercase block font-bold">
              {language === 'vi' ? 'Hồ Sơ Năng Lực' : 'Company Profile'}
            </span>
            <h1 className="font-display-lg text-5xl md:text-7xl text-white mb-8 uppercase tracking-tighter" style={{ fontFamily: '"Metrophobic", sans-serif', color: '#d4af37', textShadow: 'rgba(212, 175, 55, 0.2) 0px 0px 40px' }}>
              {language === 'vi' ? 'VỀ CHÚNG TÔI' : 'ABOUT US'}
            </h1>
            <p className="font-body-lg text-lg text-[#F5F2E8] max-w-2xl font-light leading-relaxed">
              {language === 'vi' 
                ? 'Khám phá câu chuyện đằng sau hệ sinh thái kiến trúc và diễn hoạ hàng đầu, nơi hội tụ giữa công nghệ AI và nghệ thuật điện ảnh.' 
                : 'Discover the story behind the leading architectural visualization ecosystem, where AI technology meets cinematic art.'}
            </p>
          </div>
        </section>

        {/* Content Section (Bento Grid) */}
        <section className="py-[120px] px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
              {language === 'vi' ? 'Câu Chuyện & Triết Lý' : 'Story & Philosophy'}
            </h2>
            <div className="h-px w-24 bg-[#f2ca50] mx-auto opacity-50"></div>
          </div>
          
          <div className="flex flex-col gap-20 md:gap-32">
            
            {/* Card 1 - Founder (Left align) */}
            <div className="group relative w-full h-[500px] overflow-hidden flex items-center px-6 md:px-16 border border-white/10 transition-all duration-500">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("/assets/founder/founder_1.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-2xl">
                <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 block uppercase font-bold">
                  {language === 'vi' ? 'Người Sáng Lập' : 'Founder'}
                </span>
                <h3 className="font-display-lg text-4xl md:text-5xl mb-4 uppercase tracking-tighter text-[#d4af37] font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  Nguyễn Khánh Tuấn
                </h3>
                <p className="font-body-lg text-lg max-w-md text-[#F5F2E8] leading-relaxed mb-4">
                  {language === 'vi'
                    ? 'Sinh năm 2001. Kiến trúc sư nội thất và chuyên gia diễn hoạ tại S-Housing. Định hình không gian bằng tư duy nhiếp ảnh và nghệ thuật điện ảnh.'
                    : 'Born in 2001. Interior architect and visualization expert at S-Housing. Shaping spaces with photographic and cinematic thinking.'}
                </p>
              </div>
            </div>

            {/* Card 2 - Philosophy (Right align) */}
            <div className="group relative w-full h-[500px] overflow-hidden flex items-center justify-end px-6 md:px-16 border border-white/10 transition-all duration-500">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("/assets/founder/founder_2.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-2xl text-right">
                <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 block uppercase font-bold">
                  {language === 'vi' ? 'Triết Lý & Tư Duy' : 'Philosophy & Thinking'}
                </span>
                <h3 className="font-display-lg text-4xl md:text-5xl mb-4 uppercase tracking-tighter text-[#d4af37] font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  {language === 'vi' ? 'Bản Chất & Logic' : 'Essence & Logic'}
                </h3>
                <p className="font-body-lg text-lg max-w-md ml-auto text-[#F5F2E8] leading-relaxed">
                  {language === 'vi'
                    ? 'Thực hành khắc kỷ, thiền định và lối sống chay tịnh. Đào sâu vào bản chất vấn đề bằng góc nhìn đa chiều, triết học và khoa học phức tạp. Yêu thích các hệ số vàng: 3-6-9, Fibonacci, 142857.'
                    : 'Practicing stoicism, meditation, and veganism. Delving into the essence of problems through multi-dimensional perspectives, philosophy, and complex science. Fascinated by golden ratios: 3-6-9, Fibonacci, 142857.'}
                </p>
              </div>
            </div>

            {/* Card 3 - Style (Left align) */}
            <div className="group relative w-full h-[500px] overflow-hidden flex items-center px-6 md:px-16 border border-white/10 transition-all duration-500">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=1200&auto=format&fit=crop")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-2xl">
                <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 block uppercase font-bold">
                  {language === 'vi' ? 'Thẩm Mỹ Học' : 'Aesthetics'}
                </span>
                <h3 className="font-display-lg text-4xl md:text-5xl mb-4 uppercase tracking-tighter text-[#d4af37] font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  Modern Luxury
                </h3>
                <p className="font-body-lg text-lg max-w-md text-[#F5F2E8] leading-relaxed">
                  {language === 'vi'
                    ? 'Trọng tâm thiết kế hướng đến sự sang trọng, hiện đại. Ứng dụng khéo léo chất liệu mộc mạc kết hợp không gian xanh. Tone màu chủ đạo đặc trưng: Vàng - Trắng - Đen.'
                    : 'Design focus on modern luxury. Masterfully applying rustic materials combined with green spaces. Signature color palette: Gold - White - Black.'}
                </p>
              </div>
            </div>
            
            {/* Card 4 - Mission (Right align) */}
            <div className="group relative w-full h-[500px] overflow-hidden flex items-center justify-end px-6 md:px-16 border border-white/10 transition-all duration-500">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcL3-QZeYU5l6HBvLR8xeen7bIxqExEZYR88TUOKlFiR25zM-1sJp1bbU35Rx5N3YokMbYMmerRNXdNQYRfO08dWaCLs99go9uISyFPHmfrfQ0EJgsSl87Ik-1RWr4kMdby-IhG0Dl1Q7VzN4-vScMqJTN75wL1HEGh6VR0eb2L_sGAqcJbqPEeL11uw3OA97RvbJDYmpr4eitkR0puYlQvexoZ8XZQ1yAde-yof4OJz1EmgOU_-s7r5HGS0UdBR70Iccd2Gq6s7tn")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-2xl text-right">
                <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 block uppercase font-bold">
                  {language === 'vi' ? 'Sứ Mệnh' : 'Mission'}
                </span>
                <h3 className="font-display-lg text-4xl md:text-5xl mb-4 uppercase tracking-tighter text-[#d4af37] font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  Hệ Sinh Thái Big Dream
                </h3>
                <p className="font-body-lg text-lg max-w-md ml-auto text-[#F5F2E8] leading-relaxed">
                  {language === 'vi'
                    ? 'Xây dựng mạng lưới tư duy cá nhân và hệ sinh thái sáng tạo kiến trúc với Trí tuệ Nhân tạo làm cốt lõi. Nâng tầm nghệ thuật thị giác và kiến tạo không gian không giới hạn.'
                    : 'Building a personal thinking network and architectural creative ecosystem with AI at its core. Elevating visual arts and creating boundless spaces.'}
                </p>
                <div className="mt-8 flex justify-end">
                  <a href="https://www.facebook.com/tuan.khanh.722968?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="border border-white/20 text-[#F5F2E8] font-label-caps text-xs px-8 py-4 hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300 uppercase tracking-widest bg-black/50">
                    {language === 'vi' ? 'Liên hệ công tác' : 'Get in touch'}
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

