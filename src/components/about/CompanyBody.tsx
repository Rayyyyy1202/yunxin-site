"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteCopy, useSiteImage } from "@/components/SiteImageProvider";
import { aboutContent } from "@/data/about-content";

export default function CompanyBody() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { companyIntro } = aboutContent;
  const bg = useSiteImage(companyIntro.backgroundSrc);
  const title = useSiteCopy("about-company-intro-title", companyIntro.title);
  const paragraphs = [
    useSiteCopy(
      "about-company-intro-paragraph-01",
      companyIntro.paragraphs[0] ?? "",
    ),
    useSiteCopy(
      "about-company-intro-paragraph-02",
      companyIntro.paragraphs[1] ?? "",
    ),
    useSiteCopy(
      "about-company-intro-paragraph-03",
      companyIntro.paragraphs[2] ?? "",
    ),
  ].filter(Boolean);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[760px] items-center overflow-hidden bg-bg-primary py-20 md:min-h-[832px] md:py-0"
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
              "linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(7,40,73,0.65) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1160px] px-6 text-center md:px-10">
        <motion.h2
          className="mb-10 text-4xl font-medium leading-tight tracking-[-0.04em] text-text-primary md:mb-12 md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="space-y-7"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base font-medium leading-8 text-white md:text-xl md:leading-[1.625]"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
