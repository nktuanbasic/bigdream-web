"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 px-4 md:px-12 relative z-10">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Footer Top: Brand & Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-headline-lg text-2xl font-extrabold text-primary tracking-tight mb-4 inline-block">
              Big Dream
            </Link>
            <p className="text-sm text-[#a09a8e] mb-6">
              Hệ sinh thái AI kiến trúc tối cao. <br/>
              Khởi tạo không gian, không giới hạn.
            </p>
          </div>

          {/* Nav Cols */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Hệ Sinh Thái</h4>
            <ul className="space-y-3 text-sm text-[#a09a8e]">
              <li><Link href="/see" className="hover:text-primary transition-colors">SEE Engine</Link></li>
              <li><Link href="/model" className="hover:text-primary transition-colors">Thư viện Model</Link></li>
              <li><Link href="/lens" className="hover:text-primary transition-colors">Quét Vật Liệu (Lens)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Cộng Đồng</h4>
            <ul className="space-y-3 text-sm text-[#a09a8e]">
              <li><Link href="/think" className="hover:text-primary transition-colors">Blog (Think)</Link></li>
              <li><Link href="/class" className="hover:text-primary transition-colors">Masterclass</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Về chúng tôi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Công Ty</h4>
            <ul className="space-y-3 text-sm text-[#a09a8e]">
              <li><a href="#" className="hover:text-primary transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Đối tác</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Pháp Lý</h4>
            <ul className="space-y-3 text-sm text-[#a09a8e]">
              <li><a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Quy định hoàn tiền</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Footer Bottom: Copyright & Back To Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6b6560]">
          <p>
            &copy; {new Date().getFullYear()} Big Dream. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-white transition-all duration-200"
          >
            <span>Back to top</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
