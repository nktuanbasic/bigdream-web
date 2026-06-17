"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Paperclip, PaperPlaneRight, Image as ImageIcon, MagicWand, Lightning, Brain, Gem } from "@phosphor-icons/react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════
   SEE ENGINE WORKSPACE — Chat Interface
   ═══════════════════════════════════════════════════════════ */

const BRANCHES = [
  { id: "raw", label: "RAW", desc: "Tiền Xử Lý (Phân loại yêu cầu)", type: "Tiện ích" },
  { id: "dna", label: "DNA", desc: "Phân Tích Phong Cách", type: "Phân tích" },
  { id: "board", label: "BOARD", desc: "Sáng Tạo Concept Tổng Thể", type: "Sáng tạo" },
  { id: "room", label: "ROOM", desc: "Thiết Kế Nội Thất Hoàn Chỉnh", type: "Sáng tạo" },
  { id: "fill", label: "FILL", desc: "Thay Vật Liệu / Thêm Nội Thất", type: "Giữ nguyên" },
  { id: "yard", label: "YARD", desc: "Cải Tạo Ngoại Thất / Sân Vườn", type: "Giữ nguyên" },
  { id: "land", label: "LAND", desc: "Quy Hoạch Cảnh Quan", type: "Sáng tạo" },
  { id: "stage", label: "STAGE", desc: "Hậu Kỳ Ảnh Render", type: "Giữ nguyên" },
];

