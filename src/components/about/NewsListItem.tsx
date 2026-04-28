"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import SiteImg from "@/components/ui/SiteImg";

interface NewsListItemProps {
  item: NewsItem;
  index: number;
}

export default function NewsListItem({ item, index }: NewsListItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        href={`/about/news/${item.slug}`}
        className="group grid grid-cols-1 md:grid-cols-[280px_1fr_auto] gap-6 md:gap-8 items-start md:items-center py-8 border-t border-border-subtle first:border-t-0 hover:bg-bg-secondary/40 -mx-4 md:-mx-6 px-4 md:px-6 rounded-lg transition-colors"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] md:aspect-[4/3] bg-bg-card rounded-lg overflow-hidden border border-border-subtle">
          <SiteImg
            src={item.coverImage}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(73,46,141,0.15) 0%, rgba(13,14,16,0.5) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-purple-light text-[10px] uppercase tracking-[3px] font-bold">
              {item.category}
            </span>
            <span className="w-1 h-1 bg-text-secondary/50 rounded-full" />
            <span className="text-text-secondary text-xs">
              {formatDate(item.date)}
            </span>
          </div>

          <h3 className="text-text-primary text-xl md:text-2xl font-bold leading-snug mb-3 group-hover:text-purple-light transition-colors">
            {item.title}
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {item.summary}
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex w-11 h-11 rounded-full border border-border-color text-text-secondary items-center justify-center group-hover:border-purple-light group-hover:text-purple-light group-hover:rotate-45 transition-all">
          <ArrowUpRight size={18} />
        </div>
      </Link>
    </motion.article>
  );
}
