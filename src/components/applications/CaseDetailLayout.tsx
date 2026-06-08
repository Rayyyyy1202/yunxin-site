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
  const useMediaSummary =
    data.detailLayout === "media-summary" && Boolean(data.detailLeadImage);

  return (
    <section className="relative overflow-x-hidden bg-bg-secondary py-12 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col gap-10 md:gap-12">
        {useMediaSummary ? (
          <MediaSummary data={data} />
        ) : (
          data.sections.map((section) => (
            <Section key={section.heading} data={section} />
          ))
        )}

        {data.gallery && (
          <Gallery
            title={data.gallery.title}
            layout={data.gallery.layout}
            images={data.gallery.images}
          />
        )}

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

function MediaSummary({ data }: { data: AppCaseDetail }) {
  const leadImage = data.detailLeadImage ?? data.cardImage;

  return (
    <article className="border border-[#3d69a5]/85 bg-[#090c17] p-4 shadow-[inset_0_0_34px_rgba(73,46,141,0.18)] md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[430px_minmax(0,1fr)] lg:gap-10">
        <figure className="relative aspect-[430/300] w-full overflow-hidden bg-bg-primary/45">
          <Image
            src={leadImage}
            alt={data.detailLeadTitle ?? data.title}
            fill
            sizes="(max-width: 1024px) 100vw, 430px"
            className="object-cover"
          />
        </figure>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold leading-snug tracking-wide text-purple-light md:text-2xl">
            {data.detailLeadTitle ?? data.title}
          </h2>

          <div className="mt-5 space-y-5 md:mt-6 md:space-y-6">
            {data.sections.map((section) => (
              <SummarySection key={section.heading} data={section} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

type GalleryImage = NonNullable<AppCaseDetail["gallery"]>["images"][number];

function Gallery({
  title,
  layout = "grid",
  images,
}: {
  title?: string;
  layout?: "grid" | "stack";
  images: GalleryImage[];
}) {
  if (layout === "stack") {
    return (
      <section className="flex flex-col items-center gap-5 md:gap-6">
        {title && (
          <h2 className="text-base md:text-xl font-semibold tracking-wide text-purple-light">
            {title}
          </h2>
        )}

        {images.map((item) => (
          <figure key={item.src} className="w-full max-w-full min-w-0 md:max-w-[640px]">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width ?? 640}
              height={item.height ?? 360}
              sizes="(max-width: 768px) 100vw, 640px"
              className="block h-auto w-full rounded-[10px] border-2 border-purple-light/90 object-cover"
            />
            <figcaption className="mt-3 text-center text-xs md:text-sm tracking-wide text-text-secondary">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    );
  }

  return (
    <section className="border border-border-subtle bg-[#16171a] p-4 md:p-6">
      {title && (
        <h2 className="mb-6 text-base md:text-xl font-semibold tracking-wide text-purple-light">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {images.map((item) => (
          <figure
            key={item.src}
            className="border border-purple-primary/35 bg-bg-primary/45 p-3"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-secondary">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs md:text-sm tracking-wide text-text-secondary">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

interface SectionProps {
  data: CaseDetailSection;
}

function SummarySection({ data }: SectionProps) {
  return (
    <section>
      <h3 className="mb-2 text-base font-semibold tracking-wide text-text-primary md:text-lg">
        {data.heading}
      </h3>

      <div className="text-sm leading-[1.72] tracking-wide text-text-secondary [overflow-wrap:anywhere] [word-break:break-all] md:text-base md:[word-break:break-word]">
        {data.paragraph && <p>{data.paragraph}</p>}
        {data.bullets && data.bullets.length > 0 && (
          <ul className="ms-5 list-disc space-y-1.5">
            {data.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Section({ data }: SectionProps) {
  return (
    <article
      className="border border-border-subtle bg-[#16171a] px-5 py-5 md:px-7 md:py-6"
    >
      <h2 className="mb-3 text-text-primary text-base md:text-xl font-semibold tracking-wide leading-snug">
        {data.heading}
      </h2>

      <div className="text-text-secondary text-sm md:text-base leading-[1.75] tracking-wide [overflow-wrap:anywhere] [word-break:break-all] md:[word-break:break-word]">
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
