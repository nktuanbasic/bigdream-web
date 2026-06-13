import Link from 'next/link';
import { Play, ArrowRight, BookOpen, Clock, Target } from '@phosphor-icons/react/dist/ssr';

export default function BigClassPage() {
  const curriculum = [
    {
      step: "01",
      title: "Foundation & Lighting",
      duration: "Week 1-2",
      description: "Mastering the physics of light. Setting up physical cameras, understanding exposure values, and building cinematic lighting scenarios from scratch.",
      image: "/assets/C_DR_04.png"
    },
    {
      step: "02",
      title: "Material Authorship",
      duration: "Week 3-4",
      description: "Advanced node-based material creation. Procedural dirt, edge wear, and hyper-realistic PBR workflows for architectural surfaces.",
      image: "/assets/01.png"
    },
    {
      step: "03",
      title: "Atmospherics & Volume",
      duration: "Week 5-6",
      description: "Crafting depth and mood. Utilizing aerial perspective, volumetric fog, and particle systems to ground your architecture in reality.",
      image: "/assets/02.png"
    },
    {
      step: "04",
      title: "Post-Production Synthesis",
      duration: "Week 7-8",
      description: "The final polish. Grading, compositing passes, and applying photographic imperfections to bridge the gap between render and reality.",
      image: "/assets/03.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <main className="flex-grow pt-[80px]">
        {/* Cinematic Hero */}
        <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden border-b border-glass-border">
          <div className="absolute inset-0 z-0">
            <img src="/assets/C_LOBBY_007.png" alt="Hero Background" className="w-full h-full object-cover opacity-60 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-transparent to-obsidian-deep"></div>
            <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-16">
            <div className="glass-panel px-6 py-2 rounded-full mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-xs text-primary uppercase tracking-widest">Masterclass Enrollment Open</span>
            </div>
            
            <h1 className="font-display-lg text-6xl md:text-9xl text-on-surface mb-8 tracking-tighter uppercase drop-shadow-2xl">
              Cinematic<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed-dim">ArchViz</span>
            </h1>
            
            <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant mb-12 max-w-3xl font-light">
              Elevate your visual narrative. An intensive 8-week curriculum designed for professionals seeking the intersection of architecture and cinema.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="bg-primary text-on-primary font-label-sm text-sm uppercase tracking-widest px-10 py-5 rounded-sm hover:bg-primary-fixed transition-colors duration-300 w-full sm:w-auto">
                Begin Journey
              </button>
              <button className="glass-panel text-on-surface font-label-sm text-sm uppercase tracking-widest px-10 py-5 rounded-sm hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto">
                <Play size={18} weight="fill" />
                Play Trailer
              </button>
            </div>
          </div>
        </section>

        {/* Stats / Info Bar */}
        <section className="border-b border-glass-border bg-charcoal-surface/30 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-glass-border/50">
              <div className="flex flex-col items-center text-center px-4">
                <Clock size={32} className="text-primary mb-4" weight="thin" />
                <span className="font-display-lg text-3xl mb-1">8 Weeks</span>
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Duration</span>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <BookOpen size={32} className="text-primary mb-4" weight="thin" />
                <span className="font-display-lg text-3xl mb-1">4 Modules</span>
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Curriculum</span>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <Target size={32} className="text-primary mb-4" weight="thin" />
                <span className="font-display-lg text-3xl mb-1">Advanced</span>
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Level</span>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <Target size={32} className="text-primary mb-4" weight="thin" />
                <span className="font-display-lg text-3xl mb-1">Certificate</span>
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Completion</span>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum List */}
        <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface mb-6 uppercase tracking-tighter">The Curriculum</h2>
            <p className="font-body-lg text-xl text-on-surface-variant max-w-2xl mx-auto font-light">
              A structured approach to mastering the digital canvas.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {curriculum.map((item, index) => (
              <div key={index} className="group relative glass-panel rounded-xl overflow-hidden hover:border-primary transition-colors duration-500">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image part */}
                  <div className="w-full md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-obsidian-deep/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 z-20">
                      <span className="font-display-lg text-6xl text-white/50 group-hover:text-primary transition-colors duration-500 drop-shadow-md">
                        {item.step}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content part */}
                  <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-r from-charcoal-surface/80 to-transparent">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 border border-glass-border rounded font-label-sm text-[10px] uppercase tracking-widest text-primary mb-4 group-hover:border-primary/50 transition-colors">
                        {item.duration}
                      </span>
                      <h3 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-body-lg text-lg text-on-surface-variant mb-8 max-w-xl leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-auto">
                      <button className="flex items-center gap-3 font-label-sm text-xs uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors duration-300">
                        View Module Details
                        <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
