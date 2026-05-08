"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import SiteImg from "@/components/ui/SiteImg";
import type { CaseGalleryItem } from "@/data/series";

interface CaseGalleryProps {
  items?: CaseGalleryItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function CaseGallery({ items }: CaseGalleryProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative bg-bg-primary py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 flex items-end gap-4 flex-wrap"
        >
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
            典型案例
          </h2>
          <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
            / Case Gallery
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {items.map((item, i) => (
            <motion.figure
              key={`${item.title}-${i}`}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle bg-bg-card"
            >
              {item.defaultSrc ? (
                <SiteImg
                  src={item.defaultSrc}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                  <ImageIcon size={36} strokeWidth={1.4} />
                </div>
              )}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,14,16,0) 50%, rgba(13,14,16,0.85) 100%)",
                }}
              />
              <figcaption className="absolute bottom-5 left-5 right-5">
                <span className="block text-text-primary text-base md:text-lg font-semibold leading-snug">
                  {item.title}
                </span>
                {item.description && (
                  <span className="block mt-1 text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
