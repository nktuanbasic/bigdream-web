import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-gold-base)] opacity-5 blur-[150px] rounded-full pointer-events-none" />

      <div className="z-10 text-center space-y-8 max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl font-light tracking-widest text-[var(--foreground)]">
          BIG <span className="font-bold text-[var(--color-gold-base)]">DREAM</span>
        </h1>
        <p className="text-[var(--color-muted)] text-lg md:text-xl tracking-wide max-w-2xl mx-auto">
          Hệ sinh thái AI Tối cao dành cho Kiến trúc & Nghệ thuật Thị giác.
        </p>

        {/* 5 Phân khu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {/* BIG PROMPT (SEE) - Nổi bật nhất */}
          <Link href="/see" className="md:col-span-3 border border-[var(--color-gold-base)]/30 bg-[var(--color-surface)]/50 backdrop-blur-md p-8 rounded-2xl hover:border-[var(--color-gold-base)] transition-all duration-500 group cursor-pointer block">
            <h2 className="text-2xl font-bold text-[var(--color-gold-base)] tracking-widest mb-3">
              SEE <span className="text-sm font-normal text-[var(--color-muted)] ml-2">(BIG PROMPT)</span>
            </h2>
            <p className="text-[var(--color-muted)] group-hover:text-[var(--foreground)] transition-colors">
              &quot;Bộ não&quot; Biên dịch & Vận hành LLM Wrapper với 8 nhánh chuyên biệt. Nhấn vào đây để vào không gian làm việc.
            </p>
          </Link>

          {/* Các phân khu khác */}
          {[
            { title: "BIG MODEL", desc: "Thư viện 3D Model độc quyền." },
            { title: "BIG LENS", desc: "Hệ thống kiểm định thị giác." },
            { title: "BIG THINK", desc: "Không gian tư duy kiến trúc." },
            { title: "BIG CLASS", desc: "Học viện đào tạo AI Master." }
          ].map((item) => (
            <div key={item.title} className="border border-[var(--color-border)] bg-[var(--color-surface)]/30 backdrop-blur-md p-6 rounded-2xl hover:border-[var(--color-muted)] transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-bold tracking-widest mb-2 text-[var(--foreground)]">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
