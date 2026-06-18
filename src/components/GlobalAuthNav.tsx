"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { User, SignOut, Coin, MagnifyingGlass, Translate } from '@phosphor-icons/react';
import { useLanguage } from '@/context/LanguageContext';

interface WalletInfo {
  bas: number;
  adv: number;
  coin: number;
}

const NAV_LINKS = [
  { label: 'SEE', href: '/see' },
  { label: 'LENS', href: '/lens' },
  { label: 'MODEL', href: '/model' },
  { label: 'CLASS', href: '/class' },
  { label: 'THINK', href: '/think' },
  { label: 'ABOUT', href: '/about' },
  { label: 'WORK', href: '/work' },
];

export default function GlobalAuthNav() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({ bas: 0, adv: 0, coin: 0 });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (session) fetchWallet(session.access_token);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) fetchWallet(session.access_token);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchWallet = async (token: string) => {
    try {
      const res = await fetch('/api/lens/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'get_wallet' })
      });
      const data = await res.json();
      if (data.wallet) {
        setWalletInfo({
          bas: data.wallet.free_basic_today,
          adv: data.wallet.free_adv_today,
          coin: data.wallet.purchased_coins
        });
      }
    } catch (err) {
      console.error("Lỗi lấy ví tiền:", err);
    }
  };

  const handleLogin = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        alert("Lỗi: Chưa nhận được NEXT_PUBLIC_SUPABASE_URL. Hãy Redeploy.");
        return;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback'
        }
      });
      if (error) alert("Lỗi Supabase Auth: " + error.message);
    } catch (e: any) {
      alert("Lỗi gọi Supabase: " + e.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 w-full bg-surface/60 backdrop-blur-3xl border-b border-glass-border flex justify-between items-center px-4 md:px-margin-desktop h-[var(--nav-height)] z-50">
      <Link href="/" className="font-headline-lg text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
        BIG DREAM
      </Link>

      <div className="flex items-center gap-6 xl:gap-8">
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body-md text-sm xl:text-base px-2 py-1 transition-all relative group ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-white rounded-sm'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-primary rounded-t-sm" />
                )}
                {!isActive && (
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-white/30 transition-all duration-300 group-hover:w-full rounded-t-sm" />
                )}
              </Link>
            );
          })}
        </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden xl:block">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
          <input
            className="bg-charcoal-surface border border-glass-border rounded-md pl-10 pr-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-surface-container-high transition-all w-64"
            placeholder={language === 'vi' ? "Tìm kiếm thông số..." : "Search parameters..."}
            type="text"
          />
        </div>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-glass-border bg-charcoal-surface hover:bg-surface-container-high hover:border-primary transition-all duration-300"
          title={language === 'vi' ? "Switch to English" : "Chuyển sang Tiếng Việt"}
        >
          <Translate size={18} className={language === 'en' ? 'text-primary' : 'text-on-surface-variant'} />
          <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            {language === 'vi' ? (
              <><span className="text-primary">VI</span> / EN</>
            ) : (
              <>VI / <span className="text-primary">EN</span></>
            )}
          </span>
        </button>

        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-primary text-on-primary px-6 py-2 rounded-md font-bold hover:bg-primary-fixed transition-colors active:scale-95 duration-200"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-charcoal-surface border border-glass-border rounded-md px-4 py-1.5 inner-glow">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">CB: {walletInfo.bas}</span>
              <span className="w-1 h-1 rounded-full bg-glass-border"></span>
              <span className="text-[10px] text-primary uppercase tracking-widest font-bold">VIP: {walletInfo.adv}</span>
              <span className="w-1 h-1 rounded-full bg-glass-border"></span>
              <span className="text-[11px] text-primary font-bold flex items-center gap-1">
                <Coin weight="fill" /> {walletInfo.coin}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Link href="/account" className="w-10 h-10 rounded-md bg-surface-container-high hover:bg-charcoal-surface border border-glass-border overflow-hidden flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300">
                <User size={24} weight="fill" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-md bg-surface-container-high hover:bg-error-container border border-glass-border hover:border-error hover:text-error text-on-surface-variant transition-colors flex items-center justify-center"
                title="Disconnect Wallet"
              >
                <SignOut size={20} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
);
}
