"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";
import type { ApplicationCase } from "@/data/series";

interface ApplicationCasesProps {
  items?: ApplicationCase[];
}

export default function ApplicationCases({ items }: ApplicationCasesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (!items || items.length === 0) return null;

  const showCarouselNav = items.length > 1;

  return (
    <section className="relative bg-bg-primary py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 flex items-end justify-between gap-4 flex-wrap"
        >
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
              應用案例
            </h2>
            <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
              / Application Cases
            </span>
          </div>
          {showCarouselNav && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="上一個"
                className="w-10 h-10 rounded-full border border-border-color text-text-primary hover:border-purple-light hover:text-purple-light transition-colors flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="下一個"
                className="w-10 h-10 rounded-full border border-border-color text-text-primary hover:border-purple-light hover:text-purple-light transition-colors flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5 md:gap-6">
            {items.map((item, i) => (
              <article
                key={`${item.title}-${i}`}
                className="relative flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_38%] aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle bg-bg-card group"
              >
                {item.defaultSrc ? (
                  <SiteImg
                    src={item.defaultSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <EmptyImage />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(13,14,16,0) 50%, rgba(13,14,16,0.85) 100%)",
                  }}
                />
                <figcaption className="absolute bottom-5 left-6 right-6">
                  <span className="block text-purple-light text-[10px] uppercase tracking-[2px] font-bold mb-1.5">
                    Case · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block text-text-primary text-base md:text-lg font-semibold leading-snug">
                    {item.title}
                  </span>
                  {item.caption && (
                    <span className="block mt-1 text-text-secondary text-sm leading-relaxed">
                      {item.caption}
                    </span>
                  )}
                </figcaption>
              </article>
            ))}
          </div>
        </div>

        {showCarouselNav && (
          <div className="mt-6 flex justify-center gap-1.5">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === selectedIndex ? "w-8 bg-purple-light" : "w-1.5 bg-border-color"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-card text-text-secondary">
      <ImageIcon size={36} strokeWidth={1.4} />
    </div>
  );
}
