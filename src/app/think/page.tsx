import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export default function BigThinkPage() {
  const articles = [
    {
      id: 1,
      title: "The Geometry of Silence: Acoustic Architecture in the Virtual Void",
      date: "OCTOBER 12, 2026",
      category: "Spatial Synthesis",
      excerpt: "By simulating non-Euclidean material properties, we examine how the absence of physical limitation redefines acoustic dampening in purely digital monumental spaces.",
      image: "/assets/C_DR_04.png",
      featured: true
    },
    {
      id: 2,
      title: "Refraction & Memory",
      date: "SEPTEMBER 28, 2026",
      category: "Light Theory",
      excerpt: "Analyzing the emotional impact of volumetric lighting algorithms in artificially constructed twilight scenarios. How do we code melancholy?",
      image: "/assets/01.png"
    },
    {
      id: 3,
      title: "The Obsidian Protocol",
      date: "AUGUST 15, 2026",
      category: "Materiality",
      excerpt: "A study on creating virtual textures that imply impossible density. When weight is an illusion, how do we anchor the user's perception?",
      image: "/assets/02.png"
    },
    {
      id: 4,
      title: "Structural Logic in AI",
      date: "JULY 02, 2026",
      category: "Frameworks",
      excerpt: "Mapping neural network pathways using architectural blueprints. Translating data flow into spatial corridors for intuitive navigation.",
      image: "/assets/03.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary pt-32">
      <main className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-32">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-glass-border pb-12 gap-8">
          <div className="max-w-2xl">
            <h1 className="font-display-lg text-6xl md:text-8xl text-on-surface tracking-tighter mb-6 uppercase">
              The Journal
            </h1>
            <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed">
              Essays, explorations, and technical deep-dives into the synthesis of artificial intelligence, spatial design, and digital phenomenology.
            </p>
          </div>
          <div className="text-sm font-label-sm tracking-widest text-on-surface-variant uppercase flex flex-col gap-2">
            <span>Vol. 04</span>
            <span>Est. 2026</span>
          </div>
        </header>

        <section className="flex flex-col gap-24">
          {articles.map((article, index) => (
            <article 
              key={article.id} 
              className={`group flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
            >
              {/* Image Container */}
              <div className={`w-full ${article.featured ? 'md:w-3/5' : 'md:w-1/2'} relative overflow-hidden glass-panel rounded-2xl aspect-[4/3] md:aspect-[16/10]`}>
                <div className="absolute inset-0 bg-obsidian-deep/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>

              {/* Content */}
              <div className={`w-full ${article.featured ? 'md:w-2/5' : 'md:w-1/2'} flex flex-col justify-center space-y-6 md:px-8 py-8`}>
                <div className="flex items-center gap-4 text-xs font-label-sm uppercase tracking-widest text-primary">
                  <span>{article.category}</span>
                  <span className="w-8 h-[1px] bg-primary/50"></span>
                  <span className="text-on-surface-variant">{article.date}</span>
                </div>
                
                <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface leading-tight group-hover:text-primary transition-colors duration-500">
                  {article.title}
                </h2>
                
                <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed opacity-80">
                  {article.excerpt}
                </p>
                
                <div className="pt-8">
                  <Link href="#" className="inline-flex items-center gap-2 text-on-surface hover:text-primary font-label-sm text-sm uppercase tracking-widest transition-all duration-300 group/btn pb-2 border-b border-glass-border hover:border-primary">
                    Read Article
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-32 pt-16 border-t border-glass-border flex justify-center">
          <button className="px-8 py-4 glass-panel font-label-sm text-sm uppercase tracking-widest text-on-surface hover:text-primary hover:border-primary transition-all duration-300 rounded-full flex items-center gap-3">
            Load Archive
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </button>
        </div>
      </main>
    </div>
  );
}
