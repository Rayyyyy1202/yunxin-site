"use client";

import { motion } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";
import type { SeriesPointCloudExample } from "@/data/series";

interface PointCloudExamplesProps {
  items: SeriesPointCloudExample[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function PointCloudExamples({ items }: PointCloudExamplesProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative bg-bg-secondary py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(73,46,141,0.25) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 flex items-end gap-4 flex-wrap"
        >
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
            典型物體點雲示例
          </h2>
          <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
            / Typical Point Cloud Examples
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {items.map((item) => (
            <motion.figure
              key={item.imageSlot}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle bg-bg-card"
            >
              <SiteImg
                src={item.defaultSrc}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,14,16,0) 50%, rgba(13,14,16,0.85) 100%)",
                }}
              />
              <figcaption className="absolute bottom-4 left-5 right-5 text-text-primary text-sm md:text-base font-medium">
                {item.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
