import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import SiteImg from "@/components/ui/SiteImg";
import { news, getNewsBySlug } from "@/data/news";
import { formatDate } from "@/lib/utils";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

const HERO_IMAGE = "/images/about/news-hero.png";

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
    <div className="overflow-hidden bg-[#010008]">
      <section
        className="relative min-h-[548px] overflow-hidden bg-bg-primary pt-16 md:pt-20"
        data-node-id="4601:2698"
        data-name="image 77"
      >
        <SiteImg
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,0,8,0.86)_0%,rgba(1,0,8,0.58)_44%,rgba(1,0,8,0.12)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(548px-4rem)] max-w-[1280px] items-center px-6 md:min-h-[calc(548px-5rem)] md:px-10">
          <div className="max-w-[604px] py-24">
            <h1 className="text-5xl font-bold leading-none text-white md:text-[82px]">
              新聞動態
            </h1>
            <p className="mt-10 max-w-[606px] text-base leading-8 text-white/85 md:text-xl md:leading-9">
              聚焦具身智能與工業視覺技術前沿，
              <br className="hidden md:block" />
              了解公司最新進展、產品發佈與行業洞察。
            </p>
            <Link
              href="/about/news"
              className="mt-8 inline-flex items-center gap-3 bg-purple-primary/70 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-purple-primary"
            >
              返回新聞列表
              <ArrowLeft size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="bg-[#010008] py-10"
        data-node-id="4601:2806"
        data-name="Frame 241"
      >
        <article className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="relative min-h-[655px] overflow-hidden border border-border-subtle/40 bg-[#080a18] px-6 py-10 md:px-10 md:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(73,46,141,0.2),transparent_42%)]" />
            <div className="relative">
              <div className="mb-8 flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1.5 border border-purple-light/30 bg-purple-primary/15 px-3 py-1 text-purple-light">
                  <Tag size={12} aria-hidden />
                  {item.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} aria-hidden />
                  {formatDate(item.date)}
                </span>
              </div>

              <h1 className="max-w-[1120px] text-2xl font-semibold leading-snug text-white md:text-3xl">
                {item.title}
              </h1>

              <div className="relative mt-10 aspect-[16/7] max-w-[1120px] overflow-hidden border border-border-subtle/40 bg-bg-secondary">
                <SiteImg
                  src={item.coverImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(1,0,8,0.62)_100%)]" />
              </div>

              <div className="mt-10 max-w-[1120px] space-y-5 text-base leading-8 text-white/78">
                {renderContent(item.content)}
              </div>

              {item.galleryImages && item.galleryImages.length > 1 && (
                <div className="mt-12 grid gap-4 md:grid-cols-2">
                  {item.galleryImages.slice(1).map((image) => (
                    <div
                      key={image}
                      className="relative aspect-[16/10] overflow-hidden border border-border-subtle/40 bg-bg-secondary"
                    >
                      <SiteImg
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </section>

      <section
        className="bg-[#010008] py-10"
        data-node-id="4601:2654"
        data-name="Group 239"
      >
        <div className="mx-auto flex max-w-[1280px] justify-center px-6 md:px-10">
          <div className="flex items-center gap-4">
            {prev ? (
              <Link
                href={`/about/news/${prev.slug}`}
                aria-label="上一篇"
                className="flex h-12 w-12 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-purple-light hover:text-purple-light"
              >
                <ChevronLeft size={18} aria-hidden />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                aria-label="沒有上一篇"
                className="flex h-12 w-12 cursor-not-allowed items-center justify-center border border-border-subtle text-text-primary opacity-35"
              >
                <ChevronLeft size={18} aria-hidden />
              </span>
            )}
            {next ? (
              <Link
                href={`/about/news/${next.slug}`}
                aria-label="下一篇"
                className="flex h-12 w-12 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-purple-light hover:text-purple-light"
              >
                <ChevronRight size={18} aria-hidden />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                aria-label="沒有下一篇"
                className="flex h-12 w-12 cursor-not-allowed items-center justify-center border border-border-subtle text-text-primary opacity-35"
              >
                <ChevronRight size={18} aria-hidden />
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function renderContent(content: string) {
  return content.split("\n\n").map((paragraph, idx) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;

    if (/^\d+\.\s/.test(trimmed) || trimmed.startsWith("- ")) {
      const lines = trimmed
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const isOrdered = /^\d+\.\s/.test(lines[0]);
      return isOrdered ? (
        <ol
          key={idx}
          className="list-decimal list-outside space-y-2 pl-6 marker:text-purple-light"
        >
          {lines.map((line, i) => (
            <li key={i}>{renderInline(line.replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ol>
      ) : (
        <ul
          key={idx}
          className="list-disc list-outside space-y-2 pl-6 marker:text-purple-light"
        >
          {lines.map((line, i) => (
            <li key={i}>{renderInline(line.replace(/^-\s*/, ""))}</li>
          ))}
        </ul>
      );
    }

    return <p key={idx}>{renderInline(trimmed)}</p>;
  });
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
