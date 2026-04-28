"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";

interface SubNavProps {
  items: NavItem[];
}

export default function SubNav({ items }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-bg-secondary border-b border-border-subtle sticky top-16 md:top-20 z-40 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide py-4">
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-sm tracking-wide transition-colors",
                  isActive
                    ? "text-purple-light font-medium"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
