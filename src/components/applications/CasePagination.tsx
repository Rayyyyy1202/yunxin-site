"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { applicationTopics } from "@/data/applications";

interface CasePaginationProps {
  activeTopicSlug: string;
}

/**
 * Topic Index 底部翻页（Figma: 2 个 chevron 方框）。当前实现是"上一个主题
 * / 下一个主题"循环；如果只有 1 个主题就禁用。
 */
export default function CasePagination({
  activeTopicSlug,
}: CasePaginationProps) {
  const idx = applicationTopics.findIndex((t) => t.slug === activeTopicSlug);
  const total = applicationTopics.length;
  const prev = total > 1 ? applicationTopics[(idx - 1 + total) % total] : null;
  const next = total > 1 ? applicationTopics[(idx + 1) % total] : null;

  return (
    <div className="flex items-center justify-end gap-4 mt-10">
      <PageButton
        href={prev ? `/applications/${prev.slug}` : undefined}
        ariaLabel={prev ? `上一個主題：${prev.title}` : "上一頁"}
      >
        <ChevronLeft size={18} />
      </PageButton>
      <PageButton
        href={next ? `/applications/${next.slug}` : undefined}
        ariaLabel={next ? `下一個主題：${next.title}` : "下一頁"}
      >
        <ChevronRight size={18} />
      </PageButton>
    </div>
  );
}

interface PageButtonProps {
  href?: string;
  ariaLabel: string;
  children: React.ReactNode;
}

function PageButton({ href, ariaLabel, children }: PageButtonProps) {
  const cls =
    "inline-flex items-center justify-center w-12 h-12 border border-border-color text-text-secondary transition-colors hover:border-purple-light hover:text-purple-light";

  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-label={ariaLabel}
        className={`${cls} opacity-40 cursor-not-allowed`}
      >
        {children}
      </button>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={cls}>
      {children}
    </Link>
  );
}
