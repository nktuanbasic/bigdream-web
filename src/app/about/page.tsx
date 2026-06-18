"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function BigAboutPage() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-deep text-on-surface selection:bg-primary/30 selection:text-primary">
      <main className="flex-grow">
        {/* Studio Hero - Immersive Full Screen */}
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-glass-border">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1600585154526-990dced4ea07?q=80&w=800&auto=format&fit=crop" alt="Studio Background" className="w-full h-full object-cover opacity-30 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-transparent to-obsidian-deep"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
            <h1 className="font-display-lg text-6xl md:text-[120px] text-on-surface leading-none tracking-tighter uppercase drop-shadow-2xl mb-8">
              {language === 'vi' ? (
                <>VỀ <span className="text-primary">CHÚNG TÔI</span></>
              ) : (
                <>ABOUT <span className="text-primary">US</span></>
              )}
            </h1>
            <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant max-w-3xl font-light leading-relaxed">
              {language === 'vi' 
                ? 'Hệ sinh thái đào tạo và nguồn cung cấp nhân lực chất lượng cao cho ngành Diễn họa Kiến trúc Việt Nam và Thế giới.' 
                : 'A prestigious academy and source of high-quality talent for the global Architectural Visualization industry.'}
            </p>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">
              {language === 'vi' ? 'Cuộn xuống để khám phá' : 'Scroll to Explore'}
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </section>

        {/* Philosophy & Mission */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-glass-border"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
            <div className="md:col-span-5 md:col-start-2">
              <span className="inline-block font-label-sm text-xs text-primary uppercase tracking-widest mb-6">
                {language === 'vi' ? 'Sứ mệnh & Tầm nhìn' : 'Mission & Vision'}
              </span>
              <h2 className="font-headline-lg text-4xl md:text-6xl leading-tight text-on-surface mb-8">
                {language === 'vi' ? (
                  <>Nâng tầm <br/><span className="text-on-surface-variant">diễn họa kiến trúc.</span></>
                ) : (
                  <>Elevating <br/><span className="text-on-surface-variant">archviz standard.</span></>
                )}
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="font-body-lg text-xl text-on-surface-variant leading-relaxed font-light mb-8">
                {language === 'vi'
                  ? 'Tại Big Dream, chúng tôi không chỉ đào tạo công cụ mà còn khai phóng tư duy nghệ thuật. Sự kết hợp giữa quy chuẩn kiến trúc khắt khe và nghệ thuật điện ảnh tạo nên những khung hình kể chuyện (Visual Storytelling).'
                  : 'At Big Dream, we do not just teach tools; we liberate artistic thinking. The combination of strict architectural standards and cinematic art creates compelling frames (Visual Storytelling).'}
              </p>
              <p className="font-body-lg text-xl text-on-surface-variant leading-relaxed font-light">
                {language === 'vi'
                  ? 'Trang bị sức mạnh của công nghệ AI tiên tiến, chúng tôi đồng hành cùng các học viên và kỹ sư trên hành trình bứt phá khỏi những giới hạn kỹ thuật để tập trung sáng tạo tinh hoa.'
                  : 'Equipped with the power of advanced AI technology, we accompany students and engineers on their journey to break through technical limits and focus on creative excellence.'}
              </p>
            </div>
          </div>
        </section>

        {/* Founder Spotlight */}
        <section className="py-24 px-6 md:px-12 bg-charcoal-surface border-t border-b border-glass-border">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-5/12 flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-sm transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500"></div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-glass-border bg-obsidian-deep z-10">
                <img 
                  src="/assets/founder_avatar.png" 
                  alt="Nguyễn Khánh Tuấn" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
            
            <div className="w-full md:w-7/12">
              <span className="inline-block font-label-sm text-xs text-primary uppercase tracking-widest mb-6">
                {language === 'vi' ? 'Người Sáng Lập' : 'Founder'}
              </span>
              <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface mb-2 uppercase tracking-tighter">
                Nguyễn Khánh Tuấn
              </h2>
              <h3 className="font-label-sm text-lg text-on-surface-variant mb-8 uppercase tracking-widest font-bold">
                {language === 'vi' ? 'Founder & Giám Đốc Sáng Tạo' : 'Founder & Creative Director'}
              </h3>
              
              <div className="space-y-6 font-body-lg text-lg text-on-surface-variant font-light">
                <p>
                  {language === 'vi' 
                    ? 'Là người đặt nền móng cho hệ sinh thái Big Dream, anh Nguyễn Khánh Tuấn đã có nhiều năm kinh nghiệm trong lĩnh vực diễn họa kiến trúc cao cấp và ứng dụng Trí tuệ Nhân tạo (AI) vào quy trình thiết kế.'
                    : 'As the foundation builder of the Big Dream ecosystem, Tuan Khanh Nguyen has many years of experience in high-end architectural visualization and the application of Artificial Intelligence (AI) in design workflows.'}
                </p>
                <p>
                  {language === 'vi'
                    ? 'Với tầm nhìn chiến lược và đam mê nghệ thuật điện ảnh, anh luôn khao khát xây dựng một chuẩn mực thiết kế mang tính toàn cầu, không chỉ dừng lại ở Việt Nam. Khóa học tại Big Dream là nơi anh truyền tải triết lý "Form follows emotion" tới thế hệ kế cận.'
                    : 'With a strategic vision and passion for cinematic art, he always desires to build a global design standard, not just within Vietnam. The masterclass at Big Dream is where he conveys the "Form follows emotion" philosophy to the next generation.'}
                </p>
              </div>

              <div className="mt-12">
                <a 
                  href="https://www.facebook.com/tuan.khanh.722968?locale=vi_VN" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block border border-on-surface text-on-surface font-label-sm text-sm uppercase tracking-widest px-8 py-4 rounded-sm hover:text-primary hover:border-primary transition-colors hover:bg-primary/5"
                >
                  {language === 'vi' ? 'Kết nối trên Facebook' : 'Connect on Facebook'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="w-full bg-surface-container-low py-32 px-6 md:px-12 text-center">
          <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface mb-8 uppercase tracking-tighter">
            {language === 'vi' ? (
              <>Hãy Xây Dựng <br/>Cùng Nhau</>
            ) : (
              <>Let&apos;s Build <br/>Together</>
            )}
          </h2>
          <p className="font-body-lg text-xl text-on-surface-variant mb-12 font-light max-w-xl mx-auto">
            {language === 'vi' 
              ? 'Chúng tôi luôn chào đón những khách hàng có tầm nhìn và những tài năng xuất chúng.'
              : 'We are always looking for visionary clients and exceptional talent.'}
          </p>
          <a href="https://www.facebook.com/tuan.khanh.722968?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-on-primary font-label-sm text-sm uppercase tracking-widest px-12 py-5 rounded-sm hover:bg-primary-fixed transition-colors duration-300 font-bold shadow-[0_0_30px_rgba(242,202,80,0.3)]">
            {language === 'vi' ? 'Liên hệ chúng tôi' : 'Contact Studio'}
          </a>
        </section>
      </main>
    </div>
  );
}
