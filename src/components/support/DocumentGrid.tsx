"use client";

import DocumentCard from "./DocumentCard";
import type { DocumentItem } from "@/lib/types";

type CardVariant = "doc" | "guide" | "download" | "software";

interface DocumentGridProps {
  items: DocumentItem[];
  variant: CardVariant;
}

export default function DocumentGrid({ items, variant }: DocumentGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-border-subtle rounded-xl">
        <p className="text-text-secondary text-sm">
          暂无匹配的内容，请尝试其他分类。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {items.map((item, index) => (
        <DocumentCard
          key={item.id}
          item={item}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  );
}
