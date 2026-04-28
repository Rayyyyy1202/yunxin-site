"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, Globe, Mail } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-16">
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
              致力成為全球多維視覺&quot;具身操作·智能視覺&quot;領導者
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Share2 size={18} className="text-text-secondary hover:text-text-primary cursor-pointer transition-colors" />
              <Globe size={18} className="text-text-secondary hover:text-text-primary cursor-pointer transition-colors" />
              <Mail size={18} className="text-text-secondary hover:text-text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-purple-light font-medium text-sm mb-6">
              快速鏈接
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/support/docs" className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  探索產品
                </Link>
              </li>
              <li>
                <Link href="/support/guides" className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  行業解決方案
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service & Support */}
          <div>
            <h4 className="text-purple-light font-medium text-sm mb-6">
              服務支持
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/support/docs" className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  售后支持
                </Link>
              </li>
              <li>
                <Link href="/support/guides" className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  訓練平台
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  合作伙伴計劃
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                  隱私政策
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h4 className="text-purple-light font-medium text-sm mb-6">
              訂閲動態
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/support/docs"
                className="flex items-center justify-between border border-border-color text-text-primary px-5 py-3 text-sm hover:border-purple-light transition-colors"
              >
                探索產品
                <ArrowRight size={14} />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center bg-purple-primary text-white px-5 py-3 text-sm hover:bg-purple-primary/80 transition-colors"
              >
                進入商城
              </Link>
              <Link
                href="/about/contact"
                className="flex items-center justify-center border border-border-color text-text-primary px-5 py-3 text-sm hover:border-purple-light transition-colors"
              >
                聯係我們
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
              Designed in
            </p>
            <p className="text-purple-light text-[10px] font-mono">
              Originated from
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
            版權所有© 雲芯機器人有限公司 | 粵ICP備2025445885號-1
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="text-text-secondary text-xs hover:text-text-primary transition-colors"
            >
              LEGAL STATEMENT
            </Link>
            <Link
              href="#"
              className="text-text-secondary text-xs hover:text-text-primary transition-colors"
            >
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
