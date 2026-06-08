"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Package,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import {
  resourceCenterCategories,
  resourceCenterItems,
  type ResourceCenterCategory,
  type ResourceCenterItem,
} from "@/data/resourceCenter";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;
const HERO_IMAGE = "/images/support/resource-center-hero.png";

const CATEGORY_ICONS: Record<
  ResourceCenterCategory,
  ComponentType<{ size?: number | string; className?: string }>
> = {
  產品軟件: Package,
  產品手冊: FileText,
  技術指南: BookOpen,
  認證證書: ShieldCheck,
};

function isAvailable(item: ResourceCenterItem) {
  return Boolean(item.href && !item.href.includes("example.com"));
}

export default function ResourceCenterPage() {
  const [activeFilters, setActiveFilters] = useState<ResourceCenterCategory[]>(
    [],
  );
  const [page, setPage] = useState(0);

  const categoryCounts = useMemo(() => {
    return resourceCenterCategories.reduce(
      (counts, category) => ({
        ...counts,
        [category]: resourceCenterItems.filter(
          (item) => item.category === category,
        ).length,
      }),
      {} as Record<ResourceCenterCategory, number>,
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) return resourceCenterItems;
    return resourceCenterItems.filter((item) =>
      activeFilters.includes(item.category),
    );
  }, [activeFilters]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const visibleItems = filteredItems.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE,
  );

  const toggleFilter = (category: ResourceCenterCategory) => {
    setActiveFilters((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
    setPage(0);
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setPage(0);
  };

  return (
    <div className="overflow-hidden bg-[#090c17]">
      <section
        className="relative min-h-[527px] overflow-hidden bg-bg-primary pt-16 md:pt-20"
        data-node-id="4842:2935"
        data-name="image 82"
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,12,0.62)_0%,rgba(5,7,12,0.34)_42%,rgba(5,7,12,0.04)_100%)]" />

        <div
          className="relative z-10 mx-auto flex min-h-[calc(527px-4rem)] max-w-[1280px] items-center px-6 md:min-h-[calc(527px-5rem)] md:px-10"
          data-node-id="4839:4663"
          data-name="Container"
        >
          <div className="max-w-[604px] py-24">
            <h1 className="text-5xl font-bold leading-none text-white md:text-[82px]">
              資源中心
            </h1>
            <p className="mt-10 max-w-[606px] text-base leading-8 text-white/85 md:text-xl md:leading-9">
              提供全面的產品資料、認證證書與技術支持，
              <br className="hidden md:block" />
              助力您更高效地了解、集成與應用我們的具身智能技術。
            </p>
            <Link
              href="/about/news"
              className="mt-8 inline-flex items-center gap-3 bg-purple-primary/70 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-purple-primary"
            >
              了解最新資訊
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="bg-[#090c17] py-10"
        data-node-id="4871:3002"
        data-name="Section - Product Overview"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[288px_minmax(0,1fr)]">
            <aside className="flex min-h-[350px] flex-col border border-[#2776ba] bg-[#090d17]/95 px-8 py-9 shadow-[0_18px_45px_rgba(0,0,0,0.38)] lg:sticky lg:top-28 lg:h-[350px] lg:self-start">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-purple-light">
                <SlidersHorizontal size={24} strokeWidth={2.4} aria-hidden />
                系統篩選
              </h2>

              <div className="mt-7">
                <p className="border-l-2 border-purple-light pl-3 text-sm font-medium tracking-wide text-text-primary">
                  文件類型
                </p>
                <div className="mt-4 space-y-4">
                  {resourceCenterCategories.map((category) => {
                    const selected = activeFilters.includes(category);

                    return (
                      <label
                        key={category}
                        className="flex cursor-pointer items-center gap-4 text-sm text-text-secondary transition-colors hover:text-text-primary"
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleFilter(category)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
                            selected
                              ? "border-purple-light bg-purple-primary text-white"
                              : "border-purple-primary bg-transparent",
                          )}
                        >
                          {selected && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span>{category}</span>
                        <span className="ml-auto text-xs text-text-secondary/60">
                          {categoryCounts[category]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-auto inline-flex w-full items-center justify-center gap-2 border border-purple-primary px-4 py-2.5 text-sm font-semibold text-purple-light transition-colors hover:bg-purple-primary hover:text-white"
              >
                <RotateCcw size={14} aria-hidden />
                重置篩選
              </button>
            </aside>

            <div>
              {visibleItems.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {visibleItems.map((item) => (
                    <ResourceCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[285px] items-center justify-center border border-dashed border-border-subtle text-sm text-text-secondary">
                  暫無匹配的資源，請重置篩選後再試。
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[#090c17] py-10"
        data-node-id="5661:4211"
        data-name="Group 252"
      >
        <div className="mx-auto flex max-w-[1280px] justify-center px-6 md:px-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="上一頁"
              disabled={currentPage === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              className="flex h-12 w-12 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-purple-light hover:text-purple-light disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border-subtle disabled:hover:text-text-primary"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="下一頁"
              disabled={currentPage >= pageCount - 1}
              onClick={() =>
                setPage((value) => Math.min(pageCount - 1, value + 1))
              }
              className="flex h-12 w-12 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-purple-light hover:text-purple-light disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border-subtle disabled:hover:text-text-primary"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResourceCard({ item }: { item: ResourceCenterItem }) {
  const available = isAvailable(item);
  const Icon = CATEGORY_ICONS[item.category];

  return (
    <article className="group grid min-h-[285px] overflow-hidden bg-[#131316] transition-colors hover:bg-[#171820] sm:grid-cols-[45%_1fr]">
      <div className="relative min-h-[220px] bg-[#24242a] sm:min-h-0">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 190px, (min-width: 768px) 45vw, 100vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-purple-light">
            <Icon size={48} aria-hidden />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col p-5 md:p-6">
        <span className="mb-5 inline-flex w-fit items-center gap-2 border border-purple-light/25 bg-purple-primary/10 px-2.5 py-1 text-[11px] text-purple-light">
          <Icon size={13} aria-hidden />
          {item.category}
        </span>
        <h3 className="min-h-[108px] text-xl font-semibold leading-9 text-white">
          {item.title}
        </h3>
        <p className="mt-auto pt-5 text-sm text-white/50">
          {item.fileType}丨{item.fileSize}
        </p>

        {available ? (
          <a
            href={item.href}
            download
            className="mt-5 inline-flex h-[42px] items-center justify-center gap-2 border border-white/20 px-5 text-sm text-white transition-colors hover:border-purple-light hover:text-purple-light"
          >
            立即下載
            <Download size={14} aria-hidden />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 inline-flex h-[42px] cursor-not-allowed items-center justify-center gap-2 border border-white/10 px-5 text-sm text-white/45"
          >
            資料待提供
            <Download size={14} aria-hidden />
          </button>
        )}
      </div>
    </article>
  );
}
