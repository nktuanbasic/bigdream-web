"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Supabase client automatically parses the URL hash (#access_token=...)
    // Just wait for it to process, then redirect to home
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      } else {
        // If no session found yet, wait for onAuthStateChange
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            router.push('/');
          }
        });
        return () => subscription.unsubscribe();
      }
    });
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#050505] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#A3A3A3] border-t-[var(--color-gold-base)] rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-gold-base)]">Đang xác thực phiên đăng nhập...</p>
      </div>
    </div>
  );
}
