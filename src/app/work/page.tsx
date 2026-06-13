import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export default function BigWorkPage() {
  const works = [
    { id: 1, title: "The Obsidian Tower", location: "Neo-Tokyo", image: "/assets/C_DR_04.png", colSpan: "md:col-span-12", aspect: "aspect-[21/9]" },
    { id: 2, title: "Silence Pavilion", location: "Oslo", image: "/assets/01.png", colSpan: "md:col-span-6", aspect: "aspect-[4/5]" },
    { id: 3, title: "Echo Chamber", location: "Berlin", image: "/assets/02.png", colSpan: "md:col-span-6", aspect: "aspect-[4/5]" },
    { id: 4, title: "Aether Complex", location: "Seoul", image: "/assets/03.png", colSpan: "md:col-span-8", aspect: "aspect-[16/9]" },
    { id: 5, title: "Lumina", location: "Reykjavik", image: "/assets/C_LOBBY_007.png", colSpan: "md:col-span-4", aspect: "aspect-[3/4]" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <main className="flex-grow pt-[100px] pb-32 px-4 md:px-8">
        
        {/* Header */}
        <header className="max-w-[1920px] mx-auto mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-glass-border pb-12">
          <div>
            <h1 className="font-display-lg text-6xl md:text-[120px] leading-none text-on-surface tracking-tighter uppercase drop-shadow-lg">
              Selected <br/><span className="text-primary italic">Works</span>
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 max-w-sm">
            <p className="font-body-lg text-lg text-on-surface-variant font-light md:text-right">
              An archive of our most defining architectural narratives and spatial explorations.
            </p>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-3 py-1 rounded-full">
              2024 — 2026
            </span>
          </div>
        </header>

        {/* Immersive Gallery */}
        <section className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            {works.map((work) => (
              <Link href={`#work-${work.id}`} key={work.id} className={`group block relative overflow-hidden bg-charcoal-surface rounded-sm ${work.colSpan}`}>
                <div className={`relative w-full ${work.aspect} overflow-hidden`}>
                  {/* Image */}
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-out group-hover:scale-105" 
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-obsidian-deep/30 transition-opacity duration-700 group-hover:opacity-0 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep/90 via-obsidian-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Content on Hover */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out z-20">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="font-label-sm text-xs text-primary uppercase tracking-widest mb-3 block">
                          {work.location}
                        </span>
                        <h2 className="font-headline-lg text-4xl md:text-6xl text-on-surface">
                          {work.title}
                        </h2>
                      </div>
                      <div className="hidden md:flex w-16 h-16 rounded-full glass-panel items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="mt-32 flex justify-center">
          <button className="flex flex-col items-center gap-4 text-on-surface-variant hover:text-primary transition-colors duration-300 group">
            <span className="font-label-sm text-xs uppercase tracking-widest">Load Archive</span>
            <div className="w-[1px] h-16 bg-glass-border group-hover:bg-primary transition-colors overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-primary -translate-y-full group-hover:animate-[slideDown_1s_ease-in-out_infinite]"></div>
            </div>
          </button>
        </div>
        
      </main>
    </div>
  );
}
