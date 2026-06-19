import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Eye } from "@phosphor-icons/react/dist/ssr";
import { getThinkArticle, thinkArticles } from "@/lib/think";

export function generateStaticParams() {
  return thinkArticles.map((article) => ({ slug: article.slug }));
}

type ThinkArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ThinkArticlePageProps) {
  const { slug } = await params;
  const article = getThinkArticle(slug);

  if (!article) {
    return {
      title: "THINK | BigDream",
    };
  }

  return {
    title: `${article.title} | THINK`,
    description: article.excerpt,
  };
}

export default async function ThinkArticlePage({ params }: ThinkArticlePageProps) {
  const { slug } = await params;
  const article = getThinkArticle(slug);

  if (!article) notFound();

  const related = thinkArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#050505] pt-[var(--nav-height)] text-white selection:bg-[#d4af37] selection:text-black">
      <article>
        <header className="relative min-h-[90vh] overflow-hidden flex items-end">
          {/* Background Image with Parallax feel */}
          <div className="absolute inset-0 z-0">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover animate-image-reveal opacity-70"
            />
          </div>
          
          {/* Cinematic Gradients */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/10" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent" />

          <div className="relative z-20 w-full px-5 pb-20 md:px-10 lg:px-16 md:pb-32 animate-fade-in-up">
            <Link
              href="/think"
              className="group mb-16 inline-flex w-fit items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-all hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> THINK
            </Link>

            <div className="mb-10 flex flex-wrap items-center gap-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              <span className="px-4 py-2 border border-[#d4af37]/30 bg-[#050505]/40 backdrop-blur-sm">{article.category}</span>
              <span className="h-px w-16 bg-[#d4af37]/40" />
              <span className="text-white/60">{article.date}</span>
            </div>

            <h1 className="font-bodoni max-w-5xl text-[50px] leading-[0.95] text-white md:text-[80px] lg:text-[110px] font-light tracking-tight">
              {article.title}
            </h1>

            <p className="mt-10 max-w-3xl text-[18px] leading-[1.8] text-white/70 md:text-[24px] font-light">
              {article.dek}
            </p>

            <div className="mt-14 flex flex-wrap gap-10 text-[11px] uppercase tracking-[0.25em] text-white/50">
              <span className="flex items-center gap-3">
                <Clock size={18} className="text-[#d4af37]" /> {article.readTime}
              </span>
              <span className="flex items-center gap-3">
                <Eye size={18} className="text-[#d4af37]" /> {article.views}
              </span>
            </div>
          </div>
        </header>

        <section className="w-full grid gap-24 px-5 py-24 md:px-10 lg:px-16 md:py-32 lg:grid-cols-[1fr_360px]">
          <div className="max-w-[880px] animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="border-l-[3px] border-[#d4af37] pl-10 text-[22px] leading-[1.8] text-white md:text-[28px] font-light italic opacity-90">
              {article.excerpt}
            </p>

            <div className="mt-20 space-y-12 text-[18px] leading-[2.2] text-white/70 font-light tracking-wide md:text-[20px]">
              {article.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-32 border border-white/5 bg-white/[0.02] p-12 md:p-16 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 blur-[80px] rounded-full pointer-events-none" />
              <h2 className="mb-12 text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-4">
                <span className="w-12 h-px bg-[#d4af37]/50" />
                Checklist thực dụng
              </h2>
              <ul className="space-y-8 text-[16px] leading-[1.8] text-white/80 font-light">
                {article.checklist.map((item, idx) => (
                  <li key={idx} className="flex gap-6 items-start">
                    <span className="text-[#d4af37]/40 font-bodoni text-2xl leading-none mt-1">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-16 lg:sticky lg:top-32 lg:self-start animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="border border-white/5 bg-white/[0.02] p-10 backdrop-blur-md">
              <h2 className="mb-10 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Từ khóa</h2>
              <div className="flex flex-wrap gap-2.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="border border-white/10 bg-[#050505]/50 px-4 py-2.5 text-[11px] text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-white/5 bg-white/[0.02] p-10 backdrop-blur-md">
              <h2 className="mb-10 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Đọc tiếp</h2>
              <div className="space-y-10">
                {related.map((item) => (
                  <Link key={item.slug} href={`/think/${item.slug}`} className="group block">
                    <p className="text-[16px] font-light leading-[1.6] text-white/80 transition-colors group-hover:text-[#d4af37]">{item.title}</p>
                    <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">{item.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </article>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes image-reveal {
          from { transform: scale(1.15); opacity: 0; }
          to { transform: scale(1); opacity: 0.7; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-image-reveal {
          animation: image-reveal 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </main>
  );
}
