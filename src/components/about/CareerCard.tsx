"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { CareerItem } from "@/lib/types";
import SiteImg from "@/components/ui/SiteImg";

interface CareerCardProps {
  career: CareerItem;
  index: number;
}

export default function CareerCard({ career, index }: CareerCardProps) {
  const hasRealExternalUrl =
    Boolean(career.externalUrl) &&
    !career.externalUrl?.includes("example.com");
  const label = career.href || hasRealExternalUrl ? "查看詳情" : "資料待補";
  const action = (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-color text-text-primary text-sm uppercase tracking-wider hover:border-purple-light hover:text-purple-light transition-colors">
      {label}
      {career.href ? <ArrowRight size={14} /> : <ArrowUpRight size={14} />}
    </span>
  );

  return (
    <motion.article
      className="group relative bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden hover:border-purple-primary/45 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
    >
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
        {career.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-xs tracking-wider backdrop-blur-sm">
            Hot
          </div>
        )}
      </div>

      <div className="p-6 md:p-7 flex min-h-[260px] flex-col">
        <h3 className="text-text-primary font-bold text-xl mb-2">
          {career.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 inline-flex items-center gap-2">
          <MapPin size={14} />
          {career.location}
        </p>
        {career.summary && (
          <p className="text-text-secondary text-sm leading-7 mb-5">
            {career.summary}
          </p>
        )}
        {career.tags && (
          <div className="mb-6 flex flex-wrap gap-2">
            {career.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-purple-light/20 bg-purple-primary/10 px-3 py-1 text-[11px] text-purple-light/90"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          {career.href ? (
            <Link href={career.href}>{action}</Link>
          ) : hasRealExternalUrl && career.externalUrl ? (
            <a href={career.externalUrl} target="_blank" rel="noopener noreferrer">
              {action}
            </a>
          ) : (
            <span aria-disabled="true" className="opacity-60">
              {action}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
