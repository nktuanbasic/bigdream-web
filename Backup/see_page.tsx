'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { PaperPlaneRight, Image as ImageIcon, Sparkle, Target, SquareHalf, Aperture, Mountains, Camera, Fingerprint, MagicWand, X } from '@phosphor-icons/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string | null;
}

const BRANCHES = [
  { key: 'BOARD', icon: Target,      label: 'BOARD', desc: 'Tái cấu trúc Ý định' },
  { key: 'ROOM',  icon: SquareHalf,  label: 'ROOM',  desc: 'Render Nội thất' },
  { key: 'FILL',  icon: Sparkle,     label: 'FILL',  desc: 'Điền Không gian' },
  { key: 'YARD',  icon: Aperture,    label: 'YARD',  desc: 'Ngoại thất Nhỏ' },
  { key: 'LAND',  icon: Mountains,   label: 'LAND',  desc: 'Ngoại thất Lớn' },
  { key: 'STAGE', icon: MagicWand,   label: 'STAGE', desc: 'Hậu kỳ Render' },
  { key: 'RAW',   icon: Camera,      label: 'RAW',   desc: 'Tiền xử lý' },
  { key: 'DNA',   icon: Fingerprint, label: 'DNA',   desc: 'Phân tích Phong cách' },
];

export default function SeeWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeBranch, setActiveBranch] = useState('BOARD');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeInfo = BRANCHES.find(b => b.key === activeBranch);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
    <div className="flex flex-1 mt-[80px] h-[calc(100vh-80px)] w-full overflow-hidden bg-obsidian-deep selection:bg-primary selection:text-obsidian-deep">
      {/* SideNavBar */}
      <aside className="w-64 bg-charcoal-surface/60 backdrop-blur-3xl border-r border-glass-border flex flex-col py-8 gap-y-4 h-full shrink-0 hidden md:flex overflow-y-auto z-10">
        <div className="px-6 mb-4">
          <h2 className="font-headline-md text-headline-md text-primary">SEE Engine</h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">AI Workspace V15</p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          {BRANCHES.map((branch) => {
            const Icon = branch.icon;
            const isActive = branch.key === activeBranch;
            return (
              <button
                key={branch.key}
                onClick={() => handleBranchSwitch(branch.key)}
                className={`flex items-center gap-3 px-6 py-3 w-full text-left transition-all scale-98 duration-200 ${
                  isActive 
                    ? 'text-primary font-bold border-l-2 border-primary pl-6 bg-primary/10' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Icon size={20} weight={isActive ? "fill" : "regular"} />
                <span className="font-label-sm text-label-sm uppercase">{branch.label}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-auto px-6 pb-6">
          <button 
            onClick={() => handleBranchSwitch(activeBranch)}
            className="w-full bg-surface-container-high border border-glass-border text-on-surface py-3 rounded-lg font-label-sm text-label-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors inner-glow"
          >
            Clear Canvas
          </button>
        </div>
      </aside>

      {/* Central Canvas */}
      <main className="flex-1 flex flex-col relative border-r border-glass-border overflow-hidden">
        {/* SVG Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgNDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none"></div>
        
        {/* Canvas Header */}
        <header className="px-8 py-4 border-b border-glass-border z-10 bg-obsidian-deep/80 backdrop-blur-md flex justify-between items-end">
          <div>
            <h1 className="font-display-lg text-4xl text-on-surface mb-2">Project Sigma</h1>
            <div className="flex gap-2">
              <span className="px-2 py-1 border border-glass-border rounded text-label-sm font-label-sm text-primary uppercase">{activeBranch}</span>
              <span className="px-2 py-1 border border-glass-border rounded text-label-sm font-label-sm text-on-surface-variant uppercase">{activeInfo?.desc}</span>
            </div>
          </div>
        </header>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10 flex flex-col gap-8 pb-40">
          {messages.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <Sparkle size={48} className="text-primary mb-4" />
                <h3 className="font-headline-md text-headline-md text-on-surface">Canvas Ready</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Enter your architectural prompt or paste an image to begin.</p>
             </div>
          ) : (
            messages.map(m => (
              m.role === 'user' ? (
                <div key={m.id} className="flex gap-4 justify-end">
                  <div className="bg-surface-container-high border border-glass-border p-4 rounded-xl max-w-xl text-right">
                    {m.image && (
                      <div className="mb-4 flex justify-end">
                        <img src={m.image} alt="Reference" className="max-h-64 rounded-xl border border-glass-border object-contain" />
                      </div>
                    )}
                    <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded border border-primary flex items-center justify-center shrink-0 bg-primary/10">
                    <Sparkle size={16} className="text-primary" />
                  </div>
                  <div className="glass-panel p-6 rounded-xl max-w-3xl inner-glow">
                    <div className="font-body-md text-body-md text-on-surface whitespace-pre-wrap leading-relaxed">{m.content}</div>
                  </div>
                </div>
              )
            ))
          )}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded border border-primary flex items-center justify-center shrink-0 bg-primary/10">
                 <Sparkle size={16} className="text-primary animate-spin" />
              </div>
              <div className="glass-panel px-6 py-3 rounded-xl max-w-3xl inner-glow flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                 <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">SEE is analyzing space...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Prompt Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/90 to-transparent z-20">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
            {selectedImage && (
              <div className="absolute bottom-full left-0 mb-4 p-2 bg-charcoal-surface border border-glass-border rounded-xl shadow-lg flex items-start gap-2">
                <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded border border-glass-border object-cover" />
                <button 
                  type="button" 
                  onClick={() => setSelectedImage(null)}
                  className="bg-error-container text-error hover:bg-error hover:text-white rounded-full p-1 transition-colors"
                >
                  <X size={12} weight="bold" />
                </button>
              </div>
            )}
            
            <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative bg-charcoal-surface border border-glass-border rounded-xl p-2 flex items-end inner-glow focus-within:border-primary transition-colors">
              <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={handleImageUpload} />
              <label htmlFor="file-upload" className="p-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                <ImageIcon size={24} />
              </label>
              
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
                className="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md text-on-surface resize-none py-3 px-2" 
                placeholder="Enter architectural prompt or paste an image..." 
                rows={1} 
                style={{ minHeight: '48px' }}
                disabled={isLoading}
              />
              
              <button 
                type="submit"
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="p-3 bg-primary text-obsidian-deep rounded-lg ml-2 hover:bg-primary-fixed transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperPlaneRight size={24} weight="fill" />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Right Gallery Sidebar */}
      <aside className="w-96 bg-obsidian-deep hidden xl:flex flex-col z-10 shrink-0 overflow-y-auto">
        <div className="sticky top-0 bg-obsidian-deep/90 backdrop-blur px-6 py-6 z-20 border-b border-glass-border">
          <h3 className="font-headline-md text-headline-md text-on-surface">Gallery</h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 uppercase tracking-widest">Recent Renders</p>
        </div>
        <div className="p-6 columns-1 gap-6 space-y-6">
          <div className="glass-panel rounded-xl overflow-hidden group cursor-pointer break-inside-avoid relative">
            <img alt="Gallery item" className="w-full h-48 object-cover" src="/assets/01.png" />
            <div className="absolute inset-0 bg-obsidian-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <span className="font-label-sm text-label-sm text-primary border border-primary/30 w-max px-2 py-1 rounded">EXTERIOR</span>
            </div>
          </div>
          <div className="glass-panel rounded-xl overflow-hidden group cursor-pointer break-inside-avoid relative">
            <img alt="Gallery item" className="w-full h-64 object-cover" src="/assets/C_DR_04.png" />
            <div className="absolute inset-0 bg-obsidian-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <span className="font-label-sm text-label-sm text-primary border border-primary/30 w-max px-2 py-1 rounded">INTERIOR</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
