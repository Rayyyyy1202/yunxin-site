"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useSiteImage } from "@/components/SiteImageProvider";
import { applications, type ApplicationItem } from "@/data/products";

export default function ApplicationsGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      ref={ref}
      id="applications"
      className="relative overflow-hidden bg-bg-primary py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[3px] text-purple-light">
              Industry Solutions
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
              深耕行業 · 落地有聲
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-text-secondary md:text-right">
            從新能源汽車到3C電子，AIeveR Robotics方案已服務多個智能製造一線場景。
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        ref={emblaRef}
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex touch-pan-y">
          {applications.map((item) => (
            <div
              key={item.id}
              className="min-w-0 flex-[0_0_82%] px-3 sm:flex-[0_0_72%] md:flex-[0_0_63.5%] lg:flex-[0_0_812px]"
            >
              <AppCard item={item} />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          className="flex size-10 items-center justify-center border border-border-color text-text-secondary transition-colors hover:border-purple-light hover:text-purple-light"
          aria-label="上一個行業"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="flex size-10 items-center justify-center border border-border-color text-text-secondary transition-colors hover:border-purple-light hover:text-purple-light"
          aria-label="下一個行業"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

function AppCard({ item }: { item: ApplicationItem }) {
  const src = useSiteImage(item.imageSrc);
  const content = (
    <div className="group relative aspect-[812/612] overflow-hidden bg-black">
      <Image
        src={src}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 72vw, 812px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <h3 className="absolute bottom-8 left-8 text-3xl font-bold text-white md:text-4xl">
        {item.title}
      </h3>
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light">
        {content}
      </Link>
    );
  }

  return content;
}
