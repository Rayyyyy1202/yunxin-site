"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  /** Optional item counts to display next to each category label */
  counts?: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
  counts,
}: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
    >
      {categories.map((category) => {
        const isActive = category === active;
        const count = counts?.[category];
        return (
          <button
            key={category}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              "whitespace-nowrap inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border text-sm transition-colors",
              isActive
                ? "bg-purple-primary text-white border-purple-primary"
                : "bg-transparent text-text-secondary border-border-subtle hover:text-text-primary hover:border-border-color",
            )}
          >
            <span>{category}</span>
            {typeof count === "number" && (
              <span
                className={cn(
                  "text-[11px] leading-none px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-bg-card text-text-secondary",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
