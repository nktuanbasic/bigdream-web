"use client";

import React from 'react';
import { Cube, Sparkle, MagicWand, Users } from '@phosphor-icons/react';

interface LensResultsProps {
  status: 'idle' | 'loading' | 'success';
  loadingText?: string;
  resultData?: any;
  onUnlockDiscovery?: () => void;
}

export default function LensResults({ status, loadingText, resultData, onUnlockDiscovery }: LensResultsProps) {
  if (status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-[#A3A3A3] p-10 h-full min-h-[450px]">
        <Cube weight="light" className="text-6xl mb-6 opacity-20" />
        <p className="text-[10px] uppercase tracking-[0.2em] font-light text-center">
          Hệ thống phân tích không gian<br/>Đang chờ dữ liệu đầu vào
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="absolute inset-0 bg-[#121212] z-10 flex flex-col items-center justify-center p-8 text-center min-h-[450px]">
        <div className="w-12 h-12 border-2 border-[#A3A3A3] border-t-[var(--color-gold-base)] rounded-full animate-spin mb-6"></div>
        <p className="text-[10px] text-[var(--color-gold-base)] uppercase tracking-[0.2em] font-bold mb-2">Đang thiết lập liên kết AI</p>
        <p className="text-[9px] text-[#A3A3A3]">{loadingText || 'Quá trình này có thể mất 3-5 giây...'}</p>
      </div>
    );
  }

  // TODO: Add detailed result rendering logic here based on resultData
  return (
    <div className="absolute inset-0 bg-[#121212] z-20 overflow-y-auto p-6 md:p-8 custom-scrollbar">
      {/* KẾT QUẢ CHÍNH */}
      <div className="w-full mb-8">
        <div className="text-white">Rendering results for: {resultData?.main_brand}</div>
      </div>

      {/* LƯỠNG LONG CHẦU NGUYỆT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* BÊN TRÁI: AI KHÁM PHÁ BẪY CHUỘT (TỐN COIN) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <h3 className="text-[12px] text-white font-black uppercase tracking-widest flex items-center gap-2">
              <MagicWand weight="fill" className="text-[var(--color-gold-base)]" /> AI Khám Phá (Cùng hệ sinh thái)
            </h3>
            <button 
              onClick={onUnlockDiscovery}
              className="bg-[#050505] border border-[var(--color-gold-base)] text-[var(--color-gold-base)] hover:bg-gold hover:text-black px-4 py-2 rounded text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-1"
            >
              Mở khóa đề xuất <span className="bg-red-500 text-white px-1 py-0.5 rounded text-[7px] ml-1">-1 Coin</span>
            </button>
          </div>
          
          <div className="bg-[#050505] border border-dashed border-[#222222] rounded-xl h-[300px] flex flex-col items-center justify-center text-[#A3A3A3]">
             {/* Replace lock key with standard text or icon if lock-key not imported */}
             <p className="text-[10px] uppercase tracking-widest text-center px-4">
              Bấm mở khóa để AI thâm nhập hệ thống 3dsky và trang chủ hãng<br/>nhằm tìm kiếm 10 mẫu thiết kế tương tự.
             </p>
          </div>
        </div>

        {/* BÊN PHẢI: KHO CỘNG ĐỒNG (FREE) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <h3 className="text-[12px] text-white font-black uppercase tracking-widest flex items-center gap-2">
              <Users weight="fill" className="text-[var(--color-gold-base)]" /> Kho báu Cộng đồng
            </h3>
            <span className="bg-green-500/20 text-green-500 border border-green-500/30 px-2 py-1 rounded text-[8px] font-bold uppercase">
              Miễn phí
            </span>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="text-center p-8">
               <div className="w-6 h-6 border-2 border-[var(--color-gold-base)] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
