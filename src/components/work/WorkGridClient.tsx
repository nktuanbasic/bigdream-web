"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ProjectData } from '@/lib/projects';

interface WorkGridClientProps {
  projects: ProjectData[];
}

export default function WorkGridClient({ projects }: WorkGridClientProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const importantSlugs = [
    "can-ho-nassim-thao-dien", 
    "nha-mau-city-gate-quan-8", 
    "can-ho-landmark", 
    "nha-lo-pho-binh-duong-tan-uyen"
  ];

  // Separate primary and secondary projects
  const importantProjects = projects.filter(p => importantSlugs.includes(p.id));
  const normalProjects = projects.filter(p => !importantSlugs.includes(p.id));

  // Hàm render thẻ project chung
  const renderProjectCard = (project: ProjectData, isPrimary: boolean) => {
    return (
      <motion.div 
        key={project.id} 
        variants={itemVariants} 
        className={`flex flex-col group ${isPrimary ? 'w-full mb-16 md:mb-32' : 'break-inside-avoid mb-6 md:mb-10 w-full'}`}
      >
        <Link href={`/work/${project.id}`} className="relative block overflow-hidden rounded-sm bg-[#050505] w-full">
          <div className="relative w-full overflow-hidden">
            <img 
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-auto block transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            />
            
            {/* Lớp gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-700 pointer-events-none"></div>
            
            {/* Typography */}
            <div className={`absolute bottom-0 left-0 w-full ${isPrimary ? 'p-8 md:p-16' : 'p-6 md:p-8'} flex flex-col justify-end gap-4 z-10 pointer-events-none`}>
              <div className="w-full flex items-center gap-4 text-xs tracking-[0.2em] text-white/90 uppercase font-bold drop-shadow-md">
                <span>{project.rooms.length} Khu vực</span>
                <div className="w-8 h-px bg-[#d4af37]/80 group-hover:bg-[#d4af37] group-hover:w-16 transition-all duration-500"></div>
                <span className="text-[#d4af37] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Khám Phá
                </span>
              </div>
              <div className="w-full">
                <h3 
                  className={`font-display-lg ${isPrimary ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-2xl md:text-3xl'} text-white uppercase tracking-tighter drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-2 truncate`}
                  style={{ fontFamily: '"Metrophobic", sans-serif' }}
                  title={project.title}
                >
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full"
    >
      {/* Khối Chính 1 */}
      {importantProjects.length > 0 && renderProjectCard(importantProjects[0], true)}
      
      {/* Khối Phụ 1 (Masonry 2 cột) */}
      {normalProjects.length > 0 && (
        <div className="columns-1 md:columns-2 gap-6 md:gap-10 w-full mb-16 md:mb-32">
          {normalProjects.slice(0, 3).map(p => renderProjectCard(p, false))}
        </div>
      )}

      {/* Khối Chính 2 */}
      {importantProjects.length > 1 && renderProjectCard(importantProjects[1], true)}

      {/* Khối Phụ 2 (Masonry 2 cột) */}
      {normalProjects.length > 3 && (
        <div className="columns-1 md:columns-2 gap-6 md:gap-10 w-full mb-16 md:mb-32">
          {normalProjects.slice(3, 6).map(p => renderProjectCard(p, false))}
        </div>
      )}

      {/* Khối Chính 3 & 4 */}
      {importantProjects.length > 2 && renderProjectCard(importantProjects[2], true)}
      {importantProjects.length > 3 && renderProjectCard(importantProjects[3], true)}
      
      {/* Khối Phụ Cuối Cùng */}
      {normalProjects.length > 6 && (
        <div className="columns-1 md:columns-2 gap-6 md:gap-10 w-full mb-16 md:mb-32">
          {normalProjects.slice(6).map(p => renderProjectCard(p, false))}
        </div>
      )}
    </motion.div>
  );
}
