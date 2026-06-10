import Link from 'next/link';

export default function SeeWorkspace() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col md:flex-row">
      {/* Sidebar - 8 Nhánh SEE */}
      <aside className="w-full md:w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-md p-6 flex flex-col">
        <div className="mb-8">
          <Link href="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-gold-base)] transition-colors">
            ← Quay lại Hub
          </Link>
          <h1 className="text-2xl font-bold mt-4 tracking-widest text-[var(--color-gold-base)]">SEE ENGINE</h1>
          <p className="text-xs text-[var(--color-muted)] mt-1 uppercase tracking-wider">Master Context V15.0</p>
        </div>

        <nav className="flex-1 space-y-2">
          {['BOARD', 'ROOM', 'FILL', 'YARD', 'LAND', 'STAGE', 'RAW', 'DNA'].map((branch) => (
            <button
              key={branch}
              className="w-full text-left px-4 py-3 rounded-lg border border-transparent hover:border-[var(--color-gold-base)]/50 hover:bg-[var(--color-gold-base)]/10 transition-all text-sm tracking-wide"
            >
              / {branch}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header Khu vực làm việc */}
        <header className="h-16 border-b border-[var(--color-border)] flex items-center px-8">
          <h2 className="text-lg tracking-wider text-[var(--color-muted)]">
            Workspace: <span className="text-[var(--foreground)] font-bold">BOARD</span> (Tái cấu trúc Ý định)
          </h2>
        </header>

        {/* Khu vực Upload Ảnh & Chat (Sẽ tích hợp Vercel AI SDK sau) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Box Upload */}
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-[var(--color-gold-base)] transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4 group-hover:glow-gold transition-all">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-[var(--foreground)] font-bold mb-2">Kéo thả ảnh tham chiếu (Reference) vào đây</h3>
              <p className="text-[var(--color-muted)] text-sm">Hỗ trợ JPG, PNG. Luồng BOARD ưu tiên phân tích Ý định và Tension.</p>
            </div>

            {/* Khung Chat Nhập Prompt Thô */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 flex flex-col">
              <textarea 
                className="w-full bg-transparent border-none outline-none resize-none text-[var(--foreground)] placeholder-[var(--color-muted)] min-h-[120px]"
                placeholder="Nhập prompt thô, mô tả lộn xộn, hoặc yêu cầu của khách hàng vào đây..."
              ></textarea>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--color-border)]">
                <span className="text-xs text-[var(--color-muted)] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div> Sẵn sàng biên dịch
                </span>
                <button className="px-6 py-2 bg-[var(--color-gold-base)] text-black font-bold rounded-lg hover:bg-[var(--color-gold-light)] transition-colors glow-gold">
                  Khởi chạy SEE
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
