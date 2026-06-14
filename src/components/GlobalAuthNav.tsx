"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { User, SignOut, Coin, MagnifyingGlass } from '@phosphor-icons/react';

interface WalletInfo {
  bas: number;
  adv: number;
  coin: number;
}

const NAV_LINKS = [
  { label: 'SEE', href: '/see' },
  { label: 'MODEL', href: '/model' },
  { label: 'LENS', href: '/lens' },
  { label: 'THINK', href: '/think' },
  { label: 'CLASS', href: '/class' },
  { label: 'ABOUT', href: '/about' },
];

export default function GlobalAuthNav() {
  const pathname = usePathname();
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
    <nav className="fixed top-0 w-full bg-surface/60 backdrop-blur-3xl border-b border-glass-border flex justify-between items-center px-4 md:px-margin-desktop py-4 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-headline-lg text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
          Big Dream
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body-md text-body-md px-3 py-1 transition-colors ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden xl:block">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
          <input
            className="bg-charcoal-surface border border-glass-border rounded-md pl-10 pr-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-surface-container-high transition-all w-64"
            placeholder="Search parameters..."
            type="text"
          />
        </div>

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
    </nav>
  );
}
