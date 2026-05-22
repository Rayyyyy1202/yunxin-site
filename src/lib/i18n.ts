import OpenCC from "opencc-js";
import type { NavItem } from "@/lib/types";

export const LOCALES = ["zh-CN", "zh-HK"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh-CN";

export const LOCALE_LABELS: Record<Locale, { short: string; label: string }> = {
  "zh-CN": { short: "简", label: "简体中文" },
  "zh-HK": { short: "繁", label: "繁體中文" },
};

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function stripLocaleFromPathname(pathname: string) {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (isLocale(first)) {
    return `/${rest.join("/")}`.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLocale(first) ? first : null;
}

export function toLocalizedPath(locale: Locale, href: string | undefined) {
  if (!href) return href;
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  ) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;

  if (!pathname.startsWith("/")) return href;
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images")
  ) {
    return href;
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) {
    parts[0] = locale;
  } else {
    parts.unshift(locale);
  }

  return `/${parts.join("/")}${query}${hash}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  return toLocalizedPath(nextLocale, stripLocaleFromPathname(pathname)) ?? `/${nextLocale}`;
}

const phraseMap: Record<string, string> = {
  "雲芯機器人有限公司": "云芯机器人有限公司",
  "產品中心": "产品中心",
  "行業應用": "行业应用",
  "資源中心": "资源中心",
  "關於": "关于",
  "聯繫我們": "联系我们",
  "聯係我們": "联系我们",
  "技術文檔": "技术文档",
  "技術指南": "技术指南",
  "下載中心": "下载中心",
  "產品軟體": "产品软件",
  "公司介紹": "公司介绍",
  "加入我們": "加入我们",
  "最新消息": "最新消息",
  "首頁": "首页",
  "上一個": "上一个",
  "下一個": "下一个",
  "返回首頁": "返回首页",
  "立即諮詢": "立即咨询",
  "獲取資料": "获取资料",
  "獲取方案諮詢": "获取方案咨询",
  "預約": "预约",
  "敬請期待": "敬请期待",
};

const traditionalToSimplified: Record<string, string> = {
  "雲": "云",
  "機": "机",
  "器": "器",
  "會": "会",
  "視": "视",
  "覺": "觉",
  "產": "产",
  "業": "业",
  "應": "应",
  "資": "资",
  "源": "源",
  "關": "关",
  "於": "于",
  "聯": "联",
  "繫": "系",
  "係": "系",
  "們": "们",
  "頁": "页",
  "線": "线",
  "軟": "软",
  "體": "体",
  "標": "标",
  "準": "准",
  "導": "导",
  "覽": "览",
  "測": "测",
  "雜": "杂",
  "靈": "灵",
  "巧": "巧",
  "開": "开",
  "啟": "启",
  "時": "时",
  "代": "代",
  "動": "动",
  "態": "态",
  "術": "术",
  "檔": "档",
  "載": "载",
  "訊": "讯",
  "協": "协",
  "議": "议",
  "醫": "医",
  "護": "护",
  "電": "电",
  "鋰": "锂",
  "池": "池",
  "蓋": "盖",
  "殼": "壳",
  "檢": "检",
  "處": "处",
  "塗": "涂",
  "膠": "胶",
  "車": "车",
  "庫": "库",
  "儲": "储",
  "倉": "仓",
  "專": "专",
  "為": "为",
  "與": "与",
  "並": "并",
  "將": "将",
  "從": "从",
  "讓": "让",
  "這": "这",
  "種": "种",
  "個": "个",
  "維": "维",
  "網": "网",
  "絡": "络",
  "節": "节",
  "點": "点",
  "數": "数",
  "據": "据",
  "備": "备",
  "複": "复",
  "雖": "虽",
  "廣": "广",
  "強": "强",
  "雙": "双",
  "臂": "臂",
  "輪": "轮",
  "誤": "误",
  "錄": "录",
  "獨": "独",
  "獲": "获",
  "獎": "奖",
  "證": "证",
  "書": "书",
  "規": "规",
  "劃": "划",
  "碼": "码",
  "階": "阶",
  "險": "险",
  "擬": "拟",
  "輸": "输",
  "權": "权",
  "經": "经",
  "歷": "历",
  "優": "优",
  "職": "职",
  "責": "责",
  "團": "团",
  "隊": "队",
  "構": "构",
  "學": "学",
  "買": "买",
  "賣": "卖",
  "驅": "驱",
  "實": "实",
  "習": "习",
  "報": "报",
  "價": "价",
  "諮": "咨",
  "詢": "询",
  "隻": "只",
  "塊": "块",
  "簡": "简",
  "單": "单",
  "確": "确",
  "認": "认",
  "現": "现",
  "場": "场",
  "轉": "转",
  "換": "换",
  "選": "选",
  "擇": "择",
  "擴": "扩",
  "張": "张",
  "試": "试",
  "暫": "暂",
  "無": "无",
  "篩": "筛",
  "條": "条",
  "件": "件",
  "總": "总",
  "間": "间",
  "發": "发",
  "佈": "布",
  "後": "后",
  "臺": "台",
  "灣": "湾",
};

const hkToSimplified = OpenCC.Converter({ from: "hk", to: "cn" });

const PRESERVED_TERMS = [
  "AIeveR Robotics Limited",
  "AIeveR Robotics",
  "AIR Vision Engine",
  "AIR Calibrator Engine",
  "AIR Planner Engine",
  "AIR Picking Station",
  "AIR Vision Pro Station",
  "Robot Scan Station",
  "AIR Vision",
  "DepthSight",
  "Hong Kong",
  "HONG KONG",
  "AI Agent",
];

function convertHongKongTraditionalToSimplified(value: string) {
  const replacements: string[] = [];
  const protectedValue = PRESERVED_TERMS.reduce((text, term, index) => {
    if (!text.includes(term)) return text;
    replacements[index] = term;
    return text.replaceAll(term, `\uE000${index}\uE001`);
  }, value);

  return replacements.reduce(
    (text, term, index) => text.replaceAll(`\uE000${index}\uE001`, term),
    hkToSimplified(protectedValue),
  );
}

export function localizeText(value: string, locale: Locale): string {
  if (locale === "zh-HK") return value;

  let next = value;
  for (const [from, to] of Object.entries(phraseMap)) {
    next = next.replaceAll(from, to);
  }
  next = convertHongKongTraditionalToSimplified(next);
  return Array.from(next)
    .map((char) => traditionalToSimplified[char] ?? char)
    .join("");
}

export function localizeData<T>(value: T, locale: Locale): T {
  if (locale === "zh-HK") return value;
  if (typeof value === "string") return localizeText(value, locale) as T;
  if (Array.isArray(value)) {
    return value.map((item) => localizeData(item, locale)) as T;
  }
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      result[key] = localizeData(item, locale);
    }
    return result as T;
  }
  return value;
}

const navigationBase: NavItem[] = [
  { label: "首頁", href: "/" },
  {
    label: "產品中心",
    href: "/products/depthsight/line",
    megaMenu: [
      {
        label: "工業具身操作智能DepthSight產品線",
        items: [
          { label: "Line系列", href: "/products/depthsight/line" },
          { label: "Advanced系列", href: "/products/depthsight/advanced" },
          { label: "Standard系列", href: "/products/depthsight/standard" },
        ],
      },
      {
        label: "通用具身感知操作智能EI產品線",
        items: [
          { label: "Nano", href: "/products/depthsight/embodied-intelligence" },
        ],
      },
      {
        label: "AIR智能軟體引擎",
        href: "/products/air-intelligent-software-engine",
        items: [
          { label: "AIR Vision Engine", href: "/products/air-vision-engine" },
          { label: "AIR Calibrator Engine", href: "/products/air-calibrator-engine" },
          { label: "AIR Planner Engine", href: "/products/air-planner-engine" },
        ],
      },
      {
        label: "標準工作站",
        items: [
          { label: "AIR Picking Station", href: "/products/air-picking-station" },
          { label: "Robot Scan Station", href: "/products/robot-scan-station" },
          { label: "AIR Vision Pro Station", href: "/products/air-vision-pro-station" },
        ],
      },
    ],
  },
  {
    label: "行業應用",
    href: "/applications",
    menuOnly: true,
    children: [
      {
        label: "高精度3D檢測與測量",
        href: "/applications/precision-3d-detection",
      },
      {
        label: "柔性機器人視覺引導",
        href: "/applications/flexible-robot-vision",
      },
      {
        label: "高柔性主動式3D工作站",
        disabled: true,
      },
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

function localizeNavHref(locale: Locale, item: NavItem): NavItem {
  return {
    ...item,
    href: toLocalizedPath(locale, item.href) ?? item.href,
    children: item.children?.map((child) => ({
      ...child,
      href: toLocalizedPath(locale, child.href) ?? child.href,
    })),
    megaMenu: item.megaMenu?.map((group) => ({
      ...group,
      href: toLocalizedPath(locale, group.href) ?? group.href,
      items: group.items.map((child) => ({
        ...child,
        href: toLocalizedPath(locale, child.href) ?? child.href,
      })),
    })),
  };
}

export function getMainNavigation(locale: Locale): NavItem[] {
  return localizeData(navigationBase, locale).map((item) =>
    localizeNavHref(locale, item),
  );
}

export function getFooterCopy(locale: Locale) {
  return localizeData(
    {
      companyDescription: '致力成為全球多維視覺"具身操作·智能視覺"領導者',
      contactPageLabel: "訪問官網聯繫頁",
      mailLabel: "發送郵件到 zcchen@aiever-robotics.com",
      quickLinks: "快速鏈接",
      exploreProducts: "探索產品",
      industrySolutions: "行業解決方案",
      serviceSupport: "服務支持",
      afterSales: "售后支持",
      trainingPlatform: "訓練平台",
      partnerPlan: "合作伙伴計劃",
      subscribe: "訂閲動態",
      mallPending: "商城 · 敬請期待",
      contactUs: "聯係我們",
      copyright: "版權所有© 雲芯機器人有限公司 | 粵ICP備2025445885號-1",
    },
    locale,
  );
}
