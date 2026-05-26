"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LOCALE_LABELS,
  LOCALES,
  type Locale,
  switchLocalePath,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
}

export default function LanguageSwitcher({
  locale,
  className,
  onNavigate,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");
  const query = searchParams.toString();

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (
    <div
      data-locale-switcher
      data-no-localize
      className={cn(
        "inline-flex items-center overflow-hidden rounded-sm border border-border-subtle bg-bg-card/60 text-xs",
        className,
      )}
      aria-label="Language switcher"
    >
      {LOCALES.map((nextLocale) => {
        const href = `${switchLocalePath(pathname, nextLocale)}${
          query ? `?${query}` : ""
        }${hash}`;
        const active = nextLocale === locale;

        return (
          <Link
            key={nextLocale}
            href={href}
            hrefLang={nextLocale}
            aria-current={active ? "true" : undefined}
            onClick={onNavigate}
            className={cn(
              "px-2.5 py-1.5 font-medium transition-colors",
              active
                ? "bg-purple-primary text-white"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {LOCALE_LABELS[nextLocale].short}
          </Link>
        );
      })}
    </div>
  );
}
