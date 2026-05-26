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
  const titleLines = hero.titleLines ?? [[hero.title]];
  const descriptionLines = hero.descriptionLines ?? [hero.description];

  return (
    <section className="relative isolate min-h-[640px] w-full overflow-hidden bg-bg-primary md:min-h-[720px] lg:min-h-[780px]">
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,7,15,0.72) 0%, rgba(3,7,15,0.4) 38%, rgba(3,7,15,0.12) 66%, rgba(3,7,15,0.2) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,16,0.04)_0%,rgba(13,14,16,0.14)_60%,rgba(13,14,16,0.72)_100%)]"
        />
        <div
          aria-hidden
          className="absolute left-0 top-[19%] h-[42%] w-[56%] bg-[linear-gradient(90deg,rgba(2,5,13,0.78)_0%,rgba(2,5,13,0.5)_58%,rgba(2,5,13,0)_100%)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-[1280px] items-center px-6 pb-14 pt-28 md:min-h-[720px] md:px-10 md:pt-24 lg:min-h-[780px]">
        <div className="max-w-[760px]">
          <motion.span
            className="inline-flex items-center gap-2 border border-purple-primary/40 bg-purple-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[4px] text-purple-light"
            {...fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="size-1.5 rounded-full bg-purple-primary" />
            {hero.eyebrow.replace(/^◇\s*/, "")}
          </motion.span>

          <motion.h1
            className="mt-8 break-keep text-[42px] font-bold leading-[1.18] tracking-[-0.04em] text-text-primary drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] md:text-[56px] lg:text-[64px]"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {titleLines.map((line, lineIndex) => (
              <span
                key={lineIndex}
                className="flex flex-wrap gap-x-5 gap-y-1 md:gap-x-10 lg:gap-x-14"
              >
                {line.map((phrase) => (
                  <span key={phrase} className="whitespace-nowrap">
                    {phrase}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[650px] whitespace-pre-line text-base leading-8 text-text-secondary drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:text-xl md:leading-[2]"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {descriptionLines.join("\n")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
