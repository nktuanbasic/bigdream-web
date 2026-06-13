import Link from 'next/link';

export default function BigAboutPage() {
  const team = [
    { name: "Julian Vance", role: "Creative Director", image: "/assets/01.png" },
    { name: "Elena Rostova", role: "Lead Architect", image: "/assets/02.png" },
    { name: "Marcus Chen", role: "VFX Supervisor", image: "/assets/03.png" },
    { name: "Sarah Jenkins", role: "Lighting Specialist", image: "/assets/C_DR_04.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <main className="flex-grow">
        {/* Studio Hero - Immersive Full Screen */}
        <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/assets/C_LOBBY_007.png" alt="Studio Background" className="w-full h-full object-cover opacity-40 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-transparent to-obsidian-deep"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
            <h1 className="font-display-lg text-7xl md:text-[150px] text-on-surface leading-none tracking-tighter uppercase drop-shadow-2xl mb-8">
              The <span className="text-primary italic">Studio</span>
            </h1>
            <p className="font-body-lg text-xl md:text-3xl text-on-surface-variant max-w-3xl font-light leading-relaxed">
              We are a collective of digital architects, light sculptors, and visual engineers building the unbuilt.
            </p>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </section>

        {/* Studio Philosophy - High Editorial Typography */}
        <section className="py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-glass-border"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
            <div className="md:col-span-5 md:col-start-2">
              <span className="inline-block font-label-sm text-xs text-primary uppercase tracking-widest mb-6">Our Philosophy</span>
              <h2 className="font-headline-lg text-4xl md:text-6xl leading-tight text-on-surface mb-8">
                Form follows <br/><span className="text-on-surface-variant italic">emotion.</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="font-body-lg text-xl text-on-surface-variant leading-relaxed font-light mb-8">
                At Big Dream, we believe that architectural visualization is not merely about representation, but about translation. We translate blueprints into atmosphere, dimensions into feelings, and geometry into cinematic narratives.
              </p>
              <p className="font-body-lg text-xl text-on-surface-variant leading-relaxed font-light">
                Our approach merges the rigid discipline of architectural design with the evocative power of cinematography.
              </p>
            </div>
          </div>
        </section>

        {/* Cinematic Imagery Section */}
        <section className="w-full relative py-24">
          <div className="flex overflow-hidden gap-4 px-4 md:px-8">
            <div className="w-1/3 aspect-[4/5] overflow-hidden rounded-sm relative group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src="/assets/01.png" alt="Process 1" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
            </div>
            <div className="w-1/3 aspect-[4/5] overflow-hidden rounded-sm relative group mt-16">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src="/assets/C_DR_04.png" alt="Process 2" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
            </div>
            <div className="w-1/3 aspect-[4/5] overflow-hidden rounded-sm relative group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src="/assets/02.png" alt="Process 3" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
            </div>
          </div>
        </section>

        {/* The Team - High-end Roster */}
        <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-glass-border">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="inline-block font-label-sm text-xs text-primary uppercase tracking-widest mb-6">The Collective</span>
              <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface uppercase tracking-tighter">Masters of <br/>Light</h2>
            </div>
            <button className="border-b border-on-surface text-on-surface font-label-sm text-sm uppercase tracking-widest pb-2 hover:text-primary hover:border-primary transition-colors">
              Join the Studio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-16">
            {team.map((member, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-sm mb-6 relative bg-charcoal-surface">
                  <div className="absolute inset-0 bg-obsidian-deep/50 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-headline-lg text-2xl text-on-surface group-hover:text-primary transition-colors">{member.name}</h3>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="w-full bg-surface-container-low py-32 px-6 md:px-12 text-center">
          <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface mb-8 uppercase tracking-tighter">Let's Build <br/>Together</h2>
          <p className="font-body-lg text-xl text-on-surface-variant mb-12 font-light max-w-xl mx-auto">
            We are always looking for visionary clients and exceptional talent.
          </p>
          <button className="bg-primary text-on-primary font-label-sm text-sm uppercase tracking-widest px-12 py-5 rounded-sm hover:bg-primary-fixed transition-colors duration-300">
            Contact Studio
          </button>
        </section>
      </main>
    </div>
  );
}
