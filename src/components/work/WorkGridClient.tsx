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

  // Sắp xếp lại để các dự án quan trọng lên đầu
  const sortedProjects = [...projects].sort((a, b) => {
    const aIsImportant = importantSlugs.includes(a.id);
    const bIsImportant = importantSlugs.includes(b.id);
    if (aIsImportant && !bIsImportant) return -1;
    if (!aIsImportant && bIsImportant) return 1;
    return 0;
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 grid-flow-row-dense"
    >
      {sortedProjects.map((project, i) => {
        let colSpanClass = 'md:col-span-4'; 
        let aspectClass = 'aspect-[3/4]'; 
        
        const isImportant = importantSlugs.includes(project.id);
        
        if (isImportant) {
          // Các dự án quan trọng sẽ được ưu tiên chiếm diện tích lớn
          const importantIndex = importantSlugs.indexOf(project.id);
          if (importantIndex % 2 === 0) {
            colSpanClass = 'md:col-span-12';
            aspectClass = 'aspect-[16/9] lg:aspect-[21/9]';
          } else {
            colSpanClass = 'md:col-span-8';
            aspectClass = 'aspect-[4/3]';
          }
        } else {
          // Các dự án bình thường lấp đầy các ô còn lại
          const cycle = i % 3;
          if (cycle === 0) {
            colSpanClass = 'md:col-span-4';
            aspectClass = 'aspect-[3/4]';
          } else if (cycle === 1) {
            colSpanClass = 'md:col-span-4';
            aspectClass = 'aspect-[4/5]';
          } else {
            colSpanClass = 'md:col-span-8';
            aspectClass = 'aspect-[16/9]';
          }
        }

        return (
          <motion.div key={project.id} variants={itemVariants} className={`flex flex-col group ${colSpanClass}`}>
            <Link href={`/work/${project.id}`} className="relative block overflow-hidden rounded-sm bg-[#050505] w-full">
              <div className={`relative w-full overflow-hidden`}>
                <img 
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-auto block transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                />
                
                {/* Lớp gradient overlay để làm nổi bật chữ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-700 pointer-events-none"></div>
                
                {/* Typography đưa vào TRONG ảnh theo đúng sketch */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4 z-10 pointer-events-none">
                  <div className="flex flex-col">
                    <h3 className="font-display-lg text-3xl md:text-5xl text-white uppercase tracking-tighter drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-2" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs tracking-[0.2em] text-white/90 uppercase font-bold shrink-0 drop-shadow-md">
                    <span>{project.rooms.length} Khu vực</span>
                    <div className="w-8 h-px bg-[#d4af37]/80 group-hover:bg-[#d4af37] group-hover:w-16 transition-all duration-500"></div>
                    <span className="text-[#d4af37] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      Khám Phá
                    </span>
                  </div>
                </div>
                
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
