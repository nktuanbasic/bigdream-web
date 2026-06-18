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
    <footer className="bg-[#0e0e0e] border-t border-primary/20 w-full mt-auto">
      <div className="grid grid-cols-1 gap-6 px-6 md:px-16 max-w-[1440px] mx-auto py-12">
        {/* Branding and Links Row */}
        <div className="col-span-full flex flex-col lg:flex-row justify-between gap-12 lg:flex-row-reverse">
          
          {/* Branding Column */}
          <div className="lg:w-1/4 flex flex-col space-y-4 mb-8 lg:mb-0 lg:items-end">
            <Link href="/" className="font-headline-lg text-4xl tracking-tighter text-primary font-bold" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
              Big Dream
            </Link>
            <p className="font-body-md text-base lg:text-right text-primary">
              {language === 'vi' ? (
                <>Hệ sinh thái AI kiến trúc tối cao.<br/>Khởi tạo không gian, không giới hạn.</>
              ) : (
                <>The ultimate architectural AI ecosystem.<br/>Generate spaces, without limits.</>
              )}
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a className="w-8 h-8 border border-[#F5F2E8]/20 flex items-center justify-center hover:border-primary transition-colors duration-300" href="#">
                <div className="w-5 h-5 overflow-hidden">
                  <img alt="Facebook" className="w-[200%] h-[200%] max-w-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0IDSIaWC-CSRo8Bkhiy76VKNz7ENC20dp1V0JOvTN-TPecVWJ487v2XjQwDxaoWMTp6MGpiHyyLNhYYprB9NM3JrWHfdC1v0OSta6CCFG1l0qrykz7vjvN4h3tIq5wnYRXZOPS7JliNYhzpggyWkhpsPvjXpVQgXUhAhadTo7Gfmqt5VW3rLMOvEercbNiRYVcdhXGxzMtl6h8Vxk88M0s3tGkLlhK5bxNH9yA0B9yoUWBgfJ3ff1S1BxPGBM8l4t5l774wFCVvxe" style={{ objectPosition: '0% 0%' }} />
                </div>
              </a>
              <a className="w-8 h-8 border border-[#F5F2E8]/20 flex items-center justify-center hover:border-primary transition-colors duration-300" href="#">
                <div className="w-5 h-5 overflow-hidden">
                  <img alt="Instagram" className="w-[200%] h-[200%] max-w-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0IDSIaWC-CSRo8Bkhiy76VKNz7ENC20dp1V0JOvTN-TPecVWJ487v2XjQwDxaoWMTp6MGpiHyyLNhYYprB9NM3JrWHfdC1v0OSta6CCFG1l0qrykz7vjvN4h3tIq5wnYRXZOPS7JliNYhzpggyWkhpsPvjXpVQgXUhAhadTo7Gfmqt5VW3rLMOvEercbNiRYVcdhXGxzMtl6h8Vxk88M0s3tGkLlhK5bxNH9yA0B9yoUWBgfJ3ff1S1BxPGBM8l4t5l774wFCVvxe" style={{ objectPosition: '100% 0%' }} />
                </div>
              </a>
              <a className="w-8 h-8 border border-[#F5F2E8]/20 flex items-center justify-center hover:border-primary transition-colors duration-300" href="#">
                <div className="w-5 h-5 overflow-hidden">
                  <img alt="Gmail" className="w-[200%] h-[200%] max-w-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0IDSIaWC-CSRo8Bkhiy76VKNz7ENC20dp1V0JOvTN-TPecVWJ487v2XjQwDxaoWMTp6MGpiHyyLNhYYprB9NM3JrWHfdC1v0OSta6CCFG1l0qrykz7vjvN4h3tIq5wnYRXZOPS7JliNYhzpggyWkhpsPvjXpVQgXUhAhadTo7Gfmqt5VW3rLMOvEercbNiRYVcdhXGxzMtl6h8Vxk88M0s3tGkLlhK5bxNH9yA0B9yoUWBgfJ3ff1S1BxPGBM8l4t5l774wFCVvxe" style={{ objectPosition: '0% 100%' }} />
                </div>
              </a>
              <a className="w-8 h-8 border border-[#F5F2E8]/20 flex items-center justify-center hover:border-primary transition-colors duration-300" href="#">
                <div className="w-5 h-5 overflow-hidden">
                  <img alt="Zalo" className="w-[200%] h-[200%] max-w-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0IDSIaWC-CSRo8Bkhiy76VKNz7ENC20dp1V0JOvTN-TPecVWJ487v2XjQwDxaoWMTp6MGpiHyyLNhYYprB9NM3JrWHfdC1v0OSta6CCFG1l0qrykz7vjvN4h3tIq5wnYRXZOPS7JliNYhzpggyWkhpsPvjXpVQgXUhAhadTo7Gfmqt5VW3rLMOvEercbNiRYVcdhXGxzMtl6h8Vxk88M0s3tGkLlhK5bxNH9yA0B9yoUWBgfJ3ff1S1BxPGBM8l4t5l774wFCVvxe" style={{ objectPosition: '100% 100%' }} />
                </div>
              </a>
            </div>
          </div>

          {/* Links Grid (Compact) */}
          <div className="lg:flex-grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8">
            
            {/* ỨNG DỤNG */}
            <div className="flex flex-col">
              <h4 className="font-label-caps text-xs mb-4 uppercase tracking-widest text-primary">{language === 'vi' ? 'ỨNG DỤNG' : 'APPLICATIONS'}</h4>
              <ul className="space-y-2">
                <li><Link className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="/see">SEE</Link></li>
                <li><Link className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="/model">MODEL</Link></li>
                <li><Link className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="/lens">LENS</Link></li>
              </ul>
            </div>

            {/* HỌC TẬP */}
            <div className="flex flex-col">
              <h4 className="font-label-caps text-xs mb-4 uppercase tracking-widest text-primary">{language === 'vi' ? 'HỌC TẬP' : 'LEARNING'}</h4>
              <ul className="space-y-2">
                <li><Link className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="/think">THINK</Link></li>
                <li><Link className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="/class">CLASS</Link></li>
              </ul>
            </div>

            {/* THÔNG TIN */}
            <div className="flex flex-col">
              <h4 className="font-label-caps text-xs mb-4 uppercase tracking-widest text-primary">{language === 'vi' ? 'THÔNG TIN' : 'INFORMATION'}</h4>
              <ul className="space-y-2">
                <li><Link className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="/about">ABOUT</Link></li>
                <li><Link className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="/work">WORK</Link></li>
              </ul>
            </div>

            {/* VỀ CHÚNG TÔI */}
            <div className="flex flex-col">
              <h4 className="font-label-caps text-xs mb-4 uppercase tracking-widest text-primary">{language === 'vi' ? 'VỀ CHÚNG TÔI' : 'ABOUT US'}</h4>
              <ul className="space-y-2">
                <li><a className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="#">{language === 'vi' ? 'Liên hệ' : 'Contact'}</a></li>
                <li><a className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="#">{language === 'vi' ? 'Tuyển dụng' : 'Careers'}</a></li>
                <li><a className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="#">{language === 'vi' ? 'Đối tác' : 'Partners'}</a></li>
              </ul>
            </div>

            {/* CHÍNH SÁCH */}
            <div className="flex flex-col">
              <h4 className="font-label-caps text-xs mb-4 uppercase tracking-widest text-primary">{language === 'vi' ? 'CHÍNH SÁCH' : 'POLICIES'}</h4>
              <ul className="space-y-2">
                <li><a className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="#">{language === 'vi' ? 'Điều khoản' : 'Terms'}</a></li>
                <li><a className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="#">{language === 'vi' ? 'Bảo mật' : 'Privacy'}</a></li>
                <li><a className="font-body-md text-base transition-colors duration-300 hover:text-primary text-[#F5F2E8]" href="#">{language === 'vi' ? 'Hoàn tiền' : 'Refund'}</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-primary/10 px-6 md:px-16 py-6 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-caption text-primary/70">
        <p>© {new Date().getFullYear()} Big Dream. All rights reserved.</p>
        <button 
          className="mt-4 md:mt-0 hover:text-primary transition-colors flex items-center space-x-2 text-primary" 
          onClick={scrollToTop}
        >
          <span>Back to top</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </footer>
  );
}

