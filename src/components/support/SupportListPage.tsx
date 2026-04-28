"use client";

import { useMemo, useState } from "react";
import PageBanner from "@/components/layout/PageBanner";
import CategoryFilter from "@/components/support/CategoryFilter";
import DocumentGrid from "@/components/support/DocumentGrid";
import Pagination from "@/components/ui/Pagination";
import type { DocumentItem } from "@/lib/types";

type CardVariant = "doc" | "guide" | "download" | "software";

interface SupportListPageProps {
  title: string;
  subtitle: string;
  sectionLabel: string;
  sectionHeading: string;
  sectionDescription?: string;
  items: DocumentItem[];
  variant: CardVariant;
  pageSize?: number;
}

const ALL = "全部";

export default function SupportListPage({
  title,
  subtitle,
  sectionLabel,
  sectionHeading,
  sectionDescription,
  items,
  variant,
  pageSize = 9,
}: SupportListPageProps) {
  const [category, setCategory] = useState<string>(ALL);
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return [ALL, ...unique];
  }, [items]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { [ALL]: items.length };
    for (const item of items) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    if (category === ALL) return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const handleCategoryChange = (next: string) => {
    setCategory(next);
    setPage(1);
  };

  return (
    <>
      <PageBanner title={title} subtitle={subtitle} />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="mb-10 md:mb-12">
          <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
            {sectionLabel}
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-3">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              {sectionHeading}
            </h2>
            {sectionDescription && (
              <p className="text-text-secondary text-sm md:max-w-md">
                {sectionDescription}
              </p>
            )}
          </div>
        </div>

        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={handleCategoryChange}
            counts={counts}
          />
        </div>

        <DocumentGrid items={visible} variant={variant} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </>
  );
}
