"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { news } from "@/data/news";

export default function NewsPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const items = news.slice(0, 6);

  return (
    <div ref={ref} id="news" className="py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Heading with carousel controls */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <button
            type="button"
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-border-color flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-purple-light transition-colors"
            aria-label="上一條"
          >
            <ChevronLeft size={18} />
          </button>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">
            新聞輪播動態
          </h2>

          <button
            type="button"
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-border-color flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-purple-light transition-colors"
            aria-label="下一條"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={emblaRef}
          className="overflow-hidden"
        >
          <div className="flex gap-6">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex-[0_0_100%] md:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <Link
                  href={`/about/news/${item.slug}`}
                  className="group block"
                >
                  <time
                    dateTime={item.date}
                    className="text-text-secondary/70 text-xs font-mono tracking-widest"
                  >
                    {item.date.replace(/-/g, ".")}
                  </time>
                  <h3 className="text-text-primary font-bold text-lg md:text-xl leading-snug mt-3 mb-3 group-hover:text-purple-light transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
