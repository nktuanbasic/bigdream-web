import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative bg-obsidian-deep text-on-surface w-full min-h-screen overflow-hidden selection:bg-primary selection:text-obsidian-deep">
      
      {/* Background Cinematic Video/Image */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop" 
          alt="Cinematic Background" 
          fill 
          className="object-cover opacity-40 scale-105 animate-[pulse_30s_ease-in-out_infinite_alternate]" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/30 via-obsidian-deep/60 to-obsidian-deep"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div className="text-center">
          <p className="font-label-sm text-sm text-primary uppercase tracking-[0.3em] mb-6 animate-fade-in-up">The Ecosystem</p>
          <h1 className="font-display-lg text-6xl md:text-9xl lg:text-[160px] text-on-surface leading-none mb-8 drop-shadow-2xl tracking-tight">
            Big<span className="text-primary italic">Dream</span>
          </h1>
          <p className="font-body-lg text-lg md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
            A state-of-the-art cinematic architecture & art ecosystem. Reimagining spatial design through AI.
          </p>
        </div>
      </div>

      {/* Floating Cards Section */}
      <div className="relative z-20 -mt-32 pb-32 px-4 md:px-12 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Card: MODEL */}
          <Link href="/model" className="group block h-[450px] relative rounded-2xl overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)]">
            <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop" alt="Big Model" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Discover</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Model</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Premium 3D assets & mastercrafted geometry.</p>
            </div>
          </Link>

          {/* Card: LENS */}
          <Link href="/lens" className="group block h-[450px] relative rounded-2xl overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)] md:mt-12">
            <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" alt="Big Lens" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Scan</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Lens</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Luxury material & interior scanner.</p>
            </div>
          </Link>

          {/* Card: SEE */}
          <Link href="/see" className="group block h-[450px] relative rounded-2xl overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)]">
            <Image src="https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=800&auto=format&fit=crop" alt="Big SEE" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-transparent"></div>
            <div className="absolute inset-0 ring-1 ring-primary/30 group-hover:ring-primary/80 transition-all rounded-2xl z-10"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full z-20">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Core</span>
              <h3 className="font-headline-lg text-5xl text-on-surface mb-3 group-hover:text-primary transition-colors">SEE</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">The Ultimate AI Architectural Workspace.</p>
            </div>
          </Link>

          {/* Card: CLASS */}
          <Link href="/class" className="group block h-[450px] relative rounded-2xl overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)] md:mt-12">
            <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Big Class" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Learn</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Class</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Masterclasses in AI architecture.</p>
            </div>
          </Link>

          {/* Card: THINK */}
          <Link href="/think" className="group block h-[450px] relative rounded-2xl overflow-hidden glass-panel transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(242,202,80,0.15)]">
            <Image src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop" alt="Big Think" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">Read</span>
              <h3 className="font-headline-lg text-4xl text-on-surface mb-3 group-hover:text-primary transition-colors">Think</h3>
              <p className="font-body-md text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500">Architectural design journal.</p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}
