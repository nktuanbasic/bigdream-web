"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User, SignOut, Coin } from '@phosphor-icons/react';

interface WalletInfo {
  bas: number;
  adv: number;
  coin: number;
}

export default function GlobalAuthNav() {
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // Redirect to current domain
      }
    });
    if (error) alert("Lỗi đăng nhập: " + error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="fixed top-0 right-0 z-[100] p-4 flex justify-end w-full pointer-events-none">
      <div className="pointer-events-auto">
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="text-[10px] bg-white text-black hover:bg-gray-200 border border-transparent px-5 py-2.5 rounded uppercase font-bold transition-all flex items-center gap-2 shadow-lg"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="G" />
            Đăng nhập
          </button>
        ) : (
          <div className="flex items-center gap-3 bg-[#111111]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[var(--color-gold-base)]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all">
            <div className="flex flex-col text-right mr-2 hidden sm:flex">
              <span className="text-[8px] text-[#A3A3A3] uppercase font-bold tracking-widest mb-1">Ví của bạn</span>
              <div className="flex gap-1.5 items-center">
                <span className="text-[9px] text-white bg-[#050505] px-1.5 py-0.5 rounded border border-[#222222]" title="Lượt Cơ Bản">
                  CB: <b className="text-white">{walletInfo.bas}</b>
                </span>
                <span className="text-[9px] text-white bg-[#050505] px-1.5 py-0.5 rounded border border-[#222222]" title="Lượt VIP">
                  VIP: <b className="text-[var(--color-gold-base)]">{walletInfo.adv}</b>
                </span>
                <span className="text-[9px] text-black bg-gold px-1.5 py-0.5 rounded border border-[var(--color-gold-base)] font-bold flex items-center gap-1">
                  <Coin weight="fill" /> <b>{walletInfo.coin}</b>
                </span>
              </div>
            </div>
            <div className="w-px h-8 bg-[#222222] hidden sm:block"></div>
            <div className="flex gap-2">
              <button className="text-[9px] bg-[var(--color-gold-base)]/10 text-[var(--color-gold-base)] hover:bg-gold hover:text-black border border-[var(--color-gold-base)]/30 px-3 py-1.5 rounded uppercase font-bold transition-all hidden sm:block">
                Nạp Coin
              </button>
              <button className="text-[9px] bg-[#050505] text-white border border-[#222222] hover:border-[#A3A3A3] px-3 py-1.5 rounded uppercase font-bold flex items-center gap-1 transition-all">
                <User weight="bold" /> <span className="hidden sm:inline">Tài khoản</span>
              </button>
            </div>
            <button onClick={handleLogout} className="text-[#A3A3A3] hover:text-red-500 ml-1 transition-colors" title="Đăng xuất">
              <SignOut weight="bold" className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
