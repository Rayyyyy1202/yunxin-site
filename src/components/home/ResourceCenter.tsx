"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useSiteImage } from "@/components/SiteImageProvider";

const resources = [
  {
    id: "resource-factory",
    title: "智能製造現場",
    image: "/images/home/group-243/resource-01.png",
    href: "/support/guides",
  },
  {
    id: "resource-vision",
    title: "3D視覺應用資料",
    image: "/images/home/group-243/resource-02.png",
    href: "/support/docs",
  },
  {
    id: "resource-demo",
    title: "應用案例與演示",
    image: "/images/home/group-243/resource-03.png",
    href: "/support/downloads",
  },
];

export default function ResourceCenter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_1.1fr] md:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="max-w-xl text-sm leading-7 text-text-secondary">
            從新能源汽車到3C電子，AIeveR Robotics方案已服務多個智能製造一線場景。
          </p>
          <div className="text-left md:text-right">
            <span className="text-[10px] font-bold uppercase tracking-[3px] text-purple-light">
              Industry Solutions
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
              眼見為實 · 資源中心
            </h2>
          </div>
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
            "linear-gradient(to right, transparent 0, black 9%, black 91%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 9%, black 91%, transparent 100%)",
        }}
      >
        <div className="flex touch-pan-y">
          {resources.map((item) => (
            <div
              key={item.id}
              className="min-w-0 flex-[0_0_82%] px-3 sm:flex-[0_0_72%] md:flex-[0_0_63.5%] lg:flex-[0_0_812px]"
            >
              <ResourceCard item={item} />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          className="flex size-10 items-center justify-center border border-border-color text-text-secondary transition-colors hover:border-purple-light hover:text-purple-light"
          aria-label="上一個資源"
        >
          <ChevronLeft size={18} />
        </button>
        <Link
          href="/support/docs"
          className="text-sm font-medium tracking-[2px] text-purple-light hover:underline"
        >
          查看全部資源
        </Link>
        <button
          type="button"
          onClick={scrollNext}
          className="flex size-10 items-center justify-center border border-border-color text-text-secondary transition-colors hover:border-purple-light hover:text-purple-light"
          aria-label="下一個資源"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

function ResourceCard({
  item,
}: {
  item: { title: string; image: string; href: string };
}) {
  const src = useSiteImage(item.image);

  return (
    <Link href={item.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light">
      <div className="relative aspect-[812/612] overflow-hidden bg-black">
        <Image
          src={src}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 72vw, 812px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
      </div>
    </Link>
  );
}
