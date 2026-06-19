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

  // Tách thành 2 mảng Chính và Phụ
  const importantProjects = projects.filter(p => importantSlugs.includes(p.id));
  const normalProjects = projects.filter(p => !importantSlugs.includes(p.id));

  // Ghép lại theo đúng thứ tự Layout để 4 dự án quan trọng luôn rơi vào ô LỚN
  const orderedProjects: ProjectData[] = [];
  if (importantProjects[0]) orderedProjects.push(importantProjects[0]); // Slot 0: Full width
  if (normalProjects[0]) orderedProjects.push(normalProjects[0]); // Slot 1: Small
  if (normalProjects[1]) orderedProjects.push(normalProjects[1]); // Slot 2: Small
  if (normalProjects[2]) orderedProjects.push(normalProjects[2]); // Slot 3: Small
  if (importantProjects[1]) orderedProjects.push(importantProjects[1]); // Slot 4: Large
  if (normalProjects[3]) orderedProjects.push(normalProjects[3]); // Slot 5: Small
  if (normalProjects[4]) orderedProjects.push(normalProjects[4]); // Slot 6: Small
  if (importantProjects[2]) orderedProjects.push(importantProjects[2]); // Slot 7: Large
  if (importantProjects[3]) orderedProjects.push(importantProjects[3]); // Slot 8: Large
  if (normalProjects[5]) orderedProjects.push(normalProjects[5]); // Slot 9: Small

  // Nhét nốt các dự án thừa (nếu có) vào cuối
  const remaining = projects.filter(p => !orderedProjects.some(op => op.id === p.id));
  orderedProjects.push(...remaining);

  // Pattern layout học từ the-designlab (Chu kỳ 10 dự án)
  // Nhưng được tinh chỉnh để chứa được đúng 4 dự án lớn (thay vì 2 như web mẫu)
  // Row 1: 3/3 (Full width)
  // Row 2: 1/3 + 1/3 + 1/3
  // Row 3: 2/3 (Left) + 1/3 (Right)
  // Row 4: 1/3 (Left) + 2/3 (Right)
  // Row 5: 2/3 (Left) + 1/3 (Right)
  const getLayoutClass = (index: number) => {
    const i = index % 10;
    if (i === 0) return { cols: 'md:col-span-12', aspect: 'aspect-[21/9] lg:aspect-[2.5/1]' };
    if (i === 1 || i === 2 || i === 3) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    if (i === 4) return { cols: 'md:col-span-8', aspect: 'aspect-[3/2]' };
    if (i === 5) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    if (i === 6) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    if (i === 7) return { cols: 'md:col-span-8', aspect: 'aspect-[3/2]' };
    if (i === 8) return { cols: 'md:col-span-8', aspect: 'aspect-[3/2]' };
    if (i === 9) return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
    
    return { cols: 'md:col-span-4', aspect: 'aspect-[3/4]' };
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 w-full"
    >
      {orderedProjects.map((project, i) => {
        const { cols, aspect } = getLayoutClass(i);

        return (
          <motion.div key={project.id} variants={itemVariants} className={`flex flex-col group h-full ${cols}`}>
            <Link href={`/work/${project.id}`} className={`relative block w-full flex-grow overflow-hidden ${aspect}`}>
              <div className="absolute inset-0 w-full h-full bg-[#050505]">
                <img 
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </div>
            </Link>
            
            {/* Chữ nằm bên dưới ảnh theo chuẩn editorial của the-designlab */}
            <div className="mt-6 flex flex-col items-start px-2 shrink-0">
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
