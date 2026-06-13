import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlass, Faders, CaretDown, Download, Heart, Star } from '@phosphor-icons/react/dist/ssr';

export default function BigModelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      {/* Top Banner */}
      <div className="w-full h-[400px] relative mt-[72px]">
        <Image 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2560&auto=format&fit=crop" 
          alt="Model Banner" 
          fill 
          className="object-cover opacity-50" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display-lg text-5xl md:text-7xl text-on-surface mb-6 drop-shadow-lg">
            Mastercrafted <span className="text-primary italic">3D Assets</span>
          </h1>
          <div className="w-full max-w-3xl relative">
            <MagnifyingGlass size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              className="w-full bg-charcoal-surface/80 backdrop-blur-xl border border-glass-border rounded-full py-5 pl-16 pr-6 text-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-2xl" 
              placeholder="Search premium models, textures, and HDRI..." 
              type="text"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-obsidian-deep px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-primary-fixed transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow px-4 md:px-8 xl:px-12 py-12 flex flex-col lg:flex-row gap-12 max-w-[2400px] mx-auto w-full z-10">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-[100px] glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-2xl text-on-surface">Categories</h3>
              <Faders size={20} className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
            </div>
            
            <div className="space-y-6">
              {/* Category Group 1 */}
              <div>
                <h4 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3">Architecture</h4>
                <ul className="space-y-1">
                  {['Buildings', 'Interiors', 'Exteriors', 'Details'].map(item => (
                    <li key={item}>
                      <button className="w-full text-left py-2 px-3 rounded-lg text-sm text-on-surface hover:bg-white/5 hover:text-primary transition-colors flex justify-between items-center group">
                        {item}
                        <span className="text-xs text-on-surface-variant group-hover:text-primary/70">{(Math.random() * 1000 + 100).toFixed(0)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category Group 2 */}
              <div>
                <h4 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3">Furniture</h4>
                <ul className="space-y-1">
                  {['Sofas & Armchairs', 'Tables & Chairs', 'Storage', 'Beds'].map(item => (
                    <li key={item}>
                      <button className="w-full text-left py-2 px-3 rounded-lg text-sm text-on-surface hover:bg-white/5 hover:text-primary transition-colors flex justify-between items-center group">
                        {item}
                        <span className="text-xs text-on-surface-variant group-hover:text-primary/70">{(Math.random() * 500 + 50).toFixed(0)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filters */}
              <div className="pt-4 border-t border-glass-border">
                <h4 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3">Format</h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2 text-sm text-on-surface cursor-pointer hover:text-primary">
                    <input type="checkbox" className="form-checkbox text-primary rounded border-glass-border bg-charcoal-surface focus:ring-primary focus:ring-offset-obsidian-deep" />
                    <span>.MAX</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-on-surface cursor-pointer hover:text-primary">
                    <input type="checkbox" className="form-checkbox text-primary rounded border-glass-border bg-charcoal-surface focus:ring-primary focus:ring-offset-obsidian-deep" />
                    <span>.FBX</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-on-surface cursor-pointer hover:text-primary">
                    <input type="checkbox" className="form-checkbox text-primary rounded border-glass-border bg-charcoal-surface focus:ring-primary focus:ring-offset-obsidian-deep" />
                    <span>.OBJ</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-on-surface cursor-pointer hover:text-primary">
                    <input type="checkbox" className="form-checkbox text-primary rounded border-glass-border bg-charcoal-surface focus:ring-primary focus:ring-offset-obsidian-deep" />
                    <span>.BLEND</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Asset Grid */}
        <section className="flex-grow">
          <div className="flex justify-between items-center mb-8 glass-panel px-6 py-4 rounded-xl">
            <p className="font-body-md text-sm text-on-surface-variant">Showing <span className="text-on-surface font-bold">12,408</span> premium models</p>
            <div className="flex gap-4">
              <button className="text-sm text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                Trending <CaretDown size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Array of placeholder items */}
            {[
              { id: 1, name: 'Minimalist Lounge Sofa', creator: 'Studio Arca', price: 'PRO', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop' },
              { id: 2, name: 'Nordic Oak Dining Chair', creator: 'Lumen Design', price: 'FREE', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop' },
              { id: 3, name: 'Modern Concrete Planter', creator: 'ArchViz Studio', price: 'PRO', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop' },
              { id: 4, name: 'Industrial Pendant Light', creator: 'Vertex 3D', price: 'PRO', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop' },
              { id: 5, name: 'Mid-Century Credenza', creator: 'Oak & Iron', price: 'PRO', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop' },
              { id: 6, name: 'Abstract Ceramic Vase', creator: 'Clay Art', price: 'FREE', img: 'https://images.unsplash.com/photo-1612152605347-f93296cb657d?q=80&w=800&auto=format&fit=crop' },
              { id: 7, name: 'Velvet Accent Chair', creator: 'Luxe 3D', price: 'PRO', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop' },
              { id: 8, name: 'Monstera Deliciosa Plant', creator: 'Botany Viz', price: 'PRO', img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop' },
            ].map(item => (
              <div key={item.id} className="group glass-panel rounded-xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors duration-300">
                <Link href={`/model/${item.id}`} className="relative h-64 w-full block overflow-hidden">
                  <Image src={item.img} alt={item.name} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${item.price === 'PRO' ? 'bg-primary/20 border-primary text-primary' : 'bg-white/10 border-white/20 text-white'}`}>
                      {item.price}
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-obsidian-deep/80 hover:bg-primary hover:text-obsidian-deep text-on-surface p-2 rounded backdrop-blur transition-colors">
                      <Heart size={18} />
                    </button>
                    <button className="bg-obsidian-deep/80 hover:bg-primary hover:text-obsidian-deep text-on-surface p-2 rounded backdrop-blur transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <Link href={`/model/${item.id}`} className="font-body-lg text-lg text-on-surface hover:text-primary transition-colors truncate block">
                    {item.name}
                  </Link>
                  <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                    By <span className="text-on-surface hover:underline cursor-pointer">{item.creator}</span>
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-glass-border flex justify-between items-center">
                    <div className="flex items-center gap-1 text-primary">
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                    </div>
                    <span className="text-xs text-on-surface-variant">4K PBR</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
             <button className="glass-panel hover:bg-primary hover:text-obsidian-deep hover:border-primary text-on-surface px-8 py-3 rounded-full transition-all duration-300 font-label-sm text-xs uppercase tracking-widest flex items-center gap-2 group shadow-lg">
              Load More Models
              <CaretDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
