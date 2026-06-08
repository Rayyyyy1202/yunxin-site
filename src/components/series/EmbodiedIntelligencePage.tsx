"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import SiteImg from "@/components/ui/SiteImg";
import TechSpecsTable from "@/components/series/TechSpecsTable";
import ApplicationCases from "@/components/series/ApplicationCases";
import FOVCalculator from "@/components/series/FOVCalculator";
import CaseGallery from "@/components/series/CaseGallery";
import SeriesSiblingNav from "@/components/series/SeriesSiblingNav";
import SeriesCTA from "@/components/series/SeriesCTA";
import type { SeriesData } from "@/data/series";

interface EmbodiedIntelligencePageProps {
  data: SeriesData;
  prev: SeriesData | null;
  next: SeriesData | null;
}

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
      <NanoCoreAdvantagesImage />
      <TechSpecsTable data={data.techSpecs} />
      <ApplicationCases items={data.applicationCases} />
      <FOVCalculator config={data.fovCalculator} />
      <CaseGallery items={data.caseGallery} />
      <SeriesSiblingNav prev={prev} next={next} />
      <SeriesCTA data={data.cta} />
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
      className="relative isolate overflow-hidden bg-[#05040b] pt-16 md:pt-20"
    >
      <div className="relative mx-auto min-h-[680px] max-w-[1280px] overflow-hidden px-6 pb-14 pt-10 md:min-h-[608px] md:px-10 md:pb-0 md:pt-12">
        {data.hero.backgroundDefault && (
          <Image
            src={data.hero.backgroundDefault}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="pointer-events-none absolute inset-0 object-cover object-center"
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,11,0.82)_0%,rgba(5,4,11,0.52)_43%,rgba(5,4,11,0.08)_70%,rgba(5,4,11,0.24)_100%)]"
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="relative z-10 max-w-[606px]"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-2 font-bold uppercase"
          >
            <span className="bg-gradient-to-r from-[#492e8d] to-[#7b66ff] bg-clip-text text-[28px] leading-none tracking-[2.4px] text-transparent md:text-4xl">
              {englishLabel}
            </span>
            {chineseLabel && (
              <>
                <span className="size-1 rounded-full bg-[#492e8d]" />
                <span className="text-base leading-none tracking-[1px] text-white md:text-xl">
                  {chineseLabel}
                </span>
              </>
            )}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.58 }}
            className="max-w-[604px] text-[34px] font-bold leading-tight text-[#7b66ff] md:text-5xl md:leading-[1.18]"
          >
            {data.hero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.52 }}
            className="mt-8 max-w-[606px] text-base font-semibold leading-7 text-white md:mt-11 md:text-2xl md:leading-8"
          >
            {data.hero.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-9 flex flex-wrap gap-4 md:mt-12"
          >
            <Link
              href={data.hero.primaryCta.href}
              className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-lg bg-[#492e8d]/60 px-10 text-base font-medium tracking-[1.6px] text-white transition-colors hover:bg-[#492e8d]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-light"
            >
              {data.hero.primaryCta.label}
              <ArrowRight aria-hidden size={18} />
            </Link>
            <Link
              href={data.hero.secondaryCta.href}
              className="inline-flex min-h-[58px] min-w-[166px] items-center justify-center gap-2 border border-[#47484a]/60 bg-black/30 px-8 text-base font-medium tracking-[0.8px] text-[#fdfbfe] transition-colors hover:border-purple-light hover:text-purple-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-light"
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
          className="relative z-0 mt-8 min-h-[280px] md:absolute md:left-[calc(50%+24px)] md:right-10 md:top-0 md:mt-0 md:h-[576px]"
        >
          <div className="absolute inset-0 md:h-[576px]">
            <SiteImg
              src={data.hero.productImageDefault}
              alt={`${data.hero.title} 產品圖`}
              className="absolute left-[9.75%] top-[34.46%] h-auto w-[77.11%] object-contain drop-shadow-[0_32px_60px_rgba(65,35,150,0.42)]"
            />
          </div>

          <div className="absolute left-0 top-[16%] hidden flex-col gap-4 md:flex">
            {data.hero.sideCards.slice(0, 1).map((label) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.48, delay: 0.42 }}
                className="border-l-2 border-[#492e8d] bg-[#242629]/60 py-4 pl-[18px] pr-4 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-[10px]"
              >
                <span className="block whitespace-nowrap text-xl font-bold leading-7 text-[#fdfbfe]">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-[13%] right-[-21px] hidden flex-col gap-4 md:flex">
            {data.hero.sideCards.slice(1).map((label) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.48, delay: 0.52 }}
                className="border-r-2 border-[#bf81ff] bg-[#242629]/60 py-4 pl-4 pr-[18px] text-right shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-[10px]"
              >
                <span className="block whitespace-nowrap text-xl font-bold leading-7 text-[#fdfbfe]">
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

function NanoCoreAdvantagesImage() {
  return (
    <section
      id="nano-core-advantages"
      className="relative isolate overflow-hidden bg-[#05050b] py-12 md:py-16"
    >
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <Image
            src="/images/series/ei/image92-advantages-reference.png"
            alt="Nano 核心優勢：極致高精、持久穩定、緊湊易用、極速實時、全場景適應"
            width={1672}
            height={941}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
