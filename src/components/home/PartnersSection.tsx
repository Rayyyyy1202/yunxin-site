"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const partners = [
  "清华大学",
  "中科院",
  "华为",
  "比亚迪",
  "宁德时代",
  "大疆创新",
];

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
            Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4">
            合作伙伴
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center h-24 bg-bg-secondary/50 backdrop-blur-sm border border-border-subtle rounded-lg hover:border-purple-primary/30 transition-colors"
            >
              <span className="text-text-secondary text-sm font-medium">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
