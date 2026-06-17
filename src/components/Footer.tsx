"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-obsidian-deep border-t border-glass-border pt-20 pb-10 px-4 md:px-12 relative z-10">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Footer Top: Brand & Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-headline-lg text-2xl font-extrabold text-primary tracking-tight mb-4 inline-block transition-opacity hover:opacity-80">
              BIG DREAM
            </Link>
            <p className="text-sm leading-relaxed text-on-surface-variant mb-6">
              {language === 'vi' ? (
                <>Hệ sinh thái AI kiến trúc tối cao. <br/>Khởi tạo không gian, không giới hạn.</>
              ) : (
                <>The ultimate architectural AI ecosystem. <br/>Generate spaces, without limits.</>
              )}
            </p>
          </div>

          {/* Nav Cols */}
          <div>
            <h4 className="text-on-surface font-bold mb-4 uppercase tracking-wider text-sm">{language === 'vi' ? 'Hệ Sinh Thái' : 'Ecosystem'}</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><Link href="/see" className="hover:text-primary transition-colors">SEE Engine</Link></li>
              <li><Link href="/model" className="hover:text-primary transition-colors">{language === 'vi' ? 'Thư viện Model' : 'Model Library'}</Link></li>
              <li><Link href="/lens" className="hover:text-primary transition-colors">{language === 'vi' ? 'Quét Vật Liệu (Lens)' : 'Material Scanner (Lens)'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-on-surface font-bold mb-4 uppercase tracking-wider text-sm">{language === 'vi' ? 'Cộng Đồng' : 'Community'}</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><Link href="/think" className="hover:text-primary transition-colors">Blog (Think)</Link></li>
              <li><Link href="/class" className="hover:text-primary transition-colors">Masterclass</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">{language === 'vi' ? 'Về chúng tôi' : 'About us'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-on-surface font-bold mb-4 uppercase tracking-wider text-sm">{language === 'vi' ? 'Công Ty' : 'Company'}</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><a href="https://www.facebook.com/tuan.khanh.722968?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{language === 'vi' ? 'Liên hệ' : 'Contact'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{language === 'vi' ? 'Tuyển dụng' : 'Careers'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{language === 'vi' ? 'Đối tác' : 'Partners'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-on-surface font-bold mb-4 uppercase tracking-wider text-sm">{language === 'vi' ? 'Pháp Lý' : 'Legal'}</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">{language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{language === 'vi' ? 'Quy định hoàn tiền' : 'Refund Policy'}</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="hairline mb-8" />

        {/* Footer Bottom: Copyright & Back To Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-muted">
          <p>
            &copy; {new Date().getFullYear()} Big Dream. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container-high border border-glass-border hover:border-primary/40 rounded-md text-on-surface transition-all duration-300"
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
