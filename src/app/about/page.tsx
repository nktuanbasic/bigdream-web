"use client";

import React, { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BigAboutPage() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade Up animation variants
  const fadeUp: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8] overflow-hidden">
      
      {/* 1. HERO SECTION: "The Genesis" */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 w-full max-w-[1440px] mx-auto text-left"
        >
          <motion.div variants={fadeUp} className="mb-6 overflow-hidden">
            <span className="font-label-caps text-xs md:text-sm text-[#d4af37] tracking-[0.4em] uppercase font-bold">
              {language === 'vi' ? 'Hồ Sơ Năng Lực' : 'Company Profile'}
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="font-display-lg text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-white uppercase tracking-tighter w-full font-bodoni-moda">
            {language === 'vi' ? (
              <span className="flex flex-col">
                <span>Khởi Nguyên</span>
                <span className="italic text-[#d4af37] ml-0 md:ml-32">Kiến Tạo</span>
              </span>
            ) : (
              <span className="flex flex-col">
                <span>The Genesis</span>
                <span className="italic text-[#d4af37] ml-0 md:ml-32">Of Creation</span>
              </span>
            )}
          </motion.h1>
          
          <motion.div variants={fadeUp} className="mt-16 md:mt-24 md:ml-32 max-w-xl">
            <p className="font-body-lg text-lg md:text-xl text-[#F5F2E8]/70 font-light leading-relaxed">
              {language === 'vi' 
                ? 'Hành trình chạm tới điểm giao thoa tối thượng giữa nghệ thuật điện ảnh, triết học và trí tuệ nhân tạo. Kiến tạo những không gian không giới hạn.' 
                : 'A journey reaching the ultimate intersection of cinematic art, philosophy, and artificial intelligence. Creating boundless spaces.'}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[10px] tracking-widest text-white/50 uppercase mb-4">Scroll</span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#d4af37]"
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* 2. THE FOUNDER SECTION (Editorial Layout) */}
      <section className="relative py-32 px-6 md:px-16 w-full max-w-[1440px] mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-32">
          
          {/* Left: Image (4 columns equivalent) */}
          <div className="w-full md:w-5/12 lg:w-4/12 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              {/* Offset Golden Border */}
              <div className="absolute top-4 -right-4 bottom-4 w-full border border-[#d4af37]/30 z-0"></div>
              
              <motion.div 
                className="absolute inset-0 z-10 bg-cover bg-center filter grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
                style={{ 
                  backgroundImage: 'url("/assets/founder/founder_1.png")',
                  y: useTransform(scrollYProgress, [0, 0.5], [0, -50])
                }} 
              />
            </motion.div>
          </div>
          
          {/* Right: Typography (6 columns equivalent) */}
          <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-6 uppercase font-bold block">
                {language === 'vi' ? 'Người Sáng Lập' : 'Founder'}
              </motion.span>
              
              <motion.h2 variants={fadeUp} className="font-display-lg text-5xl md:text-7xl mb-8 uppercase tracking-tighter text-white font-bodoni-moda">
                Nguyễn Khánh <br/><span className="italic text-[#d4af37]">Tuấn</span>
              </motion.h2>
              
              <motion.div variants={fadeUp} className="w-full max-w-sm h-px bg-gradient-to-r from-[#d4af37]/50 to-transparent mb-12"></motion.div>
              
              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6 font-body-lg text-base md:text-lg text-[#F5F2E8]/80 font-light leading-relaxed">
                  <p>
                    {language === 'vi'
                      ? 'Sinh năm 2001. Kiến trúc sư nội thất và chuyên gia diễn hoạ độc lập. Kẻ định hình không gian bằng tư duy nhiếp ảnh và nghệ thuật điện ảnh.'
                      : 'Born in 2001. Independent interior architect and visualization expert. Shaping spaces with photographic and cinematic thinking.'}
                  </p>
                </div>
                
                <div className="border-l border-white/10 pl-6 space-y-6 font-body-lg text-base md:text-lg text-[#F5F2E8]/80 font-light leading-relaxed italic">
                  <p className="text-xl md:text-2xl font-bodoni-moda text-white">
                    {language === 'vi'
                      ? '"Không có đúng hay sai, chỉ có sự phù hợp."'
                      : '"There is no right or wrong, only suitability."'}
                  </p>
                  <p className="text-sm">
                    {language === 'vi'
                      ? 'Luôn tìm cách từ bỏ lối mòn rập khuôn để chạm đến bản chất thật sự của kiến trúc và nội thất.'
                      : 'Always seeking to abandon clichés to reach the true essence of architecture and interior.'}
                  </p>
                </div>
              </motion.div>
              
              <motion.a 
                variants={fadeUp}
                href="https://www.facebook.com/tuan.khanh.722968?locale=vi_VN" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-16 group relative inline-flex items-center overflow-hidden border border-[#d4af37]/30 px-8 py-4"
              >
                <span className="absolute inset-0 w-0 bg-[#d4af37] transition-all duration-[400ms] ease-out group-hover:w-full"></span>
                <span className="relative z-10 font-label-caps text-xs tracking-[0.2em] text-[#d4af37] uppercase group-hover:text-[#050505] transition-colors duration-300 font-bold">
                  {language === 'vi' ? 'Kết nối trên Facebook' : 'Connect on Facebook'}
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY & LOGIC (Manifesto Layout) */}
      <section className="relative py-32 px-6 md:px-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
          >
            {/* Title */}
            <div className="md:col-span-4">
              <motion.span variants={fadeUp} className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 uppercase font-bold block">
                {language === 'vi' ? 'Triết Lý & Tư Duy' : 'Philosophy & Logic'}
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display-lg text-4xl md:text-5xl uppercase tracking-tighter text-white font-bodoni-moda">
                Bản Chất &<br/><span className="italic">Logic</span>
              </motion.h2>
            </div>
            
            {/* Content */}
            <div className="md:col-span-8 flex flex-col">
              <motion.div variants={fadeUp} className="h-px w-full bg-[#d4af37]/20 mb-8"></motion.div>
              
              <motion.p variants={fadeUp} className="font-body-lg text-xl md:text-3xl text-[#F5F2E8] font-light leading-snug mb-16 max-w-2xl font-bodoni-moda italic">
                {language === 'vi'
                  ? 'Thực hành khắc kỷ, thiền định và lối sống chay tịnh. Đào sâu vào bản chất vấn đề bằng góc nhìn đa chiều.'
                  : 'Practicing stoicism, meditation, and veganism. Delving into the essence of problems through multi-dimensional perspectives.'}
              </motion.p>
              
              <motion.div variants={staggerContainer} className="flex flex-col gap-8">
                {['3-6-9', 'Fibonacci', '142857'].map((keyword, index) => (
                  <motion.div key={keyword} variants={fadeUp} className="flex items-center gap-6 group">
                    <span className="text-sm font-bold text-[#d4af37]">0{index + 1}</span>
                    <div className="flex-1 h-px bg-white/10 group-hover:bg-[#d4af37]/50 transition-colors duration-500"></div>
                    <span className="text-2xl md:text-4xl uppercase tracking-[0.2em] font-light text-white/50 group-hover:text-white transition-colors duration-500">
                      {keyword}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. AESTHETICS (Ultra-wide Parallax) */}
      <section className="relative py-32 border-t border-white/5 overflow-hidden">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-label-caps text-xs text-[#d4af37] tracking-[0.3em] mb-4 uppercase font-bold block">
              {language === 'vi' ? 'Thẩm Mỹ Học' : 'Aesthetics'}
            </span>
            <h2 className="font-display-lg text-5xl md:text-7xl uppercase tracking-tighter text-white font-bodoni-moda">
              Modern <span className="italic text-[#d4af37]">Luxury</span>
            </h2>
          </motion.div>
        </div>
        
        {/* Full width bleed image */}
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <motion.div 
            className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=2000&auto=format&fit=crop")',
              y: useTransform(scrollYProgress, [0.5, 1], ["0%", "-20%"])
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50"></div>
          
          <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 pb-16">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
              <p className="font-body-lg text-lg md:text-xl text-[#F5F2E8]/90 font-light leading-relaxed max-w-xl bg-[#050505]/60 p-6 backdrop-blur-sm border-l-2 border-[#d4af37]">
                {language === 'vi'
                  ? 'Không gian sang trọng, hiện đại. Trọng tâm thiết kế hướng đến sự đẳng cấp nhưng vẫn giữ được nhịp thở tự nhiên thông qua việc ứng dụng khéo léo các chất liệu mộc mạc và mảng xanh.'
                  : 'Modern luxury spaces. Design focus heavily leans on prestige while keeping the natural breath alive through masterful application of rustic materials.'}
              </p>
              
              <div className="bg-[#050505]/80 backdrop-blur-md px-6 py-4 border border-[#d4af37]/30">
                <p className="text-[#d4af37] font-bold tracking-[0.2em] text-xs uppercase">
                  {language === 'vi' ? 'Tone màu chủ đạo: VÀNG - TRẮNG - ĐEN' : 'Signature Palette: GOLD - WHITE - BLACK'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ECOSYSTEM / CTA SECTION */}
      <section className="py-40 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span variants={fadeUp} className="font-label-caps text-xs text-[#d4af37] tracking-[0.4em] mb-6 uppercase block font-bold">
            {language === 'vi' ? 'Hệ Sinh Thái' : 'Ecosystem'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display-lg text-5xl md:text-8xl mb-12 uppercase tracking-tighter text-white font-bodoni-moda leading-none">
            Big Dream <br className="hidden md:block"/> 
            <span className="italic text-[#d4af37] text-4xl md:text-7xl">AI Studio</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body-lg text-lg md:text-xl text-[#F5F2E8]/70 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
            {language === 'vi'
              ? 'Xây dựng mạng lưới tư duy cá nhân và hệ sinh thái sáng tạo kiến trúc với Trí tuệ Nhân tạo làm cốt lõi. Cùng nhau nâng tầm nghệ thuật thị giác.'
              : 'Building a personal thinking network and architectural creative ecosystem with AI at its core. Elevating visual arts together.'}
          </motion.p>
          <motion.a 
            variants={fadeUp}
            href="mailto:tuankhanh@bigdream.vn" 
            className="group relative inline-flex items-center justify-center overflow-hidden bg-transparent border-2 border-[#d4af37] px-12 py-5"
          >
            <span className="absolute inset-0 w-full h-full bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.33,1,0.68,1]"></span>
            <span className="relative z-10 font-label-caps text-sm tracking-[0.3em] text-[#d4af37] uppercase group-hover:text-[#050505] transition-colors duration-300 font-bold">
              {language === 'vi' ? 'Hợp Tác Cùng Chúng Tôi' : 'Collaborate With Us'}
            </span>
          </motion.a>
        </motion.div>
      </section>

    </div>
  );
}
