"use client";

import { useState } from "react";
import PageBanner from "@/components/layout/PageBanner";
import NewsCarousel from "@/components/about/NewsCarousel";
import NewsListItem from "@/components/about/NewsListItem";
import Pagination from "@/components/ui/Pagination";
import { news } from "@/data/news";

const PAGE_SIZE = 5;
const FEATURED_COUNT = 3;

export default function NewsView() {
  const [page, setPage] = useState(1);

  const featured = news.slice(0, FEATURED_COUNT);
  const rest = news.slice(FEATURED_COUNT);
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = rest.slice(start, start + PAGE_SIZE);

  return (
    <>
      <PageBanner
        title="最新消息"
        subtitle="AIeveR Robotics 的产品、研究与行业动态"
      />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
            Highlights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4">
            重点关注
          </h2>
        </div>

        <NewsCarousel items={featured} />
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-border-subtle pb-6">
          <div>
            <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
              All News
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-3">
              所有新闻
            </h2>
          </div>
          <span className="text-text-secondary text-sm">
            共 {rest.length} 条
          </span>
        </div>

        <div>
          {visible.map((item, index) => (
            <NewsListItem key={item.slug} item={item} index={index} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </>
  );
}
