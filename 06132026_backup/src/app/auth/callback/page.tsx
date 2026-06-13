"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra xem URL có chứa lỗi không (Supabase sẽ trả về ?error=... nếu sai Client Secret)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      if (error) {
        alert(`Lỗi từ Supabase/Google: ${errorDescription || error}. (Sếp check lại Client Secret nhé!)`);
        router.push('/');
        return;
      }
      
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      if (hashParams.get('error')) {
        alert(`Lỗi từ Supabase: ${hashParams.get('error_description')}`);
        router.push('/');
        return;
      }
    }

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        alert("Lỗi lấy session: " + error.message);
        router.push('/');
        return;
      }
      
      if (session) {
        router.push('/');
      } else {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            router.push('/');
          }
        });
        
        // Timeout 10s nếu bị kẹt thì báo lỗi
        const timeout = setTimeout(() => {
          alert("Lỗi: Quá thời gian xác thực. Supabase không phản hồi token hợp lệ.");
          router.push('/');
        }, 10000);

        return () => {
          subscription.unsubscribe();
          clearTimeout(timeout);
        };
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
