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
      className="relative w-full bg-bg-card rounded-2xl border border-purple-primary/90 shadow-[inset_0_0_50px_rgba(73,46,141,0.65)] overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-[459px_1fr] gap-6 md:gap-10 p-6 md:p-10 items-center">
        {/* Left — thumbnail */}
        <div className="relative w-full aspect-[459/236] overflow-hidden rounded-xl bg-bg-primary/40">
          <SiteImg
            src={data.cardImage}
            alt={data.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Right — copy */}
        <div className="flex flex-col gap-5">
          <h3 className="text-text-primary text-xl md:text-3xl font-black tracking-wide leading-snug">
            {data.title}
          </h3>
          <p className="text-text-primary/80 text-sm md:text-lg leading-relaxed tracking-wide">
            {data.cardDescription}
          </p>

          <div>
            {hasDetail ? (
              <span className="inline-flex items-center justify-center bg-purple-primary/25 text-text-primary text-xs md:text-sm font-medium tracking-[1.6px] uppercase rounded-lg px-8 py-3 transition-colors hover:bg-purple-primary/45 group-hover:bg-purple-primary/45">
                查看詳情
              </span>
            ) : (
              <span
                aria-disabled
                className="inline-flex items-center justify-center bg-purple-primary/10 text-text-secondary text-xs md:text-sm font-medium tracking-[1.6px] uppercase rounded-lg px-8 py-3 cursor-not-allowed"
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
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-2xl"
    >
      {body}
    </Link>
  ) : (
    body
  );
}
