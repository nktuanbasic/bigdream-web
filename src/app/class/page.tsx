import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle, ArrowRight, ArrowLeft, Clock as Schedule, SelectionBackground as Texture, Compass as Architecture } from '@phosphor-icons/react/dist/ssr';

export default function BigClassPage() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <main className="flex-grow pt-[80px]">
        {/* Hero: Featured Masterclass */}
        <section className="relative w-full h-[819px] min-h-[600px] flex items-end pb-24 px-4 md:px-margin-desktop overflow-hidden border-b border-glass-border">
          <div className="absolute inset-0 z-0">
            <img src="/assets/C_DR_04.png" alt="Hero Background" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Featured Masterclass</span>
            </div>
            <h1 className="font-display-lg text-5xl md:text-7xl text-on-surface mb-6 md:mb-8 drop-shadow-lg">The Art of Light</h1>
            <p className="font-body-lg text-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
              Elevate your architectural visualization. This intensive 8-week module dives deep into cinematic lighting techniques, volumetric scattering, and material authoring using industry-standard rendering engines.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button className="bg-primary text-on-primary font-label-sm text-xs uppercase tracking-widest px-8 py-4 rounded hover:opacity-90 transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(242,202,80,0.2)]">
                Enroll Now
              </button>
              <button className="border border-glass-border text-on-surface font-label-sm text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-surface-container transition-all duration-300 active:scale-95 flex items-center gap-2">
                <PlayCircle size={18} />
                View Trailer
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid: Modules & Curriculum */}
        <section className="py-[120px] px-4 md:px-margin-desktop max-w-[1920px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-4xl text-on-surface mb-2">Curriculum</h2>
              <p className="font-body-md text-base text-on-surface-variant">Mastering the digital canvas, module by module.</p>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="p-3 border border-glass-border rounded-full hover:border-primary transition-colors text-on-surface-variant hover:text-primary flex items-center justify-center">
                <ArrowLeft size={20} />
              </button>
              <button className="p-3 border border-glass-border rounded-full hover:border-primary transition-colors text-on-surface-variant hover:text-primary flex items-center justify-center">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-12 auto-rows-[minmax(320px,auto)] gap-6">
            {/* Card 1 */}
            <article className="col-span-4 md:col-span-6 row-span-2 group relative overflow-hidden rounded-xl bg-charcoal-surface/60 backdrop-blur-md border border-glass-border transition-all duration-500 hover:border-primary/40 flex flex-col">
              <div className="absolute inset-0 border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none mix-blend-overlay"></div>
              <div className="relative h-[300px] w-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-obsidian-deep/60 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
                <img src="/assets/C_LOBBY_007.png" alt="Module 1" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <span className="bg-obsidian-deep/80 backdrop-blur-md border border-glass-border text-on-surface font-label-sm text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">Module 01</span>
                  <span className="bg-obsidian-deep/80 backdrop-blur-md border border-primary/50 text-primary font-label-sm text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">Intermediate</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between relative z-20">
                <div>
                  <h3 className="font-headline-md text-3xl text-on-surface mb-4">Mastering Corona Render</h3>
                  <p className="font-body-md text-base text-on-surface-variant line-clamp-3">Understand the physics of light, physical cameras, and the intricacies of the Corona rendering engine to produce photorealistic architectural imagery.</p>
                </div>
                <div className="mt-8 flex items-center justify-between pt-6 border-t border-glass-border">
                  <div className="flex items-center gap-4">
                    <Schedule size={20} className="text-on-surface-variant" />
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">4 Weeks</span>
                  </div>
                  <button className="text-primary font-label-sm text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="col-span-4 md:col-span-3 row-span-1 group relative overflow-hidden rounded-xl bg-charcoal-surface/60 backdrop-blur-md border border-glass-border transition-all duration-500 hover:border-glass-border hover:bg-surface-container-high flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <span className="border border-glass-border text-on-surface-variant font-label-sm text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">Module 02</span>
                  <Texture size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-headline-md text-2xl leading-8 text-on-surface mb-3">Material Authorship</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 flex-grow">Creating hyper-realistic PBR materials from scratch using Quixel Mixer and node-based workflows.</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-glass-border">
                    <img src="/assets/01.png" alt="Instructor" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface uppercase tracking-tighter">E. Vance</span>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="col-span-4 md:col-span-3 row-span-1 group relative overflow-hidden rounded-xl bg-charcoal-surface/60 backdrop-blur-md border border-glass-border transition-all duration-500 hover:border-glass-border hover:bg-surface-container-high flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <span className="border border-glass-border text-on-surface-variant font-label-sm text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">Module 03</span>
                  <Architecture size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-headline-md text-2xl leading-8 text-on-surface mb-3">Spatial Composition</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 flex-grow">Advanced camera placement, focal lengths, and framing techniques for compelling narratives.</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-glass-border">
                    <img src="/assets/02.png" alt="Instructor" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface uppercase tracking-tighter">J. Sterling</span>
                </div>
              </div>
            </article>

            {/* Card 4 */}
            <article className="col-span-4 md:col-span-6 row-span-1 group relative overflow-hidden rounded-xl bg-charcoal-surface/60 backdrop-blur-md border border-glass-border transition-all duration-500 hover:border-primary/40 flex flex-col md:flex-row">
              <div className="relative md:w-1/2 h-[200px] md:h-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-obsidian-deep/50 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
                <img src="/assets/03.png" alt="Atmospherics" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                  <span className="border border-glass-border text-on-surface-variant font-label-sm text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">Module 04</span>
                  <span className="border border-primary/50 text-primary font-label-sm text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">Advanced</span>
                </div>
                <h3 className="font-headline-md text-3xl text-on-surface mb-3">Atmospherics</h3>
                <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">Mastering fog, depth of field, and post-processing in Nuke to elevate raw renders into cinematic masterpieces.</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
