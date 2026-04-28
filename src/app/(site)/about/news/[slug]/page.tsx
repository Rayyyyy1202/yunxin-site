import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import { news, getNewsBySlug } from "@/data/news";
import { formatDate } from "@/lib/utils";
import SiteImg from "@/components/ui/SiteImg";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "新闻未找到" };
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  const currentIndex = news.findIndex((n) => n.slug === slug);
  const prev = currentIndex > 0 ? news[currentIndex - 1] : null;
  const next =
    currentIndex !== -1 && currentIndex < news.length - 1
      ? news[currentIndex + 1]
      : null;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16">
        {/* Background cover */}
        <div className="absolute inset-0 overflow-hidden">
          <SiteImg
            src={item.coverImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,14,16,0.5) 0%, rgba(13,14,16,1) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 md:px-10">
          <Link
            href="/about/news"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-purple-light text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            返回新闻列表
          </Link>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-primary/20 border border-purple-primary/40 rounded-full text-purple-light text-xs uppercase tracking-wider">
              <Tag size={12} />
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-text-secondary text-xs">
              <Calendar size={12} />
              {formatDate(item.date)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            {item.title}
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed">
            {item.summary}
          </p>
        </div>
      </section>

      {/* Cover image */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border-subtle bg-bg-card">
          <SiteImg
            src={item.coverImage}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-20">
        <article className="prose-news text-text-secondary leading-relaxed space-y-5 text-base md:text-lg">
          {item.content.split("\n\n").map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            // Heading
            if (/^\d+\.\s/.test(trimmed) || trimmed.startsWith("- ")) {
              const lines = trimmed
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);
              const isOrdered = /^\d+\.\s/.test(lines[0]);
              return isOrdered ? (
                <ol
                  key={idx}
                  className="list-decimal list-outside pl-6 space-y-2 marker:text-purple-light"
                >
                  {lines.map((line, i) => (
                    <li key={i}>{renderInline(line.replace(/^\d+\.\s*/, ""))}</li>
                  ))}
                </ol>
              ) : (
                <ul
                  key={idx}
                  className="list-disc list-outside pl-6 space-y-2 marker:text-purple-light"
                >
                  {lines.map((line, i) => (
                    <li key={i}>{renderInline(line.replace(/^-\s*/, ""))}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={idx} className="text-text-secondary">
                {renderInline(trimmed)}
              </p>
            );
          })}
        </article>
      </section>

      {/* Prev / Next */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border-subtle pt-10">
          {prev ? (
            <Link
              href={`/about/news/${prev.slug}`}
              className="group p-6 border border-border-subtle rounded-xl hover:border-purple-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-text-secondary text-xs uppercase tracking-wider mb-3">
                <ArrowLeft size={14} />
                上一篇
              </div>
              <h3 className="text-text-primary font-bold group-hover:text-purple-light transition-colors line-clamp-2">
                {prev.title}
              </h3>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/about/news/${next.slug}`}
              className="group p-6 border border-border-subtle rounded-xl hover:border-purple-primary/40 transition-colors md:text-right"
            >
              <div className="flex items-center gap-2 text-text-secondary text-xs uppercase tracking-wider mb-3 md:justify-end">
                下一篇
                <ArrowRight size={14} />
              </div>
              <h3 className="text-text-primary font-bold group-hover:text-purple-light transition-colors line-clamp-2">
                {next.title}
              </h3>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
}

function renderInline(text: string): React.ReactNode {
  // Very small **bold** parser — content authors only use ** for emphasis.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
