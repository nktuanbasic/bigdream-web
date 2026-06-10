'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const BRANCHES = [
  { key: 'BOARD', label: 'BOARD', desc: 'Tái cấu trúc Ý định' },
  { key: 'ROOM',  label: 'ROOM',  desc: 'Render Nội thất' },
  { key: 'FILL',  label: 'FILL',  desc: 'Điền Không gian' },
  { key: 'YARD',  label: 'YARD',  desc: 'Ngoại thất Nhỏ' },
  { key: 'LAND',  label: 'LAND',  desc: 'Ngoại thất Lớn' },
  { key: 'STAGE', label: 'STAGE', desc: 'Hậu kỳ Render' },
  { key: 'RAW',   label: 'RAW',   desc: 'Tiền xử lý' },
  { key: 'DNA',   label: 'DNA',   desc: 'Phân tích Phong cách' },
];

export default function SeeWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeBranch, setActiveBranch] = useState('BOARD');

  const activeInfo = BRANCHES.find(b => b.key === activeBranch);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, branch: activeBranch }),
      });
      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || data.error || 'Không nhận được phản hồi.',
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Lỗi kết nối đến server.' }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleBranchSwitch(key: string) {
    setActiveBranch(key);
    setMessages([]);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col md:flex-row">
      {/* Sidebar - 8 Nhánh SEE */}
      <aside className="w-full md:w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-md p-6 flex flex-col shrink-0">
        <div className="mb-8">
          <Link href="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-gold-base)] transition-colors">
            ← Quay lại Hub
          </Link>
          <h1 className="text-2xl font-bold mt-4 tracking-widest text-[var(--color-gold-base)]">SEE ENGINE</h1>
          <p className="text-xs text-[var(--color-muted)] mt-1 uppercase tracking-wider">Master Context V15.0</p>
        </div>

        <nav className="flex-1 space-y-2">
          {BRANCHES.map((branch) => (
            <button
              key={branch.key}
              onClick={() => handleBranchSwitch(branch.key)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm tracking-wide transition-all
                ${branch.key === activeBranch
                  ? 'border-[var(--color-gold-base)] bg-[var(--color-gold-base)]/10 text-[var(--color-gold-base)]'
                  : 'border-transparent hover:border-[var(--color-gold-base)]/50 hover:bg-[var(--color-gold-base)]/5'
                }`}
            >
              / {branch.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="h-16 border-b border-[var(--color-border)] flex items-center px-8 shrink-0">
          <h2 className="text-lg tracking-wider text-[var(--color-muted)]">
            Workspace: <span className="text-[var(--foreground)] font-bold">{activeBranch}</span>
            <span className="text-sm ml-2">({activeInfo?.desc})</span>
          </h2>
        </header>

        {/* Chat Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="border-2 border-dashed border-[var(--color-border)] rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-[var(--color-gold-base)] transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4 group-hover:glow-gold transition-all">
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="text-[var(--foreground)] font-bold mb-2">Nhánh {activeBranch} đã sẵn sàng</h3>
                <p className="text-[var(--color-muted)] text-sm">Nhập prompt thô hoặc kéo thả ảnh tham chiếu vào bên dưới để bắt đầu biên dịch.</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className={`p-6 rounded-2xl ${m.role === 'user' ? 'bg-[var(--color-surface)] border border-[var(--color-border)]' : 'border border-[var(--color-gold-base)]/30 bg-[var(--color-gold-base)]/5'}`}>
                  <span className={`text-xs font-bold uppercase tracking-widest mb-3 block ${m.role === 'user' ? 'text-[var(--color-muted)]' : 'text-[var(--color-gold-base)]'}`}>
                    {m.role === 'user' ? 'Client Request' : `SEE Master / ${activeBranch}`}
                  </span>
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                    {m.content}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="text-[var(--color-gold-base)] text-sm animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--color-gold-base)]"></div>
                SEE đang biên dịch qua 6 bước Visual Think...
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="p-8 border-t border-[var(--color-border)] bg-[var(--background)] shrink-0">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 flex flex-col focus-within:border-[var(--color-gold-base)] transition-colors">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                className="w-full bg-transparent border-none outline-none resize-none text-[var(--foreground)] placeholder-[var(--color-muted)] min-h-[80px]"
                placeholder="Nhập prompt thô, mô tả lộn xộn, hoặc yêu cầu của khách hàng vào đây..."
                disabled={isLoading}
              />
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--color-border)]">
                <span className="text-xs text-[var(--color-muted)] flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                  {isLoading ? 'Đang chạy phân tích 6 bước' : `Sẵn sàng — Nhánh ${activeBranch}`}
                </span>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-2 bg-[var(--color-gold-base)] text-black font-bold rounded-lg hover:bg-[var(--color-gold-light)] transition-colors glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Khởi chạy SEE
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
