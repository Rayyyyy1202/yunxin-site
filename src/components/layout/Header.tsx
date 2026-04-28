"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { SITE_NAME } from "@/lib/constants";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
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
            {mainNavigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children ? setActiveDropdown(item.label) : undefined
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm tracking-wide"
                >
                  {item.label}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-bg-secondary border border-border-subtle rounded-lg py-2 min-w-[180px] shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              className="text-text-secondary hover:text-text-primary transition-colors p-2"
              aria-label="搜尋"
            >
              <Search size={18} />
            </button>

            <Link
              href="/about/contact"
              className="inline-flex items-center justify-center bg-purple-primary text-white px-5 py-2 text-sm font-medium tracking-wide hover:bg-purple-primary/80 transition-colors rounded-sm"
            >
              聯繫我們
            </Link>

            <Link
              href="#"
              className="inline-flex items-center justify-center border border-border-color text-text-primary px-5 py-2 text-sm font-medium tracking-wide hover:border-purple-light hover:text-purple-light transition-colors rounded-sm"
            >
              商城
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
            aria-label="打開菜單"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
