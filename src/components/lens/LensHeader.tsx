"use client";

import React from 'react';
import Link from 'next/link';
import { Diamond, User, SignOut, Coin } from '@phosphor-icons/react';

interface WalletInfo {
  bas: number;
  adv: number;
  coin: number;
}

interface LensHeaderProps {
  isLoggedIn: boolean;
  walletInfo?: WalletInfo;
  onLogin: () => void;
  onLogout: () => void;
}

export default function LensHeader({ isLoggedIn, walletInfo, onLogin, onLogout }: LensHeaderProps) {
  return (
    <header className="w-full p-4 md:p-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#222222] pb-6 z-50 relative mx-auto">
      <div className="text-center md:text-left cursor-pointer">
        <Link href="/">
          <h1 className="text-2xl font-black flex items-center justify-center md:justify-start gap-3 text-white tracking-[0.2em]">
            <Diamond weight="fill" className="text-[var(--color-gold-base)]" />
            <span>LUXURY CURATOR</span>
          </h1>
          <p className="text-[#A3A3A3] text-[9px] mt-2 tracking-[0.3em] uppercase">DeepVision Engine V7.4</p>
        </Link>
      </div>

      {!isLoggedIn ? (
        <div className="flex gap-2 transition-all">
          <button
            onClick={onLogin}
            className="text-[10px] bg-white text-black hover:bg-gray-200 border border-transparent px-5 py-2.5 rounded uppercase font-bold transition-all flex items-center gap-2"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="G" />
            Đăng nhập để sử dụng
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-[#111111]/60 backdrop-blur-md px-4 py-2 rounded-lg w-full md:w-auto justify-between border border-[var(--color-gold-base)]/20 shadow-[0_0_10px_rgba(212,175,55,0.05)] transition-all">
          <div className="flex flex-col text-right mr-2">
            <span className="text-[8px] text-[#A3A3A3] uppercase font-bold tracking-widest mb-1">Tài nguyên của Quý khách</span>
            <div className="flex gap-1.5 items-center">
              <span className="text-[9px] text-white bg-[#050505] px-1.5 py-0.5 rounded border border-[#222222]" title="Lượt Cơ Bản">
                Cơ bản: <b className="text-white">{walletInfo?.bas ?? '--'}</b>
              </span>
              <span className="text-[9px] text-white bg-[#050505] px-1.5 py-0.5 rounded border border-[#222222]" title="Lượt VIP">
                VIP: <b className="text-[var(--color-gold-base)]">{walletInfo?.adv ?? '--'}</b>
              </span>
              <span className="text-[9px] text-black bg-gold px-1.5 py-0.5 rounded border border-[var(--color-gold-base)] font-bold flex items-center gap-1">
                <Coin weight="fill" /> <b>{walletInfo?.coin ?? '--'}</b>
              </span>
            </div>
          </div>
          <div className="w-px h-8 bg-[#222222] hidden sm:block"></div>
          <div className="flex gap-2">
            <button className="text-[9px] bg-[var(--color-gold-base)]/10 text-[var(--color-gold-base)] hover:bg-gold hover:text-black border border-[var(--color-gold-base)]/30 px-3 py-1.5 rounded uppercase font-bold transition-all">
              Nạp Coin
            </button>
            <button className="text-[9px] bg-[#050505] text-white border border-[#222222] hover:border-[#A3A3A3] px-3 py-1.5 rounded uppercase font-bold flex items-center gap-1 transition-all">
              <User weight="bold" /> Tài khoản
            </button>
          </div>
          <button onClick={onLogout} className="text-[#A3A3A3] hover:text-red-500 ml-1 transition-colors" title="Đăng xuất">
            <SignOut weight="bold" className="text-lg" />
          </button>
        </div>
      )}
    </header>
  );
}
