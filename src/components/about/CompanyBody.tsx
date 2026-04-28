"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";
import { aboutContent } from "@/data/about-content";

export default function CompanyBody() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { companyIntro } = aboutContent;
  const bg = useSiteImage(companyIntro.backgroundSrc);

  return (
    <section
      ref={ref}
      className="relative bg-bg-primary py-20 md:py-32 overflow-hidden flex items-center min-h-[56.25vw]"
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
              "linear-gradient(180deg, rgba(13,14,16,0.55) 0%, rgba(13,14,16,0.4) 45%, rgba(13,14,16,0.7) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-[1080px] mx-auto px-6 md:px-10">
        <motion.h2
          className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {companyIntro.title}
        </motion.h2>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {companyIntro.paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-text-secondary text-sm md:text-base leading-[1.9] tracking-wide"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
