"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";

interface ImageItem {
  image: string;
  title: string;
  caption: string;
}

interface DualImageSectionProps {
  heading?: string;
  items: [ImageItem, ImageItem];
}

export default function DualImageSection({
  heading,
  items,
}: DualImageSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref}>
      {heading && (
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {heading}
        </motion.h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-card border border-border-subtle"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${i === 0 ? "135deg" : "225deg"}, rgba(73,46,141,0.4) 0%, rgba(13,14,16,0.9) 100%)`,
              }}
            />
            <SiteImg
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <h4 className="text-text-primary font-bold text-xl mb-1">
                {item.title}
              </h4>
              <p className="text-text-secondary text-sm">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
