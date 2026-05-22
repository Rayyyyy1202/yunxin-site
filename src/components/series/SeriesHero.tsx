"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";
import type { SeriesHero } from "@/data/series";

interface SeriesHeroSlide {
  id: string;
  label: string;
  thumb?: string;
}

interface SeriesHeroProps {
  data: SeriesHero;
  modelSlides?: SeriesHeroSlide[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SeriesHeroSection({
  data,
  modelSlides,
}: SeriesHeroProps) {
  const slides = useMemo(() => {
    const modelThumbs =
      modelSlides
        ?.filter((slide) => Boolean(slide.thumb))
        .map((slide) => ({
          id: slide.id,
          label: slide.label,
          src: slide.thumb as string,
        })) ?? [];

    if (modelThumbs.length > 0) return modelThumbs;
    return [
      {
        id: "hero-product",
        label: data.title,
        src: data.productImageDefault,
      },
    ];
  }, [data.productImageDefault, data.title, modelSlides]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasCarousel = slides.length > 1;
  const safeActiveIndex = activeIndex % slides.length;
  const activeSlide = slides[safeActiveIndex] ?? slides[0];

  useEffect(() => {
    if (!hasCarousel || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [hasCarousel, isPaused, slides.length]);

  const showPrev = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

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

        {/* Right — product image carousel + side HUD cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-[4/3] w-full md:aspect-[5/4]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {/* Product image — sized to sit on the podium in the bg.
              Figma reference: ~576×576 (≈45% of hero width) so we keep the
              rendered image to ~60% of right column width and bottom-anchor
              it onto the podium platform. */}
          <div className="absolute inset-0 flex items-end justify-center pb-[18%] md:pb-[16%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, x: 24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex w-[62%] max-w-[380px] justify-center"
              >
                <SiteImg
                  src={activeSlide.src}
                  alt={`${activeSlide.label} 產品圖`}
                  className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(73,46,141,0.4)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stage glow under product */}
          <div
            aria-hidden
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-1/2 h-8 rounded-[50%] blur-2xl"
            style={{ background: "rgba(141,119,207,0.4)" }}
          />

          {hasCarousel && (
            <div
              className="absolute bottom-[2%] left-1/2 z-10 flex w-full max-w-[440px] -translate-x-1/2 flex-col items-center gap-3 px-4 md:bottom-[4%]"
              data-series-hero-carousel={slides.length}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="上一個型號"
                  onClick={showPrev}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-purple-light/35 bg-bg-primary/70 text-text-primary backdrop-blur-sm transition-colors hover:border-purple-light hover:text-purple-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-light"
                >
                  <ChevronLeft aria-hidden size={18} />
                </button>

                <div
                  className="flex min-w-[120px] items-center justify-center rounded-full border border-purple-light/25 bg-bg-secondary/70 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[2px] text-purple-light backdrop-blur-sm"
                  data-series-hero-active-label
                >
                  {activeSlide.label}
                </div>

                <button
                  type="button"
                  aria-label="下一個型號"
                  onClick={showNext}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-purple-light/35 bg-bg-primary/70 text-text-primary backdrop-blur-sm transition-colors hover:border-purple-light hover:text-purple-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-light"
                >
                  <ChevronRight aria-hidden size={18} />
                </button>
              </div>

              <div
                className="flex max-w-full flex-wrap justify-center gap-2"
                aria-label="型號輪播選擇"
              >
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`切換到 ${slide.label}`}
                    aria-current={
                      index === safeActiveIndex ? "true" : undefined
                    }
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-light ${
                      index === safeActiveIndex
                        ? "w-8 bg-purple-light"
                        : "w-3 bg-text-secondary/40 hover:bg-purple-light/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Side HUD cards */}
          <div className="absolute right-0 top-1/4 hidden flex-col gap-3 md:flex md:gap-4">
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
