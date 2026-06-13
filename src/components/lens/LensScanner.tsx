"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Camera, UploadSimple, Link as LinkIcon, Scan, X } from '@phosphor-icons/react';

interface LensScannerProps {
  onTextSearch: (text: string, mode: 'basic' | 'lens') => void;
  onImageScan: (imageBase64: string, mode: 'basic' | 'lens') => void;
}

export default function LensScanner({ onTextSearch, onImageScan }: LensScannerProps) {
  const [mode, setMode] = useState<'basic' | 'lens'>('lens');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      
      const items = e.clipboardData?.items;
      if (!items) return;
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) handleFile(file);
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds limit (5MB).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageBase64(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const triggerScan = () => {
    if (imageBase64) {
      onImageScan(imageBase64, mode);
    }
  };

  return (
    <section className="w-full relative group">
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/jpeg, image/png, image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      
      {!imageBase64 ? (
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`glass-panel rounded-xl flex flex-col items-center justify-center min-h-[500px] lg:min-h-[600px] relative overflow-hidden transition-colors duration-500 border-dashed border-2 ${
            isDragging ? 'border-primary' : 'border-glass-border hover:border-primary/30'
          }`}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] animate-pulse"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-2xl px-6">
            <div className="w-24 h-24 rounded-full border border-glass-border flex items-center justify-center bg-obsidian-deep/50 text-primary mb-4 relative">
              <Camera size={48} weight="light" />
              {/* Scanning line effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_10px_rgba(242,202,80,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animation: 'scan 2s linear infinite' }}></div>
            </div>
            
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Initialize Visual Query</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">Drop an architectural render, real-world photograph, or high-fidelity mesh file to identify components and cross-reference our database.</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button onClick={() => fileInputRef.current?.click()} className="bg-primary text-on-primary px-8 py-4 rounded font-label-sm text-label-sm uppercase tracking-tighter flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all duration-200">
                <UploadSimple size={20} /> Upload Image
              </button>
              <button className="bg-transparent border border-glass-border text-on-surface px-8 py-4 rounded font-label-sm text-label-sm uppercase tracking-tighter flex items-center gap-2 hover:bg-surface-container hover:text-primary transition-all duration-200 active:scale-95">
                <LinkIcon size={20} /> Paste URL
              </button>
              <button className="bg-transparent border border-glass-border text-on-surface px-8 py-4 rounded font-label-sm text-label-sm uppercase tracking-tighter flex items-center gap-2 hover:bg-surface-container hover:text-primary transition-all duration-200 active:scale-95">
                <Camera size={20} /> Camera Scan
              </button>
            </div>
            
            <p className="font-label-sm text-label-sm text-on-surface-variant/50 uppercase tracking-widest mt-8">Supported: .JPG, .PNG, .OBJ, .FBX (Max 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-xl flex flex-col items-center justify-center min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
          <button 
            onClick={() => setImageBase64(null)}
            className="absolute top-6 right-6 z-30 w-10 h-10 bg-obsidian-deep/80 border border-glass-border rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:border-error transition-all"
          >
            <X size={20} weight="bold" />
          </button>
          
          <div className="relative flex-1 w-full bg-obsidian-deep flex items-center justify-center p-8 overflow-hidden inner-glow">
            <img src={imageBase64} alt="preview" className="max-w-full max-h-[450px] object-contain drop-shadow-2xl rounded-xl border border-glass-border" />
          </div>
          
          <div className="bg-charcoal-surface border-t border-glass-border p-6 w-full shrink-0 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Select Mode:</span>
              <div className="flex bg-obsidian-deep rounded-lg p-1 border border-glass-border">
                <button onClick={() => setMode('basic')} className={`px-4 py-2 font-label-sm text-label-sm uppercase rounded ${mode === 'basic' ? 'bg-surface-container-high text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}>BASIC SCAN</button>
                <button onClick={() => setMode('lens')} className={`px-4 py-2 font-label-sm text-label-sm uppercase rounded ${mode === 'lens' ? 'bg-primary text-obsidian-deep' : 'text-on-surface-variant hover:text-on-surface'}`}>ADVANCED SCAN</button>
              </div>
            </div>
            <button 
              onClick={triggerScan}
              className="w-full md:w-auto bg-primary text-on-primary font-bold font-label-sm text-label-sm uppercase tracking-widest px-12 py-4 rounded hover:bg-primary-fixed transition-all flex items-center justify-center gap-2"
            >
              <Scan size={20} weight="bold" /> INITIALIZE SCAN
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
