"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="relative bg-[#050505] text-on-surface w-full overflow-hidden selection:bg-primary selection:text-[#050505]">
      
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION — Fullscreen cinematic video (Quixel-style)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            poster="/video/hero-poster.jpg"
          >
            <source src="/video/Cinematic_Animation_From_Image.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay gradient — bottom heavier for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/20 to-[#050505]/90" />
          {/* Subtle vignette */}
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px 60px rgba(5,5,5,0.6)' }} />
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center mt-12">
          {/* Tagline */}
          <p className="font-label-sm text-xs md:text-sm text-white/80 max-w-2xl mx-auto mb-4 uppercase tracking-[0.3em] font-bold opacity-0 animate-[fadeInUp_1s_0.4s_forwards]">
            {language === 'vi' ? 'Hệ sinh thái kiến trúc & nghệ thuật điện ảnh' : 'The Cinematic Architecture & Art Ecosystem'}
          </p>
          
          {/* Title */}
          <h1 className="font-display-lg text-6xl md:text-8xl lg:text-[140px] text-primary leading-[0.85] tracking-tight mb-12 opacity-0 animate-[fadeInUp_1s_0.6s_forwards] drop-shadow-[0_4px_60px_rgba(242,202,80,0.2)] font-black">
            BIGDREAM
          </h1>

          {/* CTA Buttons */}
          <div className="opacity-0 animate-[fadeInUp_1s_0.8s_forwards] flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#explore"
              id="hero-cta"
              className="inline-flex items-center justify-center min-w-[240px] px-8 py-4 rounded-sm bg-primary hover:bg-primary-fixed text-on-primary font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,202,80,0.3)] hover:scale-105 active:scale-95"
            >
              {language === 'vi' ? 'Khám phá hệ sinh thái' : 'Explore ecosystem'}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center min-w-[200px] px-8 py-4 rounded-sm bg-transparent border border-white/30 hover:border-white text-white font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95"
            >
              {language === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
            </Link>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-[fadeInUp_1s_1.2s_forwards]">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EXPLORE SECTION — Feature Cards
          ═══════════════════════════════════════════════════════════════ */}
      <section id="explore" className="relative z-20 py-32 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32 flex flex-col items-center">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-white mb-6">
            {language === 'vi' ? 'Tất cả trong một nền tảng' : 'All in one platform'}
          </h2>
          <div className="w-24 h-px bg-white/20" />
        </div>

        {/* Cards Stack */}
        <div className="flex flex-col gap-20 md:gap-32">
          
          {/* Card: SEE */}
          <Link href="/see" className="group block w-full h-[400px] md:h-[500px] relative overflow-hidden glass-panel transform hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.1)] rounded-none">
            <Image src="https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=1600&auto=format&fit=crop" alt="SEE" fill className="object-cover opacity-60 group-hover:opacity-80 transition-all group-hover:scale-105 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian-deep via-obsidian-deep/80 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-primary/10 group-hover:ring-primary/50 transition-all z-10" />
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-start text-left z-20 w-full md:w-1/2">
              <span className="font-label-caps text-xs text-on-surface mb-4">{language === 'vi' ? 'Không gian làm việc kiến trúc AI tối thượng.' : 'The Ultimate AI Architectural Workspace.'}</span>
              <h3 className="font-headline-lg text-6xl md:text-7xl text-primary font-bold mb-4 drop-shadow-md">SEE</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-md">{language === 'vi' ? 'Nền tảng tạo prompt, sinh ảnh và biên tập không gian kiến trúc thông minh. Biến ý tưởng thành hiện thực với sức mạnh của trí tuệ nhân tạo.' : 'Intelligent prompt generation, image synthesis, and architectural editing platform. Turn ideas into reality with AI.'}</p>
            </div>
          </Link>

          {/* Card: LENS */}
          <Link href="/lens" className="group block w-full h-[400px] md:h-[500px] relative overflow-hidden glass-panel transform hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.1)] rounded-none">
            <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop" alt="LENS" fill className="object-cover opacity-60 group-hover:opacity-80 transition-all group-hover:scale-105 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-l from-obsidian-deep via-obsidian-deep/80 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-primary/10 group-hover:ring-primary/50 transition-all z-10" />
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-end text-right z-20 ml-auto w-full md:w-1/2">
              <span className="font-label-caps text-xs text-on-surface mb-4">{language === 'vi' ? 'Quét' : 'Scan'}</span>
              <h3 className="font-headline-lg text-6xl md:text-7xl text-primary font-bold mb-4 drop-shadow-md">LENS</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-md">{language === 'vi' ? 'Máy quét nội thất & vật liệu cao cấp. Số hóa thế giới thực với độ chính xác tuyệt đối.' : 'Luxury material & interior scanner. Digitize the real world with absolute precision.'}</p>
            </div>
          </Link>

          {/* Card: MODEL */}
          <Link href="/model" className="group block w-full h-[400px] md:h-[500px] relative overflow-hidden glass-panel transform hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.1)] rounded-none">
            <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop" alt="MODEL" fill className="object-cover opacity-60 group-hover:opacity-80 transition-all group-hover:scale-105 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian-deep via-obsidian-deep/80 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-primary/10 group-hover:ring-primary/50 transition-all z-10" />
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-start text-left z-20 w-full md:w-1/2">
              <span className="font-label-caps text-xs text-on-surface mb-4">{language === 'vi' ? 'Khám phá' : 'Discover'}</span>
              <h3 className="font-headline-lg text-6xl md:text-7xl text-primary font-bold mb-4 drop-shadow-md">MODEL</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-md">{language === 'vi' ? 'Tài nguyên 3D cao cấp & hình học tinh xảo. Thư viện vật thể kiến trúc được chế tác bởi AI.' : 'Premium 3D assets & mastercrafted geometry. AI-crafted architectural object library.'}</p>
            </div>
          </Link>

          {/* Card: CLASS */}
          <Link href="/class" className="group block w-full h-[400px] md:h-[500px] relative overflow-hidden glass-panel transform hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.1)] rounded-none">
            <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop" alt="CLASS" fill className="object-cover opacity-60 group-hover:opacity-80 transition-all group-hover:scale-105 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-l from-obsidian-deep via-obsidian-deep/80 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-primary/10 group-hover:ring-primary/50 transition-all z-10" />
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-end text-right z-20 ml-auto w-full md:w-1/2">
              <span className="font-label-caps text-xs text-on-surface mb-4">{language === 'vi' ? 'Học tập' : 'Learn'}</span>
              <h3 className="font-headline-lg text-6xl md:text-7xl text-primary font-bold mb-4 drop-shadow-md">CLASS</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-md">{language === 'vi' ? 'Khóa học chuyên sâu về kiến trúc AI. Làm chủ các công cụ thiết kế tương lai.' : 'Masterclasses in AI architecture. Master the design tools of the future.'}</p>
            </div>
          </Link>

          {/* Card: THINK */}
          <Link href="/think" className="group block w-full h-[400px] md:h-[500px] relative overflow-hidden glass-panel transform hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.1)] rounded-none">
            <Image src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop" alt="THINK" fill className="object-cover opacity-60 group-hover:opacity-80 transition-all group-hover:scale-105 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian-deep via-obsidian-deep/80 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-primary/10 group-hover:ring-primary/50 transition-all z-10" />
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-start text-left z-20 w-full md:w-1/2">
              <span className="font-label-caps text-xs text-on-surface mb-4">{language === 'vi' ? 'Đọc' : 'Read'}</span>
              <h3 className="font-headline-lg text-6xl md:text-7xl text-primary font-bold mb-4 drop-shadow-md">THINK</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-md">{language === 'vi' ? 'Tạp chí thiết kế kiến trúc. Những góc nhìn mới về sự giao thoa giữa công nghệ và không gian.' : 'Architectural design journal. New perspectives on the intersection of tech and space.'}</p>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
