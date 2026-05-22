import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CareerDetail } from "@/lib/types";

interface CareerDetailPageProps {
  career: CareerDetail;
}

export default function CareerDetailPage({ career }: CareerDetailPageProps) {
  const detailSections =
    career.detailSections ??
    [
      { title: "崗位職責", content: career.responsibilities.join("\n") },
      { title: "任職要求", content: career.requirements.join("\n") },
      { title: "加分項", content: career.bonuses.join("\n") },
    ];

  return (
    <div className="overflow-hidden bg-[#050509] text-white">
      <section className="bg-[#050509] pt-16 md:pt-20">
        <div className="relative mx-auto h-[403px] max-w-[1280px] overflow-hidden">
          <Image
            src={career.heroImage}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/18 via-black/5 to-black/0" />
          <div className="absolute left-6 top-16 max-w-[700px] md:left-[74px] md:top-[86px]">
            <Link
              href="/about/careers#open-positions"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white/72 transition-colors hover:text-purple-light"
            >
              <ArrowLeft size={16} />
              返回職位列表
            </Link>
            <h1 className="mt-9 text-4xl font-bold tracking-[0.04em] text-white md:text-[68px] md:leading-none">
              {career.title}
            </h1>
            <p className="mt-6 text-xl font-semibold tracking-[0.12em] text-white/78 md:text-[28px]">
              {career.location}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={career.applyHref}
                className="inline-flex min-w-[148px] items-center justify-center gap-2 bg-purple-primary px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-purple-primary/85"
              >
                立即申請
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about/careers#open-positions"
                className="inline-flex min-w-[148px] items-center justify-center border border-purple-light/45 bg-black/18 px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:border-purple-light hover:text-purple-light"
              >
                返回職位列表
              </Link>
              <Link
                href={career.consultHref ?? "/about/contact"}
                className="inline-flex min-w-[148px] items-center justify-center border border-white/22 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-white/80 transition-colors hover:border-purple-light hover:text-purple-light"
              >
                立即咨詢
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] bg-[#050509] px-6 py-12 md:px-10 md:py-10">
        <div className="space-y-5">
          {detailSections.map((section) => (
            <section
              key={section.title}
              className="border border-purple-light/20 bg-[#0b0c12] px-5 py-6 shadow-[0_0_28px_rgba(73,46,141,0.12)] md:px-8 md:py-8"
            >
              <h2 className="border-l-2 border-purple-light pl-4 text-2xl font-bold tracking-[0.05em] text-purple-light md:text-[32px]">
                {section.title}
              </h2>
              <div className="mt-6 whitespace-pre-line text-sm leading-8 tracking-[0.03em] text-white/76 md:text-base md:leading-9">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {career.qrImage ? (
          <div className="mt-10 flex justify-center md:justify-end">
            <Image
              src={career.qrImage}
              alt="職位咨詢二維碼"
              width={153}
              height={162}
              className="h-auto w-[132px] md:w-[153px]"
            />
          </div>
        ) : null}
      </main>
    </div>
  );
}
