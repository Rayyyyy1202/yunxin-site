"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { careerDetails, careers } from "@/data/careers";
import { useManagedCareers } from "@/hooks/useManagedContent";
import type { CareerItem } from "@/lib/types";

export default function CareersView() {
  const managed = useManagedCareers(careers, careerDetails);
  const managedCareerSlugs = new Set(
    managed.details.map((career) => career.slug),
  );
  const openCareers = managed.careers.filter(
    (career): career is CareerItem & { href: string } =>
      Boolean(career.href && managedCareerSlugs.has(career.id)),
  );

  return (
    <div className="overflow-hidden bg-[#050509] text-white">
      <section className="bg-[#050509] pt-16 md:pt-20">
        <div className="relative mx-auto h-[403px] max-w-[1280px] overflow-hidden">
          <Image
            src="/images/about/careers/careers-hero-bg.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-black/0" />
          <div className="absolute left-6 top-20 max-w-[620px] md:left-[72px] md:top-[96px]">
            <h1 className="text-5xl font-bold tracking-[0.04em] text-white md:text-[72px] md:leading-none">
              加入我們
            </h1>
            <p className="mt-6 whitespace-pre-line text-2xl font-semibold leading-relaxed tracking-[0.08em] text-white/88 md:text-[34px]">
              {"與我們一起\n探索具身智能的無限可能"}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#open-positions"
                className="inline-flex min-w-[154px] items-center justify-center gap-2 bg-purple-primary px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-purple-primary/85"
              >
                探索職位
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about/contact"
                className="inline-flex min-w-[154px] items-center justify-center border border-purple-light/45 bg-black/18 px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:border-purple-light hover:text-purple-light"
              >
                立即咨詢
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="open-positions"
        className="relative mx-auto min-h-[667px] max-w-[1280px] overflow-hidden bg-[#050509] px-6 py-16 md:px-10 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-10 h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-light/45 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-20 h-[180px] w-[72%] -translate-x-1/2 rounded-full bg-purple-primary/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <div className="flex flex-col items-center">
            <p className="text-center text-3xl font-bold tracking-[0.08em] text-white md:text-[42px]">
              熱招職位
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="inline-flex h-11 min-w-[120px] items-center justify-center border border-purple-primary bg-purple-primary px-8 text-sm font-semibold tracking-[0.1em] text-white">
                全部職位
              </span>
            </div>
          </div>

          <div className="mt-12 overflow-hidden border-y border-purple-light/24">
            {openCareers.map((career) => (
              <article
                key={career.id}
                className="grid gap-4 border-b border-purple-light/18 px-0 py-5 last:border-b-0 md:grid-cols-[minmax(0,1fr)_160px_120px_150px] md:items-center md:gap-8 md:py-0"
              >
                <div className="flex min-h-[58px] items-center gap-4">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-purple-light shadow-[0_0_18px_rgba(146,114,255,0.7)]" />
                  <h2 className="text-lg font-semibold tracking-[0.05em] text-white md:text-xl">
                    {career.title}
                  </h2>
                </div>
                <p className="pl-6 text-sm text-white/64 md:pl-0">
                  {career.location}
                </p>
                <p className="pl-6 text-sm text-white/64 md:pl-0">
                  {career.type}
                </p>
                <div className="pl-6 md:pl-0 md:text-right">
                  <Link
                    href={career.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-purple-light transition-colors hover:text-white"
                  >
                    查看詳情
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              disabled
              className="h-12 min-w-[178px] cursor-not-allowed border border-purple-light/55 bg-white/[0.02] px-10 text-sm font-semibold tracking-[0.12em] text-purple-light/70"
            >
              查看更多職位
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
