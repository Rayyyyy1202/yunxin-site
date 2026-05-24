"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";
import type { ApplicationCase } from "@/data/series";

interface ApplicationCasesProps {
  items?: ApplicationCase[];
}

export default function ApplicationCases({ items }: ApplicationCasesProps) {
  const [index, setIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const current = items[Math.min(index, items.length - 1)];
  const showNav = items.length > 1;

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <section id="measurement-scenarios" className="relative bg-bg-primary py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
              典型物體測量場景與點雲示例
            </h2>
            <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
              / Measurement Scenarios and Point Clouds
            </span>
          </div>
          <p className="mt-3 text-text-secondary text-sm md:text-base">
            見證 EI 系列在實際工業環境中的卓越表現。
          </p>
        </motion.div>

        {/* Center selector pill */}
        <div className="mb-6 md:mb-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={!showNav}
            aria-label="上一個場景"
            className="w-9 h-9 rounded-full border border-border-color text-text-primary hover:border-purple-light hover:text-purple-light transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <span
            key={current.label}
            className="text-text-primary text-base md:text-lg font-semibold tracking-wide min-w-[180px] text-center"
          >
            {current.label}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={!showNav}
            aria-label="下一個場景"
            className="w-9 h-9 rounded-full border border-border-color text-text-primary hover:border-purple-light hover:text-purple-light transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Two-panel: 測量場景 | 點雲示例 */}
        <motion.div
          key={current.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <Panel
            label="測量場景"
            src={current.scenarioImageDefault}
            alt={`${current.label} 測量場景`}
            fit="cover"
          />
          <Panel
            label="點雲示例"
            src={current.pointCloudImageDefault}
            alt={`${current.label} 點雲示例`}
            fit="contain"
          />
        </motion.div>

        {showNav && (
          <div className="mt-6 flex justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`跳到第 ${i + 1} 個場景`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-purple-light" : "w-1.5 bg-border-color hover:bg-text-secondary"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface PanelProps {
  label: string;
  src: string;
  alt: string;
  fit: "cover" | "contain";
}

function Panel({ label, src, alt, fit }: PanelProps) {
  return (
    <figure className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle bg-bg-card">
      {src ? (
        <SiteImg
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full ${
            fit === "contain" ? "object-contain bg-bg-primary p-3" : "object-cover"
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
          <ImageIcon size={36} strokeWidth={1.4} />
        </div>
      )}
      <figcaption className="absolute bottom-4 left-0 right-0 text-center text-text-primary text-sm md:text-base font-medium">
        {label}
      </figcaption>
    </figure>
  );
}
