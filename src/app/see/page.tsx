"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type FileUIPart, type UIMessage } from "ai";
import { Paperclip, PaperPlaneRight, Image as ImageIcon, MagicWand, Lightning, Brain, Diamond, Plus, ChatCircle, Trash, Folder, CaretDown, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

/* ═══════════════════════════════════════════════════════════
   SEE ENGINE WORKSPACE — 3 Column Layout
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
  message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

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
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const currentChatIdRef = useRef<string | null>(null);
  const [historyList, setHistoryList] = useState<any[]>([]); // Chats
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { currentChatIdRef.current = currentChatId; }, [currentChatId]);

  // Khởi tạo Chat Hook từ AI SDK
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/see",
      fetch: async (url, options) => {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;

        const body = typeof options?.body === "string" ? JSON.parse(options.body) : {};
        body.chatId = currentChatIdRef.current;
        body.projectId = activeProjectId; // Gửi kèm projectId

        const headers = new Headers(options?.headers);
        if (token) headers.set("Authorization", `Bearer ${token}`);

        const res = await fetch(url, {
          ...options,
          body: JSON.stringify(body),
          headers,
        });

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
      const res = await fetch('/api/see/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.chats) setHistoryList(data.chats);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProjectsList = async (token: string) => {
    try {
      const res = await fetch('/api/see/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.projects) {
        setProjectsList(data.projects);
        // Expand the first project by default
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

  // Khởi động
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
    <div className="flex h-screen bg-[#050505] text-[#e5e2e1] pt-[72px] overflow-hidden">
      
      {/* ═══ COL 1 (RED BOX): LEFT SIDEBAR (PROJECTS) ═══ */}
      <div className="w-[280px] flex-shrink-0 border-r border-white/10 flex flex-col bg-[#0a0a0a]">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-black text-xl text-white tracking-widest uppercase">SEE WORKSPACE</h2>
          <div className="mt-4 p-3 bg-[#1a1a1a] rounded-lg border border-white/5 flex justify-between items-center">
            <span className="text-xs text-[#a09a8e] uppercase tracking-wider">Số dư:</span>
            <span className="font-mono font-bold text-[#f2ca50] cursor-default flex items-center gap-1">
              <Gem size={14} weight="fill" />
              {!isWalletLoaded ? "..." : (isLoggedIn ? balance.toLocaleString('vi-VN') : "Chưa kết nối")}
            </span>
          </div>
        </div>
        
        <div className="p-4 border-b border-white/10">
           {!isCreatingProject ? (
             <button onClick={() => setIsCreatingProject(true)} className="w-full flex items-center justify-center gap-2 p-3 bg-[#f2ca50] hover:bg-[#ffe088] text-[#050505] rounded-md font-bold transition-all shadow-md">
               <Plus size={16} weight="bold" /> Dự Án Mới
             </button>
           ) : (
             <form onSubmit={createNewProject} className="flex flex-col gap-2">
                <input 
                  autoFocus
                  type="text" 
                  value={newProjectName} 
                  onChange={e => setNewProjectName(e.target.value)} 
                  placeholder="Tên dự án..." 
                  className="w-full bg-[#1a1a1a] border border-[#f2ca50] rounded-md p-2 text-sm text-white focus:outline-none"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-[#f2ca50] text-black font-bold text-xs py-2 rounded-md">Lưu</button>
                  <button type="button" onClick={() => setIsCreatingProject(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 rounded-md">Hủy</button>
                </div>
             </form>
           )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <div className="text-[10px] text-[#a09a8e] uppercase tracking-widest font-bold mb-3 pl-2">Thư Mục Dự Án</div>
          {projectsList.length === 0 ? (
             <p className="text-xs text-[#6b6560] text-center mt-4">Chưa có dự án nào</p>
          ) : (
            projectsList.map(project => {
              const projectChats = historyList.filter(c => c.project_id === project.id);
              const isExpanded = expandedProjects[project.id];
              return (
                <div key={project.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 group">
                    <button onClick={() => toggleProject(project.id)} className="p-1 text-[#a09a8e] hover:text-white">
                      {isExpanded ? <CaretDown size={14} /> : <CaretRight size={14} />}
                    </button>
                    <button 
                      onClick={() => { setActiveProjectId(project.id); setExpandedProjects(prev => ({...prev, [project.id]: true})); }}
                      className={`flex-1 flex items-center gap-2 text-left p-2 rounded-md transition-all text-sm truncate ${activeProjectId === project.id ? 'bg-white/10 text-white font-bold' : 'text-[#a09a8e] hover:bg-white/5 hover:text-white'}`}
                    >
                      <Folder size={16} weight={activeProjectId === project.id ? "fill" : "regular"} className={activeProjectId === project.id ? "text-[#f2ca50]" : ""} />
                      <span className="truncate">{project.name}</span>
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="pl-6 pr-2 flex flex-col gap-1 mt-1 border-l border-white/5 ml-3">
                       <button 
                         onClick={() => startNewChatInProject(project.id)}
                         className="flex items-center gap-2 p-2 text-xs text-[#6b6560] hover:text-[#f2ca50] transition-colors rounded-md hover:bg-white/5"
                       >
                         <Plus size={12} /> <span className="font-medium uppercase tracking-wider">Tạo Chat Mới</span>
                       </button>
                       {projectChats.map(chat => (
                         <button 
                           key={chat.id} 
                           onClick={() => loadChat(chat.id, project.id)} 
                           className={`flex items-center gap-2 text-left p-2 rounded-md transition-all text-xs truncate ${currentChatId === chat.id ? 'bg-[#f2ca50]/10 text-[#f2ca50] font-bold' : 'text-[#a09a8e] hover:bg-white/5 hover:text-white'}`}
                         >
                           <ChatCircle size={14} />
                           <span className="truncate">{chat.title}</span>
                         </button>
                       ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ═══ COL 2 (GREEN BOX): FEATURE BRANCHES ═══ */}
      <div className="w-[240px] flex-shrink-0 border-r border-white/10 bg-[#080808] flex flex-col">
        <div className="p-4 border-b border-white/10">
          <span className="text-[10px] text-[#a09a8e] uppercase tracking-widest font-bold">Tính năng / Nhánh xử lý</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
           {BRANCHES.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setActiveBranch(branch.id)}
                className={`w-full flex flex-col items-start p-3 rounded-lg border transition-all text-left ${
                  activeBranch === branch.id 
                    ? 'bg-[#f2ca50]/10 border-[#f2ca50] shadow-[0_0_10px_rgba(242,202,80,0.1)]' 
                    : 'bg-[#1a1a1a] border-white/5 hover:border-white/20 hover:bg-[#222]'
                }`}
              >
                <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase mb-1 ${activeBranch === branch.id ? 'bg-[#f2ca50] text-black' : 'bg-white/10 text-[#a09a8e]'}`}>
                  {branch.type}
                </span>
                <span className={`font-bold text-sm uppercase mb-1 ${activeBranch === branch.id ? 'text-[#f2ca50]' : 'text-white'}`}>
                  {branch.label}
                </span>
                <span className="text-[11px] text-[#6b6560] leading-tight line-clamp-2">{branch.desc}</span>
              </button>
            ))}
        </div>
      </div>

      {/* ═══ COL 3 (PURPLE & YELLOW BOX): MAIN CHAT AREA ═══ */}
      <div className="flex-1 flex flex-col relative bg-[#050505]">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md absolute top-0 w-full z-10">
          <div>
            <span className="text-xs text-[#a09a8e] uppercase tracking-wider">
              {activeProjectId ? (projectsList.find(p => p.id === activeProjectId)?.name || 'Dự án') : 'Chưa chọn dự án'}
              {currentChatId && " / Đoạn Chat"}
            </span>
            <h3 className="font-bold text-lg text-[#f2ca50] uppercase">
               {currentChatId ? historyList.find(c => c.id === currentChatId)?.title || 'Đang Chat' : BRANCHES.find(b => b.id === activeBranch)?.label}
            </h3>
          </div>
          <div className="text-xs border border-white/20 px-3 py-1 rounded-full text-[#a09a8e]">
             Nhánh hiện tại: <span className="text-white font-bold">{BRANCHES.find(b => b.id === activeBranch)?.label}</span>
          </div>
        </div>

        {/* PURPLE BOX: Messages or Demo View */}
        <div className="flex-1 overflow-y-auto p-6 pt-24 pb-40 space-y-6 custom-scrollbar">
          {!activeProjectId ? (
             <div className="h-full flex flex-col items-center justify-center">
                <Folder size={48} className="text-white/20 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Chưa chọn Dự án</h2>
                <p className="text-sm text-[#a09a8e]">Vui lòng tạo Dự án mới bên cột trái để bắt đầu.</p>
             </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
              {/* Demo Image Placeholders cho từng nhánh */}
              <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-8 group">
                 <img 
                   src={`https://picsum.photos/seed/${activeBranch}/1280/720`} 
                   alt="Branch Demo" 
                   className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                    <div>
                      <span className="px-2 py-1 bg-[#f2ca50] text-black text-[10px] font-bold uppercase rounded-sm mb-2 inline-block">Mẫu Demo</span>
                      <h2 className="text-3xl font-black text-white tracking-wide uppercase mb-2">{BRANCHES.find(b => b.id === activeBranch)?.label}</h2>
                      <p className="text-[#e5e2e1] max-w-lg">{BRANCHES.find(b => b.id === activeBranch)?.desc}</p>
                    </div>
                 </div>
              </div>
              <p className="text-sm text-[#a09a8e] text-center max-w-lg animate-pulse">
                Nhập yêu cầu vào ô bên dưới để bắt đầu đoạn chat mới trong dự án này...
              </p>
            </div>
          ) : (
            messages.map((m) => {
              const messageText = getMessageText(m);
              const fileParts = getMessageFiles(m);

              return (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl p-4 ${
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

                  {m.role === "user" && fileParts.length > 0 && (
                     <div className="flex flex-wrap gap-2 mb-3">
                        {fileParts.map((att, idx) => (
                           <div key={idx} className="relative w-32 h-32 rounded-md overflow-hidden border border-white/20">
                              <img src={att.url} alt="attachment" className="object-cover w-full h-full" />
                           </div>
                        ))}
                     </div>
                  )}
                  
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#c0bcb5]">
                    {messageText}
                  </div>

                  {m.role === "assistant" && messageText.includes("PROMPT") && messageText.includes("EXPLAIN") && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                      {!renderedImages[m.id] ? (
                        <button 
                          onClick={() => {
                            const match = messageText.match(/PROMPT\s*([\s\S]*?)\s*EXPLAIN/i);
                            const actualPrompt = match ? match[1].trim() : messageText;
                            handleGenerateImage(actualPrompt, m.id);
                          }}
                          disabled={generatingForMsg === m.id}
                          className="flex w-fit items-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] disabled:bg-[#f2ca50]/50 disabled:cursor-wait text-[#050505] font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-sm transition-all duration-200"
                        >
                          <ImageIcon size={16} weight="bold" />
                          {generatingForMsg === m.id ? "Đang xử lý Render..." : "Tạo ảnh với Prompt vừa tạo"}
                        </button>
                      ) : (
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="relative w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/20 bg-black/50 shadow-2xl">
                            <img src={renderedImages[m.id].url} alt="Generated Design" className="object-contain w-full h-full" />
                          </div>
                          <div className="flex justify-between items-center max-w-2xl text-[10px] text-[#a09a8e]">
                            <span className="text-green-500 font-bold">✅ Render thành công</span>
                            <span className="uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded-sm">Model: {renderedImages[m.id].model}</span>
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
              <div className="flex gap-1 items-center p-4">
                <div className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* YELLOW BOX: Input Area & Settings */}
        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
          
          <div className="max-w-4xl mx-auto mb-2 flex justify-between items-end">
            <div className="flex gap-2">
               <button 
                 onClick={() => setActiveTier("basic")}
                 className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTier === "basic" ? "bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]" : "bg-[#1a1a1a] text-[#a09a8e] hover:bg-white/10 hover:text-white border border-white/10"}`}
               >
                 <Lightning size={14} weight={activeTier === "basic" ? "fill" : "regular"} /> Cơ bản
               </button>
               <button 
                 onClick={() => setActiveTier("medium")}
                 className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTier === "medium" ? "bg-[#f2ca50] text-black shadow-[0_0_10px_rgba(242,202,80,0.3)]" : "bg-[#1a1a1a] text-[#a09a8e] hover:bg-white/10 hover:text-white border border-white/10"}`}
               >
                 <Brain size={14} weight={activeTier === "medium" ? "fill" : "regular"} /> Trung bình
               </button>
               <button 
                 onClick={() => setActiveTier("accurate")}
                 className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTier === "accurate" ? "bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]" : "bg-[#1a1a1a] text-[#a09a8e] hover:bg-white/10 hover:text-white border border-white/10"}`}
               >
                 <Gem size={14} weight={activeTier === "accurate" ? "fill" : "regular"} /> Chính xác
               </button>
            </div>
          </div>

          <form 
            onSubmit={handleSendMessage}
            className="relative flex items-end gap-2 max-w-4xl mx-auto"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => {
                setAttachments(e.target.files);
                if (e.target.files && e.target.files.length > 0) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setLastUploadedBase64(ev.target?.result as string);
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              className="hidden"
              multiple 
              accept="image/*"
            />

            <div className={`flex-1 bg-[#1a1a1a] border border-white/20 rounded-xl overflow-hidden focus-within:border-[#f2ca50] transition-colors shadow-2xl ${!activeProjectId ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                onChange={(e) => setInput(e.target.value)}
                disabled={!isLoggedIn || !activeProjectId}
                placeholder={!isLoggedIn ? "Quý khách vui lòng đăng nhập để sử dụng tính năng này..." : (!activeProjectId ? "Vui lòng chọn hoặc tạo Dự án trước..." : "Mô tả không gian hoặc dán ảnh vào đây...")}
                className="w-full max-h-48 min-h-[56px] bg-transparent text-white placeholder:text-[#6b6560] p-4 text-sm focus:outline-none resize-none overflow-y-auto custom-scrollbar disabled:opacity-50"
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
              
              <div className="flex justify-between items-center p-2 pt-0">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!activeProjectId}
                  className="p-2 text-[#a09a8e] hover:text-white transition-colors rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#a09a8e]"
                  title="Đính kèm ảnh"
                >
                  <Paperclip size={20} />
                </button>
                <div className="text-[10px] text-[#6b6560]">Nhấn Enter để gửi, Shift + Enter để xuống dòng</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !attachments) || !isLoggedIn || !activeProjectId}
              className="w-14 h-14 flex items-center justify-center bg-[#f2ca50] hover:bg-[#ffe088] disabled:bg-[#f2ca50]/20 disabled:text-black/20 text-[#050505] rounded-xl transition-colors shrink-0 shadow-lg"
            >
              <PaperPlaneRight size={24} weight="fill" />
            </button>
          </form>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
}
