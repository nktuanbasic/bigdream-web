import Image from 'next/image';
import Link from 'next/link';
import { CaretLeft, Download, Heart, ShareNetwork, Cube, CheckCircle, WarningCircle, Eye } from '@phosphor-icons/react/dist/ssr';

export default async function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock data for the demonstration
  const modelName = "Minimalist Lounge Sofa";
  
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface pt-[80px]">
      
      {/* Top Nav */}
      <div className="w-full px-6 py-4 border-b border-glass-border flex items-center gap-4">
        <Link href="/model" className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors">
          <CaretLeft size={16} /> Back to Library
        </Link>
        <span className="text-glass-border">|</span>
        <span className="text-sm text-on-surface font-light">{modelName}</span>
      </div>

      <main className="flex-grow flex flex-col lg:flex-row w-full max-w-[2400px] mx-auto">
        
        {/* Left: Huge Preview (70%) */}
        <section className="w-full lg:w-[70%] lg:border-r border-glass-border flex flex-col bg-charcoal-surface/20">
          <div className="relative w-full aspect-video lg:aspect-auto lg:h-[800px] bg-black">
            <Image 
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2560&auto=format&fit=crop" 
              alt={modelName} 
              fill 
              className="object-cover" 
              priority
            />
            {/* Interactive 3D Badge (mock) */}
            <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm">
              <Cube size={20} className="text-primary" />
              <span>Interactive 3D View</span>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-4 p-6 overflow-x-auto bg-obsidian-deep">
            {[
              "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=400&auto=format&fit=crop"
            ].map((src, i) => (
              <button key={i} className={`relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden border-2 transition-colors ${i === 0 ? 'border-primary' : 'border-glass-border hover:border-primary/50'}`}>
                <Image src={src} alt="Thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Right: Info & Download (30%) */}
        <aside className="w-full lg:w-[30%] p-8 lg:p-12 flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="font-headline-lg text-4xl text-on-surface leading-tight">{modelName}</h1>
              <div className="flex gap-2">
                <button className="p-3 glass-panel rounded-full hover:text-primary transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-3 glass-panel rounded-full hover:text-primary transition-colors">
                  <ShareNetwork size={20} />
                </button>
              </div>
            </div>
            
            <p className="text-on-surface-variant flex items-center gap-2 text-sm">
              Created by <span className="text-primary hover:underline cursor-pointer">Studio Arca</span>
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl mb-8 border border-primary/20">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Commercial License</p>
                <p className="font-display-lg text-3xl text-primary">PRO</p>
              </div>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <Eye size={14} /> 12.4k views
              </p>
            </div>
            
            <button className="w-full bg-primary hover:bg-primary-fixed text-obsidian-deep font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-colors uppercase tracking-wider text-sm">
              <Download size={20} weight="bold" /> Download Model
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-4">Includes .MAX, .FBX, .OBJ and 4K Textures</p>
          </div>

          {/* Material & Spec Breakdown */}
          <div className="space-y-6">
            <h3 className="font-headline-md text-xl border-b border-glass-border pb-4">Specifications</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-on-surface-variant mb-1">Geometry</p>
                <p className="font-medium">Polygonal Quads</p>
              </div>
              <div>
                <p className="text-on-surface-variant mb-1">Polygons</p>
                <p className="font-medium">45,200</p>
              </div>
              <div>
                <p className="text-on-surface-variant mb-1">Vertices</p>
                <p className="font-medium">48,150</p>
              </div>
              <div>
                <p className="text-on-surface-variant mb-1">Unwrapped UVs</p>
                <p className="font-medium text-green-400 flex items-center gap-1"><CheckCircle weight="fill" /> Yes, Non-overlapping</p>
              </div>
            </div>

            <div className="pt-6 border-t border-glass-border">
              <h3 className="font-headline-md text-xl mb-4">Material Breakdown</h3>
              <div className="space-y-3">
                <div className="glass-panel p-3 rounded-lg flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E5D3B3] border border-glass-border shadow-inner"></div>
                  <div>
                    <p className="text-sm font-medium">Linen Fabric</p>
                    <p className="text-xs text-on-surface-variant">4K PBR Albedo, Normal, Roughness</p>
                  </div>
                </div>
                <div className="glass-panel p-3 rounded-lg flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2A] border border-glass-border shadow-inner"></div>
                  <div>
                    <p className="text-sm font-medium">Matte Black Steel</p>
                    <p className="text-xs text-on-surface-variant">4K PBR Workflow</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-glass-border">
              <p className="text-xs text-on-surface-variant flex items-start gap-2">
                <WarningCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                This asset requires a PBR-compatible rendering engine (V-Ray, Corona, Octane, or Unreal Engine) for optimal results.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
