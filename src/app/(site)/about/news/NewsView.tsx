"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SiteImg from "@/components/ui/SiteImg";
import { news } from "@/data/news";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 4;
const HERO_IMAGE = "/images/about/news-hero.png";

export default function NewsView() {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(news.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = news.slice(start, start + PAGE_SIZE);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(totalPages, Math.max(1, nextPage)));
  };

  return (
    <div className="overflow-hidden bg-[#010008]">
      <section
        className="relative min-h-[548px] overflow-hidden bg-bg-primary pt-16 md:pt-20"
        data-node-id="4429:3080"
        data-name="image 68"
      >
        <SiteImg
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,0,8,0.86)_0%,rgba(1,0,8,0.58)_44%,rgba(1,0,8,0.12)_100%)]" />

        <div
          className="relative z-10 mx-auto flex min-h-[calc(548px-4rem)] max-w-[1280px] items-center px-6 md:min-h-[calc(548px-5rem)] md:px-10"
          data-node-id="4429:3114"
          data-name="Container"
        >
          <div className="max-w-[604px] py-24">
            <h1 className="text-5xl font-bold leading-none text-white md:text-[82px]">
              新聞動態
            </h1>
            <p className="mt-10 max-w-[606px] text-base leading-8 text-white/85 md:text-xl md:leading-9">
              聚焦具身智能與工業視覺技術前沿，
              <br className="hidden md:block" />
              了解公司最新進展、產品發佈與行業洞察。
            </p>
            <a
              href="#news-list"
              className="mt-8 inline-flex items-center gap-3 bg-purple-primary/70 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-purple-primary"
            >
              了解最新資訊
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section
        id="news-list"
        className="bg-[#010008] py-10"
        data-node-id="4429:3047"
        data-name="Group 218"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="space-y-10">
            {visible.map((item) => (
              <Link
                key={item.slug}
                href={`/about/news/${item.slug}`}
                className="group grid min-h-[173px] overflow-hidden bg-[#0a0b1a] transition-colors hover:bg-[#101227] md:grid-cols-[356px_minmax(0,1fr)]"
              >
                <div className="relative min-h-[150px] bg-[#080a18] md:min-h-[173px]">
                  <SiteImg
                    src={item.coverImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,24,0.15),rgba(8,10,24,0.46))]" />
                </div>

                <div className="relative flex min-w-0 flex-col px-6 py-6 md:px-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <span className="inline-flex bg-[linear-gradient(90deg,rgba(73,33,162,0.95),rgba(73,33,162,0.18))] px-3 py-1 text-xs text-white">
                      {item.category}
                    </span>
                    <time className="text-sm text-white/80" dateTime={item.date}>
                      {item.date}
                    </time>
                  </div>

                  <h2 className="mt-5 max-w-[620px] text-lg font-semibold leading-7 text-white transition-colors group-hover:text-purple-light md:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-[640px] text-sm leading-6 text-white/80 line-clamp-2">
                    {item.summary}
                  </p>

                  <span className="mt-auto pt-5 text-sm font-medium text-purple-primary transition-colors group-hover:text-purple-light">
                    查看詳情→
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-[#010008] py-10"
        data-node-id="4428:3027"
        data-name="Group 216"
      >
        <div className="mx-auto flex max-w-[1280px] justify-center px-6 md:px-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="上一頁"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className={cn(
                "flex h-12 w-12 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-purple-light hover:text-purple-light",
                "disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border-subtle disabled:hover:text-text-primary",
              )}
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="下一頁"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className={cn(
                "flex h-12 w-12 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-purple-light hover:text-purple-light",
                "disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border-subtle disabled:hover:text-text-primary",
              )}
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
