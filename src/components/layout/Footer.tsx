"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Mail, Share2 } from "lucide-react";
import {
  getFooterCopy,
  type Locale,
  localizeText,
  toLocalizedPath,
} from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

const address =
  "Unit 20-21, 15/F, Building 19W, Hong Kong Science Park, Pak Shek Kok, N.T., HK";

export default function Footer({ locale }: FooterProps) {
  const copy = getFooterCopy(locale);
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:8080";
  const isExternalShopUrl = /^https?:\/\//.test(shopUrl);

  const quickLinks = [
    { label: "首頁", href: "/" },
    { label: "產品中心", href: "/products/depthsight/line" },
    { label: "行業應用", href: "/applications" },
    { label: "資源中心", href: "/support" },
    { label: "商城", href: shopUrl, external: isExternalShopUrl },
    { label: "關於我們", href: "/about" },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-border-subtle bg-black">
      <Image
        src="/images/layout/footer-camera-sticker-purple-white.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-30 object-cover object-center opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.98)_50%,rgba(0,0,0,0.88)_100%)]"
      />
      <div className="relative mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.7fr_0.8fr_1.05fr] xl:gap-16">
          <div>
            <h3 className="whitespace-nowrap text-2xl font-bold tracking-[-0.2px] text-text-primary md:text-[28px]">
              AIeveR Robotics Limited
            </h3>
            <p className="mt-7 max-w-[430px] text-base font-semibold leading-8 text-text-primary/86">
              {copy.companyDescription}
            </p>
            <div className="mt-10 flex items-center gap-5">
              <Link
                href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"}
                aria-label={copy.contactPageLabel}
                className="text-text-primary transition-colors hover:text-purple-light"
              >
                <Share2 size={25} strokeWidth={2.1} aria-hidden />
              </Link>
              <Link
                href={toLocalizedPath(locale, "/") ?? "/"}
                aria-label={localizeText("訪問官網首頁", locale)}
                className="text-text-primary transition-colors hover:text-purple-light"
              >
                <Globe size={27} strokeWidth={2.1} aria-hidden />
              </Link>
              <a
                href="mailto:zcchen@aiever-robotics.com"
                aria-label={copy.mailLabel}
                className="text-text-primary transition-colors hover:text-purple-light"
              >
                <Mail size={27} strokeWidth={2.1} aria-hidden />
              </a>
            </div>
          </div>

          <nav aria-label={copy.quickLinks}>
            <h4 className="text-base font-semibold text-purple-light">
              {copy.quickLinks}
            </h4>
            <ul className="mt-7 space-y-5">
              {quickLinks.map((item) => {
                const href =
                  item.external || item.href.startsWith("http")
                    ? item.href
                    : (toLocalizedPath(locale, item.href) ?? item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="text-base font-semibold text-text-primary/84 transition-colors hover:text-purple-light"
                    >
                      {localizeText(item.label, locale)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <h4 className="text-base font-semibold text-purple-light">
              {copy.contactUs}
            </h4>
            <div className="mt-7 space-y-5 text-base font-semibold text-text-primary/84">
              <p>{localizeText("郵箱：", locale)}</p>
              <p>{localizeText("電話：", locale)}</p>
              <p>{localizeText("地址：", locale)}</p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold text-purple-light">
              {copy.subscribe}
            </h4>
            <div className="mt-7 flex flex-col gap-5">
              <Link
                href={toLocalizedPath(locale, "/products/depthsight/line") ?? "/products/depthsight/line"}
                className="flex min-h-[58px] items-center justify-center border border-white/22 bg-white/[0.08] px-6 text-sm font-semibold text-text-primary transition-colors hover:border-purple-light hover:text-purple-light"
              >
                <span className="flex w-full items-center justify-center gap-6">
                  {copy.exploreProducts}
                  <ArrowRight size={18} className="text-purple-light" />
                </span>
              </Link>
              <Link
                href={shopUrl}
                target={isExternalShopUrl ? "_blank" : undefined}
                rel={isExternalShopUrl ? "noreferrer" : undefined}
                className="flex min-h-[58px] items-center justify-center bg-purple-primary px-6 text-sm font-semibold tracking-[2px] text-white transition-colors hover:bg-purple-primary/85"
              >
                {copy.mallPending}
              </Link>
              <Link
                href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"}
                className="flex min-h-[58px] items-center justify-center border border-purple-primary px-6 text-sm font-semibold text-purple-light transition-colors hover:bg-purple-primary/10"
              >
                {copy.contactUs}
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-[820px] text-sm font-semibold leading-7 text-text-primary/84 md:text-base">
          {address}
        </p>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/12 pt-8 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium tracking-wide text-text-primary/62">
            {copy.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-8 text-xs font-semibold uppercase tracking-[2.4px] text-text-primary/78">
            <span aria-disabled="true">LEGAL STATEMENT</span>
            <span aria-disabled="true">PRIVACY POLICY</span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[118px] right-10 hidden text-right leading-none md:block">
          <p className="font-mono text-[13px] font-semibold tracking-[2px] text-purple-primary/80">
            Designed in
          </p>
          <p className="font-mono text-[13px] font-semibold tracking-[2px] text-purple-primary/80">
            Originated from
          </p>
          <p className="font-mono text-[13px] font-semibold tracking-[2px] text-purple-primary/80">
            The Chinese University of
          </p>
          <p className="mt-1 text-4xl font-bold tracking-wider text-text-primary">
            HONG
            <br />
            KONG
          </p>
        </div>
      </div>
    </footer>
  );
}
