"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";
import { aboutContent, type PatentAwardItem } from "@/data/about-content";

export default function PatentsAwards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { patentsAwards } = aboutContent;

  return (
    <section ref={ref} className="bg-bg-primary py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {patentsAwards.titleZh}{" "}
          <span className="text-purple-light">/ {patentsAwards.titleEn}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {patentsAwards.items.map((item, idx) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
            >
              <PatentCard item={item} />
              <h3 className="text-text-primary font-bold text-lg mt-8">
                {item.caption}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PatentCard({ item }: { item: PatentAwardItem }) {
  const src = useSiteImage(item.imageSrc);
  return (
    <div className="relative w-full max-w-[400px] aspect-[3/4] bg-white rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={item.imageAlt}
        fill
        sizes="400px"
        className="object-contain p-2"
      />
    </div>
  );
}
