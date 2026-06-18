import React from 'react';
import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8]" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      <main className="flex-grow pt-32 pb-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
        <div className="mb-24 text-center">
          <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.4em] mb-6 uppercase block font-bold">
            Hồ Sơ Năng Lực
          </span>
          <h1 className="font-display-lg text-5xl md:text-7xl lg:text-8xl text-white mb-8 uppercase tracking-tighter" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
            Dự Án <span className="text-[#d4af37]">Nổi Bật</span>
          </h1>
          <div className="w-24 h-px bg-[#d4af37]/50 mx-auto"></div>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-white/50 text-xl py-20 font-light">Đang cập nhật dự án...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {projects.map((project) => (
              <Link href={`/work/${project.id}`} key={project.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#111] mb-6 border border-white/5">
                  {/* Thumbnail Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                    style={{ backgroundImage: `url('${project.thumbnail.replace(/'/g, "\\'")}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-display-lg text-2xl text-white mb-4 uppercase tracking-wide group-hover:text-[#d4af37] transition-colors" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                    {project.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-4 text-xs tracking-[0.2em] text-white/40 uppercase font-bold">
                    <span>{project.rooms.length} Khu vực</span>
                    <div className="w-6 h-px bg-[#d4af37]/50 group-hover:w-12 transition-all duration-300"></div>
                    <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-10px] group-hover:translate-x-0">Khám Phá</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
