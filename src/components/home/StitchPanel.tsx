"use client";

import { motion } from "framer-motion";
import type { StitchPanelData } from "@/lib/types";
import { useSiteImage } from "@/components/SiteImageProvider";

interface StitchPanelProps {
  data: StitchPanelData;
  index: number;
}

export default function StitchPanel({ data, index: _index }: StitchPanelProps) {
  const detailSrc = useSiteImage(data.detailImage);

  return (
    <motion.article
      className="relative overflow-hidden rounded-xl border border-border-subtle bg-bg-secondary"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Photo crop */}
      <div
        className="relative aspect-[4/3] bg-cover bg-center"
        style={{ backgroundImage: `url(${detailSrc})` }}
      >
        {/* Darken overlay for text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,14,16,0.05) 0%, rgba(13,14,16,0.55) 60%, rgba(13,14,16,0.85) 100%)",
          }}
        />

        {/* Status indicator dot */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
            style={{ backgroundColor: "#3ce0d0" }}
          />
          <span className="text-[10px] font-mono uppercase tracking-[2px] text-text-primary/80">
            {data.statusLabel}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-purple-light text-[10px] uppercase tracking-[3px] font-bold">
            {data.titleEn}
          </span>
          <h3 className="text-text-primary text-2xl font-bold mt-1">
            {data.titleCn}
          </h3>
        </div>
      </div>

      {/* Description below photo */}
      <div className="p-5">
        <p className="text-text-secondary text-sm leading-relaxed">
          {data.description}
        </p>
      </div>
    </motion.article>
  );
}
