"use client";

import React, { useState, useEffect } from "react";
import { 
  Images, 
  Aperture, 
  Faders, 
  MagnifyingGlass, 
  DownloadSimple, 
  ShareNetwork,
  Cpu,
  ArrowsOutSimple
} from "@phosphor-icons/react";

// Mock data for the gallery
const mockGallery = [
  { id: 1, title: "Luminous Cybernetic Construct", author: "AI Core", tags: ["Cyberpunk", "Architecture"], height: "400px" },
  { id: 2, title: "Neo-Tokyo Skyline", author: "Architect Prime", tags: ["Cityscape", "Night"], height: "300px" },
  { id: 3, title: "Ethereal Glass Pavilion", author: "Dreamer", tags: ["Minimalist", "Glass"], height: "500px" },
  { id: 4, title: "Obsidian Obelisk", author: "AI Core", tags: ["Monument", "Dark"], height: "350px" },
  { id: 5, title: "Golden Hour Atrium", author: "Lumina", tags: ["Interior", "Light"], height: "450px" },
  { id: 6, title: "Synthetic Biome", author: "Nature Protocol", tags: ["Organic", "Tech"], height: "300px" },
];

export default function SeePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#f2ca50] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#f2ca50] opacity-[0.02] blur-[200px] rounded-full pointer-events-none" />

      {/* Terminal Grid Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(rgba(242, 202, 80, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(242, 202, 80, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <main className={`relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 py-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Header / Control Deck */}
        <header className="glass-panel inner-glow rounded-3xl p-6 sm:p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#f2ca50]" />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 text-[#f2ca50] mb-2 text-sm uppercase tracking-[0.2em] font-semibold">
              <Cpu weight="duotone" className="text-xl animate-pulse" />
              <span>Vision Matrix Online</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#d0c5af] tracking-tight" style={{ fontFamily: 'var(--font-bodoni)' }}>
              SEE. <span className="italic text-[#f2ca50] font-light">Gallery</span>
            </h1>
            <p className="text-[#a09a8e] max-w-xl text-lg font-light leading-relaxed pt-2">
              Explore the pinnacle of architectural generation. A curated repository of cinematic renders engineered by our neural networks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group flex-1 sm:flex-none">
              <MagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a09a8e] group-focus-within:text-[#f2ca50] transition-colors" />
              <input 
                type="text" 
                placeholder="Query parameters..." 
                className="w-full sm:w-[280px] bg-[#1a1a1a]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#f2ca50]/50 focus:bg-[#1a1a1a] transition-all"
              />
            </div>
            <button className="glass-panel flex items-center justify-center gap-2 px-6 py-3 rounded-xl hover:bg-[#f2ca50]/10 transition-colors text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer">
              <Faders weight="duotone" />
              <span>Calibrate</span>
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['All', 'Architecture', 'Interior', 'Cyberpunk', 'Minimalist', 'Organic'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                activeFilter === filter 
                ? 'bg-[#f2ca50]/20 border-[#f2ca50] text-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.2)]' 
                : 'bg-white/5 border-white/10 text-[#a09a8e] hover:border-white/30 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {mockGallery.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative rounded-2xl overflow-hidden glass-panel border border-white/5 hover:border-[#f2ca50]/50 transition-all duration-500 break-inside-avoid cursor-pointer"
              style={{ 
                height: item.height, 
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Placeholder with Gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out"
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
                <Aperture className="text-4xl text-white/10 group-hover:text-[#f2ca50]/30 transition-colors duration-500 animate-[spin_10s_linear_infinite]" />
              </div>

              {/* Holographic Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end h-full">
                <div className="flex justify-between items-start mb-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs uppercase tracking-wider bg-[#050505]/80 backdrop-blur-md text-[#f2ca50] px-3 py-1 rounded-full border border-[#f2ca50]/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="p-2 bg-[#050505]/80 backdrop-blur-md rounded-full text-white hover:text-[#f2ca50] border border-white/10 hover:border-[#f2ca50]/50 transition-colors">
                    <ArrowsOutSimple weight="bold" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-medium text-white" style={{ fontFamily: 'var(--font-bodoni)' }}>
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm text-[#a09a8e] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse" />
                      {item.author}
                    </p>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                        <ShareNetwork weight="duotone" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                        <DownloadSimple weight="duotone" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
