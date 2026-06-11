"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LensHeader from '@/components/lens/LensHeader';
import LensScanner from '@/components/lens/LensScanner';
import LensResults from '@/components/lens/LensResults';
import { supabase } from '@/lib/supabase/client';

export default function BigLensPage() {
  const [scanStatus, setScanStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [loadingText, setLoadingText] = useState("");
  const [resultData, setResultData] = useState<any>(null);

  const callAnalyzeAPI = async (action: string, payload: any, mode: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Vui lòng đăng nhập để sử dụng!");
      return null;
    }

    setScanStatus('loading');
    setLoadingText(mode === 'lens' ? "DeepVision AI đang quét tệp vector..." : "Basic Scan đang phân tích hình học...");

    try {
      const res = await fetch('/api/lens/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ action, payload, mode })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi server');
      
      
      setResultData(data.data);
      setScanStatus('success');
      return data;
    } catch (err: any) {
      alert(err.message);
      setScanStatus('idle');
      return null;
    }
  };

  const handleTextSearch = async (text: string, mode: 'basic' | 'lens') => {
    await callAnalyzeAPI('text', text, mode);
  };

  const handleImageScan = async (imageBase64: string, mode: 'basic' | 'lens') => {
    await callAnalyzeAPI('image', imageBase64, mode);
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col bg-[#070707] text-[#e5e5e8] selection:bg-[var(--color-gold-base)] selection:text-black overflow-x-hidden">
      {/* BACKGROUND LOBBY TỪ BIGDREAM WEB */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/C_LOBBY_007.png" 
          alt="Lens Background" 
          fill 
          className="object-cover opacity-20" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#070707]"></div>
      </div>

      <LensHeader />

      <div className="w-full max-w-7xl flex-1 relative p-4 md:p-8 pt-0 mt-4 md:mt-0 z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <LensScanner 
            onTextSearch={handleTextSearch} 
            onImageScan={handleImageScan} 
          />
          <div className="lg:col-span-7 bg-[#121212]/60 backdrop-blur-md border border-[#222222] rounded-xl flex flex-col relative overflow-hidden min-h-[450px]">
            <LensResults 
              status={scanStatus} 
              loadingText={loadingText} 
              resultData={resultData} 
              onUnlockDiscovery={() => alert('Unlock')} 
            />
          </div>
        </div>
      </div>

      {/* FOOTER ĐỒNG BỘ */}
      <footer className="relative w-full max-w-7xl mx-auto border-t border-[#222222] mt-12 py-10 px-8 flex flex-col md:flex-row justify-between gap-8 text-[#A3A3A3] z-50">
        <div className="flex-1">
          <h3 className="text-[var(--color-gold-base)] font-black tracking-[0.2em] mb-2">BIG LENS</h3>
          <p className="text-[9px] uppercase tracking-widest leading-loose text-[#A3A3A3]">
            Hệ thống nhận diện nội thất cao cấp thuộc Big Dream Studio.
          </p>
          <p className="text-[9px] mt-6 opacity-50">&copy; 2026 Big Dream Web. All rights reserved.</p>
        </div>
        <div className="flex flex-col md:items-end gap-3 text-[10px] uppercase font-bold tracking-widest">
          <a href="https://www.facebook.com/tuan.khanh.722968/" target="_blank" className="hover:text-[var(--color-gold-base)] transition-colors">Fanpage</a>
          <a href="https://zalo.me/0378346544" target="_blank" className="hover:text-[var(--color-gold-base)] transition-colors">Hỗ trợ kĩ thuật</a>
        </div>
      </footer>
    </main>
  );
}
