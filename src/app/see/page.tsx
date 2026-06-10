'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string | null;
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activeInfo = BRANCHES.find(b => b.key === activeBranch);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, image: selectedImage };
    setMessages(prev => [...prev, userMsg]);
    
    const payloadInput = input;
    const payloadImage = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: payloadInput, branch: activeBranch, image: payloadImage }),
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

  // Xử lý Ctrl+V dán ảnh
  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => setSelectedImage(event.target?.result as string);
          reader.readAsDataURL(file);
        }
      }
    }
  }

  // Xử lý nút chọn ảnh
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setSelectedImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleBranchSwitch(key: string) {
    setActiveBranch(key);
    setMessages([]);
    setSelectedImage(null);
  }

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row selection:bg-[var(--color-gold-base)] selection:text-black">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/assets/C_DR_04.png" alt="Workspace Background" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row min-h-screen">
        {/* Sidebar - 8 Nhánh SEE */}
        <aside className="w-full md:w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl p-6 flex flex-col shrink-0 text-white">
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
        <main className="flex-1 flex flex-col min-h-screen bg-transparent">
          {/* Header */}
          <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center px-8 shrink-0 text-white">
            <h2 className="text-lg tracking-wider text-gray-400">
              Workspace: <span className="text-white font-bold">{activeBranch}</span>
            <span className="text-sm ml-2">({activeInfo?.desc})</span>
          </h2>
        </header>

        {/* Chat Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div 
                className="border-2 border-dashed border-[var(--color-border)] rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-[var(--color-gold-base)] transition-colors cursor-pointer group"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4 group-hover:glow-gold transition-all">
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="text-[var(--foreground)] font-bold mb-2">Nhánh {activeBranch} đã sẵn sàng</h3>
                <p className="text-[var(--color-muted)] text-sm">Nhập prompt thô, ấn Ctrl+V để dán ảnh, hoặc Click vào đây để tải ảnh lên.</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className={`p-6 rounded-2xl ${m.role === 'user' ? 'bg-[var(--color-surface)] border border-[var(--color-border)]' : 'border border-[var(--color-gold-base)]/30 bg-[var(--color-gold-base)]/5'}`}>
                  <span className={`text-xs font-bold uppercase tracking-widest mb-3 block ${m.role === 'user' ? 'text-[var(--color-muted)]' : 'text-[var(--color-gold-base)]'}`}>
                    {m.role === 'user' ? 'Client Request' : `SEE Master / ${activeBranch}`}
                  </span>
                  {m.image && (
                    <div className="mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.image} alt="Reference" className="max-h-64 rounded-xl border border-[var(--color-border)] object-contain" />
                    </div>
                  )}
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
          <div className="p-8 border-t border-white/10 bg-black/40 backdrop-blur-xl shrink-0">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            {selectedImage && (
              <div className="absolute bottom-full left-0 mb-4 p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg flex items-start gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded border border-[var(--color-border)] object-cover" />
                <button 
                  type="button" 
                  onClick={() => setSelectedImage(null)}
                  className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 flex flex-col focus-within:border-[var(--color-gold-base)] transition-colors">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onPaste={handlePaste}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                className="w-full bg-transparent border-none outline-none resize-none text-[var(--foreground)] placeholder-[var(--color-muted)] min-h-[80px]"
                placeholder="Nhập prompt thô, ấn Ctrl+V để dán ảnh trực tiếp vào đây..."
                disabled={isLoading}
              />
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={handleImageUpload} />
                  <label htmlFor="file-upload" className="cursor-pointer text-[var(--color-muted)] hover:text-[var(--color-gold-base)] transition-colors p-2 bg-transparent rounded-lg border border-transparent hover:border-[var(--color-gold-base)]/30">
                    📎 Tải ảnh
                  </label>
                  <span className="text-xs text-[var(--color-muted)] flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                    {isLoading ? 'Đang chạy phân tích 6 bước' : `Sẵn sàng — Nhánh ${activeBranch}`}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || (!input.trim() && !selectedImage)}
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
    </div>
  );
}
