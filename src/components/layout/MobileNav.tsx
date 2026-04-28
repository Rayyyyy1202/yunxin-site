"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { SITE_NAME } from "@/lib/constants";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className={`absolute top-0 right-0 h-full w-[280px] bg-bg-secondary border-l border-border-subtle transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
          <span className="flex items-center gap-2.5 text-text-primary font-bold">
            <Image
              src="/images/logo-mark.png"
              alt="AIeveR Robotics"
              width={28}
              height={28}
              className="h-6 w-auto"
            />
            {SITE_NAME}
          </span>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="關閉菜單"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          {mainNavigation.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="flex items-center justify-between w-full px-3 py-3 text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        expandedItem === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedItem === item.label && (
                    <div className="ml-4 border-l border-border-subtle">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-3 py-3 text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
