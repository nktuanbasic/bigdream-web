import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Download, Stack, ShoppingCart, Cube, CaretDown, MagnifyingGlass, Faders } from '@phosphor-icons/react/dist/ssr';

export default function BigModelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <header className="mt-[100px] px-4 md:px-margin-desktop py-16 flex flex-col items-center justify-center relative w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-charcoal-surface/40 via-obsidian-deep to-obsidian-deep pointer-events-none"></div>
        <h1 className="font-display-lg text-5xl md:text-7xl text-on-surface text-center z-10 max-w-4xl leading-tight mb-8">
            Architectural Vision <br/>
            <span className="text-primary italic font-light text-opacity-90">Rendered in Precision</span>
        </h1>
        <div className="w-full max-w-2xl z-10 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            </div>
            <input 
              className="w-full bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
              placeholder="Search premium models, textures, and lighting..." 
              type="text"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <button className="bg-surface-variant text-on-surface px-4 py-1.5 rounded text-sm hover:text-primary transition-colors border border-glass-border">
                    <Faders size={20} />
                </button>
            </div>
        </div>
      </header>

      <main className="flex-grow px-4 md:px-margin-desktop pb-24 flex flex-col md:flex-row gap-6 md:gap-gutter max-w-[1600px] mx-auto w-full z-10">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-[120px]">
            <h3 className="font-headline-md text-3xl text-on-surface mb-6 border-b border-glass-border pb-4">Collections</h3>
            <ul className="space-y-2 font-label-sm text-label-sm uppercase tracking-widest">
              <li>
                <button className="w-full text-left px-4 py-3 rounded bg-charcoal-surface/40 border border-primary text-primary transition-all duration-200 flex justify-between items-center group">
                  <span>Furniture</span>
                  <ArrowRight size={16} className="opacity-100 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
              {['Materials & Textures', 'Lighting Fixtures', 'Decor & Accents', 'Vegetation'].map((item) => (
                <li key={item}>
                  <button className="w-full text-left px-4 py-3 rounded text-on-surface-variant hover:bg-charcoal-surface/60 hover:text-on-surface transition-all duration-200 border border-transparent hover:border-glass-border flex justify-between items-center group">
                    <span>{item}</span>
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-4">Format Filters</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full border border-glass-border text-[11px] text-on-surface-variant hover:border-primary hover:text-primary cursor-pointer transition-colors bg-charcoal-surface/30">.OBJ</span>
                <span className="px-3 py-1 rounded-full border border-primary text-[11px] text-primary cursor-pointer transition-colors bg-primary/10">.FBX</span>
                <span className="px-3 py-1 rounded-full border border-glass-border text-[11px] text-on-surface-variant hover:border-primary hover:text-primary cursor-pointer transition-colors bg-charcoal-surface/30">.BLEND</span>
                <span className="px-3 py-1 rounded-full border border-glass-border text-[11px] text-on-surface-variant hover:border-primary hover:text-primary cursor-pointer transition-colors bg-charcoal-surface/30">.MAX</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-body-lg text-body-lg text-on-surface-variant">Showing <span className="text-on-surface font-semibold">2,410</span> high-fidelity models</h2>
            <button className="flex items-center gap-2 text-sm text-on-surface hover:text-primary transition-colors">
              <span>Sort by: Trending</span>
              <CaretDown size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[340px]">
            {/* Card 1 */}
            <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-lg overflow-hidden relative group hover:shadow-[inset_0_0_0_1px_var(--color-primary)] transition-all duration-500 cursor-pointer col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 flex flex-col">
              <div className="relative flex-grow overflow-hidden">
                <img src="/assets/C_DR_04.png" alt="Luxury Lounge Chair Model" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-obsidian-deep/80 backdrop-blur border border-glass-border px-2 py-1 rounded text-[10px] uppercase tracking-wider text-on-surface">Pro</span>
                  <span className="bg-obsidian-deep/80 backdrop-blur border border-glass-border px-2 py-1 rounded text-[10px] uppercase tracking-wider text-primary flex items-center gap-1">
                    <CheckCircle size={16} weight="fill" className="text-primary" />Geometry
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 w-full p-6 flex justify-between items-end bg-gradient-to-t from-obsidian-deep via-obsidian-deep/90 to-transparent pt-12">
                <div>
                  <p className="font-label-sm text-label-sm text-primary mb-1 uppercase tracking-widest">Furniture</p>
                  <h3 className="font-headline-md text-3xl text-on-surface">Executive Leather Lounge</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">By Studio Arca • 1.2M Polygons</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-headline-md text-2xl text-primary">$45.00</span>
                  </div>
                  <button className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-obsidian-deep transition-colors duration-300 h-10 w-10 rounded flex items-center justify-center">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-lg overflow-hidden relative group hover:shadow-[inset_0_0_0_1px_var(--color-primary)] transition-all duration-500 cursor-pointer flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <img src="/assets/01.png" alt="Modern Chandelier Model" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-obsidian-deep/80 backdrop-blur border border-glass-border px-2 py-1 rounded text-[10px] uppercase tracking-wider text-on-surface">Free</span>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-body-lg text-body-lg text-on-surface font-semibold truncate">Prism Cascade Chandelier</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">Lighting</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-glass-border">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Free</span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-lg overflow-hidden relative group hover:shadow-[inset_0_0_0_1px_var(--color-primary)] transition-all duration-500 cursor-pointer flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <img src="/assets/C_LOBBY_007.png" alt="Marble Texture Material" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-obsidian-deep/80 backdrop-blur border border-glass-border px-2 py-1 rounded text-[10px] uppercase tracking-wider text-primary flex items-center gap-1">
                    <Stack size={16} /> 8K PBR
                  </span>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-body-lg text-body-lg text-on-surface font-semibold truncate">Calacatta Gold Noir</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">Material / Marble</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-glass-border">
                  <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">$12.00</span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-lg overflow-hidden relative group hover:shadow-[inset_0_0_0_1px_var(--color-primary)] transition-all duration-500 cursor-pointer col-span-1 sm:col-span-2 lg:col-span-1 row-span-2 flex flex-col">
              <div className="relative flex-grow overflow-hidden h-full">
                <img src="/assets/02.png" alt="Minimalist Decor Set" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out min-h-[300px]" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-0 w-full p-5 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/90 to-transparent pt-12">
                <p className="font-label-sm text-label-sm text-primary mb-1 uppercase tracking-widest">Decor Set</p>
                <h3 className="font-body-lg text-lg text-on-surface font-semibold">Brutalist Ceramic Collection</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-headline-md text-xl text-on-surface">$28.00</span>
                  <button className="bg-transparent border border-glass-border hover:border-primary text-on-surface hover:text-primary transition-colors duration-300 h-8 w-8 rounded flex items-center justify-center">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-lg overflow-hidden relative group hover:shadow-[inset_0_0_0_1px_var(--color-primary)] transition-all duration-500 cursor-pointer flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <img src="/assets/03.png" alt="Architectural Plant" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-body-lg text-body-lg text-on-surface font-semibold truncate">Monstera in Charcoal</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">Vegetation / Indoor</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-glass-border">
                  <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">$15.00</span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-lg overflow-hidden relative group hover:shadow-[inset_0_0_0_1px_var(--color-primary)] transition-all duration-500 cursor-pointer flex flex-col">
              <div className="relative h-48 w-full overflow-hidden flex items-center justify-center bg-surface-container-lowest">
                <Cube className="text-surface-variant text-[64px] absolute pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-center items-center text-center border-t border-glass-border">
                <h3 className="font-headline-md text-xl text-on-surface mb-2">Can't find what you need?</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">Commission a custom model from our elite network of 3D artists.</p>
                <button className="font-label-sm text-[10px] uppercase tracking-widest text-primary border-b border-primary pb-0.5 hover:opacity-80 transition-opacity">Request Custom Art</button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <button className="bg-transparent border border-glass-border text-on-surface px-8 py-3 rounded hover:border-primary hover:text-primary transition-all duration-300 font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-2 group">
              Load More Assets
              <CaretDown size={18} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
