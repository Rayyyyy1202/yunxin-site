"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";
import { aboutContent } from "@/data/about-content";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function CompanyHero() {
  const { hero } = aboutContent;
  const bg = useSiteImage(hero.backgroundSrc);

  return (
    <section className="relative w-full aspect-[3/2] min-h-[560px] max-h-[1100px] flex items-end overflow-hidden bg-bg-primary">
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt="全球網絡連接"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,14,16,0) 0%, rgba(13,14,16,0) 55%, rgba(13,14,16,0.55) 85%, rgba(13,14,16,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 w-full pb-[18%] md:pb-[16%]">
        <div className="max-w-[820px]">
          <motion.span
            className="text-text-secondary/70 text-[10px] uppercase tracking-[4px]"
            {...fadeUp}
            transition={{ duration: 0.6 }}
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-5 leading-tight"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className="text-text-secondary text-sm md:text-base mt-6 max-w-[640px] leading-relaxed"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {hero.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
