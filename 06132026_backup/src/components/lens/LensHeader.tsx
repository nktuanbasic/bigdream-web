"use client";

import React from 'react';
import Link from 'next/link';
import { Diamond } from '@phosphor-icons/react';

export default function LensHeader() {
  return (
    <header className="w-full p-4 md:p-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#222222] pb-6 z-50 relative mx-auto">
      <div className="text-center md:text-left cursor-pointer">
        <Link href="/">
          <h1 className="text-2xl font-black flex items-center justify-center md:justify-start gap-3 text-white tracking-[0.2em]">
            <Diamond weight="fill" className="text-[var(--color-gold-base)]" />
            <span>BIG LENS</span>
          </h1>
          <p className="text-[#A3A3A3] text-[9px] mt-2 tracking-[0.3em] uppercase">DeepVision Engine V7.4</p>
        </Link>
      </div>
      {/* Auth UI has been moved to GlobalAuthNav */}
    </header>
  );
}
