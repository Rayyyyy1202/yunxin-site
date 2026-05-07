/**
 * DepthSight 產品線 — 三大系列页数据。
 *
 * 由 Figma 设计稿提取（fileKey ZYyUze1aay4WXY1j7Fiz75）。
 * Hero / 核心优势 / 典型点云示例 三个 section 数据驱动。
 */

/** Icon key — resolved to a Lucide component inside CoreAdvantages.tsx. */
export type SeriesIconKey =
  | "Zap"
  | "ScanEye"
  | "Sparkles"
  | "Plug"
  | "Cpu"
  | "ShieldCheck"
  | "Cloud"
  | "Bot"
  | "Crosshair"
  | "Box"
  | "Activity"
  | "LayoutGrid";

export interface SeriesAdvantage {
  icon: SeriesIconKey;
  title: string;
  description: string;
}

export interface SeriesPointCloudExample {
  label: string;
  /** site-images.ts slot id (admin replaceable). */
  imageSlot: string;
  defaultSrc: string;
}

export interface SeriesHero {
  topLabel: string;
  /** Big page title, e.g. "Line 系列". */
  title: string;
  /** Short paragraph beneath the title. */
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sideCards: string[];
  productImageSlot: string;
  productImageDefault: string;
}

export interface SeriesData {
  slug: SeriesSlug;
  /** SEO + breadcrumb */
  metaTitle: string;
  metaDescription: string;
  hero: SeriesHero;
  coreAdvantages: SeriesAdvantage[];
  pointCloudExamples: SeriesPointCloudExample[];
}

export type SeriesSlug = "line" | "advanced" | "embodied-intelligence";

const TOP_LABEL = "DEPTHSIGHT · 高性能 3D 視覺感測器產品線";
const CONTACT_HREF = "/about/contact";
const DOWNLOADS_HREF = "/support/downloads";

const lineSeries: SeriesData = {
  slug: "line",
  metaTitle: "Line 系列 | DepthSight 產品線",
  metaDescription:
    "AIeveR Robotics DepthSight Line 系列：基於激光三角測量的高速高精度 3D 點雲輪廓儀，面向 3C、鋰電與汽車等高端製造的精密測量。",
  hero: {
    topLabel: TOP_LABEL,
    title: "Line 系列",
    description:
      "基於激光三角測量技術，實時輸出高解像度 3D 點雲，專為 3C、鋰電及汽車等高端製造的精密測量而設。",
    primaryCta: { label: "立即諮詢", href: CONTACT_HREF },
    secondaryCta: { label: "獲取產品資料", href: DOWNLOADS_HREF },
    sideCards: ["實時輸出高解像度 3D 點雲", "專為工業傳感打造"],
    productImageSlot: "series-line-hero",
    productImageDefault: "/images/home/product-depthsight.jpg",
  },
  coreAdvantages: [
    {
      icon: "Zap",
      title: "超高速高精度測量",
      description:
        "支援最高 2 kHz 全畫幅超高速檢測，Z 軸線性精度可達 0.4 μm，能滿足大規模工業量產線的在線檢測節拍要求。",
    },
    {
      icon: "ScanEye",
      title: "超高解像度成像",
      description:
        "X 軸向支援 3200 像素高解像度輪廓採集，可生成清晰、完整的 3D 點雲模型，精準還原被測目標的細節特徵。",
    },
    {
      icon: "Sparkles",
      title: "內置高精度藍色激光",
      description:
        "搭載 405 nm 波段藍色激光，毋須外部光源即可自動優化亮度，適配金屬、深色、高反光等複雜材質，有效解決成像干擾問題。",
    },
    {
      icon: "Plug",
      title: "豐富接口與兼容性",
      description:
        "配備完整的 I/O 與串口通訊接口，可靈活對接 PLC、工控機等各類工業自動化設備，適配多種開發環境。",
    },
  ],
  pointCloudExamples: [],
};

