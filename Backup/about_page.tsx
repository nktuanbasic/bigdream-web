import Link from 'next/link';
import Image from 'next/image';
import { Compass, Drop, CircleHalf } from '@phosphor-icons/react/dist/ssr';

export default function BigAboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <main className="flex-grow pt-[100px] pb-32">
        {/* Cinematic Hero Section */}
        <section className="px-4 md:px-margin-desktop py-16 md:py-32 flex flex-col md:flex-row gap-6 items-center min-h-[819px]">
          <div className="w-full md:w-1/2 flex flex-col gap-6 z-10">
            <h1 className="font-display-lg text-5xl md:text-7xl text-on-surface leading-tight">
              Architecting the<br/>
              <span className="text-primary italic">BIG DREAM</span>
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-xl">
              I design immersive digital environments where architecture meets artistry. Through the synthesis of advanced AI models and bento grid minimalism, I construct spaces that are not merely seen, but experienced. The Big Dream project is a testament to sophisticated, atmospheric perspective.
            </p>
            <div className="pt-8 flex gap-4">
              <button className="bg-primary text-on-primary font-label-sm text-xs uppercase tracking-widest px-8 py-4 rounded hover:opacity-90 active:scale-[0.98] transition-all">
                Explore the Vision
              </button>
              <button className="border border-glass-border text-on-surface font-label-sm text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-surface-container transition-all">
                Contact
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[500px] md:h-[700px] relative rounded-xl overflow-hidden border border-glass-border">
            <img src="/assets/C_DR_04.png" alt="Cinematic Portrait" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-transparent to-transparent opacity-90"></div>
          </div>
        </section>

        {/* Core Competencies Bento Grid */}
        <section className="px-4 md:px-margin-desktop py-24 max-w-[1920px] mx-auto">
          <h2 className="font-headline-lg text-4xl text-on-surface mb-16 text-center">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)]">
            {/* Competency 1 */}
            <div className="md:col-span-8 md:row-span-2 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-10 flex flex-col justify-between relative overflow-hidden group hover:shadow-[inset_0_0_0_1px_rgba(242,202,80,0.2)] hover:bg-charcoal-surface/80 transition-all duration-300">
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <img src="/assets/03.png" alt="Architecture" className="w-full h-full object-cover mix-blend-overlay" />
              </div>
              <div className="z-10 flex flex-col gap-4">
                <Compass size={40} className="text-primary" />
                <h3 className="font-headline-md text-3xl text-on-surface">Spatial Artistry & Layout</h3>
                <p className="font-body-md text-base text-on-surface-variant max-w-md">Engineering layouts governed by rigid Bento grid systems. Structuring disparate pieces of content into a cohesive, structural masonry that feels less like a tool and more like an immersive environment.</p>
              </div>
              <div className="z-10 mt-8 flex flex-wrap gap-2">
                <span className="px-3 py-1 border border-glass-border rounded-full font-label-sm text-xs text-on-surface-variant">Grid Systems</span>
                <span className="px-3 py-1 border border-primary text-primary rounded-full font-label-sm text-xs">Bento Logic</span>
              </div>
            </div>

            {/* Competency 2 */}
            <div className="md:col-span-4 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-8 flex flex-col justify-between hover:shadow-[inset_0_0_0_1px_rgba(242,202,80,0.2)] hover:bg-charcoal-surface/80 transition-all duration-300">
              <Drop size={32} className="text-primary mb-4" />
              <h3 className="font-headline-md text-2xl text-on-surface">Glassmorphism</h3>
              <p className="font-body-md text-base text-on-surface-variant mt-2">Achieving depth through translucency rather than traditional shadows, using frosted overlays and tonal stacking.</p>
            </div>

            {/* Competency 3 */}
            <div className="md:col-span-4 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-8 flex flex-col justify-between hover:shadow-[inset_0_0_0_1px_rgba(242,202,80,0.2)] hover:bg-charcoal-surface/80 transition-all duration-300">
              <CircleHalf size={32} className="text-primary mb-4" />
              <h3 className="font-headline-md text-2xl text-on-surface">Tonal Stacking</h3>
              <p className="font-body-md text-base text-on-surface-variant mt-2">Utilizing deep obsidian backgrounds juxtaposed with lighter surface containers to create a sense of physical elevation.</p>
            </div>

            {/* Competency 4 */}
            <div className="md:col-span-12 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-[inset_0_0_0_1px_rgba(242,202,80,0.2)] hover:bg-charcoal-surface/80 transition-all duration-300">
              <div className="flex-1">
                <h3 className="font-headline-md text-3xl text-on-surface mb-4">Visionary AI Integration</h3>
                <p className="font-body-lg text-lg text-on-surface-variant">Seamlessly weaving artificial intelligence capabilities into the fabric of the digital architecture, creating interfaces that anticipate and adapt.</p>
              </div>
              <button className="border border-glass-border text-on-surface font-label-sm text-xs uppercase tracking-widest px-8 py-4 rounded hover:border-primary hover:text-primary transition-all whitespace-nowrap">
                View Case Studies
              </button>
            </div>
          </div>
        </section>

        {/* Get In Touch Section */}
        <section className="px-4 md:px-margin-desktop py-24 border-t border-glass-border relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
            <h2 className="font-display-lg text-4xl md:text-6xl text-on-surface">Initiate Contact</h2>
            <p className="font-body-lg text-lg text-on-surface-variant">Ready to collaborate on a visionary project? Step into the studio.</p>
            <div className="w-full max-w-md flex flex-col gap-4 mt-8">
              <input 
                className="w-full bg-obsidian-deep border border-glass-border rounded px-6 py-4 font-label-sm text-xs text-on-surface uppercase tracking-widest focus:outline-none focus:border-primary focus:bg-charcoal-surface/80 transition-all placeholder:text-on-surface-variant/50" 
                placeholder="ENTER YOUR TRANSMISSION (EMAIL)" 
                type="email"
              />
              <button className="w-full bg-primary text-on-primary font-label-sm text-xs uppercase tracking-widest px-6 py-4 rounded hover:opacity-90 active:scale-[0.98] transition-all">
                Send Signal
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
