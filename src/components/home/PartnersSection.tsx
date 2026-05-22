"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const partners = ["NVIDIA", "TESLA", "FANUC", "KUKA", "ABB", "INTEL"];

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.h2
          className="text-center text-2xl font-semibold uppercase tracking-[5px] text-text-primary md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          信賴雲芯的合作夥伴
        </motion.h2>

        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 opacity-55 mix-blend-screen md:gap-x-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.55, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {partners.map((partner) => (
            <span
              key={partner}
              className="font-mono text-2xl font-bold tracking-tight text-white md:text-3xl"
            >
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
