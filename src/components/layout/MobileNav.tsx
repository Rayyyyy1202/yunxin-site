"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { getMainNavigation } from "@/data/navigation";
import { SITE_NAME } from "@/lib/constants";
import { type Locale, localizeText } from "@/lib/i18n";

interface MobileNavProps {
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
}

export default function MobileNav({ isOpen, locale, onClose }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const mainNavigation = getMainNavigation(locale);

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
        className={`absolute top-0 right-0 h-full w-[320px] max-w-[88vw] overflow-y-auto bg-bg-secondary border-l border-border-subtle transition-transform duration-300 ${
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
            aria-label={localizeText("關閉菜單", locale)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          {mainNavigation.map((item) => (
            <div key={item.href}>
              {item.children || item.megaMenu ? (
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
                      {item.megaMenu
                        ? item.megaMenu.map((group) => (
                            <div key={group.label} className="py-3 pl-4 pr-2">
                              {group.href ? (
                                <Link
                                  href={group.href}
                                  onClick={onClose}
                                  className="mb-3 block text-xs font-semibold leading-relaxed text-text-primary transition-colors hover:text-purple-light"
                                >
                                  {group.label}
                                </Link>
                              ) : (
                                <p className="mb-3 text-xs font-semibold leading-relaxed text-text-primary">
                                  {group.label}
                                </p>
                              )}
                              <div className="space-y-2">
                                {group.items.map((megaItem) =>
                                  megaItem.href && !megaItem.disabled ? (
                                    <Link
                                      key={megaItem.label}
                                      href={megaItem.href}
                                      onClick={onClose}
                                      className="block py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                                    >
                                      {megaItem.label}
                                    </Link>
                                  ) : (
                                    <span
                                      key={megaItem.label}
                                      aria-disabled="true"
                                      className="block cursor-not-allowed py-1.5 text-sm text-text-secondary/50"
                                    >
                                      {megaItem.label}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          ))
                        : item.children?.map((child) =>
                            child.href && !child.disabled ? (
                              <Link
                                key={`${child.href}-${child.label}`}
                                href={child.href}
                                onClick={onClose}
                                className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <span
                                key={child.label}
                                aria-disabled="true"
                                className="block cursor-not-allowed px-4 py-2.5 text-sm text-text-secondary/50"
                              >
                                {child.label}
                              </span>
                            ),
                          )}
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

        <div className="border-t border-border-subtle px-7 py-5">
          <LanguageSwitcher locale={locale} onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
