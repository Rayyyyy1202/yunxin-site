import type { NavItem } from "@/lib/types";

export const mainNavigation: NavItem[] = [
  {
    label: "首頁",
    href: "/",
  },
  {
    label: "產品中心",
    href: "/support/docs",
    children: [
      { label: "具身3D視覺感測器", href: "/support/docs" },
      { label: "DepthSight產品線", href: "/support/docs" },
      { label: "AIR智能軟體引擎", href: "/support/software" },
    ],
  },
  {
    label: "行業應用",
    href: "/support/guides",
    children: [
      { label: "新能源電池", href: "/support/guides" },
      { label: "3C電子製造", href: "/support/guides" },
      { label: "汽車柔性生產", href: "/support/guides" },
      { label: "智能物流倉儲", href: "/support/guides" },
    ],
  },
  {
    label: "資源中心",
    href: "/support",
    children: [
      { label: "技術文檔", href: "/support/docs" },
      { label: "技術指南", href: "/support/guides" },
      { label: "下載中心", href: "/support/downloads" },
      { label: "產品軟體", href: "/support/software" },
    ],
  },
  {
    label: "關於AIeveR",
    href: "/about",
    children: [
      { label: "公司介紹", href: "/about/company" },
      { label: "加入我們", href: "/about/careers" },
      { label: "最新消息", href: "/about/news" },
      { label: "聯繫我們", href: "/about/contact" },
    ],
  },
];
