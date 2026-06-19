import React from 'react';
import { getAllProjects } from '@/lib/projects';
import WorkGridClient from '@/components/work/WorkGridClient';

export const dynamic = 'force-dynamic';

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8]" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      <main className="flex-grow pt-32 pb-24 px-5 md:px-10 lg:px-16 w-full">
        
        {/* Cinematic Header */}
        <div className="mb-24 md:mb-40 text-left">
          <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.4em] mb-8 uppercase block font-bold">
            Hồ Sơ Năng Lực
          </span>
          <h1 className="font-display-lg text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-white uppercase tracking-tighter font-bodoni-moda">
            Dự Án <br className="hidden md:block"/>
            <span className="text-[#d4af37] italic ml-0 md:ml-40">Nổi Bật</span>
          </h1>
          <div className="w-full max-w-2xl h-px bg-gradient-to-r from-[#d4af37]/50 to-transparent mt-12"></div>
        </div>

        {projects.length === 0 ? (
          <p className="text-left text-white/50 text-xl py-20 font-light">Đang cập nhật dự án...</p>
        ) : (
          <WorkGridClient projects={projects} />
        )}
        
      </main>
    </div>
  );
}
