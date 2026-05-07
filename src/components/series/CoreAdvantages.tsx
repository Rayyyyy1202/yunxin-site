"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Box,
  Cloud,
  Cpu,
  Crosshair,
  LayoutGrid,
  Plug,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { SeriesAdvantage, SeriesIconKey } from "@/data/series";

const ICON_MAP: Record<SeriesIconKey, LucideIcon> = {
  Zap,
  ScanEye,
  Sparkles,
  Plug,
  Cpu,
  Bot,
  Cloud,
  ShieldCheck,
  Crosshair,
  Box,
  Activity,
  LayoutGrid,
};

interface CoreAdvantagesProps {
  items: SeriesAdvantage[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function CoreAdvantages({ items }: CoreAdvantagesProps) {
  if (items.length === 0) return null;

  // 4 items → 2x2 / 1x4. 5 items → 1x5 / 2-3 stagger. 6 items → 3x2.
  const columnsClass =
    items.length === 5
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      : items.length === 6
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="relative bg-bg-primary py-20 md:py-28">
      {/* Ambient line decoration */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 flex items-end gap-4 flex-wrap"
        >
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
            核心優勢
          </h2>
          <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
            / Core Advantages
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className={`grid ${columnsClass} gap-5 md:gap-6`}
        >
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <motion.article
                key={`${item.title}-${i}`}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group relative bg-bg-secondary border border-border-subtle rounded-xl p-6 md:p-7 hover:border-purple-light/40 transition-colors"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at top, rgba(141,119,207,0.18) 0%, transparent 70%)",
                  }}
                />

                <div className="relative">
                  <div className="w-11 h-11 rounded-lg bg-purple-primary/15 border border-purple-primary/30 flex items-center justify-center mb-5 text-purple-light">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-text-primary text-base md:text-lg font-semibold mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
