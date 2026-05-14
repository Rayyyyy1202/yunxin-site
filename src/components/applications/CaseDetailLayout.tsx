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
          <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#7b66ff] to-[#492e8d] mb-6 md:mb-8">
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
      className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10 items-start"
    >
      <h2 className="text-text-primary text-2xl md:text-3xl font-medium tracking-tight leading-snug">
        {data.heading}
      </h2>

      <div className="text-text-secondary text-base md:text-xl leading-[1.7] tracking-wide">
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
