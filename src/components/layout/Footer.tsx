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
    <footer className="relative isolate overflow-hidden border-t border-[#272727] bg-black">
      <div className="relative mx-auto max-w-[1280px] px-6 pb-10 pt-10 md:px-10">
        <div className="grid gap-10 lg:min-h-[222px] lg:grid-cols-4 lg:gap-12">
          <div>
            <h3 className="font-['Space_Grotesk',var(--font-inter),sans-serif] text-[20px] font-bold leading-7 text-white">
              AIeveR Robotics Limited
            </h3>
            <p className="mt-4 max-w-[278px] text-[12px] font-medium leading-[19.5px] text-white">
              {copy.companyDescription}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Link
                href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"}
                aria-label={copy.contactPageLabel}
                className="text-white transition-colors hover:text-purple-light"
              >
                <Share2 size={20} strokeWidth={2} aria-hidden />
              </Link>
              <Link
                href={toLocalizedPath(locale, "/") ?? "/"}
                aria-label={localizeText("訪問官網首頁", locale)}
                className="text-white transition-colors hover:text-purple-light"
              >
                <Globe size={20} strokeWidth={2} aria-hidden />
              </Link>
              <a
                href="mailto:zcchen@aiever-robotics.com"
                aria-label={copy.mailLabel}
                className="text-white transition-colors hover:text-purple-light"
              >
                <Mail size={20} strokeWidth={2} aria-hidden />
              </a>
            </div>
          </div>

          <nav aria-label={copy.quickLinks}>
            <h4 className="text-[12px] font-medium uppercase leading-4 tracking-[1.2px] text-purple-light">
              {copy.quickLinks}
            </h4>
            <ul className="mt-6 space-y-4 text-[12px] font-medium leading-4 text-white">
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
                      className="block transition-colors hover:text-purple-light"
                    >
                      {localizeText(item.label, locale)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <h4 className="text-[12px] font-medium uppercase leading-4 tracking-[1.2px] text-purple-light">
              {copy.contactUs}
            </h4>
            <div className="mt-6 space-y-4 text-[12px] font-medium leading-4 text-white">
              <p>{localizeText("郵箱：", locale)}</p>
              <p>{localizeText("電話：", locale)}</p>
              <p>{localizeText("地址：", locale)}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-medium uppercase leading-4 tracking-[1.2px] text-purple-light">
              {copy.subscribe}
            </h4>
            <div className="mt-6 flex flex-col gap-5">
              <Link
                href={toLocalizedPath(locale, "/products/depthsight/line") ?? "/products/depthsight/line"}
                className="flex min-h-[48px] items-center justify-center border border-[#47484a] bg-[#181a1c] px-6 text-[10px] font-normal text-white transition-colors hover:border-purple-light hover:text-purple-light"
              >
                <span className="flex w-full items-center justify-center gap-6">
                  {copy.exploreProducts}
                  <ArrowRight size={12} className="text-purple-light" />
                </span>
              </Link>
              <Link
                href={shopUrl}
                target={isExternalShopUrl ? "_blank" : undefined}
                rel={isExternalShopUrl ? "noreferrer" : undefined}
                className="flex min-h-[48px] items-center justify-center bg-purple-primary px-6 text-[10px] font-medium uppercase leading-[15px] tracking-[2px] text-white transition-colors hover:bg-purple-primary/85"
              >
                {copy.mallPending}
              </Link>
              <Link
                href={toLocalizedPath(locale, "/about/contact") ?? "/about/contact"}
                className="flex min-h-[49px] items-center justify-center border border-purple-primary px-6 text-[10px] font-medium uppercase leading-[15px] tracking-[2px] text-purple-light transition-colors hover:bg-purple-primary/10"
              >
                {copy.contactUs}
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-[489px] text-[12px] font-medium leading-[19.5px] text-white lg:mt-[75px]">
          {address}
        </p>

        <div className="mt-6 flex flex-col gap-5 border-t border-[#181a1c] pt-8 md:flex-row md:items-center md:justify-between lg:mt-[25px] lg:pt-10">
          <p className="text-[10px] font-normal uppercase leading-[15px] tracking-[1px] text-white">
            {copy.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-8 text-[10px] font-normal uppercase leading-[15px] tracking-[1px] text-white">
            <span aria-disabled="true">LEGAL STATEMENT</span>
            <span aria-disabled="true">PRIVACY POLICY</span>
          </div>
        </div>

        <Image
          src="/images/layout/footer-hong-kong-sticker.png"
          alt=""
          width={237}
          height={58}
          aria-hidden
          className="pointer-events-none absolute right-10 top-[299px] hidden h-auto w-[237px] select-none lg:block"
        />
      </div>
    </footer>
  );
}
