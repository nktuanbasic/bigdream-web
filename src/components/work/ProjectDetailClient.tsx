"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { ProjectData } from '@/lib/projects';

interface ProjectDetailClientProps {
  project: ProjectData;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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
    <div className="bg-[#050505] min-h-screen -mt-24 md:-mt-32 pt-0">
      {/* 1. The Grand Hero Section */}
      <div ref={heroRef} className="relative w-full h-[100vh] overflow-hidden mb-16 md:mb-32">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050505]"></div>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 lg:px-24 pb-16 md:pb-24 z-10 flex flex-col justify-end">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Link href="/work" className="inline-flex items-center gap-4 text-[#d4af37] text-xs md:text-sm tracking-[0.3em] uppercase hover:text-white transition-colors group font-bold">
              <span className="transform group-hover:-translate-x-2 transition-transform duration-300">&larr;</span> 
              Trở lại danh sách
            </Link>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-lg text-5xl md:text-8xl lg:text-[10rem] text-white uppercase tracking-tighter leading-[0.85] font-bodoni-moda"
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* 2. The Brief (Meta Data) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="pb-16 md:pb-24 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <span className="text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">Vị trí</span>
            <span className="text-white text-sm md:text-base tracking-wide">Việt Nam</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <span className="text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">Năm thiết kế</span>
            <span className="text-white text-sm md:text-base tracking-wide">2024</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <span className="text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">Phong cách</span>
            <span className="text-white text-sm md:text-base tracking-wide">Modern Luxury</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <span className="text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">Quy mô</span>
            <span className="text-white text-sm md:text-base tracking-wide">{project.rooms.length} Phân khu / {totalImages} Ảnh</span>
          </motion.div>
        </motion.div>

        {/* 3. The Gallery (Rooms) */}
        <div className="py-24 md:py-32 space-y-32 md:space-y-48">
          {project.rooms.map((room, roomIndex) => (
            <div key={roomIndex} className="flex flex-col gap-16 md:gap-24">
              
              {/* Room Header - Centered */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="w-px h-16 bg-[#d4af37]/50 mb-8"></div>
                <h2 className="font-display-lg text-4xl md:text-6xl text-white uppercase tracking-tighter font-bodoni-moda italic mb-4">
                  {room.name}
                </h2>
                <span className="text-white/50 text-sm tracking-[0.2em] uppercase">{room.images.length} Hình ảnh</span>
              </motion.div>
              
              {/* 2-Column Masonry Grid */}
              <div className="columns-1 md:columns-2 gap-6 md:gap-10 space-y-6 md:space-y-10 w-full">
                {room.images.map((img, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="break-inside-avoid w-full"
                  >
                    <div className="relative overflow-hidden bg-[#050505]">
                      <img 
                        src={img} 
                        alt={`${project.title} - ${room.name} ${i + 1}`} 
                        loading="lazy"
                        className="w-full h-auto block transition-transform duration-[2s] hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {project.rooms.length === 0 && (
          <p className="text-white/50 text-xl py-20 font-light text-center">Chưa có hình ảnh chi tiết cho dự án này.</p>
        )}
      </div>
      
      {/* 4. Next Project Footer */}
      <div className="w-full h-[50vh] flex items-center justify-center border-t border-white/5 bg-[#050505] group cursor-pointer relative overflow-hidden mt-20">
         <div className="absolute inset-0 bg-[#d4af37]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
         <Link href="/work" className="relative z-10 flex flex-col items-center gap-6">
            <span className="text-[#d4af37] text-xs md:text-sm tracking-[0.3em] uppercase font-bold transition-transform duration-500 group-hover:-translate-y-2">Khám phá thêm</span>
            <h2 className="font-display-lg text-4xl md:text-7xl text-white uppercase tracking-tighter font-bodoni-moda transition-transform duration-500 delay-75 group-hover:-translate-y-2">Danh Sách Dự Án</h2>
         </Link>
      </div>
    </div>
  );
}
