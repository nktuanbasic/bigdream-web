"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

type FeatureCard = {
  href: string;
  title: string;
  alt: string;
  image: string;
  tag: { vi: string; en: string };
  desc: { vi: string; en: string };
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    href: '/see',
    title: 'SEE',
    alt: 'Big SEE',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=800&auto=format&fit=crop',
    tag: { vi: 'Cốt lõi', en: 'Core' },
    desc: { vi: 'Không gian làm việc Kiến trúc AI Tối thượng.', en: 'The Ultimate AI Architectural Workspace.' },
  },
  {
    href: '/lens',
    title: 'LENS',
    alt: 'Big Lens',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    tag: { vi: 'Quét', en: 'Scan' },
    desc: { vi: 'Máy quét nội thất & vật liệu cao cấp.', en: 'Luxury material & interior scanner.' },
  },
  {
    href: '/model',
    title: 'MODEL',
    alt: 'Big Model',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
    tag: { vi: 'Khám phá', en: 'Discover' },
    desc: { vi: 'Tài nguyên 3D cao cấp & hình học tinh xảo.', en: 'Premium 3D assets & mastercrafted geometry.' },
  },
  {
    href: '/class',
    title: 'CLASS',
    alt: 'Big Class',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    tag: { vi: 'Học tập', en: 'Learn' },
    desc: { vi: 'Khóa học chuyên sâu về kiến trúc AI.', en: 'Masterclasses in AI architecture.' },
  },
  {
    href: '/think',
    title: 'THINK',
    alt: 'Big Think',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    tag: { vi: 'Đọc', en: 'Read' },
    desc: { vi: 'Tạp chí thiết kế kiến trúc.', en: 'Architectural design journal.' },
  },
];

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="relative bg-obsidian-deep text-on-surface w-full overflow-hidden">
      
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
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/50 via-obsidian-deep/20 to-obsidian-deep" />
          {/* Subtle vignette */}
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px 60px rgba(5,5,5,0.6)' }} />
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          {/* Title */}
          <h1 className="font-display-lg text-7xl md:text-9xl lg:text-[180px] text-on-surface leading-[0.85] tracking-tight mb-6 opacity-0 animate-[fadeInUp_1s_0.4s_forwards] drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)] font-black text-balance">
            BIG<span className="text-primary">DREAM</span>
          </h1>

          {/* Tagline */}
          <p className="font-body-lg text-xs md:text-base text-on-surface-variant max-w-2xl mx-auto mb-12 uppercase tracking-[0.35em] font-light opacity-0 animate-[fadeInUp_1s_0.6s_forwards] text-balance">
            {language === 'vi' ? 'Hệ sinh thái Kiến trúc & Nghệ thuật Điện ảnh' : 'The Cinematic Architecture & Art Ecosystem'}
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-[fadeInUp_1s_0.8s_forwards]">
            <Link
              href="#explore"
              id="hero-cta"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-md bg-primary hover:bg-primary-fixed text-on-primary font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(242,202,80,0.4)] hover:scale-105 active:scale-95"
            >
              {language === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-deep to-transparent z-10" />
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-[fadeInUp_1s_1.2s_forwards]">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EXPLORE SECTION — Feature Cards
          ═══════════════════════════════════════════════════════════════ */}
      <section id="explore" className="relative z-20 py-24 md:py-32 px-6 md:px-12 max-w-[1800px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-4">
            {language === 'vi' ? 'Khám phá hệ sinh thái' : 'Explore the ecosystem'}
          </p>
          <h2 className="font-headline-lg text-4xl md:text-6xl text-on-surface text-balance">
            {language === 'vi' ? (
              <>Tất cả trong <span className="text-primary">một nền tảng</span></>
            ) : (
              <>All in <span className="text-primary">one platform</span></>
            )}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {FEATURE_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block h-[420px] lg:h-[450px] relative rounded-lg overflow-hidden glass-panel transform hover:-translate-y-3 transition-all duration-500 hover:shadow-[0_24px_50px_rgba(242,202,80,0.15)]"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover opacity-50 group-hover:opacity-75 transition-all group-hover:scale-110 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/40 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 group-hover:ring-primary/70 transition-all rounded-lg z-10" />
              <div className="absolute bottom-0 left-0 w-full p-7 flex flex-col justify-end h-full z-20">
                <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-3 group-hover:translate-y-0 duration-500">
                  {language === 'vi' ? card.tag.vi : card.tag.en}
                </span>
                <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="font-body-md text-sm leading-relaxed text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {language === 'vi' ? card.desc.vi : card.desc.en}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
