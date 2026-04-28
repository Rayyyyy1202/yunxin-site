"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import SiteImg from "@/components/ui/SiteImg";

interface NewsCarouselProps {
  items: NewsItem[];
}

export default function NewsCarousel({ items }: NewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(id);
  }, [emblaApi]);

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div
              key={item.slug}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <Link
                href={`/about/news/${item.slug}`}
                className="group relative block aspect-[21/9] md:aspect-[21/8] overflow-hidden"
              >
                {/* Background image */}
                <SiteImg
                  src={item.coverImage}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(13,14,16,0.95) 0%, rgba(13,14,16,0.75) 45%, rgba(13,14,16,0.35) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(13,14,16,0) 40%, rgba(13,14,16,0.85) 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-purple-primary/20 border border-purple-primary/40 rounded-full text-purple-light text-xs uppercase tracking-wider backdrop-blur-sm">
                        {item.category}
                      </span>
                      <span className="text-text-secondary text-xs">
                        {formatDate(item.date)}
                      </span>
                    </div>

                    <h3 className="text-text-primary font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 group-hover:text-purple-light transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-text-secondary text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6">
                      {item.summary}
                    </p>

                    <span className="inline-flex items-center gap-2 text-text-primary text-sm uppercase tracking-wider">
                      阅读全文
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bg-primary/70 border border-border-subtle text-text-primary hover:bg-purple-primary hover:border-purple-primary backdrop-blur-sm transition-all flex items-center justify-center"
        aria-label="上一条"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bg-primary/70 border border-border-subtle text-text-primary hover:bg-purple-primary hover:border-purple-primary backdrop-blur-sm transition-all flex items-center justify-center"
        aria-label="下一条"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === selectedIndex
                ? "w-8 bg-purple-light"
                : "w-1.5 bg-text-secondary/50 hover:bg-text-secondary",
            )}
            aria-label={`跳转到第 ${index + 1} 条`}
          />
        ))}
      </div>
    </div>
  );
}
