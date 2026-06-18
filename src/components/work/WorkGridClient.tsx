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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16"
    >
      {projects.map((project, i) => {
        // Asymmetric Layout Logic:
        // Pattern cycles every 5 items
        const cycle = i % 5;
        let colSpanClass = 'md:col-span-12'; 
        let aspectClass = 'aspect-[16/9]'; 
        
        if (cycle === 0) {
          colSpanClass = 'md:col-span-8';
          aspectClass = 'aspect-[4/3]';
        } else if (cycle === 1) {
          colSpanClass = 'md:col-span-4';
          aspectClass = 'aspect-[3/4]';
        } else if (cycle === 2) {
          colSpanClass = 'md:col-span-4';
          aspectClass = 'aspect-[3/4]';
        } else if (cycle === 3) {
          colSpanClass = 'md:col-span-8';
          aspectClass = 'aspect-[4/3]';
        } else if (cycle === 4) {
          colSpanClass = 'md:col-span-12';
          aspectClass = 'aspect-[16/9] lg:aspect-[21/9]';
        }

        return (
          <motion.div key={project.id} variants={itemVariants} className={`flex flex-col group ${colSpanClass}`}>
            <Link href={`/work/${project.id}`} className="relative block overflow-hidden rounded-sm bg-[#111] mb-6 w-full">
              <div className={`${aspectClass} relative w-full overflow-hidden`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                  style={{ backgroundImage: `url('${project.thumbnail.replace(/'/g, "\\'")}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-700"></div>
              </div>
            </Link>
            
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4 mt-2">
              <div className="flex flex-col">
                <Link href={`/work/${project.id}`} className="group-hover:text-[#d4af37] transition-colors duration-300">
                  <h3 className="font-display-lg text-3xl md:text-4xl text-white uppercase tracking-tighter" style={{ fontFamily: '"Metrophobic", sans-serif' }}>
                    {project.title}
                  </h3>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-xs tracking-[0.2em] text-white/50 uppercase font-bold shrink-0">
                <span>{project.rooms.length} Khu vực</span>
                <div className="w-8 h-px bg-[#d4af37]/30 group-hover:bg-[#d4af37] group-hover:w-16 transition-all duration-500"></div>
                <Link href={`/work/${project.id}`} className="text-[#d4af37] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Khám Phá
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
