"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Box,
  CheckCircle2,
  Cloud,
  Cpu,
  Crosshair,
  Globe2,
  Layers,
  LayoutGrid,
  Package,
  Plug,
  Puzzle,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SiteImg from "@/components/ui/SiteImg";
import type {
  CoreAdvantagesVariant,
  SeriesAdvantage,
  SeriesIconKey,
} from "@/data/series";

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
  Globe2,
  CheckCircle2,
  Layers,
  Wrench,
  Package,
  Puzzle,
};

interface CoreAdvantagesProps {
  items?: SeriesAdvantage[];
  background?: string;
  variant?: CoreAdvantagesVariant;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function CoreAdvantages({
  items,
  background,
  variant = "default",
}: CoreAdvantagesProps) {
  if (!items || items.length === 0) return null;

  if (variant === "standard-showcase" || variant === "advanced-showcase") {
    return <ShowcaseCoreAdvantages items={items} />;
  }

  // 4 → 2x2 / 4-col, 5 → 5-col, 6 → 3-col.
  const columnsClass =
    items.length === 5
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      : items.length === 6
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="relative bg-bg-primary py-20 md:py-28 overflow-hidden">
      {background && (
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover pointer-events-none opacity-60"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-bg-primary/55"
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
                className="group relative bg-bg-secondary/85 backdrop-blur-sm border border-border-subtle rounded-xl p-5 md:p-6 hover:border-purple-light/40 transition-colors"
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
                  {item.iconImage ? (
                    <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-bg-primary/40">
                      <Image
                        src={item.iconImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        className="object-contain p-3"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-purple-primary/15 border border-purple-primary/30 flex items-center justify-center mb-5 text-purple-light">
                      <Icon size={22} strokeWidth={1.6} />
                    </div>
                  )}
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

function ShowcaseCoreAdvantages({
  items,
}: {
  items: SeriesAdvantage[];
}) {
  const showcaseItems = items.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-[#020309]">
      <div className="relative mx-auto max-w-[1280px] px-5 py-14 md:px-6 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-[118px] items-center justify-center md:h-[161px]"
        >
          <div className="flex items-center gap-5 md:gap-8">
            <ShowcaseTitleWing />
            <h2 className="text-[28px] font-bold leading-none text-[#fdfbfe] drop-shadow-[0_0_18px_rgba(123,102,255,0.42)] md:text-[36px]">
              核心優勢
            </h2>
            <ShowcaseTitleWing mirrored />
          </div>
          <span
            aria-hidden
            className="absolute bottom-[28px] h-[3px] w-14 bg-[#7b66ff] shadow-[0_0_12px_rgba(123,102,255,0.8)] md:bottom-[44px]"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3 xl:gap-4"
        >
          {showcaseItems.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <motion.article
                key={`${item.title}-${index}`}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group relative min-h-[420px] overflow-hidden rounded-[12px] border border-[#7b66ff]/55 bg-[#050814] shadow-[inset_0_0_28px_rgba(123,102,255,0.16),0_0_18px_rgba(73,46,141,0.12)]"
              >
                <div className="relative h-[218px] overflow-hidden bg-[#040612] md:h-[230px] lg:h-[210px] xl:h-[226px]">
                  {item.iconImage ? (
                    <SiteImg
                      src={item.iconImage}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,102,255,0.28),transparent_64%)]" />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050814] to-transparent"
                  />
                </div>

                <div className="relative z-10 -mt-3 min-h-[205px] rounded-t-[16px] bg-[linear-gradient(180deg,rgba(22,27,42,0.96)_0%,rgba(5,8,19,0.98)_100%)] px-5 pb-12 pt-5 shadow-[0_-18px_45px_rgba(0,0,0,0.48)] md:px-6">
                  <div className="mb-4 flex items-center gap-3 xl:gap-4">
                    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[8px] border border-[#8d77cf]/70 bg-[#492e8d]/55 text-[#d6cfff] shadow-[0_0_18px_rgba(123,102,255,0.34)]">
                      <Icon aria-hidden size={22} strokeWidth={1.6} />
                    </div>
                    <h3 className="min-w-0 text-[18px] font-bold leading-snug text-[#fdfbfe] xl:text-[19px] 2xl:text-[22px]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[14px] leading-7 text-[#cac4d3]">
                    {item.description}
                  </p>
                  <span className="absolute bottom-4 right-5 text-sm font-medium text-[#7b66ff]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-5 h-px w-8 bg-[#7b66ff]"
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ShowcaseTitleWing({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <span
      aria-hidden
      className={`hidden h-8 w-[150px] items-center md:flex ${
        mirrored ? "scale-x-[-1]" : ""
      }`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#492e8d] to-[#7b66ff]" />
      <span className="ml-2 h-px w-9 rotate-45 bg-[#7b66ff]" />
      <span className="ml-1 h-px w-9 bg-[#492e8d]" />
    </span>
  );
}
