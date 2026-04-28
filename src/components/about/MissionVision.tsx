"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Eye, Rocket } from "lucide-react";
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
      className="relative bg-bg-primary py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,14,16,0.35) 0%, rgba(13,14,16,0.15) 45%, rgba(13,14,16,0.6) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-text-secondary/70 text-[10px] uppercase tracking-[4px]">
            {missionVision.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 leading-tight">
            {missionVision.title}
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MissionVisionCard item={missionVision.mission} icon="eye" />
          </motion.div>

          <motion.div
            className="md:col-span-7 md:col-start-6 md:-mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <MissionVisionCard item={missionVision.vision} icon="rocket" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface MissionVisionCardProps {
  item: MissionVisionItem;
  icon: "eye" | "rocket";
}

function MissionVisionCard({ item, icon }: MissionVisionCardProps) {
  const IconComponent = icon === "eye" ? Eye : Rocket;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/50 backdrop-blur-md">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -bottom-10 select-none text-[180px] md:text-[220px] font-bold leading-none text-transparent"
        style={{ WebkitTextStroke: "1px rgba(141,119,207,0.18)" }}
      >
        {item.index}
      </span>

      <span
        aria-hidden
        className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-light/70"
      />

      <div className="relative p-8 md:p-10 pl-10 md:pl-14">
        <div className="w-10 h-10 rounded-lg bg-purple-primary/15 border border-purple-primary/30 flex items-center justify-center mb-6">
          <IconComponent size={18} className="text-purple-light" />
        </div>
        <h3 className="text-text-primary text-lg md:text-xl font-bold mb-4">
          {item.label}：
        </h3>
        <p className="text-text-secondary text-sm md:text-[15px] leading-relaxed max-w-[520px]">
          {item.body}
        </p>
      </div>
    </div>
  );
}
