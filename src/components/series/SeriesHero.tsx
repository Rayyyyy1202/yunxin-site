"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";
import type { SeriesHero } from "@/data/series";

interface SeriesHeroProps {
  data: SeriesHero;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SeriesHeroSection({ data }: SeriesHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-bg-primary pt-24 md:pt-32 pb-16 md:pb-24 min-h-[640px] md:min-h-[720px]">
      {/* Full-bleed dark stage backdrop. */}
      {data.backgroundDefault && (
        <Image
          src={data.backgroundDefault}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover pointer-events-none"
        />
      )}

      {/* CSS fallback / additive ambient glow. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 75% 35%, rgba(73,46,141,0.25) 0%, rgba(13,14,16,0) 60%)",
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(141,119,207,0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(141,119,207,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
        {/* Left — copy */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-purple-light text-[11px] md:text-xs uppercase tracking-[3px] font-bold mb-5"
          >
            {data.topLabel}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-text-primary text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[560px] mb-8"
          >
            {data.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href={data.primaryCta.href}
              className="inline-flex items-center justify-center bg-purple-primary text-white px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-purple-primary/85 transition-colors"
            >
              {data.primaryCta.label}
            </Link>
            <Link
              href={data.secondaryCta.href}
              className="inline-flex items-center justify-center border border-border-color text-text-primary px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:border-purple-light hover:text-purple-light transition-colors"
            >
              {data.secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — product image + side HUD cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-[4/3] md:aspect-[5/4] w-full"
        >
          <SiteImg
            src={data.productImageDefault}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(73,46,141,0.4)]"
          />

          {/* Stage glow under product */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-[50%] blur-2xl"
            style={{ background: "rgba(141,119,207,0.35)" }}
          />

          {/* Side HUD cards */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-3 md:gap-4">
            {data.sideCards.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                className="bg-bg-secondary/70 backdrop-blur-sm border border-purple-light/25 rounded-md px-3 py-2 max-w-[200px]"
              >
                <span className="block text-purple-light text-[9px] uppercase tracking-[2px] font-semibold mb-0.5">
                  HUD · {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block text-text-primary text-xs font-medium leading-snug">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
