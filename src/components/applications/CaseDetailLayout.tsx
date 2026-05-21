import Image from "next/image";
import type { AppCaseDetail, CaseDetailSection } from "@/data/applications";

interface CaseDetailLayoutProps {
  data: AppCaseDetail;
}

/**
 * Detail 页主体 — Figma Group 19/26/22 中的"難點 / 方案 / 性能"等区段。
 * 顶部 hero + 产品照片由 `ApplicationsHero` 单独渲染；本组件只负责正文部分。
 *
 * 客戶痛點 段（仅 polishing-trajectory 有）使用 `paragraph` 字段渲染成段落；
 * 其他段使用 `bullets` 渲染成项目符号列表，对齐 Figma 的 `<ul>`。
 */
export default function CaseDetailLayout({ data }: CaseDetailLayoutProps) {
  return (
    <section className="relative bg-bg-secondary py-12 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col gap-10 md:gap-12">
        {data.sections.map((section) => (
          <Section key={section.heading} data={section} />
        ))}

        {data.trailer && (
          <div className="border border-border-subtle bg-[#16171a] p-4 md:p-6">
            <h2 className="mb-5 text-base md:text-xl font-semibold tracking-wide text-purple-light">
              {data.trailer.title}
            </h2>
            <div className="relative w-full max-w-[640px] mx-auto aspect-[640/219]">
              <Image
                src={data.trailer.image}
                alt={data.trailer.title}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface SectionProps {
  data: CaseDetailSection;
}

function Section({ data }: SectionProps) {
  return (
    <article
      className="border border-border-subtle bg-[#16171a] px-5 py-5 md:px-7 md:py-6"
    >
      <h2 className="mb-3 text-text-primary text-base md:text-xl font-semibold tracking-wide leading-snug">
        {data.heading}
      </h2>

      <div className="text-text-secondary text-sm md:text-base leading-[1.75] tracking-wide">
        {data.paragraph && <p>{data.paragraph}</p>}
        {data.bullets && data.bullets.length > 0 && (
          <ul className="list-disc ms-6 space-y-2">
            {data.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
