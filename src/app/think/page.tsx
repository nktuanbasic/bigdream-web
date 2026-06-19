"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Eye,
  MagnifyingGlass,
  Sparkle,
} from "@phosphor-icons/react";
import {
  THINK_CATEGORIES,
  getThinkArticles,
  thinkArticles,
  type ThinkArticle,
} from "@/lib/think";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function ArticleCard({ article, index }: { article: ThinkArticle; index: number }) {
  return (
    <motion.article 
      variants={fadeInUp}
      className="group grid gap-8 border-b border-white/5 pb-14 last:border-0 md:grid-cols-[320px_1fr] items-start"
    >
      <Link
        href={`/think/${article.slug}`}
        className="relative block aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-white/5"
      >
        <Image
          src={article.cover}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[#050505]/20 transition-colors duration-700 group-hover:bg-transparent" />
      </Link>

      <div className="flex min-w-0 flex-col pt-2 md:pl-6">
        <div className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          <span>NO. 0{index + 1}</span>
          <span className="h-px w-8 bg-[#d4af37]/40" />
          <span>{article.category}</span>
          <span className="h-px w-8 bg-[#d4af37]/40" />
          <span className="text-white/40">{article.date}</span>
        </div>

        <Link href={`/think/${article.slug}`} className="block">
          <h2 className="font-bodoni text-4xl leading-[1.1] text-white transition-colors duration-500 group-hover:text-[#d4af37] md:text-5xl lg:text-[52px] font-light">
            {article.title}
          </h2>
        </Link>

        <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-white/60 md:text-[17px] font-light">
          {article.excerpt}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-[#d4af37]" /> {article.readTime}
          </span>
          <span className="flex items-center gap-2">
            <Eye size={16} className="text-[#d4af37]" /> {article.views}
          </span>
          <Link
            href={`/think/${article.slug}`}
            className="ml-auto inline-flex items-center gap-3 font-bold text-[#d4af37] transition-all group-hover:gap-5"
          >
            ĐỌC BÀI <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function ThinkPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof THINK_CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [allArticles, setAllArticles] = useState<ThinkArticle[]>(thinkArticles);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");

    if (tag) setQuery(tag);
  }, []);

  useEffect(() => {
    let isMounted = true;

    getThinkArticles().then((articles) => {
      if (isMounted) setAllArticles(articles);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const featured = allArticles[0];

  const articles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allArticles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [article.title, article.excerpt, article.category, ...article.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, allArticles, query]);

  const latest = allArticles.slice(1, 4);

  if (!featured) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-[var(--nav-height)] selection:bg-[#d4af37] selection:text-black">
      {/* Background Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-[15%] top-[-10%] h-[700px] w-[700px] rounded-full bg-[#d4af37]/[0.03] blur-[150px]" />
        <div className="absolute right-[-5%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 border-b border-white/5">
        <div className="w-full px-5 py-12 md:px-10 lg:px-16 md:py-24">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid gap-16 lg:grid-cols-[1fr_1.1fr] items-end"
          >
            {/* Title Block */}
            <motion.div variants={fadeInUp} className="flex flex-col justify-between h-full max-w-2xl">
              <div className="mb-20">
                <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] backdrop-blur-md">
                  <Sparkle size={14} weight="fill" />
                  Editorial Journal
                </div>
                <h1 className="font-bodoni text-[80px] leading-[0.85] md:text-[130px] lg:text-[160px] font-light tracking-tighter">
                  TH<span className="italic text-[#d4af37]">I</span>NK.
                </h1>
                <p className="mt-10 text-[17px] leading-[1.8] text-white/50 md:text-xl font-light max-w-lg">
                  Nhật ký quan sát kiến trúc, vật liệu, ánh sáng và cách AI định hình lại tư duy thiết kế. Không có đúng hay sai, chỉ có sự phù hợp.
                </p>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10 pb-4">
                <div>
                  <p className="font-bodoni text-5xl text-[#d4af37] mb-3">{allArticles.length}</p>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">Bài chọn lọc</p>
                </div>
                <div className="border-l border-white/10 pl-8">
                  <p className="font-bodoni text-5xl text-[#d4af37] mb-3">RAW</p>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">Editorial draft</p>
                </div>
                <div className="border-l border-white/10 pl-8">
                  <p className="font-bodoni text-5xl text-[#d4af37] mb-3">AI</p>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">Workflow</p>
                </div>
              </div>
            </motion.div>

            {/* Featured Article */}
            <motion.div variants={fadeInUp}>
              <Link href={`/think/${featured.slug}`} className="group block relative w-full h-[65vh] min-h-[550px] overflow-hidden bg-white/5">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-[2s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/30 to-transparent transition-opacity duration-700" />
                
                <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
                  <div className="mb-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                    <span className="px-3 py-1 border border-[#d4af37]/30 backdrop-blur-sm bg-[#050505]/40">Featured</span>
                    <span>{featured.category}</span>
                  </div>
                  <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white font-light max-w-3xl mb-6 transition-colors group-hover:text-[#d4af37]">
                    {featured.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-white/70 md:text-[17px] max-w-2xl font-light">
                    {featured.dek}
                  </p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="relative z-10 w-full px-5 py-24 md:px-10 lg:px-16 lg:grid lg:grid-cols-[1fr_380px] lg:gap-24">
        
        {/* Left Col: Articles List */}
        <div>
          {/* Filters & Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between border-b border-white/5 pb-12"
          >
            <div className="flex flex-wrap gap-3">
              {THINK_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-[#d4af37] text-black"
                      : "border border-white/10 text-white/50 hover:border-[#d4af37]/50 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="relative block w-full xl:w-[360px] group">
              <MagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#d4af37]" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm theo chủ đề, tag..."
                className="w-full border-b border-white/10 bg-transparent px-5 py-4 pl-14 text-[13px] text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#d4af37] focus:bg-white/5"
              />
            </label>
          </motion.div>

          <motion.div 
            key={activeCategory + query}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-16"
          >
            {articles.length > 0 ? (
              articles.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)
            ) : (
              <div className="border border-white/5 bg-white/[0.02] p-24 text-center text-white/40 font-light tracking-wide text-[13px]">
                Chưa có bài nào khớp với bộ lọc hiện tại.
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Col: Sidebar */}
        <aside className="mt-24 lg:mt-0 space-y-14 lg:sticky lg:top-32 lg:self-start">
          
          {/* Pipeline */}
          <div className="border border-white/5 bg-white/[0.02] backdrop-blur-xl p-10">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-10">Editorial Pipeline</h3>
            <div className="space-y-8 text-[13px] leading-relaxed text-white/50 font-light tracking-wide">
              <div className="flex items-center gap-5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <p>Discord Topic</p>
              </div>
              <div className="flex items-center gap-5 ml-[3px]">
                <div className="w-px h-10 bg-gradient-to-b from-white/20 to-[#d4af37]/30 absolute -mt-10" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/50" />
                <p>AI Research Brief</p>
              </div>
              <div className="flex items-center gap-5 ml-[3px]">
                <div className="w-px h-10 bg-gradient-to-b from-[#d4af37]/30 to-[#d4af37]/60 absolute -mt-10" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <p className="text-white/80">RAW Editorial Draft</p>
              </div>
              <div className="flex items-center gap-5 ml-[3px]">
                <div className="w-px h-10 bg-[#d4af37] absolute -mt-10" />
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <p className="text-white font-medium">Published on THINK</p>
              </div>
            </div>
          </div>

          {/* Latest */}
          <div className="border border-white/5 bg-white/[0.02] backdrop-blur-xl p-10">
            <h3 className="mb-10 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Bài mới đăng</h3>
            <div className="space-y-8">
              {latest.map((article) => (
                <Link key={article.slug} href={`/think/${article.slug}`} className="group grid grid-cols-[100px_1fr] gap-6 items-center">
                  <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                    <Image src={article.cover} alt={article.title} fill sizes="100px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="line-clamp-2 text-[15px] font-medium leading-[1.6] text-white/80 transition-colors group-hover:text-[#d4af37]">
                      {article.title}
                    </p>
                    <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">{article.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="border border-white/5 bg-white/[0.02] backdrop-blur-xl p-10">
            <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Từ khóa</h3>
            <div className="flex flex-wrap gap-2.5">
              {Array.from(new Set(allArticles.flatMap((article) => article.tags))).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setQuery(tag);
                    window.history.replaceState(null, "", `/think?tag=${encodeURIComponent(tag)}`);
                  }}
                  className="border border-white/10 bg-[#050505]/50 px-4 py-2.5 text-[11px] text-white/50 transition-all hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/5"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </aside>
      </section>
    </main>
  );
}
