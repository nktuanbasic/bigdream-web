"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Clock,
  Eye,
  MagnifyingGlass,
  Sparkle,
} from "@phosphor-icons/react";
import {
  THINK_CATEGORIES,
  getFeaturedArticle,
  thinkArticles,
  type ThinkArticle,
} from "@/lib/think";

function ArticleCard({ article, index }: { article: ThinkArticle; index: number }) {
  return (
    <article className="group grid gap-6 border-t border-white/10 pt-8 md:grid-cols-[220px_1fr]">
      <Link
        href={`/think/${article.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-surface-container-low"
      >
        <Image
          src={article.cover}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-obsidian-deep/20 transition group-hover:bg-transparent" />
      </Link>

      <div className="flex min-w-0 flex-col">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-muted">
          <span className="text-primary">0{index + 1}</span>
          <span>{article.category}</span>
          <span className="h-px w-8 bg-white/20" />
          <span>{article.date}</span>
        </div>

        <Link href={`/think/${article.slug}`} className="block">
          <h2 className="font-bodoni text-3xl leading-[1.05] text-white transition group-hover:text-primary md:text-5xl">
            {article.title}
          </h2>
        </Link>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
          {article.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-on-surface-muted">
          <span className="flex items-center gap-2">
            <Clock size={15} /> {article.readTime}
          </span>
          <span className="flex items-center gap-2">
            <Eye size={15} /> {article.views}
          </span>
          <Link
            href={`/think/${article.slug}`}
            className="ml-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"
          >
            Đọc bài <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ThinkPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof THINK_CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const featured = getFeaturedArticle();

  const articles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return thinkArticles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [article.title, article.excerpt, article.category, ...article.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const latest = thinkArticles.slice(1, 4);

  return (
    <main className="min-h-screen bg-obsidian-deep text-on-surface pt-[var(--nav-height)]">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 py-12 md:px-10 md:py-20 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border border-primary/25 bg-primary/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                <Sparkle size={14} weight="fill" />
                BigDream Editorial
              </div>
              <h1 className="font-bodoni text-6xl leading-[0.9] text-white md:text-8xl lg:text-[120px]">
                THINK
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-on-surface-variant md:text-lg">
                Nhật ký quan sát kiến trúc, vật liệu, ánh sáng và cách AI thay đổi nhịp làm nghề thiết kế.
              </p>
            </div>

            <div className="grid grid-cols-3 border-y border-white/10 py-5 text-center">
              <div>
                <p className="font-bodoni text-3xl text-primary">{thinkArticles.length}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-on-surface-muted">Bài chọn lọc</p>
              </div>
              <div className="border-x border-white/10">
                <p className="font-bodoni text-3xl text-primary">RAW</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-on-surface-muted">Editorial draft</p>
              </div>
              <div>
                <p className="font-bodoni text-3xl text-primary">AI</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-on-surface-muted">Workflow</p>
              </div>
            </div>
          </div>

          <Link href={`/think/${featured.slug}`} className="group relative min-h-[520px] overflow-hidden bg-surface-container-low">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                <span>Featured</span>
                <span className="h-px w-10 bg-primary/60" />
                <span>{featured.category}</span>
              </div>
              <h2 className="font-bodoni max-w-3xl text-4xl leading-[1] text-white md:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
                {featured.dek}
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {THINK_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                    activeCategory === category
                      ? "border-primary bg-primary text-on-primary"
                      : "border-white/10 text-on-surface-variant hover:border-primary/50 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="relative block w-full xl:w-[320px]">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm theo chủ đề, tag..."
                className="w-full border border-white/10 bg-surface px-4 py-3 pl-11 text-sm text-white outline-none transition placeholder:text-on-surface-muted focus:border-primary"
              />
            </label>
          </div>

          <div className="space-y-10">
            {articles.length > 0 ? (
              articles.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)
            ) : (
              <div className="border border-white/10 bg-surface p-10 text-center text-on-surface-variant">
                Chưa có bài nào khớp với bộ lọc hiện tại.
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div className="border border-white/10 bg-surface p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Editorial Pipeline</h3>
            <div className="mt-6 space-y-5 text-sm leading-7 text-on-surface-variant">
              <p>Discord topic</p>
              <p className="border-l border-primary/40 pl-4">Gemini research brief</p>
              <p className="border-l border-primary/40 pl-4">RAW editorial draft</p>
              <p className="border-l border-primary/40 pl-4">Human review</p>
              <p className="text-white">Published on THINK</p>
            </div>
          </div>

          <div className="border border-white/10 bg-surface p-6">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-white">Mới cập nhật</h3>
            <div className="space-y-5">
              {latest.map((article) => (
                <Link key={article.slug} href={`/think/${article.slug}`} className="group grid grid-cols-[88px_1fr] gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
                    <Image src={article.cover} alt={article.title} fill sizes="88px" className="object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="line-clamp-2 text-sm font-bold leading-5 text-white transition group-hover:text-primary">
                      {article.title}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-on-surface-muted">{article.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-surface p-6">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(thinkArticles.flatMap((article) => article.tags))).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="border border-white/10 bg-charcoal-surface px-3 py-1.5 text-xs text-on-surface-variant transition hover:border-primary/50 hover:text-primary"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
