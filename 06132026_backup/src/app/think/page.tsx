import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CaretRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export default function BigThinkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <main className="pt-32 pb-32 px-4 md:px-margin-desktop max-w-[1600px] mx-auto space-y-32 flex-grow">
        <header className="max-w-3xl space-y-4">
          <h1 className="font-display-lg text-5xl md:text-7xl text-on-surface tracking-tighter">
            The Journal
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">
            Essays, explorations, and technical deep-dives into the synthesis of artificial intelligence, spatial design, and digital phenomenology.
          </p>
        </header>

        <section className="relative w-full h-[614px] md:h-[768px] rounded-xl overflow-hidden group cursor-pointer border border-glass-border">
          <div className="absolute inset-0 bg-surface-container-high">
            <img src="/assets/C_DR_04.png" alt="Featured architectural render" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end items-start h-full">
            <div className="space-y-6 max-w-4xl relative z-10">
              <span className="inline-block border border-primary text-primary px-3 py-1 rounded font-label-sm text-xs uppercase tracking-widest backdrop-blur-md bg-charcoal-surface/30">
                Spatial Synthesis
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl text-on-surface">
                The Geometry of Silence: Acoustic Architecture in the Virtual Void
              </h2>
              <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl hidden md:block">
                By simulating non-Euclidean material properties, we examine how the absence of physical limitation redefines acoustic dampening in purely digital monumental spaces.
              </p>
              <div className="pt-4">
                <button className="bg-primary text-on-primary px-8 py-3 rounded font-label-sm text-xs uppercase tracking-widest hover:bg-secondary transition-colors duration-300 active:scale-95 flex items-center gap-2">
                  Read Essay
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <div className="flex items-center justify-between border-b border-glass-border pb-4">
            <h3 className="font-headline-md text-3xl text-on-surface">Latest Exhibitions</h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs uppercase tracking-widest flex items-center gap-1">
              View Archive <CaretRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1 */}
            <article className="md:col-span-8 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl overflow-hidden hover:shadow-[inset_0_0_0_1px_var(--color-primary)] group flex flex-col md:flex-row h-full min-h-[400px] transition-all duration-400">
              <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto">
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img src="/assets/01.png" alt="Light refraction" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
                <span className="text-primary font-label-sm text-xs uppercase tracking-widest">Light Theory</span>
                <h4 className="font-headline-md text-3xl text-on-surface">Refraction & Memory</h4>
                <p className="font-body-md text-base text-on-surface-variant">
                  Analyzing the emotional impact of volumetric lighting algorithms in artificially constructed twilight scenarios. How do we code melancholy?
                </p>
                <div className="pt-4 mt-auto">
                  <button className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs uppercase tracking-widest flex items-center gap-1">
                    Explore <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="md:col-span-4 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl overflow-hidden hover:shadow-[inset_0_0_0_1px_var(--color-primary)] group flex flex-col h-full min-h-[400px] transition-all duration-400">
              <div className="w-full h-48 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img src="/assets/02.png" alt="Material study" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <span className="text-primary font-label-sm text-xs uppercase tracking-widest">Materiality</span>
                <h4 className="font-headline-md text-2xl leading-8 text-on-surface">The Obsidian Protocol</h4>
                <p className="font-body-md text-base text-on-surface-variant line-clamp-3">
                  A study on creating virtual textures that imply impossible density. When weight is an illusion, how do we anchor the user's perception?
                </p>
              </div>
            </article>

            {/* Card 3 */}
            <article className="md:col-span-4 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl overflow-hidden hover:shadow-[inset_0_0_0_1px_var(--color-primary)] group flex flex-col h-full min-h-[400px] transition-all duration-400">
              <div className="w-full h-48 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img src="/assets/03.png" alt="Structural framework" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <span className="text-primary font-label-sm text-xs uppercase tracking-widest">Frameworks</span>
                <h4 className="font-headline-md text-2xl leading-8 text-on-surface">Structural Logic in AI</h4>
                <p className="font-body-md text-base text-on-surface-variant line-clamp-3">
                  Mapping neural network pathways using architectural blueprints. Translating data flow into spatial corridors for intuitive navigation.
                </p>
              </div>
            </article>

            {/* Card 4 */}
            <article className="md:col-span-8 bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl overflow-hidden hover:shadow-[inset_0_0_0_1px_var(--color-primary)] group flex flex-col md:flex-row h-full min-h-[400px] transition-all duration-400">
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4 order-2 md:order-1">
                <span className="text-primary font-label-sm text-xs uppercase tracking-widest">Digital Phenomenology</span>
                <h4 className="font-headline-md text-3xl text-on-surface">Atmosphere without Air</h4>
                <p className="font-body-md text-base text-on-surface-variant">
                  Constructing 'mood' through particle systems and focal depth blur. An exploration of the visceral reaction to engineered environmental static.
                </p>
                <div className="pt-4 mt-auto">
                  <button className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs uppercase tracking-widest flex items-center gap-1">
                    Explore <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto order-1 md:order-2">
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img src="/assets/C_LOBBY_007.png" alt="Atmospheric render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </article>
          </div>
        </section>

        <section className="bg-surface-container border border-glass-border rounded-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="space-y-4 max-w-xl z-10">
            <h3 className="font-headline-md text-3xl text-on-surface">Join the Synthesis</h3>
            <p className="font-body-md text-base text-on-surface-variant">
              Receive irregular transmissions regarding our latest architectural models, essays on digital materiality, and early access to generative tools.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 z-10">
            <input className="bg-surface-dim border border-glass-border rounded px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:bg-charcoal-surface transition-all w-full md:w-72 placeholder:text-on-surface-variant/50" placeholder="ENTER EMAIL" type="email" />
            <button className="bg-transparent border border-glass-border text-on-surface px-8 py-3 rounded font-label-sm text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 active:scale-95 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
