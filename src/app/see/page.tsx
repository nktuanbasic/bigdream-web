"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type FileUIPart, type UIMessage } from "ai";
import { Paperclip, PaperPlaneRight, Image as ImageIcon, MagicWand, Lightning, Brain, Diamond, Plus, ChatCircle, Trash, Folder, CaretDown, CaretRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

/* ═══════════════════════════════════════════════════════════
   SEE ENGINE WORKSPACE — Premium 3-Column Layout
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

const getMessageText = (message: UIMessage) =>
  message.parts.filter((part) => part.type === "text").map((part) => part.text).join("");

const getMessageFiles = (message: UIMessage) =>
  message.parts.filter((part): part is FileUIPart => part.type === "file");

const Gem = Diamond;

export default function SeeWorkspace() {
  const [activeBranch, setActiveBranch] = useState("room");
  const [activeTier, setActiveTier] = useState("medium");
  const [balance, setBalance] = useState(0);
  const [isWalletLoaded, setIsWalletLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [input, setInput] = useState("");
  
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [lastUploadedBase64, setLastUploadedBase64] = useState<string | null>(null);
  const [generatingForMsg, setGeneratingForMsg] = useState<string | null>(null);
  const [renderedImages, setRenderedImages] = useState<Record<string, { url: string, model: string }>>({});
  
  // History & Projects State
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProjectIdRef = useRef<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const currentChatIdRef = useRef<string | null>(null);
  const [historyList, setHistoryList] = useState<any[]>([]); 
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { currentChatIdRef.current = currentChatId; }, [currentChatId]);
  useEffect(() => { activeProjectIdRef.current = activeProjectId; }, [activeProjectId]);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/see",
      fetch: async (url, options) => {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;

        const body = typeof options?.body === "string" ? JSON.parse(options.body) : {};
        body.chatId = currentChatIdRef.current;
        body.projectId = body.projectId ?? activeProjectIdRef.current;

        const headers = new Headers(options?.headers);
        if (token) headers.set("Authorization", `Bearer ${token}`);

        const res = await fetch(url, { ...options, body: JSON.stringify(body), headers });

        const newChatId = res.headers.get("X-Chat-Id");
        if (newChatId && !currentChatIdRef.current) {
           setCurrentChatId(newChatId);
           if (token) fetchHistoryList(token);
        }
        return res;
      },
    }),
    onFinish: () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) fetchWallet(session.access_token);
      });
    }
  });

  const fetchWallet = async (token: string) => {
    try {
      const res = await fetch('/api/lens/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ action: 'get_wallet' })
      });
      const data = await res.json();
      if (data.wallet) setBalance(data.wallet.purchased_coins);
      setIsWalletLoaded(true);
    } catch (err) {
      console.error("Lỗi lấy ví tiền:", err);
      setIsWalletLoaded(true);
    }
  };

  const fetchHistoryList = async (token: string) => {
    try {
      const res = await fetch('/api/see/history', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.chats) setHistoryList(data.chats);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProjectsList = async (token: string) => {
    try {
      const res = await fetch('/api/see/projects', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.projects) {
        setProjectsList(data.projects);
        if (data.projects.length > 0) {
           setExpandedProjects(prev => ({ ...prev, [data.projects[0].id]: true }));
           setActiveProjectId(data.projects[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await fetch('/api/see/projects', {
         method: 'POST',
         headers: { 'Authorization': `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: newProjectName.trim() })
      });
      const data = await res.json();
      
      if (res.status === 500 || data.error) {
         alert("LỖI: Chưa có bảng Dự án trong Database!\n\nSếp quên chạy đoạn SQL em gửi rồi. Vui lòng quay lại Supabase, dán đoạn mã SQL vào SQL Editor và chạy để tạo bảng nhé.");
         return;
      }

      if (data.project) {
         setProjectsList([data.project, ...projectsList]);
         setActiveProjectId(data.project.id);
         setExpandedProjects(prev => ({ ...prev, [data.project.id]: true }));
         setIsCreatingProject(false);
         setNewProjectName("");
         startNewChatInProject(data.project.id);
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi kết nối, vui lòng thử lại.");
    }
  };

  const loadChat = async (chatId: string, projectId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await fetch(`/api/see/history?chatId=${chatId}`, {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      const data = await res.json();
      if (data.chat) {
        setCurrentChatId(chatId);
        setActiveProjectId(projectId);
        setActiveBranch(data.chat.branch_id);
        
        const loadedMessages = data.messages.map((m: any) => ({
          id: m.id,
          role: m.role as UIMessage["role"],
          parts: [
            ...(m.attachments || []).map((url: string) => ({ type: "file" as const, url, mediaType: "image/jpeg" })),
            ...(m.content ? [{ type: "text" as const, text: m.content }] : []),
          ],
        }));
        
        setMessages(loadedMessages);
        setRenderedImages(data.generatedImages || {});
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startNewChatInProject = (projectId: string) => {
    setActiveProjectId(projectId);
    setCurrentChatId(null);
    setMessages([]);
    setRenderedImages({});
    setAttachments(null);
    setLastUploadedBase64(null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (session) {
         fetchWallet(session.access_token);
         fetchProjectsList(session.access_token);
         fetchHistoryList(session.access_token);
      } else setIsWalletLoaded(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        fetchWallet(session.access_token);
        fetchProjectsList(session.access_token);
        fetchHistoryList(session.access_token);
      } else {
        setBalance(0);
        setIsWalletLoaded(true);
        setHistoryList([]);
        setProjectsList([]);
        setCurrentChatId(null);
        setMessages([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!activeProjectId) {
       alert("Vui lòng chọn hoặc tạo Dự án trước khi chat!");
       return;
    }
    const text = input.trim();
    const files = attachments ?? undefined;
    if (!text && !files) return;

    await sendMessage(
      text ? { text, files } : { files: files! },
      { body: { branchId: activeBranch, tier: activeTier, projectId: activeProjectId } }
    );

    setInput("");
    setAttachments(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerateImage = async (promptText: string, messageId: string) => {
    setGeneratingForMsg(messageId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      let baseImage = lastUploadedBase64;
      if (!baseImage) {
        const userMsgsWithImage = messages.filter(m => m.role === "user" && getMessageFiles(m).length > 0);
        if (userMsgsWithImage.length > 0) {
           const lastImgAtt = getMessageFiles(userMsgsWithImage[userMsgsWithImage.length - 1])[0];
           if (lastImgAtt?.url) baseImage = lastImgAtt.url;
        }
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ prompt: promptText, imageBase64: baseImage, messageId: messageId })
      });
      const data = await res.json();
      
      if (data.success) {
        setRenderedImages(prev => ({
          ...prev,
          [messageId]: { url: data.imageUrl, model: data.modelUsed || "imagen-4.0-fast-generate" }
        }));
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) fetchWallet(session.access_token);
        });
      } else {
        alert("Lỗi: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối tới Server Tạo Ảnh");
    } finally {
      setGeneratingForMsg(null);
    }
  };

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  return (
    <div className="flex h-screen bg-[#050505] text-[#e5e2e1] pt-[72px] overflow-hidden selection:bg-[#f2ca50] selection:text-black font-sans">
      
      {/* ═══ COL 1: PROJECTS SIDEBAR ═══ */}
      <div className="w-[300px] flex-shrink-0 border-r border-white/5 flex flex-col bg-[#0a0a0a] z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 pb-4">
          <h2 className="font-black text-xl text-white tracking-[0.2em] uppercase bg-gradient-to-r from-white to-[#f2ca50] bg-clip-text text-transparent">SEE WORKSPACE</h2>
          <div className="mt-6 p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-white/5 shadow-inner flex justify-between items-center group hover:border-[#f2ca50]/30 transition-colors">
            <span className="text-xs text-[#a09a8e] uppercase tracking-wider font-medium">SỐ DƯ GEM:</span>
            <span className="font-mono font-bold text-[#f2ca50] cursor-default flex items-center gap-1.5 text-lg drop-shadow-[0_0_8px_rgba(242,202,80,0.4)] group-hover:scale-105 transition-transform">
              <Gem size={18} weight="fill" />
              {!isWalletLoaded ? "..." : (isLoggedIn ? balance.toLocaleString('vi-VN') : "--")}
            </span>
          </div>
        </div>
        
        <div className="px-6 pb-4">
           {!isCreatingProject ? (
             <button 
               onClick={() => setIsCreatingProject(true)} 
               className="w-full flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-[#f2ca50] to-[#e5b630] hover:from-[#ffe088] hover:to-[#f2ca50] text-[#050505] rounded-xl font-bold transition-all shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:shadow-[0_4px_25px_rgba(242,202,80,0.4)] hover:-translate-y-0.5 active:translate-y-0"
             >
               <Plus size={18} weight="bold" /> DỰ ÁN MỚI
             </button>
           ) : (
             <form onSubmit={createNewProject} className="flex flex-col gap-3 p-4 bg-[#111] rounded-xl border border-[#f2ca50]/50 shadow-[0_0_20px_rgba(242,202,80,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f2ca50] to-transparent opacity-50"></div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">Tạo dự án mới</span>
                  <button type="button" onClick={() => setIsCreatingProject(false)} className="text-[#a09a8e] hover:text-white"><X size={14} weight="bold" /></button>
                </div>
                <input 
                  autoFocus
                  type="text" 
                  value={newProjectName} 
                  onChange={e => setNewProjectName(e.target.value)} 
                  placeholder="Nhập tên dự án..." 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#f2ca50] transition-colors placeholder:text-[#444]"
                />
                <button type="submit" className="w-full bg-[#f2ca50] hover:bg-[#ffe088] text-black font-bold text-sm py-2.5 rounded-lg transition-colors">
                  Lưu Dự Án
                </button>
             </form>
           )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 custom-scrollbar">
          <div className="text-[10px] text-[#6b6560] uppercase tracking-widest font-bold mb-4 px-2 mt-2">Thư Mục Của Bạn</div>
          {projectsList.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-10 opacity-30">
                <Folder size={32} weight="thin" className="mb-2" />
                <p className="text-xs text-center">Chưa có dự án nào</p>
             </div>
          ) : (
            projectsList.map(project => {
              const projectChats = historyList.filter(c => c.project_id === project.id);
              const isExpanded = expandedProjects[project.id];
              const isActive = activeProjectId === project.id;
              
              return (
                <div key={project.id} className="flex flex-col mb-2">
                  <div className={`flex items-center gap-1 group rounded-lg transition-colors ${isActive ? 'bg-[#1a1a1a] border border-white/5' : 'hover:bg-white/5'}`}>
                    <button onClick={() => toggleProject(project.id)} className={`p-2 text-[#a09a8e] hover:text-white transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                      <CaretDown size={14} weight="bold" />
                    </button>
                    <button 
                      onClick={() => { setActiveProjectId(project.id); setExpandedProjects(prev => ({...prev, [project.id]: true})); }}
                      className="flex-1 flex items-center gap-2 text-left py-2.5 pr-3 transition-all text-sm truncate"
                    >
                      <Folder size={18} weight={isActive ? "fill" : "regular"} className={isActive ? "text-[#f2ca50]" : "text-[#a09a8e] group-hover:text-white"} />
                      <span className={`truncate font-medium ${isActive ? 'text-white' : 'text-[#a09a8e] group-hover:text-white'}`}>{project.name}</span>
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="pl-9 pr-2 flex flex-col gap-0.5 mt-1 relative before:absolute before:left-[19px] before:top-0 before:bottom-2 before:w-px before:bg-white/5">
                       <button 
                         onClick={() => startNewChatInProject(project.id)}
                         className="flex items-center gap-2 py-2 px-3 text-[11px] text-[#6b6560] hover:text-[#f2ca50] hover:bg-[#f2ca50]/5 transition-all rounded-md group/btn"
                       >
                         <Plus size={12} weight="bold" className="group-hover/btn:scale-110 transition-transform" /> <span className="font-bold uppercase tracking-wider">Đoạn Chat Mới</span>
                       </button>
                       {projectChats.map(chat => {
                         const isChatActive = currentChatId === chat.id;
                         return (
                           <button 
                             key={chat.id} 
                             onClick={() => loadChat(chat.id, project.id)} 
                             className={`flex items-center gap-2 text-left py-2 px-3 rounded-md transition-all text-xs truncate relative ${isChatActive ? 'text-[#f2ca50] bg-gradient-to-r from-[#f2ca50]/10 to-transparent font-bold' : 'text-[#8b857e] hover:text-white hover:bg-white/5'}`}
                           >
                             {isChatActive && <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#f2ca50] rounded-r-full" />}
                             <ChatCircle size={14} weight={isChatActive ? "fill" : "regular"} className={isChatActive ? "" : "opacity-60"} />
                             <span className="truncate">{chat.title}</span>
                           </button>
                         )
                       })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ═══ COL 2: FEATURE BRANCHES ═══ */}
      <div className="w-[280px] flex-shrink-0 border-r border-white/5 bg-[#080808] flex flex-col relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-transparent opacity-50 pointer-events-none"></div>
        <div className="p-6 pb-4 border-b border-white/5 relative">
          <span className="text-[10px] text-[#6b6560] uppercase tracking-widest font-bold">Tính năng / Nhánh xử lý</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar relative">
           {BRANCHES.map((branch) => {
              const isActive = activeBranch === branch.id;
              return (
              <button
                key={branch.id}
                onClick={() => setActiveBranch(branch.id)}
                className={`w-full flex flex-col items-start p-4 rounded-xl border transition-all duration-300 text-left relative overflow-hidden group ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#1a1a1a] to-[#222] border-[#f2ca50]/50 shadow-[0_4px_20px_rgba(242,202,80,0.15)] -translate-y-0.5' 
                    : 'bg-[#111] border-white/5 hover:border-white/20 hover:bg-[#151515] hover:-translate-y-0.5'
                }`}
              >
                {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f2ca50] to-[#e5b630]"></div>}
                <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase mb-2 tracking-wider ${isActive ? 'bg-[#f2ca50]/20 text-[#f2ca50]' : 'bg-white/5 text-[#888]'}`}>
                  {branch.type}
                </span>
                <span className={`font-black text-[15px] uppercase mb-1 tracking-wide ${isActive ? 'text-white' : 'text-[#ccc] group-hover:text-white'}`}>
                  {branch.label}
                </span>
                <span className={`text-[12px] leading-relaxed ${isActive ? 'text-[#a09a8e]' : 'text-[#6b6560] group-hover:text-[#888]'}`}>{branch.desc}</span>
              </button>
            )})}
        </div>
      </div>

      {/* ═══ COL 3: MAIN CHAT AREA ═══ */}
      <div className="flex-1 flex flex-col relative bg-[#050505]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pointer-events-none"></div>

        {/* Chat Header */}
        <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-[#050505]/70 backdrop-blur-xl absolute top-0 w-full z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-[#f2ca50] uppercase tracking-widest font-bold border border-[#f2ca50]/30 px-2 py-0.5 rounded-full bg-[#f2ca50]/10">
                 {BRANCHES.find(b => b.id === activeBranch)?.label}
              </span>
              <span className="text-xs text-[#6b6560] uppercase tracking-wider">
                {activeProjectId ? (projectsList.find(p => p.id === activeProjectId)?.name) : ''}
              </span>
            </div>
            <h3 className="font-bold text-xl text-white">
               {currentChatId ? historyList.find(c => c.id === currentChatId)?.title || 'Đang Chat...' : 'Bắt đầu cuộc hội thoại mới'}
            </h3>
          </div>
        </div>

        {/* Messages or Demo View */}
        <div className="flex-1 overflow-y-auto px-8 pt-28 pb-48 space-y-8 custom-scrollbar">
          {!activeProjectId ? (
             <div className="h-full flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  <Folder size={40} className="text-[#a09a8e]" weight="thin" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Chưa chọn Dự án</h2>
                <p className="text-[#a09a8e] text-center max-w-sm leading-relaxed">
                  Quản lý công việc hiệu quả hơn bằng cách tạo Dự án mới ở cột bên trái, hoặc chọn một Dự án có sẵn để bắt đầu.
                </p>
             </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto w-full animate-in fade-in duration-700">
              <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-10 group">
                 <img 
                   src={`https://picsum.photos/seed/${activeBranch}/1280/720`} 
                   alt="Branch Demo" 
                   className="object-cover w-full h-full opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent flex items-end p-10">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase rounded-full mb-4 inline-flex items-center gap-2 shadow-lg">
                        <MagicWand size={14} className="text-[#f2ca50]" /> DEMO TÍNH NĂNG
                      </span>
                      <h2 className="text-4xl font-black text-white tracking-wide uppercase mb-3">{BRANCHES.find(b => b.id === activeBranch)?.label}</h2>
                      <p className="text-lg text-[#ccc] max-w-xl font-light">{BRANCHES.find(b => b.id === activeBranch)?.desc}</p>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            messages.map((m) => {
              const messageText = getMessageText(m);
              const fileParts = getMessageFiles(m);

              return (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-5 ${
                  m.role === "user" 
                    ? "bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-white/5 text-white shadow-xl rounded-tr-sm" 
                    : "bg-transparent text-[#e5e2e1]"
                }`}>
                  {m.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-3 text-[#f2ca50]">
                      <div className="p-1.5 bg-[#f2ca50]/10 rounded-md border border-[#f2ca50]/20">
                        <MagicWand size={16} weight="fill" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">SEE ENGINE</span>
                    </div>
                  )}

                  {m.role === "user" && fileParts.length > 0 && (
                     <div className="flex flex-wrap gap-3 mb-4">
                        {fileParts.map((att, idx) => (
                           <div key={idx} className="relative w-36 h-36 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                              <img src={att.url} alt="attachment" className="object-cover w-full h-full" />
                           </div>
                        ))}
                     </div>
                  )}
                  
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-[#d0cdcd]">
                    {messageText}
                  </div>

                  {m.role === "assistant" && messageText.includes("PROMPT") && messageText.includes("EXPLAIN") && (
                    <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-4">
                      {!renderedImages[m.id] ? (
                        <button 
                          onClick={() => {
                            const match = messageText.match(/PROMPT\s*([\s\S]*?)\s*EXPLAIN/i);
                            const actualPrompt = match ? match[1].trim() : messageText;
                            handleGenerateImage(actualPrompt, m.id);
                          }}
                          disabled={generatingForMsg === m.id}
                          className="flex w-fit items-center gap-2.5 bg-gradient-to-r from-[#f2ca50] to-[#e5b630] hover:from-[#ffe088] hover:to-[#f2ca50] disabled:opacity-50 disabled:cursor-wait text-[#050505] font-bold text-sm tracking-wide px-6 py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(242,202,80,0.2)] hover:shadow-[0_4px_25px_rgba(242,202,80,0.4)]"
                        >
                          <ImageIcon size={18} weight="bold" />
                          {generatingForMsg === m.id ? "ĐANG XỬ LÝ RENDER..." : "BẮT ĐẦU RENDER ẢNH"}
                        </button>
                      ) : (
                        <div className="flex flex-col gap-3 mt-2 animate-in slide-in-from-bottom-4 duration-500">
                          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl group">
                            <img src={renderedImages[m.id].url} alt="Generated Design" className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-[1.02]" />
                          </div>
                          <div className="flex justify-between items-center max-w-3xl px-1">
                            <span className="flex items-center gap-1.5 text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1.5 rounded-md border border-green-400/20">
                              <Lightning size={14} weight="fill" /> RENDER THÀNH CÔNG
                            </span>
                            <span className="text-[10px] text-[#888] uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-md bg-[#111]">
                              {renderedImages[m.id].model}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              );
            })
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 items-center p-5 bg-[#111] rounded-2xl rounded-tl-sm border border-white/5 w-fit">
                <div className="w-2 h-2 bg-[#f2ca50] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#f2ca50] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-2 h-2 bg-[#f2ca50] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent backdrop-blur-sm">
          <div className="max-w-5xl mx-auto flex flex-col gap-3 relative">
            
            {/* Tier Selectors */}
            <div className="flex gap-2 mb-1 pl-1">
               <button 
                 onClick={() => setActiveTier("basic")}
                 className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${activeTier === "basic" ? "bg-white text-black shadow-[0_4px_15px_rgba(255,255,255,0.2)] -translate-y-1" : "bg-[#111] text-[#a09a8e] hover:bg-[#1a1a1a] hover:text-white border border-white/5"}`}
               >
                 <Lightning size={14} weight={activeTier === "basic" ? "fill" : "regular"} /> Cơ bản
               </button>
               <button 
                 onClick={() => setActiveTier("medium")}
                 className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${activeTier === "medium" ? "bg-[#f2ca50] text-black shadow-[0_4px_15px_rgba(242,202,80,0.3)] -translate-y-1" : "bg-[#111] text-[#a09a8e] hover:bg-[#1a1a1a] hover:text-white border border-white/5"}`}
               >
                 <Brain size={14} weight={activeTier === "medium" ? "fill" : "regular"} /> Trung bình
               </button>
               <button 
                 onClick={() => setActiveTier("accurate")}
                 className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${activeTier === "accurate" ? "bg-[#a855f7] text-white shadow-[0_4px_15px_rgba(168,85,247,0.3)] -translate-y-1" : "bg-[#111] text-[#a09a8e] hover:bg-[#1a1a1a] hover:text-white border border-white/5"}`}
               >
                 <Gem size={14} weight={activeTier === "accurate" ? "fill" : "regular"} /> Chính xác
               </button>
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSendMessage}
              className={`relative flex items-end gap-3 p-2 bg-[#111]/80 backdrop-blur-xl border ${!activeProjectId ? 'border-white/5 opacity-50' : 'border-white/10 focus-within:border-[#f2ca50]/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:shadow-[0_10px_40px_rgba(242,202,80,0.1)]'} rounded-2xl transition-all duration-300`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={(e) => {
                  setAttachments(e.target.files);
                  if (e.target.files && e.target.files.length > 0) {
                    const reader = new FileReader();
                    reader.onload = (ev) => { setLastUploadedBase64(ev.target?.result as string); };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                className="hidden"
                multiple 
                accept="image/*"
              />

              <div className="flex-1 flex flex-col">
                {attachments && attachments.length > 0 && (
                  <div className="flex gap-3 px-4 pt-4 pb-2 overflow-x-auto">
                    {Array.from(attachments).map((file, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-md">
                        <Image src={URL.createObjectURL(file)} alt="preview" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!isLoggedIn || !activeProjectId}
                  placeholder={!isLoggedIn ? "Đăng nhập để sử dụng tính năng này..." : (!activeProjectId ? "Chọn hoặc tạo Dự án ở cột trái để bắt đầu..." : "Mô tả không gian hoặc dán ảnh vào đây...")}
                  className="w-full max-h-[200px] min-h-[60px] bg-transparent text-white placeholder:text-[#555] px-5 py-4 text-[15px] focus:outline-none resize-none overflow-y-auto custom-scrollbar disabled:opacity-50"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if((input.trim() || attachments) && activeProjectId) {
                        e.currentTarget.form?.requestSubmit();
                      }
                    }
                  }}
                />
                
                <div className="flex justify-between items-center px-4 pb-3">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!activeProjectId}
                    className="p-2.5 text-[#a09a8e] hover:text-white hover:bg-white/10 transition-colors rounded-xl disabled:opacity-50 disabled:hover:bg-transparent"
                    title="Đính kèm ảnh"
                  >
                    <Paperclip size={20} weight="bold" />
                  </button>
                  <div className="text-[11px] text-[#555] font-medium tracking-wide">Nhấn Enter để gửi, Shift + Enter để xuống dòng</div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !attachments) || !isLoggedIn || !activeProjectId}
                className="w-[60px] h-[60px] mb-2 mr-2 flex items-center justify-center bg-gradient-to-br from-[#f2ca50] to-[#e5b630] hover:from-[#ffe088] hover:to-[#f2ca50] disabled:from-[#222] disabled:to-[#111] disabled:text-[#555] text-[#050505] rounded-xl transition-all shrink-0 shadow-[0_4px_15px_rgba(242,202,80,0.2)] disabled:shadow-none"
              >
                <PaperPlaneRight size={24} weight="fill" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
}
