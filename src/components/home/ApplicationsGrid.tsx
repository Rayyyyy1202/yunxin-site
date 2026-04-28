"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";
import { applications, type ApplicationItem } from "@/data/products";

export default function ApplicationsGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const marqueeItems = [...applications, ...applications];

  return (
    <section
      ref={ref}
      id="applications"
      className="relative bg-bg-primary py-20 md:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Heading */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-purple-light text-[10px] uppercase tracking-[3px] font-bold">
              Industry Solutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 leading-tight">
              深耕行業·落地有聲
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-md md:text-right">
            從新能源汽車到3C電子，AIeveR
            Robotics方案已服務多個智能製造一線場景。
          </p>
        </motion.div>
      </div>

      {/* Horizontal marquee — single row, seamless infinite scroll */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div className="marquee-track flex gap-4 md:gap-6 w-max">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="shrink-0 w-[280px] sm:w-[340px] md:w-[420px]"
            >
              <AppCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function AppCard({ item }: { item: ApplicationItem }) {
  const src = useSiteImage(item.imageSrc);

  return (
    <div className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-bg-secondary">
      <Image
        src={src}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 420px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,14,16,0) 50%, rgba(13,14,16,0.65) 100%)",
        }}
      />
      <div className="absolute bottom-5 left-5">
        <h3 className="text-text-primary text-lg md:text-xl font-bold">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
