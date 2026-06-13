"use client";

import React, { useState } from 'react';
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
    setLoadingText(mode === 'lens' ? "DeepVision AI is analyzing geometry..." : "Basic Scan is cross-referencing...");

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
    <main className="flex-grow pt-[120px] pb-24 px-4 md:px-margin-desktop w-full max-w-[1920px] mx-auto flex flex-col gap-12 md:gap-[120px] bg-background text-on-surface selection:bg-primary/30 selection:text-primary min-h-screen">
      <LensScanner 
        onTextSearch={handleTextSearch} 
        onImageScan={handleImageScan} 
      />
      
      <section className="w-full flex flex-col gap-8">
        <LensResults 
          status={scanStatus} 
          loadingText={loadingText} 
          resultData={resultData} 
          onUnlockDiscovery={() => alert('Unlock Features Coming Soon')} 
        />
      </section>
    </main>
  );
}
