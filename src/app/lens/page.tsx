"use client";

import React, { useState, useRef } from "react";
import { 
  UploadSimple, 
  Image as ImageIcon, 
  Crosshair, 
  MagicWand, 
  Scan, 
  Cube, 
  Palette, 
  Drop, 
  Lightning,
  Sparkle
} from "@phosphor-icons/react";

export default function LensPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResultReady(true);
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateAnalysis();
  };

  const handleFileSelect = () => {
    simulateAnalysis();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] overflow-hidden relative selection:bg-[#f2ca50]/30 flex flex-col">
      {/* Cinematic Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-[#f2ca50] opacity-[0.02] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-[#f2ca50] opacity-[0.015] blur-[200px] rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-16 flex-1 flex flex-col items-center justify-center">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4 relative w-full max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#f2ca50]/30 text-[#f2ca50] text-sm uppercase tracking-[0.2em] mb-4">
            <Scan className="animate-[spin_4s_linear_infinite]" />
            <span>Lens Core v2.0</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-lg" style={{ fontFamily: 'var(--font-bodoni)' }}>
            Deconstruct <span className="italic text-[#f2ca50] font-light">Reality</span>
          </h1>
          <p className="text-[#a09a8e] text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Upload any architectural image. Our neural engine will instantly extract materials, styles, and structural prompt vectors.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="w-full max-w-5xl transition-all duration-700">
          {!resultReady ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative group cursor-pointer w-full aspect-[4/3] sm:aspect-[21/9] rounded-3xl flex flex-col items-center justify-center border-2 border-dashed transition-all duration-500 overflow-hidden ${
                isDragging 
                ? 'border-[#f2ca50] bg-[#f2ca50]/5 shadow-[0_0_50px_rgba(242,202,80,0.15)] scale-[1.01]' 
                : 'border-white/10 bg-[#1a1a1a]/40 hover:border-white/30 hover:bg-[#1a1a1a]/60 backdrop-blur-xl'
              }`}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileSelect}
                accept="image/*"
              />
              
              {/* Animated Corner Brackets */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 group-hover:border-[#f2ca50] transition-colors duration-500" />
              <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover:border-[#f2ca50] transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover:border-[#f2ca50] transition-colors duration-500" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 group-hover:border-[#f2ca50] transition-colors duration-500" />

              {isAnalyzing ? (
                <div className="flex flex-col items-center space-y-6 z-10">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 border-t-2 border-[#f2ca50] rounded-full animate-spin" />
                    <div className="absolute inset-2 border-r-2 border-white/30 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                    <Crosshair className="text-3xl text-[#f2ca50] animate-pulse" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl text-white font-medium" style={{ fontFamily: 'var(--font-bodoni)' }}>Isolating Features</h3>
                    <p className="text-[#a09a8e] uppercase tracking-[0.15em] text-sm animate-pulse">Running tensor analysis...</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center text-[#f2ca50] group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <UploadSimple weight="duotone" className="text-4xl" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl text-white font-medium mb-1" style={{ fontFamily: 'var(--font-bodoni)' }}>Initialize Sequence</h3>
                    <p className="text-[#a09a8e]">Drag & drop matrix or click to browse</p>
                  </div>
                  <div className="flex gap-4 mt-6 text-xs text-white/40 uppercase tracking-widest">
                    <span>JPEG</span>
                    <span>PNG</span>
                    <span>WEBP</span>
                    <span>MAX 50MB</span>
                  </div>
                </div>
              )}

              {/* Hover Scanline */}
              <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f2ca50]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_3s_ease-in-out_infinite]" style={{ top: '50%' }} />
            </div>
          ) : (
            /* Results View */
            <div className="w-full animate-[fadeIn_0.8s_ease-out]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-white/10 pb-4 gap-4">
                <h2 className="text-3xl text-white font-bold flex items-center gap-3" style={{ fontFamily: 'var(--font-bodoni)' }}>
                  <Sparkle className="text-[#f2ca50]" />
                  Analysis <span className="italic font-light">Complete</span>
                </h2>
                <button 
                  onClick={() => setResultReady(false)}
                  className="px-6 py-2 rounded-full glass-panel hover:bg-white/5 transition-colors text-sm uppercase tracking-wider text-[#a09a8e] hover:text-[#f2ca50] cursor-pointer"
                >
                  New Analysis
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Image Preview Area */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="aspect-[4/5] rounded-2xl glass-panel relative overflow-hidden group inner-glow flex items-center justify-center">
                    {/* Placeholder for uploaded image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#131313] to-[#201f1f] flex flex-col items-center justify-center text-white/20">
                      <ImageIcon weight="thin" className="text-6xl mb-4" />
                      <span className="uppercase tracking-widest text-xs">Source Vector</span>
                    </div>
                    {/* Targeting HUD Overlay */}
                    <div className="absolute top-1/4 left-1/3 w-16 h-16 border border-[#f2ca50]/50 bg-[#f2ca50]/10 flex items-center justify-center before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[#f2ca50]/30 before:-left-full after:content-[''] after:absolute after:h-full after:w-[1px] after:bg-[#f2ca50]/30 after:-bottom-full pointer-events-none group-hover:scale-110 transition-transform">
                      <Crosshair className="text-[#f2ca50] opacity-70" />
                    </div>
                  </div>
                </div>

                {/* Data Breakdown */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Style Breakdown */}
                  <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#f2ca50]/5 blur-3xl rounded-full pointer-events-none" />
                    <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-bodoni)' }}>
                      <MagicWand className="text-[#f2ca50]" />
                      Style Ontology
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {['Brutalism', 'Neo-Futuristic', 'High Contrast', 'Minimalist Core'].map((tag, i) => (
                        <span key={tag} className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/5 text-[#d0c5af] flex items-center gap-2 hover:border-[#f2ca50]/30 transition-colors cursor-default">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] opacity-70" />
                          {tag}
                          <span className="text-xs text-white/30 ml-2">{98 - i * 4}%</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Material Composition Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="glass-panel rounded-2xl p-6 hover:border-[#f2ca50]/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4 text-[#f2ca50]">
                        <Cube weight="duotone" className="text-xl" />
                        <h4 className="font-semibold uppercase tracking-wider text-sm">Primary Material</h4>
                      </div>
                      <p className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-bodoni)' }}>Polished Concrete</p>
                      <p className="text-sm text-[#a09a8e]">Reflectivity: 0.15 | Roughness: 0.8</p>
                    </div>
                    
                    <div className="glass-panel rounded-2xl p-6 hover:border-[#f2ca50]/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4 text-[#f2ca50]/80">
                        <Drop weight="duotone" className="text-xl" />
                        <h4 className="font-semibold uppercase tracking-wider text-sm">Secondary Material</h4>
                      </div>
                      <p className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-bodoni)' }}>Tinted Glass</p>
                      <p className="text-sm text-[#a09a8e]">Transmission: 0.85 | IOR: 1.5</p>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="glass-panel rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-bodoni)' }}>
                      <Palette className="text-[#f2ca50]" />
                      Chromatic Signature
                    </h3>
                    <div className="flex h-24 rounded-xl overflow-hidden shadow-inner border border-white/5">
                      <div className="flex-grow bg-[#1a1a1d] group relative cursor-crosshair">
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-xs font-mono tracking-widest transition-opacity text-white/80">#1A1A1D</span>
                      </div>
                      <div className="flex-grow bg-[#4a4b49] group relative cursor-crosshair">
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-xs font-mono tracking-widest transition-opacity text-white/80">#4A4B49</span>
                      </div>
                      <div className="flex-grow-[2] bg-[#c2bca7] group relative cursor-crosshair">
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-[#1a1a1d] text-xs font-mono tracking-widest transition-opacity font-bold">#C2BCA7</span>
                      </div>
                      <div className="flex-grow bg-[#8b7355] group relative cursor-crosshair">
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-xs font-mono tracking-widest transition-opacity text-white/80">#8B7355</span>
                      </div>
                    </div>
                  </div>

                  {/* Prompt Output */}
                  <div className="glass-panel rounded-2xl p-6 sm:p-8 border-[#f2ca50]/20 hover:border-[#f2ca50]/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-bodoni)' }}>
                        <Lightning className="text-[#f2ca50]" />
                        Extracted Prompt Vector
                      </h3>
                      <button className="text-xs uppercase tracking-widest text-[#f2ca50] hover:text-white transition-colors border border-[#f2ca50]/30 px-3 py-1.5 rounded-md hover:bg-[#f2ca50]/20 cursor-pointer">
                        Copy Vector
                      </button>
                    </div>
                    <div className="bg-[#050505] p-5 rounded-xl border border-white/5 font-mono text-sm leading-relaxed text-[#d0c5af] select-all cursor-text">
                      <span className="text-[#f2ca50]">/imagine prompt:</span> architectural photography, brutalist neo-futuristic structure, polished concrete primary, dark tinted glass secondary, sharp geometric angles, minimalist core, high contrast lighting, cinematic obsidian shadows, warm accents --ar 16:9 --v 6.0
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Custom keyframes for internal use */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100px); }
          50% { transform: translateY(100px); }
          100% { transform: translateY(-100px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
