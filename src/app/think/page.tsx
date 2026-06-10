import Link from 'next/link';
import Image from 'next/image';

export default function BigThinkPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-black text-white selection:bg-[var(--color-gold-base)] selection:text-black">
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/C_LOBBY_007.png" 
            alt="BIG MODEL Background" 
            fill 
            className="object-cover opacity-60 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="inline-block px-3 py-1 border border-[var(--color-gold-base)] text-[var(--color-gold-base)] text-xs font-bold tracking-widest uppercase mb-6">
            Ecosystem Component
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-4 drop-shadow-2xl">
            BIG <span className="text-[var(--color-gold-base)]">THINK</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl tracking-[0.2em] font-light uppercase max-w-3xl mx-auto">
            Không gian tư duy kiến trúc, phân tích Layout và Styling chuyên sâu.
          </p>
          <div className="mt-16 text-gray-500 animate-bounce flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2">Cuộn để xem chi tiết</span>
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: DETAILS */}
      <section className="relative w-full min-h-screen flex items-center py-32 bg-black border-t border-white/5">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              CẤU TRÚC <span className="text-[var(--color-gold-base)]">HOÀN HẢO</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Mỗi model trong hệ thống BIG MODEL đều được kiểm duyệt kỹ lưỡng để đảm bảo cấu trúc lưới (topology) mượt mà nhất. 
              Sẵn sàng để đưa vào quy trình ControlNet và Img2Img mà không sợ lỗi bóng đổ hay sai lệch khối.
            </p>
            <div className="pt-8 flex gap-6">
              <Link href="/" className="inline-block px-8 py-4 border border-white/20 text-white hover:border-white transition-colors duration-300 tracking-widest uppercase text-sm font-bold">
                ← Quay lại Hub
              </Link>
              <button className="inline-block px-8 py-4 bg-[var(--color-gold-base)] text-black hover:bg-white transition-colors duration-300 tracking-widest uppercase text-sm font-bold opacity-50 cursor-not-allowed">
                Sắp ra mắt
              </button>
            </div>
          </div>
          <div className="relative aspect-square border border-white/10 bg-white/5 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center group">
            <div className="w-32 h-32 rounded-full bg-[var(--color-gold-base)]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
               <span className="text-5xl">🧠</span>
            </div>
            <h3 className="text-2xl font-bold tracking-widest text-white mb-2">ARCHITECTURAL LOGIC</h3>
            <p className="text-gray-500">Đang được đồng bộ hoá...</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full py-16 bg-[#050505] border-t border-white/5 text-center flex flex-col items-center justify-center">
        <p className="text-gray-600 tracking-[0.2em] text-xs uppercase mb-8">
          Powered by SEE Engine
        </p>
        <a 
          href="https://www.facebook.com/tuan.khanh.722968" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white transition-all duration-300 rounded-full font-bold tracking-wide text-sm"
        >
          Liên hệ Thầy Tuấn (Facebook)
        </a>
      </footer>
    </main>
  );
}
