import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/lib/projects';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    project: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ project: string }> }) {
  const { project: projectId } = await params;
  
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8]" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      <main className="flex-grow pt-32 pb-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
        
        {/* Navigation / Breadcrumb */}
        <div className="mb-16">
          <Link href="/work" className="inline-flex items-center gap-4 text-[#d4af37] text-xs tracking-[0.3em] uppercase hover:text-white transition-colors group font-bold">
            <span className="transform group-hover:-translate-x-2 transition-transform duration-300">&larr;</span> 
            Trở lại danh sách
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-24">
          <h1 className="font-display-lg text-5xl md:text-7xl lg:text-8xl text-white mb-8 uppercase tracking-tighter leading-tight" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
            {project.title}
          </h1>
          <div className="flex items-center gap-6">
            <div className="w-24 h-px bg-[#d4af37]"></div>
            <span className="text-[#d4af37] text-sm tracking-[0.4em] uppercase font-bold">Dự án hoàn thiện</span>
          </div>
        </div>

        {/* Project Rooms Layout */}
        <div className="space-y-32">
          {project.rooms.map((room, index) => (
            <section key={index}>
              <div className="flex items-center gap-8 mb-12">
                <span className="font-label-caps text-lg md:text-xl text-white tracking-[0.2em] uppercase font-bold whitespace-nowrap" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                  {room.name}
                </span>
                <div className="flex-grow h-px bg-white/10"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {room.images.map((img, i) => {
                  // Make the first image span full width if it's the very first image
                  const isLarge = i % 3 === 0;
                  return (
                    <div 
                      key={i} 
                      className={`relative overflow-hidden rounded-sm bg-[#111] group border border-white/5 ${isLarge ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${project.title} - ${room.name} ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                      />
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        
        {project.rooms.length === 0 && (
          <p className="text-white/50 text-xl py-20 font-light">Chưa có hình ảnh chi tiết cho dự án này.</p>
        )}

      </main>
    </div>
  );
}
