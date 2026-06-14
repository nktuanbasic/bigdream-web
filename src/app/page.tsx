import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          {/* Title */}
          <h1 className="font-display-lg text-7xl md:text-9xl lg:text-[180px] text-white leading-[0.85] tracking-tight mb-6 opacity-0 animate-[fadeInUp_1s_0.4s_forwards] drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)] font-black">
            BIG<span className="text-primary italic">DREAM</span>
          </h1>

          {/* Tagline */}
          <p className="font-body-lg text-sm md:text-lg text-white/60 max-w-2xl mx-auto mb-12 uppercase tracking-[0.3em] font-light opacity-0 animate-[fadeInUp_1s_0.6s_forwards]">
            The Cinematic Architecture &amp; Art Ecosystem
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-[fadeInUp_1s_0.8s_forwards]">
            <Link
              href="#explore"
              id="hero-cta"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-md bg-primary hover:bg-primary-fixed text-[#050505] font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(242,202,80,0.4)] hover:scale-105 active:scale-95"
            >
              Tìm hiểu thêm
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
      <section id="explore" className="relative z-20 py-24 md:py-32 px-6 md:px-12 max-w-[1800px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-4">Explore the ecosystem</p>
          <h2 className="font-headline-lg text-4xl md:text-6xl text-white">
            Tất cả trong <span className="text-primary italic">một nền tảng</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Card: MODEL */}
          <Link href="/model" className="group block h-[450px] relative rounded-md overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)]">
            <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop" alt="Big Model" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Discover</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Model</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Premium 3D assets & mastercrafted geometry.</p>
            </div>
          </Link>

          {/* Card: LENS */}
          <Link href="/lens" className="group block h-[450px] relative rounded-md overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)] md:mt-12">
            <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" alt="Big Lens" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Scan</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Lens</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Luxury material & interior scanner.</p>
            </div>
          </Link>

          {/* Card: SEE */}
          <Link href="/see" className="group block h-[450px] relative rounded-md overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)]">
            <Image src="https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=800&auto=format&fit=crop" alt="Big SEE" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-primary/30 group-hover:ring-primary/80 transition-all rounded-md z-10" />
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full z-20">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Core</span>
              <h3 className="font-headline-lg text-5xl text-on-surface mb-3 group-hover:text-primary transition-colors">SEE</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">The Ultimate AI Architectural Workspace.</p>
            </div>
          </Link>

          {/* Card: CLASS */}
          <Link href="/class" className="group block h-[450px] relative rounded-md overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)] md:mt-12">
            <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Big Class" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Learn</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Class</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Masterclasses in AI architecture.</p>
            </div>
          </Link>

          {/* Card: THINK */}
          <Link href="/think" className="group block h-[450px] relative rounded-md overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)]">
            <Image src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop" alt="Big Think" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Read</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Think</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Architectural design journal.</p>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
