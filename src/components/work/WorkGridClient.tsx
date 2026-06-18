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

  // Pattern layout học từ the-designlab (Chu kỳ 10 dự án)
  // Row 1: 2/3 (Left) + 1/3 (Right)
  // Row 2: 1/3 + 1/3 + 1/3
  // Row 3: 1/3 (Left) + 2/3 (Right)
  // Row 4: 1/3 + 1/3 + 1/3
  const getLayoutClass = (index: number) => {
    const i = index % 10;
    if (i === 0) return { cols: 'md:col-span-8', aspect: 'aspect-[3/2]' };
    if (i === 1) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    
    if (i >= 2 && i <= 4) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    
    if (i === 5) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    if (i === 6) return { cols: 'md:col-span-8', aspect: 'aspect-[3/2]' };
    
    if (i >= 7 && i <= 9) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    
    return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 w-full"
    >
      {projects.map((project, i) => {
        const { cols, aspect } = getLayoutClass(i);

        return (
          <motion.div key={project.id} variants={itemVariants} className={`flex flex-col group ${cols}`}>
            <Link href={`/work/${project.id}`} className="relative block w-full overflow-hidden">
              <div className={`${aspect} relative w-full overflow-hidden bg-[#050505]`}>
                <img 
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </div>
            </Link>
            
            {/* Chữ nằm bên dưới ảnh theo chuẩn editorial của the-designlab */}
            <div className="mt-6 flex flex-col items-start px-2">
              <Link href={`/work/${project.id}`}>
                <h3 
                  className="text-xl md:text-2xl text-white tracking-wide transition-colors duration-300 group-hover:text-[#d4af37]" 
                  style={{ fontFamily: '"Bodoni Moda", serif' }}
                >
                  {project.title}
                </h3>
              </Link>
              <span 
                className="text-white/60 text-base italic mt-2" 
                style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
              >
                {project.rooms.length} phân khu
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
