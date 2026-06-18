"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ProjectData } from '@/lib/projects';

interface ProjectDetailClientProps {
  project: ProjectData;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const totalImages = project.rooms.reduce((acc, room) => acc + room.images.length, 0);

  return (
    <>
      {/* Navigation / Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <Link href="/work" className="inline-flex items-center gap-4 text-[#d4af37] text-xs tracking-[0.3em] uppercase hover:text-white transition-colors group font-bold">
          <span className="transform group-hover:-translate-x-2 transition-transform duration-300">&larr;</span> 
          Trở lại danh sách
        </Link>
      </motion.div>

      {/* Project Hero Header */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="mb-32 md:mb-48"
      >
        <motion.h1 
          variants={fadeUp}
          className="font-display-lg text-6xl md:text-8xl lg:text-[10rem] text-white uppercase tracking-tighter leading-[0.85] font-bodoni-moda mb-12"
        >
          {project.title}
        </motion.h1>
        
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <div className="flex items-center gap-6">
            <div className="w-16 h-px bg-[#d4af37]"></div>
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-bold">Dự án hoàn thiện</span>
          </div>
          <div className="flex gap-8 text-white/50 text-xs tracking-[0.2em] uppercase font-bold">
            <span>{project.rooms.length} Phân khu</span>
            <span>{totalImages} Hình ảnh</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Project Rooms Layout with Sticky Sidebar */}
      <div className="space-y-32 md:space-y-48">
        {project.rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            
            {/* Sticky Sidebar: Room Title */}
            <div className="w-full lg:w-1/3 xl:w-1/4 relative z-10">
              <div className="lg:sticky lg:top-32 bg-[#050505]/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none py-4 lg:py-0">
                <span className="font-display-lg text-4xl md:text-5xl text-white uppercase tracking-tighter font-bodoni-moda italic">
                  {room.name}
                </span>
                <div className="w-12 h-px bg-[#d4af37]/50 mt-6 hidden lg:block"></div>
              </div>
            </div>
            
            {/* Right Content: Images Masonry */}
            <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col gap-12 md:gap-24">
              {room.images.map((img, i) => {
                // Alternating layout sizes for editorial feel
                let layoutClass = "w-full"; // default full width
                
                const styleCycle = i % 4;
                if (styleCycle === 1) {
                  layoutClass = "w-[90%] md:w-[75%] ml-auto"; // aligned right
                } else if (styleCycle === 2) {
                  layoutClass = "w-[80%] md:w-[60%] mr-auto"; // aligned left
                } else if (styleCycle === 3) {
                  layoutClass = "w-full"; // full width again
                }

                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`${layoutClass}`}
                  >
                    <div className={`relative overflow-hidden bg-[#050505]`}>
                      <img 
                        src={img} 
                        alt={`${project.title} - ${room.name} ${i + 1}`} 
                        loading="lazy"
                        className="w-full h-auto block transition-transform duration-[2s] hover:scale-105"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {project.rooms.length === 0 && (
        <p className="text-white/50 text-xl py-20 font-light">Chưa có hình ảnh chi tiết cho dự án này.</p>
      )}
    </>
  );
}
