"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { ArrowRight } from "lucide-react";
import {
  getFooterCopy,
  type Locale,
  localizeText,
  toLocalizedPath,
} from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const copy = getFooterCopy(locale);

  return (
    <footer className="relative isolate overflow-hidden bg-bg-secondary border-t border-border-subtle">
      <Image
        src="/images/layout/footer-camera-sticker-purple-white.png"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center pointer-events-none opacity-80"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,14,16,0.96)_0%,rgba(13,14,16,0.92)_36%,rgba(13,14,16,0.72)_68%,rgba(13,14,16,0.56)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_80%_55%,rgba(73,46,141,0.22),transparent_70%)]"
      />
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company info */}
          <div>
            <Image
              src="/images/logo-mark.png"
              alt="AIeveR Robotics"
              width={48}
              height={48}
              className="h-10 w-auto mb-4"
            />
            <h3 className="text-text-primary font-bold text-lg mb-3">
              AIeveR Robotics Limited
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              {copy.companyDescription}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Link
                href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"}
                aria-label={copy.contactPageLabel}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <Globe size={18} aria-hidden />
              </Link>
              <a
                href="mailto:zcchen@aiever-robotics.com"
                aria-label={copy.mailLabel}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <Mail size={18} aria-hidden />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-purple-light font-medium text-sm mb-6">
              {copy.quickLinks}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={toLocalizedPath(locale, "/support/docs") ?? "/support/docs"} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  {copy.exploreProducts}
                </Link>
              </li>
              <li>
                <Link href={toLocalizedPath(locale, "/support/guides") ?? "/support/guides"} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  {copy.industrySolutions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service & Support */}
          <div>
            <h4 className="text-purple-light font-medium text-sm mb-6">
              {copy.serviceSupport}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={toLocalizedPath(locale, "/support/docs") ?? "/support/docs"} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  {copy.afterSales}
                </Link>
              </li>
              <li>
                <Link href={toLocalizedPath(locale, "/support/guides") ?? "/support/guides"} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  {copy.trainingPlatform}
                </Link>
              </li>
              <li>
                <Link href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  {copy.partnerPlan}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h4 className="text-purple-light font-medium text-sm mb-6">
              {copy.subscribe}
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href={toLocalizedPath(locale, "/support/docs") ?? "/support/docs"}
                className="flex items-center justify-between border border-border-color text-text-primary px-5 py-3 text-sm hover:border-purple-light transition-colors"
              >
                {copy.exploreProducts}
                <ArrowRight size={14} />
              </Link>
              <span
                aria-disabled="true"
                className="flex items-center justify-center bg-purple-primary/40 text-white/70 px-5 py-3 text-sm cursor-not-allowed select-none"
              >
                {copy.mallPending}
              </span>
              <Link
                href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"}
                className="flex items-center justify-center border border-border-color text-text-primary px-5 py-3 text-sm hover:border-purple-light transition-colors"
              >
                {copy.contactUs}
              </Link>
            </div>
          </div>
        </div>

        {/* Address + HONG KONG badge */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <p className="text-text-secondary text-xs">
            Unit 20-21, 15/F, Building 19W, Hong Kong Science Park, Pak Shek
            Kok, N.T., HK
          </p>
          <div className="text-right leading-tight">
            <p className="text-purple-light text-[10px] font-mono">
              {localizeText("Designed in", locale)}
            </p>
            <p className="text-purple-light text-[10px] font-mono">
              {localizeText("Originated from", locale)}
            </p>
            <p className="text-purple-light text-[10px] font-mono">
              The Chinese University of
            </p>
            <p className="text-text-primary text-2xl font-bold tracking-wider leading-none mt-1">
              HONG
              <br />
              KONG
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-xs">
            {copy.copyright}
          </p>
          <div className="flex items-center gap-8">
            <a
              href="mailto:zcchen@aiever-robotics.com"
              className="text-text-secondary text-xs hover:text-text-primary transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
