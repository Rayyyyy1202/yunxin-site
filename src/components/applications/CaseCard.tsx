"use client";

import Link from "next/link";
import SiteImg from "@/components/ui/SiteImg";
import type { AppCaseDetail } from "@/data/applications";
import { caseHasDetail } from "@/data/applications";

interface CaseCardProps {
  topicSlug: string;
  data: AppCaseDetail;
}

/**
 * Topic Index 中的 1 张紫色描边卡片。
 *   - 左侧：缩略图（cardImage）
 *   - 右侧：標題 + 描述 + 「查看詳情」按钮
 *
 * 没有真实详情页的卡片显示「敬請期待」并禁用跳转。
 */
export default function CaseCard({ topicSlug, data }: CaseCardProps) {
  const hasDetail = caseHasDetail(data);
  const href = hasDetail
    ? `/applications/${topicSlug}/${data.slug}`
    : undefined;

  const body = (
    <article
      className="relative w-full overflow-hidden border border-[#3d69a5]/85 bg-[#090c17] shadow-[inset_0_0_34px_rgba(73,46,141,0.18)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-[330px_1fr] gap-5 md:gap-8 p-4 md:p-5 items-center">
        {/* Left — thumbnail */}
        <div className="relative w-full aspect-[330/150] overflow-hidden rounded-md bg-bg-primary/40">
          <SiteImg
            src={data.cardImage}
            alt={data.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Right — copy */}
        <div className="flex flex-col items-start gap-3 md:gap-4">
          <h3 className="text-text-primary text-lg md:text-2xl font-black tracking-wide leading-snug">
            {data.title}
          </h3>
          <p className="max-w-[720px] text-text-primary/78 text-xs md:text-sm leading-relaxed tracking-wide">
            {data.cardDescription}
          </p>

          <div>
            {hasDetail ? (
              <span className="inline-flex items-center justify-center rounded-[3px] bg-purple-primary/55 px-6 py-2.5 text-xs font-semibold tracking-[1.2px] text-text-primary transition-colors hover:bg-purple-primary/75 group-hover:bg-purple-primary/75">
                查看詳情
              </span>
            ) : (
              <span
                aria-disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-[3px] bg-purple-primary/20 px-6 py-2.5 text-xs font-semibold tracking-[1.2px] text-text-secondary"
              >
                敬請期待
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );

  return href ? (
    <Link
      href={href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
    >
      {body}
    </Link>
  ) : (
    body
  );
}
