"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";
import { aboutContent, type MissionVisionItem } from "@/data/about-content";

export default function MissionVision() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const { missionVision } = aboutContent;
  const bg = useSiteImage(missionVision.backgroundSrc);

  return (
    <section
      ref={ref}
      className="relative min-h-[780px] overflow-hidden bg-bg-primary py-20 md:min-h-[775px] md:py-0"
    >
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,5,13,0.95) 0%, rgba(10,24,47,0.56) 45%, rgba(0,0,0,0.74) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:min-h-[775px] md:px-10">
        <motion.div
          className="md:absolute md:left-10 md:top-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 border border-purple-primary/40 bg-purple-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[4px] text-purple-light">
            <span className="size-1.5 rounded-full bg-purple-primary" />
            {missionVision.eyebrow.replace(/^◇\s*/, "")}
          </span>
          <h2 className="mt-8 text-4xl font-medium leading-tight tracking-[-0.04em] text-text-primary md:text-5xl">
            {missionVision.title}
          </h2>
        </motion.div>

        <div className="relative mt-16 space-y-8 md:mt-0 md:min-h-[775px] md:space-y-0">
          <motion.div
            className="md:absolute md:left-0 md:top-[250px] md:w-[709px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MissionVisionCard
              item={missionVision.mission}
              lineSrc="/images/about/mission-line-figma.svg"
              tone="light"
            />
          </motion.div>

          <motion.div
            className="md:absolute md:left-[491px] md:top-[527px] md:w-[709px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <MissionVisionCard
              item={missionVision.vision}
              lineSrc="/images/about/vision-line-figma.svg"
              tone="dark"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface MissionVisionCardProps {
  item: MissionVisionItem;
  lineSrc: string;
  tone: "light" | "dark";
}

function MissionVisionCard({ item, lineSrc, tone }: MissionVisionCardProps) {
  return (
    <div
      className={`relative min-h-[188px] overflow-hidden border border-white/10 p-8 shadow-[0_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-[2px] ${
        tone === "light" ? "bg-[rgba(28,27,27,0.6)]" : "bg-[rgba(28,27,27,0.2)]"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 select-none font-['Space_Grotesk'] text-[128px] font-bold leading-none text-[#353534] opacity-50"
      >
        {item.index}
      </span>

      <span
        aria-hidden
        className={`absolute bottom-0 left-0 top-0 w-1 ${
          tone === "light" ? "bg-[#cfbdff]" : "bg-purple-primary"
        }`}
      />

      <div className="relative">
        <div className="relative mb-6 h-[30px] w-full max-w-[645px]">
          <Image
            src={lineSrc}
            alt=""
            fill
            sizes="645px"
            className="object-contain object-left"
          />
        </div>
        <h3 className="mb-4 pt-2 text-2xl font-black leading-8 text-white">
          {item.label}：
        </h3>
        <p className="max-w-[645px] text-base font-medium leading-8 text-white md:text-xl md:leading-[1.625]">
          {item.body}
        </p>
      </div>
    </div>
  );
}
