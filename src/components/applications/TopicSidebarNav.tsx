"use client";

import Link from "next/link";
import { applicationTopics } from "@/data/applications";

interface TopicSidebarNavProps {
  activeSlug: string;
}

/**
 * Hero 右上角浮动 sidebar — 显示 2 条主题（Figma 中的 TopNavBar Shell 右块）。
 * 详情页与索引页都用，激活项加紫色描边 + 强对比文本。
 */
export default function TopicSidebarNav({ activeSlug }: TopicSidebarNavProps) {
  return (
    <nav
      aria-label="Application topics"
      className="absolute top-6 right-6 md:right-10 z-10 hidden md:flex flex-col gap-1.5 backdrop-blur-md bg-[rgba(13,14,16,0.6)] shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-md px-5 py-4 w-[260px]"
    >
      {applicationTopics.map((topic) => {
        const active = topic.slug === activeSlug;
        return (
          <Link
            key={topic.slug}
            href={`/applications/${topic.slug}`}
            className={`flex items-center justify-between text-sm leading-5 tracking-tight py-1 transition-colors ${
              active
                ? "text-text-primary font-semibold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <span>{topic.title}</span>
            {active && (
              <span
                aria-hidden
                className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-purple-light"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
