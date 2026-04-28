"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionBannerProps {
  label?: string;
  title: string;
  description?: string;
}

export default function SectionBanner({
  label,
  title,
  description,
}: SectionBannerProps) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative py-16 md:py-20 text-center overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative line */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(73,46,141,0.3) 0%, transparent 60%)",
        }}
      />
      <div className="relative">
        {label && (
          <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
            {label}
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary mt-4">
          {title}
        </h2>
        {description && (
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
