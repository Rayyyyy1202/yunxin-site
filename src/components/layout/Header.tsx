"use client";

import { type FocusEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { getMainNavigation } from "@/data/navigation";
import { SITE_NAME } from "@/lib/constants";
import { type Locale, localizeText, toLocalizedPath } from "@/lib/i18n";
import MobileNav from "./MobileNav";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const mainNavigation = getMainNavigation(locale);

  const closeDropdownOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={toLocalizedPath(locale, "/") ?? "/"}
            className="flex items-center gap-2.5 text-text-primary font-bold text-lg tracking-wider shrink-0"
          >
            <Image
              src="/images/logo-mark.png"
              alt="AIeveR Robotics"
              width={32}
              height={32}
              priority
              className="h-7 w-auto md:h-8"
            />
            {SITE_NAME}
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {mainNavigation.map((item) => {
              const hasDropdown = Boolean(
                item.children?.length || item.megaMenu?.length,
              );
              const triggerClass =
                "inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm tracking-wide";

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    hasDropdown ? setActiveDropdown(item.label) : undefined
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() =>
                    hasDropdown ? setActiveDropdown(item.label) : undefined
                  }
                  onBlur={closeDropdownOnBlur}
                >
                  {item.menuOnly ? (
                    <button type="button" className={triggerClass}>
                      <span>{item.label}</span>
                      {hasDropdown && <ChevronDown size={14} />}
                    </button>
                  ) : (
                    <Link href={item.href} className={triggerClass}>
                      <span>{item.label}</span>
                      {hasDropdown && <ChevronDown size={14} />}
                    </Link>
                  )}

                  {item.megaMenu && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6">
                      <div className="grid min-h-[175px] w-[956px] max-w-[calc(100vw-80px)] grid-cols-[1.24fr_1.24fr_1fr_1fr] gap-10 bg-[#5f5f61] px-7 py-8 shadow-2xl">
                        {item.megaMenu.map((group) => (
                          <div key={group.label} className="min-w-0">
                            {group.href ? (
                              <Link
                                href={group.href}
                                className="mb-6 block whitespace-nowrap text-[13px] font-bold leading-tight text-text-primary transition-colors hover:text-purple-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-light"
                              >
                                {group.label}
                              </Link>
                            ) : (
                              <p className="mb-6 whitespace-nowrap text-[13px] font-bold leading-tight text-text-primary">
                                {group.label}
                              </p>
                            )}
                            <div className="space-y-5">
                              {group.items.map((megaItem) =>
                                megaItem.href && !megaItem.disabled ? (
                                  <Link
                                    key={megaItem.label}
                                    href={megaItem.href}
                                    className="block text-sm text-text-primary/70 transition-colors hover:text-text-primary"
                                  >
                                    {megaItem.label}
                                  </Link>
                                ) : (
                                  <span
                                    key={megaItem.label}
                                    aria-disabled="true"
                                    className="block cursor-not-allowed text-sm text-text-primary/45"
                                  >
                                    {megaItem.label}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-bg-secondary border border-border-subtle rounded-lg py-2 min-w-[180px] shadow-xl">
                        {item.children.map((child) =>
                          child.href && !child.disabled ? (
                            <Link
                              key={`${child.href}-${child.label}`}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors"
                            >
                              {child.label}
                            </Link>
                          ) : (
                            <span
                              key={child.label}
                              aria-disabled="true"
                              className="block cursor-not-allowed px-4 py-2.5 text-sm text-text-secondary/45"
                            >
                              {child.label}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right-side actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              className="text-text-secondary hover:text-text-primary transition-colors p-2"
              aria-label={localizeText("搜尋", locale)}
            >
              <Search size={18} />
            </button>

            <LanguageSwitcher locale={locale} />

            <Link
              href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"}
              className="inline-flex items-center justify-center bg-purple-primary text-white px-5 py-2 text-sm font-medium tracking-wide hover:bg-purple-primary/80 transition-colors rounded-sm"
            >
              {localizeText("聯繫我們", locale)}
            </Link>

            <Link
              href="#"
              className="inline-flex items-center justify-center border border-border-color text-text-primary px-5 py-2 text-sm font-medium tracking-wide hover:border-purple-light hover:text-purple-light transition-colors rounded-sm"
            >
              {localizeText("商城", locale)}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
            aria-label={localizeText("打開菜單", locale)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        locale={locale}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
