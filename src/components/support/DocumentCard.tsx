"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Download,
  FileText,
  Package,
} from "lucide-react";
import type { DocumentItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type CardVariant = "doc" | "guide" | "download" | "software";

interface DocumentCardProps {
  item: DocumentItem;
  index: number;
  variant: CardVariant;
}

const VARIANT_CONFIG: Record<
  CardVariant,
  { icon: React.ComponentType<{ size?: number | string; className?: string }>; ctaLabel: string }
> = {
  doc: { icon: FileText, ctaLabel: "查看文档" },
  guide: { icon: BookOpen, ctaLabel: "阅读指南" },
  download: { icon: Download, ctaLabel: "下载" },
  software: { icon: Package, ctaLabel: "下载软件" },
};

export default function DocumentCard({
  item,
  index,
  variant,
}: DocumentCardProps) {
  const { icon: Icon, ctaLabel } = VARIANT_CONFIG[variant];
  const isDownloadLike = variant === "download" || variant === "software";
  const href = item.fileUrl ?? "#";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
      className="group relative flex flex-col h-full bg-bg-secondary border border-border-subtle rounded-xl p-6 md:p-7 hover:border-purple-primary/40 transition-colors"
    >
      {/* Icon header */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={cn(
            "w-11 h-11 rounded-lg flex items-center justify-center",
            "bg-purple-primary/10 border border-purple-primary/30 text-purple-light",
            "group-hover:bg-purple-primary/20 transition-colors",
          )}
        >
          <Icon size={20} />
        </div>

        <span className="inline-flex items-center px-2.5 py-1 bg-bg-card border border-border-subtle rounded-full text-text-secondary text-[10px] uppercase tracking-wider">
          {item.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-text-primary font-bold text-lg md:text-xl leading-snug mb-3 group-hover:text-purple-light transition-colors">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
        {item.description}
      </p>

      {/* Meta row */}
      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary mb-5 pt-4 border-t border-border-subtle/60">
        {item.version && (
          <span className="inline-flex items-center gap-1">
            <span className="text-text-secondary/70">版本</span>
            <span className="text-text-primary font-mono">{item.version}</span>
          </span>
        )}
        {item.fileSize && (
          <span className="inline-flex items-center gap-1">
            <span className="text-text-secondary/70">大小</span>
            <span className="text-text-primary font-mono">
              {item.fileSize}
            </span>
          </span>
        )}
        <span className="inline-flex items-center gap-1 ml-auto">
          <span className="text-text-secondary/70">更新</span>
          <span className="text-text-primary">{formatDate(item.updatedAt)}</span>
        </span>
      </div>

      {/* CTA */}
      <a
        href={href}
        target={isDownloadLike ? undefined : "_blank"}
        rel={isDownloadLike ? undefined : "noopener noreferrer"}
        download={isDownloadLike || undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm tracking-wide transition-colors",
          isDownloadLike
            ? "bg-purple-primary text-white hover:bg-purple-light/90"
            : "border border-border-color text-text-primary hover:border-purple-light hover:text-purple-light",
        )}
      >
        {ctaLabel}
        {isDownloadLike ? <Download size={14} /> : <ArrowUpRight size={14} />}
      </a>
    </motion.article>
  );
}