// TODO: Advanced 系列 4 张优势卡 3/4 在 Figma 仍是占位文案，待设计补全后替换。
const advancedSeries: SeriesData = {
  slug: "advanced",
  metaTitle: "Advanced 系列 | DepthSight 產品線",
  metaDescription:
    "AIeveR Robotics DepthSight Advanced 系列：自研 3D 結構光引擎，攻克高反光、透明與深色材質，實現亞微米級高精度感知。",
  hero: {
    topLabel: TOP_LABEL,
    title: "Advanced 系列",
    description:
      "自研 3D 結構光引擎，攻克各類高反光、透明與深色材質，實現亞微米級的高精度感知。",
    primaryCta: { label: "立即諮詢", href: CONTACT_HREF },
    secondaryCta: { label: "獲取產品資料", href: DOWNLOADS_HREF },
    sideCards: ["500 萬高解析度點雲數據輸出", "雙目相機方案結合自研演算法"],
    productImageSlot: "series-advanced-hero",
    productImageDefault: "/images/home/product-depthsight.jpg",
  },
  coreAdvantages: [
    {
      icon: "Cpu",
      title: "工業級高精度 3D 結構光",
      description:
        "自研結構光引擎輸出 500 萬點高解析點雲，亞微米級精度直擊工業精密檢測需求。",
    },
    {
      icon: "Bot",
      title: "具身操作智能 3D 視覺引導相機",
      description:
        "為機械臂提供穩定高速的引導視覺，覆蓋抓取、上下料、裝配等典型操作場景。",
    },
    {
      icon: "Cloud",
      title: "算法持續進化",
      description:
        "雲端模型訓練 + OTA 更新，相機可隨自研演算法迭代不斷提升精度與適應性。",
    },
    {
      icon: "ShieldCheck",
      title: "多重冗餘安全",
      description:
        "硬件級冗餘設計 + 自診斷機制，保證 7×24 工業產線連續穩定運行。",
    },
  ],
  pointCloudExamples: [
    {
      label: "Mini-LED 點雲",
      imageSlot: "advanced-pc-mini-led",
      defaultSrc: "/images/home/bento-3c.jpg",
    },
    {
      label: "鋁型材點雲",
      imageSlot: "advanced-pc-aluminium",
      defaultSrc: "/images/home/bento-auto.jpg",
    },
    {
      label: "新能源電池平面度測量",
      imageSlot: "advanced-pc-battery",
      defaultSrc: "/images/home/bento-battery.jpg",
    },
    {
      label: "CNC 加工件點雲",
      imageSlot: "advanced-pc-cnc",
      defaultSrc: "/images/home/bento-inspection.jpg",
    },
    {
      label: "PCB 板點雲",
      imageSlot: "advanced-pc-pcb",
      defaultSrc: "/images/home/bento-research.jpg",
    },
    {
      label: "顯卡點雲",
      imageSlot: "advanced-pc-gpu",
      defaultSrc: "/images/home/bento-logistics.jpg",
    },
  ],
};

const eiSeries: SeriesData = {
  slug: "embodied-intelligence",
  metaTitle: "Embodied Intelligence 系列 | DepthSight 產品線",
  metaDescription:
    "AIeveR Robotics DepthSight Embodied Intelligence 系列：融合 3D 深度與 AI 技術，為具身智能機械人提供精準、穩定、實時的核心視覺。",
  hero: {
    topLabel: TOP_LABEL,
    title: "Embodied Intelligence 系列",
    description:
      "融合 3D 深度與 AI 技術，精準感知環境與物件，為具身智能機械人提供核心視覺支撐。",
    primaryCta: { label: "立即諮詢", href: CONTACT_HREF },
    secondaryCta: { label: "獲取產品資料", href: DOWNLOADS_HREF },
    sideCards: ["精準感知環境與物件", "為具身智能提供核心視覺"],
    productImageSlot: "series-ei-hero",
    productImageDefault: "/images/home/product-embodied.jpg",
  },
  coreAdvantages: [
    {
      icon: "Crosshair",
      title: "極致高精",
      description: "感知數據精準無誤，支撐機械人完成毫米級精度的抓取與裝配。",
    },
    {
      icon: "ShieldCheck",
      title: "持久穩定",
      description: "支援長期無故障運行，硬件級冗餘設計保障工業現場穩定性。",
    },
    {
      icon: "Box",
      title: "緊湊易用",
      description: "結構小巧，輕鬆整合至各類智能體，即裝即用無需大幅改造。",
    },
    {
      icon: "Activity",
      title: "極速實時",
      description: "毫秒級響應捕捉，實時輸出深度與語義信息，跟得上機械人決策節拍。",
    },
    {
      icon: "LayoutGrid",
      title: "全場景適應",
      description:
        "無懼透明、強反光及複雜光照環境，穩定輸出可靠的點雲與識別結果。",
    },
  ],
  pointCloudExamples: [],
};

export const seriesList: SeriesData[] = [lineSeries, advancedSeries, eiSeries];

export const seriesSlugs: SeriesSlug[] = seriesList.map((s) => s.slug);

export function getSeries(slug: string): SeriesData | undefined {
  return seriesList.find((s) => s.slug === slug);
}
