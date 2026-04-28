"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CareerItem } from "@/lib/types";
import SiteImg from "@/components/ui/SiteImg";

interface CareerCardProps {
  career: CareerItem;
  index: number;
}

export default function CareerCard({ career, index }: CareerCardProps) {
  return (
    <motion.article
      className="group bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden hover:border-purple-primary/40 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
    >
      {/* Image area */}
      <div className="relative aspect-[16/9] bg-bg-card overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(73,46,141,0.35) 0%, rgba(13,14,16,0.9) 100%)",
          }}
        />
        <SiteImg
          src={career.image}
          alt={career.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-purple-primary/20 border border-purple-primary/40 rounded-full text-purple-light text-xs uppercase tracking-wider backdrop-blur-sm">
          {career.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-7">
        <h3 className="text-text-primary font-bold text-xl mb-2">
          {career.title}
        </h3>
        <p className="text-text-secondary text-sm mb-6">{career.location}</p>

        <a
          href={career.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-color text-text-primary text-sm uppercase tracking-wider hover:border-purple-light hover:text-purple-light transition-colors"
        >
          查看详情
          <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.article>
  );
}