export default function SeeWorkspace() {
  const [activeBranch, setActiveBranch] = useState("room");
  const [activeTier, setActiveTier] = useState("medium"); // Mặc định Trung bình
  const [balance, setBalance] = useState(500000); // 500,000 VND giả lập
  
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Khởi tạo Chat Hook từ AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/see",
    body: {
      branchId: activeBranch,
      tier: activeTier,
    },
    onFinish: () => {
      // Giả lập trừ một số tiền (tùy thuộc vào Tier) để sếp có cảm giác dòng tiền đang chảy
      let fakeCost = 500;
      if (activeTier === 'medium') fakeCost = 1500;
      if (activeTier === 'accurate') fakeCost = 5000;
      setBalance(prev => Math.max(0, prev - fakeCost));
    }
  });

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Đổi nhánh -> Xóa lịch sử chat cũ
  const handleBranchChange = (branchId: string) => {
    setActiveBranch(branchId);
    setMessages([]);
    setAttachments(null);
  };

  // Nút giả lập tính năng tạo ảnh
  const handleGenerateImage = (promptText: string) => {
    alert("Đang gửi lệnh tạo ảnh với Prompt: \n" + promptText.substring(0, 100) + "...");
  };

  return (
    <div className="flex h-screen bg-[#050505] text-[#e5e2e1] pt-[72px] overflow-hidden">
      
      {/* ═══ LEFT SIDEBAR: CHỌN NHÁNH ═══ */}
      <div className="w-[300px] flex-shrink-0 border-r border-white/10 flex flex-col bg-[#0a0a0a]">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-black text-xl text-white tracking-widest uppercase">SEE WORKSPACE</h2>
          <p className="text-xs text-[#a09a8e] mt-1">Core Prompt Engine</p>
          
          {/* Ví VNĐ */}
          <div className="mt-4 p-3 bg-[#1a1a1a] rounded-lg border border-white/5 flex justify-between items-center group">
            <span className="text-xs text-[#a09a8e] uppercase tracking-wider">Số dư:</span>
            <span 
              className="font-mono font-bold text-[#f2ca50] cursor-pointer group-hover:underline"
              onClick={() => {
                const newVal = window.prompt("Admin Panel: Phù phép số dư (VNĐ)", balance.toString());
                if (newVal !== null && !isNaN(Number(newVal))) {
                  setBalance(Number(newVal));
                }
              }}
              title="Click để phù phép bơm/rút tiền"
            >
              {balance.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {BRANCHES.map((branch) => (
            <button
              key={branch.id}
              onClick={() => handleBranchChange(branch.id)}
              className={`w-full text-left p-3 rounded-md transition-all duration-200 border ${
                activeBranch === branch.id
                  ? "bg-[#f2ca50]/10 border-[#f2ca50]/50"
                  : "bg-transparent border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold text-sm uppercase ${activeBranch === branch.id ? "text-[#f2ca50]" : "text-white"}`}>
                  {branch.label}
                </span>
                <span className="text-[10px] bg-white/10 text-[#a09a8e] px-1.5 py-0.5 rounded-sm">
                  {branch.type}
                </span>
              </div>
              <p className="text-xs text-[#6b6560] leading-snug">{branch.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ RIGHT: MAIN CHAT AREA ═══ */}
      <div className="flex-1 flex flex-col relative bg-[#050505]">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md absolute top-0 w-full z-10">
          <div>
            <span className="text-xs text-[#a09a8e] uppercase tracking-wider">Đang thao tác trên nhánh</span>
            <h3 className="font-bold text-lg text-[#f2ca50] uppercase">{BRANCHES.find(b => b.id === activeBranch)?.label}</h3>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-6 custom-scrollbar pb-40">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <MagicWand size={48} className="text-[#f2ca50] mb-4" />
              <p className="text-lg font-bold text-white mb-2">Hệ thống đã sẵn sàng</p>
              <p className="text-sm text-[#a09a8e] max-w-md">
                Chọn chế độ suy luận, tải ảnh tham khảo lên hoặc nhập mô tả của bạn để SEE Engine xử lý.
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl p-4 ${
                  m.role === "user" 
                    ? "bg-[#1a1a1a] border border-white/10 text-white" 
                    : "bg-transparent text-[#e5e2e1]"
                }`}>
                  {m.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 text-[#f2ca50]">
                      <MagicWand size={16} weight="fill" />
                      <span className="text-xs font-bold uppercase tracking-wider">SEE ENGINE</span>
                    </div>
                  )}
                  
                  {/* Nội dung tin nhắn */}
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#c0bcb5]">
                    {m.content}
                  </div>

                  {/* Nhận diện Block Prompt để hiển thị nút Tạo Ảnh */}
                  {m.role === "assistant" && m.content.includes("PROMPT") && m.content.includes("EXPLAIN") && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                      <button 
                        onClick={() => handleGenerateImage(m.content)}
                        className="flex items-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#050505] font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-sm transition-all duration-200"
                      >
                        <ImageIcon size={16} weight="bold" />
                        Tạo ảnh với Prompt vừa tạo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-1 items-center p-4">
                <div className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
          
          {/* Tier Selector */}
          <div className="max-w-4xl mx-auto mb-2 flex gap-2">
            <button 
              onClick={() => setActiveTier("basic")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTier === "basic" ? "bg-white text-black" : "bg-[#1a1a1a] text-[#a09a8e] hover:bg-white/10 hover:text-white border border-white/10"}`}
            >
              <Lightning size={14} weight={activeTier === "basic" ? "fill" : "regular"} /> Cơ bản
            </button>
            <button 
              onClick={() => setActiveTier("medium")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTier === "medium" ? "bg-[#f2ca50] text-black" : "bg-[#1a1a1a] text-[#a09a8e] hover:bg-white/10 hover:text-white border border-white/10"}`}
            >
              <Brain size={14} weight={activeTier === "medium" ? "fill" : "regular"} /> Trung bình
            </button>
            <button 
              onClick={() => setActiveTier("accurate")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTier === "accurate" ? "bg-purple-500 text-white" : "bg-[#1a1a1a] text-[#a09a8e] hover:bg-white/10 hover:text-white border border-white/10"}`}
            >
              <Gem size={14} weight={activeTier === "accurate" ? "fill" : "regular"} /> Chính xác
            </button>
          </div>

          <form 
            onSubmit={(e) => {
              handleSubmit(e, { experimental_attachments: attachments });
              setAttachments(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }} 
            className="relative flex items-end gap-2 max-w-4xl mx-auto"
          >
            {/* Input File Ẩn */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => setAttachments(e.target.files)}
              className="hidden"
              multiple 
              accept="image/*"
            />

            <div className="flex-1 bg-[#1a1a1a] border border-white/20 rounded-xl overflow-hidden focus-within:border-[#f2ca50] transition-colors shadow-2xl">
              {/* Preview Ảnh Đã Chọn */}
              {attachments && attachments.length > 0 && (
                <div className="flex gap-2 p-3 pb-0 overflow-x-auto">
                  {Array.from(attachments).map((file, idx) => (
                    <div key={idx} className="relative w-12 h-12 rounded-md overflow-hidden border border-white/20">
                      <Image src={URL.createObjectURL(file)} alt="preview" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Mô tả không gian hoặc dán ảnh vào đây..."
                className="w-full max-h-48 min-h-[56px] bg-transparent text-white placeholder:text-[#6b6560] p-4 text-sm focus:outline-none resize-none overflow-y-auto custom-scrollbar"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if(input.trim() || attachments) {
                      e.currentTarget.form?.requestSubmit();
                    }
                  }
                }}
              />
              
              <div className="flex justify-between items-center p-2 pt-0">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-[#a09a8e] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  title="Đính kèm ảnh"
                >
                  <Paperclip size={20} />
                </button>
                <div className="text-[10px] text-[#6b6560]">Nhấn Enter để gửi, Shift + Enter để xuống dòng</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !attachments)}
              className="w-14 h-14 flex items-center justify-center bg-[#f2ca50] hover:bg-[#ffe088] disabled:bg-[#f2ca50]/20 disabled:text-black/20 text-[#050505] rounded-xl transition-colors shrink-0 shadow-lg"
            >
              <PaperPlaneRight size={24} weight="fill" />
            </button>
          </form>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
