import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative bg-obsidian-deep text-on-surface w-full overflow-x-hidden selection:bg-primary selection:text-obsidian-deep">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image 01 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/01.png" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-50 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/20 via-obsidian-deep/50 to-obsidian-deep"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center mt-12">
          <h1 className="font-display-lg text-display-lg md:text-[140px] md:leading-[140px] text-on-surface mb-6 drop-shadow-2xl">
            Big<span className="text-primary">Dream</span>
          </h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-16 max-w-4xl tracking-widest">
            Cinematic Architecture & Art Ecosystem
          </p>
          
          <div className="mt-12 flex flex-col items-center text-on-surface-variant animate-bounce">
            <span className="font-label-sm text-label-sm uppercase tracking-widest mb-2">Scroll to discover</span>
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: BIG PROMPT (SEE) */}
      <section className="relative w-full min-h-screen flex items-center py-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/C_DR_04.png" 
            alt="BIG PROMPT Background" 
            fill 
            className="object-cover opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-transparent to-obsidian-deep"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-deep via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="max-w-2xl space-y-8 glass-panel p-12 rounded-xl inner-glow">
            <div className="inline-block px-3 py-1 border border-primary text-primary font-label-sm text-label-sm uppercase tracking-widest mb-4">
              Core Workspace
            </div>
            <h2 className="font-display-lg text-display-lg text-on-surface">
              SEE <span className="text-primary">Engine</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              The AI Architectural Workspace. 
              Multimodal analysis, spatial decoding, and cinematic prompt generation across 8 specialized branches.
            </p>
            
            <div className="pt-8">
              <Link 
                href="/see" 
                className="inline-block px-8 py-4 bg-primary text-on-primary hover:bg-primary-fixed transition-colors font-bold font-label-sm text-label-sm tracking-widest uppercase rounded-lg"
              >
                Launch Workspace →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BENTO GRID cho Hệ sinh thái */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-32">
         <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/C_LOBBY_007.png" 
            alt="Ecosystem Background" 
            fill 
            className="object-cover opacity-10" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/90 to-obsidian-deep"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="text-center mb-24">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-6">
              The <span className="text-primary">Ecosystem</span>
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Architectural Pillars</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-bento-gap">
             <Link href="/model" className="block glass-panel p-12 inner-glow transition-all duration-500 group cursor-pointer rounded-xl">
                <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface group-hover:text-primary transition-colors">
                  BIG MODEL
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Premium 3D asset marketplace. Mastercrafted models optimized for cinematic rendering.
                </p>
             </Link>
             
             <Link href="/lens" className="block glass-panel p-12 inner-glow transition-all duration-500 group cursor-pointer rounded-xl">
                <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface group-hover:text-primary transition-colors">
                  BIG LENS
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Luxury material and interior scanner. Automated AI visual verification.
                </p>
             </Link>
             
             <Link href="/think" className="block glass-panel p-12 inner-glow transition-all duration-500 group cursor-pointer rounded-xl">
                <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface group-hover:text-primary transition-colors">
                  BIG THINK
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Architectural design journal. In-depth analysis of space and form.
                </p>
             </Link>
             
             <Link href="/class" className="block glass-panel p-12 inner-glow transition-all duration-500 group cursor-pointer rounded-xl">
                <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface group-hover:text-primary transition-colors">
                  BIG CLASS
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Masterclasses in AI architecture. Learn to direct the machine.
                </p>
             </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full py-16 bg-obsidian-deep border-t border-glass-border text-center flex flex-col items-center justify-center">
        <div className="mb-6">
          <span className="font-headline-md text-headline-md text-on-surface opacity-50">
            Big<span className="text-primary">Dream</span>
          </span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-8">
          Powered by SEE Engine
        </p>
      </footer>
    </main>
  );
}
