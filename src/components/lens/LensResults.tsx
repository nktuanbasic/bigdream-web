"use client";

import React from 'react';
import { ClockCounterClockwise, Target, Books, Users, MagicWand, ShieldCheck } from '@phosphor-icons/react';

interface LensResultsProps {
  status: 'idle' | 'loading' | 'success';
  loadingText?: string;
  resultData?: any;
  onUnlockDiscovery?: () => void;
}

const STATIC_HISTORY = [
  {
    id: 1,
    title: 'Eames Lounge Chair',
    brand: 'Herman Miller',
    category: 'Furniture',
    match: 98,
    estPrice: '$7,500',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKMDsNC5galOOEyf4ufXVWMFuQXYfVY2jlCWRCSPzqdr_2WNb3fg3cP532ctp9NfHnI7ZMIYTlzGPuNVfgaiw-2UXgSwsczLtl8I5fX28npzRtbHYkgvUwGswQ4FINnu8bHdTQLbaLgsaDL0ixcb5TrMKOdUV8g5eTGb17SZ9JTwvfGKC9AymcafZaFL6451QB3gV6xTZhswtkj60yw5HKIFLAQwvKLEuZ4l3fDjM5yFkjA7qmBpd6HrXN33sNY6EUDYCfH98Mq3DE',
    desc: 'Classic mid-century modern lounge chair featuring molded plywood and leather.'
  },
  {
    id: 2,
    title: 'PH 5 Pendant',
    brand: 'Louis Poulsen',
    category: 'Lighting',
    match: 94,
    estPrice: '$1,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRJCDkVmjY04o0uh6fTU3-l_rXVJn_B4HI6WxM1O2l_iCNq04XohYi41y78q2UCbQjUyZbNa_aKU5qnmTvNH0BMP-R1n8CcZ7BD60vThNmWBWFaNtZk-dYjtMwpyGs5MSzerONcr8z4CzwmjoUW1tBApPXKc4CCAHFWEz0Msh8OSOgTZMyhNWVeVguATUmdarZzPPL0kbarFXqZiCyplX6pAvPcTrLNTJDFWvYJmgGhGMYNMndnMehaqA66TsZMp6haYwUgQKKikr',
    desc: 'Iconic glare-free lighting design utilizing a reflective three-shade system.'
  },
  {
    id: 3,
    title: 'Nero Marquina Marble',
    brand: 'Stone',
    category: 'Material',
    match: 82,
    estPrice: 'Source Required',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABa0zxe6bA6tm-rz3Al_wzfaFbdPr8N1skJGWth0DFe7i7S0z3-XewuXAc5H4HEREYVFOsgMVp6yMvy3RGY3D8W1_rD7MeRdfHY7VPEy8yKGaSJCdnWval2YTCGAPymsLWK4HeLtbLHrsukfz2mWcX5y-Dt4pyrpc3sGE_vO0i-36ZaR1tYGzrnmkFTgPAwBuxtmNf4Dn1EzgDs8IGayOJN45FYFI4HKRIA9h-ff6PsB8e46ji3S0hPMvAuFxEszOzEVgATkOF-MB0',
    desc: 'High-quality black stone marble extracted from the region of Markina, Northern Spain.',
    colSpan: 'md:col-span-2 lg:col-span-1'
  }
];

export default function LensResults({ status, loadingText, resultData, onUnlockDiscovery }: LensResultsProps) {
  if (status === 'loading') {
    return (
      <div className="glass-panel w-full z-10 flex flex-col items-center justify-center p-16 text-center min-h-[450px] rounded-xl inner-glow border-primary/50">
        <div className="w-16 h-16 rounded-full border-2 border-glass-border flex items-center justify-center bg-obsidian-deep/50 text-primary mb-6 relative">
          <Target size={32} weight="light" className="animate-spin" />
          <div className="absolute top-0 left-0 w-full h-full rounded-full border border-primary/50 scale-110 animate-ping"></div>
        </div>
        <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2">Establishing AI Link</p>
        <p className="font-body-md text-body-md text-on-surface-variant">{loadingText || 'Cross-referencing database... please wait.'}</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="w-full z-20 flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-glass-border pb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-3">
            <ShieldCheck size={32} className="text-primary" />
            Scan Completed
          </h2>
          <span className="font-label-sm text-label-sm text-primary border border-primary/30 w-max px-2 py-1 rounded bg-primary/10">MATCH FOUND</span>
        </div>
        
        <div className="glass-panel p-8 rounded-xl flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest border border-glass-border px-2 py-0.5 rounded text-[10px]">Brand</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest border border-glass-border px-2 py-0.5 rounded text-[10px]">{resultData?.main_brand || 'Unknown'}</span>
          </div>
          <h3 className="font-display-lg text-4xl text-on-surface">{resultData?.main_product || 'Design Object'}</h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{resultData?.design_style || 'Details extracted from the visual query.'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Discovery */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-glass-border pb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest flex items-center gap-2">
                <MagicWand size={20} weight="fill" className="text-primary" /> AI Discovery
              </h3>
              <button 
                onClick={onUnlockDiscovery}
                className="bg-charcoal-surface border border-primary text-primary hover:bg-primary hover:text-obsidian-deep px-4 py-2 rounded font-label-sm text-label-sm uppercase tracking-widest transition-all flex items-center gap-2"
              >
                Unlock Suggestions <span className="bg-error-container text-error px-1.5 py-0.5 rounded text-[10px] ml-1">-1 Token</span>
              </button>
            </div>
            <div className="glass-panel rounded-xl h-[300px] flex flex-col items-center justify-center text-on-surface-variant p-8 text-center border-dashed">
               <p className="font-body-md text-body-md">
                Unlock to allow AI to penetrate the database and fetch 10 exact matching CAD models.
               </p>
            </div>
          </div>

          {/* Community Assets */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-glass-border pb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest flex items-center gap-2">
                <Users size={20} weight="fill" className="text-primary" /> Community Assets
              </h3>
              <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded font-label-sm text-[10px] uppercase tracking-widest">
                Free
              </span>
            </div>
            <div className="flex flex-col gap-4 p-8 glass-panel rounded-xl h-[300px] items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-glass-border border-t-primary animate-spin"></div>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-4">Searching open sources...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Idle state returns history
  return (
    <>
      <div className="flex items-center justify-between border-b border-glass-border pb-4">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-3">
          <ClockCounterClockwise size={32} className="text-primary" />
          Recently Identified
        </h2>
        <button className="font-label-sm text-label-sm uppercase tracking-tighter text-on-surface-variant hover:text-primary transition-colors">
          View Complete Log
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATIC_HISTORY.map((item) => (
          <article key={item.id} className={`card-group glass-panel rounded-lg overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-300 relative group ${item.colSpan || ''}`}>
            <div className="h-[300px] w-full relative overflow-hidden bg-surface-container-low">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep/90 to-transparent opacity-60 transition-opacity duration-400 group-hover:opacity-30 z-10"></div>
              
              {/* Match Badge */}
              <div className="absolute top-4 right-4 z-20 bg-obsidian-deep/80 backdrop-blur-md border border-primary/30 rounded-full px-3 py-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary">{item.match}% MATCH</span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col gap-4 relative z-20 bg-charcoal-surface/90 flex-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest border border-glass-border px-2 py-0.5 rounded text-[10px]">{item.category}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest border border-glass-border px-2 py-0.5 rounded text-[10px]">{item.brand}</span>
                </div>
                <h3 className="font-body-lg text-body-lg text-on-surface font-semibold">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">{item.desc}</p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">{item.estPrice}</span>
                <button className="text-primary hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container active:scale-95">
                  <Books size={20} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
