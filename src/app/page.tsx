import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative bg-black text-white w-full overflow-x-hidden selection:bg-[var(--color-gold-base)] selection:text-black">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image 01 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/01.png" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-60 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" 
            priority 
          />
          {/* Gradient dìm nền cho text nổi lên */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center">
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
            BIG<span className="text-[var(--color-gold-base)]">DREAM</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl tracking-[0.3em] font-light uppercase mb-16 max-w-4xl">
            Hệ sinh thái AI Tối cao dành cho Kiến trúc & Nghệ thuật
          </p>
          
          <div className="mt-12 flex flex-col items-center text-gray-500 animate-bounce">
            <span className="text-xs uppercase tracking-widest mb-2">Cuộn để khám phá</span>
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: BIG PROMPT (SEE) */}
      <section className="relative w-full min-h-screen flex items-center py-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/C_DR_04.png" 
            alt="BIG PROMPT Background" 
            fill 
            className="object-cover opacity-30" 
          />
          {/* Gradient 2 chiều để hoà trộn nền */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-block px-3 py-1 border border-[var(--color-gold-base)] text-[var(--color-gold-base)] text-xs font-bold tracking-widest uppercase mb-4">
              Core Engine
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              SEE <span className="text-[var(--color-gold-base)]">MASTER</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              &quot;Bộ não&quot; Biên dịch & Vận hành LLM Wrapper. 
              Nhận diện hình ảnh đa chiều, bóc tách cấu trúc không gian và sinh ra các Master Prompt chỉ trong chớp mắt.
            </p>
            
            <div className="pt-8">
              <Link 
                href="/see" 
                className="inline-block px-12 py-5 bg-white text-black hover:bg-[var(--color-gold-base)] transition-all duration-500 font-bold tracking-widest uppercase rounded-sm hover:scale-105"
              >
                Khởi chạy SEE Workspace →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BENTO GRID cho Hệ sinh thái */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-32">
         <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/C_LOBBY_007.png" 
            alt="Ecosystem Background" 
            fill 
            className="object-cover opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-white mb-6">
              THE <span className="text-[var(--color-gold-base)]">ECOSYSTEM</span>
            </h2>
            <p className="text-gray-400 tracking-widest uppercase text-sm">Hệ thống chức năng mở rộng</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Thẻ 1 */}
             <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-12 hover:border-[var(--color-gold-base)] transition-all duration-500 group cursor-default">
                <h3 className="text-4xl font-bold tracking-tighter mb-4 text-white group-hover:text-[var(--color-gold-base)] transition-colors">
                  BIG MODEL
                </h3>
                <p className="text-gray-400 font-light text-lg">
                  Thư viện 3D Model độc quyền, tối ưu hoá hoàn toàn lưới Mesh cho quy trình AI Render.
                </p>
             </div>
             
             {/* Thẻ 2 */}
             <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-12 hover:border-[var(--color-gold-base)] transition-all duration-500 group cursor-default">
                <h3 className="text-4xl font-bold tracking-tighter mb-4 text-white group-hover:text-[var(--color-gold-base)] transition-colors">
                  BIG LENS
                </h3>
                <p className="text-gray-400 font-light text-lg">
                  Hệ thống kiểm định thị giác và hậu kỳ tự động chuẩn điện ảnh.
                </p>
             </div>
             
             {/* Thẻ 3 */}
             <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-12 hover:border-[var(--color-gold-base)] transition-all duration-500 group cursor-default">
                <h3 className="text-4xl font-bold tracking-tighter mb-4 text-white group-hover:text-[var(--color-gold-base)] transition-colors">
                  BIG THINK
                </h3>
                <p className="text-gray-400 font-light text-lg">
                  Không gian tư duy kiến trúc, phân tích Layout và Styling chuyên sâu.
                </p>
             </div>
             
             {/* Thẻ 4 */}
             <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-12 hover:border-[var(--color-gold-base)] transition-all duration-500 group cursor-default">
                <h3 className="text-4xl font-bold tracking-tighter mb-4 text-white group-hover:text-[var(--color-gold-base)] transition-colors">
                  BIG CLASS
                </h3>
                <p className="text-gray-400 font-light text-lg">
                  Học viện đào tạo AI Master, hướng dẫn vận hành toàn bộ hệ sinh thái.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full py-16 bg-[#050505] border-t border-white/5 text-center flex flex-col items-center justify-center">
        <div className="mb-6">
          <span className="text-3xl font-black tracking-tighter text-white opacity-50">
            BIG<span className="text-[var(--color-gold-base)]">DREAM</span>
          </span>
        </div>
        <p className="text-gray-600 tracking-[0.2em] text-xs uppercase mb-8">
          Powered by SEE Engine
        </p>
        <a 
          href="https://www.facebook.com/tuan.khanh.722968" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white transition-all duration-300 rounded-full font-bold tracking-wide text-sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
          Liên hệ Thầy Tuấn
        </a>
      </footer>
    </main>
  );
}
