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
    <main className="min-h-screen bg-obsidian-deep pt-[var(--nav-height)] text-on-surface">
      <article>
        <header className="relative min-h-[78vh] overflow-hidden">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/45 to-obsidian-deep/20" />

          <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-[1200px] flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
            <Link
              href="/think"
              className="mb-8 inline-flex w-fit items-center gap-2 border border-white/15 bg-obsidian-deep/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-primary hover:text-primary"
            >
              <ArrowLeft size={16} /> THINK
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              <span>{article.category}</span>
              <span className="h-px w-10 bg-primary/60" />
              <span>{article.date}</span>
            </div>

            <h1 className="font-bodoni max-w-5xl text-5xl leading-[0.95] text-white md:text-8xl">
              {article.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-on-surface-variant md:text-xl">
              {article.dek}
            </p>

            <div className="mt-8 flex flex-wrap gap-5 text-xs uppercase tracking-[0.16em] text-on-surface-muted">
              <span className="flex items-center gap-2">
                <Clock size={15} /> {article.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Eye size={15} /> {article.views}
              </span>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[1fr_280px]">
          <div className="max-w-[780px]">
            <p className="border-l border-primary pl-6 text-xl leading-9 text-white md:text-2xl">
              {article.excerpt}
            </p>

            <div className="mt-12 space-y-8 text-[17px] leading-9 text-on-surface-variant">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-14 border border-primary/20 bg-primary/5 p-6 md:p-8">
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Checklist thực dụng
              </h2>
              <ul className="space-y-4 text-sm leading-7 text-on-surface-variant">
                {article.checklist.map((item) => (
                  <li key={item} className="border-l border-white/15 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-white/10 bg-surface p-6">
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="border border-white/10 bg-charcoal-surface px-3 py-1.5 text-xs text-on-surface-variant">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-surface p-6">
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">Đọc tiếp</h2>
              <div className="space-y-5">
                {related.map((item) => (
                  <Link key={item.slug} href={`/think/${item.slug}`} className="group block">
                    <p className="text-sm font-bold leading-6 text-white transition group-hover:text-primary">{item.title}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-on-surface-muted">{item.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </article>
    </main>
  );
}
