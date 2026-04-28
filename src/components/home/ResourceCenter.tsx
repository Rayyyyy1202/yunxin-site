"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";

const resourceSlots = [
  { id: "resource-1", defaultSrc: "/images/home/resource-1.jpg" },
  { id: "resource-2", defaultSrc: "/images/home/resource-2.jpg" },
  { id: "resource-3", defaultSrc: "/images/home/resource-3.jpg" },
  { id: "resource-4", defaultSrc: "/images/home/resource-4.jpg" },
];

export default function ResourceCenter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative bg-bg-primary py-20 md:py-28">
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
              Resources
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 leading-tight">
              眼見為實·資源中心
            </h2>
          </div>
          <Link
            href="/support/docs"
            className="text-purple-light text-sm hover:underline"
          >
            查看全部資源 →
          </Link>
        </motion.div>

        {/* 4-card grid — placeholder slots for admin upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resourceSlots.map((slot, idx) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
            >
              <ResourceCard defaultSrc={slot.defaultSrc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceCard({ defaultSrc }: { defaultSrc: string }) {
  const src = useSiteImage(defaultSrc);
  const hasImage = src !== defaultSrc;

  if (hasImage) {
    return (
      <div className="group relative aspect-[16/10] rounded-xl overflow-hidden">
        <Image
          src={src}
          alt="資源展示"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-dashed border-border-subtle bg-bg-secondary/50 flex items-center justify-center">
      <div className="text-center text-text-secondary/40">
        <svg
          className="mx-auto mb-2 w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="text-xs">上傳素材</span>
      </div>
    </div>
  );
}
