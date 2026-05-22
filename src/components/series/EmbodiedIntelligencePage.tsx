"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  Crosshair,
  Download,
  Gauge,
  LayoutGrid,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import SiteImg from "@/components/ui/SiteImg";
import SeriesSiblingNav from "@/components/series/SeriesSiblingNav";
import SeriesCTA from "@/components/series/SeriesCTA";
import type { SeriesAdvantage, SeriesData, SeriesIconKey } from "@/data/series";

interface EmbodiedIntelligencePageProps {
  data: SeriesData;
  prev: SeriesData | null;
  next: SeriesData | null;
}

const NANO_ICON_MAP: Partial<Record<SeriesIconKey, LucideIcon>> = {
  Crosshair,
  ShieldCheck,
  Box,
  Activity: Gauge,
  LayoutGrid,
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export default function EmbodiedIntelligencePage({
  data,
  prev,
  next,
}: EmbodiedIntelligencePageProps) {
  return (
    <>
      <NanoHero data={data} />
      <NanoAdvantages items={data.coreAdvantages} />
      <SeriesSiblingNav prev={prev} next={next} />
      <div id="nano-cta">
        <SeriesCTA data={data.cta} />
      </div>
    </>
  );
}

function NanoHero({ data }: { data: SeriesData }) {
  const [englishLabel, chineseLabel] = data.hero.topLabel
    .split("·")
    .map((part) => part.trim());

  return (
    <section
      id="nano-hero"
      className="relative isolate min-h-[720px] overflow-hidden bg-[#05040b] pt-28 md:min-h-[740px] md:pt-32"
    >
      {data.hero.backgroundDefault && (
        <Image
          src={data.hero.backgroundDefault}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center pointer-events-none"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(5,4,11,0.92)_0%,rgba(5,4,11,0.72)_38%,rgba(5,4,11,0.16)_72%,rgba(5,4,11,0.44)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_73%_44%,rgba(118,72,255,0.34)_0%,rgba(118,72,255,0.14)_28%,transparent_58%)]"
      />

      <div className="relative mx-auto grid min-h-[590px] max-w-[1280px] grid-cols-1 items-center gap-10 px-6 pb-16 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-2 lg:pb-0">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-[620px]"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-5 text-sm font-bold uppercase leading-relaxed text-purple-light md:text-base"
          >
            <span>{englishLabel}</span>
            {chineseLabel && (
              <>
                <span className="mx-2 text-text-primary/70">·</span>
                <span className="text-text-primary">{chineseLabel}</span>
              </>
            )}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.58 }}
            className="max-w-[700px] text-4xl font-bold leading-tight text-text-primary md:text-6xl lg:text-[70px]"
          >
            {data.hero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.52 }}
            className="mt-7 max-w-[590px] text-base leading-8 text-text-secondary md:text-xl md:leading-9"
          >
            {data.hero.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href={data.hero.primaryCta.href}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm bg-purple-primary px-8 text-base font-semibold text-white transition-colors hover:bg-purple-primary/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-light"
            >
              {data.hero.primaryCta.label}
              <ArrowRight aria-hidden size={18} />
            </Link>
            <Link
              href={data.hero.secondaryCta.href}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm border border-white/22 bg-black/20 px-8 text-base font-semibold text-text-primary backdrop-blur-sm transition-colors hover:border-purple-light hover:text-purple-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-light"
            >
              <Download aria-hidden size={18} />
              {data.hero.secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 38, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.72, delay: 0.18, ease: "easeOut" }}
          className="relative min-h-[330px] lg:min-h-[600px]"
        >
          <div className="absolute inset-x-0 bottom-[5%] top-[6%] lg:-right-24 lg:left-0">
            <SiteImg
              src={data.hero.productImageDefault}
              alt={`${data.hero.title} 產品圖`}
              className="h-full w-full object-contain object-bottom drop-shadow-[0_32px_60px_rgba(65,35,150,0.42)]"
            />
          </div>

          <div
            aria-hidden
            className="absolute bottom-[3%] left-[18%] hidden h-12 w-[64%] rounded-[50%] bg-purple-light/35 blur-3xl lg:block"
          />

          <div className="absolute right-0 top-8 hidden w-[260px] flex-col gap-4 lg:flex">
            {data.hero.sideCards.map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.48, delay: 0.42 + index * 0.1 }}
                className="rounded-md border border-purple-light/28 bg-[#12101b]/72 px-5 py-4 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-sm"
              >
                <span className="mb-1 block text-xs font-bold text-purple-light">
                  HUD · {String(index + 1).padStart(2, "0")}
                </span>
                <span className="block text-sm font-semibold leading-snug text-text-primary">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NanoAdvantages({ items }: { items?: SeriesAdvantage[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section
      id="nano-core-advantages"
      className="relative isolate overflow-hidden bg-[#05050b] py-20 md:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_48%_22%,rgba(96,54,210,0.2)_0%,transparent_32%),linear-gradient(180deg,rgba(5,5,11,0)_0%,rgba(17,13,34,0.5)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-purple-light/20"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="mb-11 max-w-[820px]"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-20 w-3 rounded-full bg-purple-primary shadow-[0_0_22px_rgba(141,119,207,0.8)]" />
            <h2 className="text-4xl font-bold leading-tight text-text-primary md:text-5xl">
              核心優勢
            </h2>
          </div>
          <p className="text-base leading-8 text-text-secondary md:text-xl">
            以更高效率與更低門檻，賦能具身智能視覺感知快速落地
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.06 }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {items.map((item, index) => {
            const Icon = NANO_ICON_MAP[item.icon] ?? Crosshair;

            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.48 }}
                className="group relative overflow-hidden rounded-[18px] border border-purple-light/22 bg-[#0c1020]/88 shadow-[0_22px_60px_rgba(0,0,0,0.32)]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(100,68,204,0.12) 0%, rgba(7,9,18,0) 46%, rgba(141,119,207,0.13) 100%)",
                  }}
                />
                {item.iconImage && (
                  <div className="relative aspect-[303/378] w-full overflow-hidden border-b border-purple-light/12">
                    <Image
                      src={item.iconImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 240px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="relative min-h-[280px] bg-[#111827]/72 p-7 md:p-6">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl border border-purple-light/45 bg-purple-primary/25 text-purple-light">
                      <Icon aria-hidden size={28} strokeWidth={1.65} />
                    </span>
                    <h3 className="text-2xl font-bold leading-tight text-text-primary lg:text-[26px]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base leading-8 text-text-secondary">
                    {item.description}
                  </p>
                  <div className="absolute bottom-7 right-7 text-3xl font-semibold text-purple-light">
                    {String(index + 1).padStart(2, "0")}
                    <span className="mt-1 block h-px w-9 bg-purple-light" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
