"use client";

import React, { useState, useRef, useEffect } from 'react';
import { TextT, Sparkle, Aperture, X, Scan } from '@phosphor-icons/react';

interface LensScannerProps {
  onTextSearch: (text: string, mode: 'basic' | 'lens') => void;
  onImageScan: (imageBase64: string, mode: 'basic' | 'lens') => void;
}

const SMART_PLACEHOLDERS = [
  "Minotti Horizonte", "Poliform Concorde", "Flos Arco", 
  "B&B Italia Camaleonda", "Cassina LC4", "Louis Poulsen PH Artichoke", 
  "Roche Bobois Mah Jong", "Baxter Chester Moon"
];

export default function LensScanner({ onTextSearch, onImageScan }: LensScannerProps) {
  const [mode, setMode] = useState<'basic' | 'lens'>('basic');
  const [inputText, setInputText] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      const currentText = SMART_PLACEHOLDERS[currentIdx];
      
      if (!isDeleting) {
        setPlaceholder(currentText.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentText.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeWriter, 2000);
          return;
        }
      } else {
        setPlaceholder(currentText.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          currentIdx = (currentIdx + 1) % SMART_PLACEHOLDERS.length;
        }
      }
      timeoutId = setTimeout(typeWriter, isDeleting ? 30 : 80);
    };

    timeoutId = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle paste events
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Don't intercept if typing in input
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
      alert('File ảnh quá lớn (Giới hạn 5MB).');
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

  const triggerTextSearch = () => {
    const query = inputText.trim() || placeholder;
    onTextSearch(query, mode);
  };

  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      {/* TEXT SEARCH */}
      <div className="bg-[#111111]/60 backdrop-blur-md p-1.5 rounded-lg border border-[#222222] shadow-lg">
        <div className="relative flex items-center w-full bg-[#050505] rounded focus-within:border-[var(--color-gold-base)] transition-colors border border-transparent">
          <div className="px-4 text-[var(--color-gold-base)]">
            <TextT weight="bold" />
          </div>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={placeholder || "Đang nạp dữ liệu..."} 
            className="flex-1 bg-transparent text-xs text-white font-mono outline-none py-4 pr-4 cursor-text"
            onKeyDown={(e) => e.key === 'Enter' && triggerTextSearch()}
          />
          <button 
            onClick={triggerTextSearch}
            className="bg-[#222222] text-[#A3A3A3] hover:bg-gold hover:text-black px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all rounded-r"
          >
            Quét
          </button>
        </div>
      </div>

      {/* MODE TOGGLE */}
      <div className="flex items-center gap-2 bg-[#050505] p-1.5 border border-[#222222] rounded-lg w-fit">
        <button 
          onClick={() => setMode('basic')}
          className={`w-[110px] text-[9px] font-bold py-2.5 uppercase rounded transition-all ${
            mode === 'basic' ? "bg-[#222222] text-white" : "text-[#A3A3A3] hover:text-white"
          }`}
        >
          BASIC SCAN
        </button>
        <button 
          onClick={() => setMode('lens')}
          className={`w-[130px] text-[9px] font-bold py-2.5 uppercase rounded transition-all flex items-center justify-center gap-1 ${
            mode === 'lens' ? "bg-gold text-black" : "text-[#A3A3A3] hover:text-white"
          }`}
        >
          <Sparkle weight="fill" className={mode === 'lens' ? 'text-black' : 'text-[var(--color-gold-base)]'} /> ADVANCED SCAN
        </button>
      </div>

      {/* UPLOAD ZONE */}
      {!imageBase64 ? (
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`bg-[#111111]/60 backdrop-blur-md rounded-xl h-[340px] flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all group border border-dashed ${
            isDragging ? 'border-[var(--color-gold-base)]' : 'border-[#222222] hover:border-[var(--color-gold-base)]/50'
          }`}
        >
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
          <Aperture weight="light" className="text-5xl text-[var(--color-gold-base)] mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xs font-bold mb-2 text-white uppercase tracking-[0.2em]">Khởi tạo không gian</h3>
          <p className="text-[#A3A3A3] text-[10px] font-light mb-6 tracking-wide leading-relaxed">
            Kéo thả ảnh nội thất vào đây<br/>hoặc dùng phím <b className="text-white bg-[#050505] px-1 py-0.5 rounded border border-[#222222]">Ctrl + V</b> để dán ảnh
          </p>
          <span className="bg-[#050505] border border-[#222222] text-[#A3A3A3] px-6 py-2.5 rounded text-[9px] font-bold uppercase tracking-widest group-hover:bg-gold group-hover:text-black transition-all">
            Chọn Tệp
          </span>
        </div>
      ) : (
        /* PREVIEW ZONE */
        <div className="bg-[#111111]/60 backdrop-blur-md border border-[#222222] rounded-xl overflow-hidden relative min-h-[340px] flex flex-col">
          <button 
            onClick={() => setImageBase64(null)}
            className="absolute top-4 right-4 z-30 w-8 h-8 bg-[#050505]/80 border border-[#222222] rounded-full flex items-center justify-center text-[#A3A3A3] hover:text-red-500 transition-all"
          >
            <X weight="bold" className="text-xs" />
          </button>
          
          <div className="relative flex-1 bg-[#030303] flex items-center justify-center p-4 min-h-[200px] overflow-hidden">
            <img src={imageBase64} alt="preview" className="max-w-full max-h-[350px] object-contain drop-shadow-xl rounded" />
          </div>
          
          <div className="bg-[#050505] border-t border-[#222222] p-4 w-full shrink-0">
            <button 
              onClick={triggerScan}
              className="w-full bg-gold text-black font-black text-[10px] uppercase tracking-[0.2em] py-3.5 rounded hover:bg-white transition-all flex items-center justify-center gap-2 glow-gold"
            >
              <Scan weight="bold" className="text-lg" /> TIẾN HÀNH QUÉT ẢNH NÀY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
