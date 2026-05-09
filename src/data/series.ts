/**
 * DepthSight 產品線 — 三大系列页数据。
 *
 * 由 Figma 设计稿提取（fileKey ZYyUze1aay4WXY1j7Fiz75）。
 *
 * 每个系列页的 sub-section 都是可选字段（undefined / 空数组）；对应组件
 * 在数据为空时直接 return null，所以可以一边补全数据一边逐步上线。
 *
 * EI 系列在 Figma 中只画了 Hero + Core Features + Core Advantages 三段，
 * 其余 section 字段保留 undefined，页面上自然不渲染。
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
  | "LayoutGrid"
  | "CheckCircle2"
  | "Layers"
  | "Wrench"
  | "Package";

export type SeriesSlug = "line" | "advanced" | "embodied-intelligence";

/* ------------------------------------------------------------------ */
/*  Section-level types                                                */
/* ------------------------------------------------------------------ */

export interface SeriesHero {
  topLabel: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sideCards: string[];
  productImageSlot: string;
  productImageDefault: string;
  /** Full-bleed dark stage backdrop image. */
  backgroundDefault?: string;
}

/** Shared 4-card "core features" block (same copy on every series). */
export interface CoreFeatureCard {
  icon: SeriesIconKey;
  title: string;
  description: string;
}

/** Series-specific "core advantages" cards (4-5 per series). */
export interface SeriesAdvantage {
  icon: SeriesIconKey;
  /** Optional 1024×1024 product render tile; if set, replaces the icon. */
  iconImage?: string;
  title: string;
  description: string;
}

export interface TechSpecsTable {
  models: { id: string; label: string; thumb?: string }[];
  rows: { label: string; values: string[] }[];
}

export interface ApplicationCase {
  title: string;
  caption?: string;
  imageSlot: string;
  defaultSrc: string;
}

export interface FOVCalculatorConfig {
  defaultModel: string;
  modelOptions: string[];
  parameters: { label: string; placeholder?: string; unit?: string }[];
}

export interface CaseGalleryItem {
  title: string;
  description?: string;
  imageSlot: string;
  defaultSrc: string;
}

export interface SeriesCTA {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundDefault?: string;
}

export interface SeriesData {
  slug: SeriesSlug;
  metaTitle: string;
  metaDescription: string;
  hero: SeriesHero;
  coreFeatures?: CoreFeatureCard[];
  coreAdvantages?: SeriesAdvantage[];
  /** Optional bg behind the Core Advantages section. */
  coreAdvantagesBackground?: string;
  techSpecs?: TechSpecsTable;
  applicationCases?: ApplicationCase[];
  fovCalculator?: FOVCalculatorConfig;
  caseGallery?: CaseGalleryItem[];
  cta?: SeriesCTA;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TOP_LABEL = "DEPTHSIGHT · 高性能 3D 視覺感測器產品線";
const CONTACT_HREF = "/about/contact";
const DOWNLOADS_HREF = "/support/downloads";

/**
 * Shared 4-card Core Features set — appears verbatim on Line / Advanced /
 * EI in Figma. Defined once and reused.
 */
const sharedCoreFeatures: CoreFeatureCard[] = [
  {
    icon: "CheckCircle2",
    title: "無懼強光 又快又準",
    description:
      "光皆不影響成像。即使在強干擾環境下，依然能保持高精度與高幀率，輕鬆應對無序抓取、拆垛及碼垛等複雜的機械人引導任務。",
  },
  {
    icon: "Layers",
    title: "複雜材質 一網打盡",
    description:
      "無論是反光件、深色件還是結構複雜的工件，皆能呈現細節豐富、邊界清晰的 3D 點雲。傳統視覺技術無法處理的材質難題，交給它即可迎刃而解。",
  },
  {
    icon: "Wrench",
    title: "全場景覆蓋 毋須妥協",
    description:
      "從遠距離大視野到近距離高精度，從高速採集到緊湊安裝，全系列產品均可覆蓋，毋須為了單一場景而犧牲其他效能。",
  },
  {
    icon: "Package",
    title: "即裝即用 改造無憂",
    description:
      "機身小巧緊湊，安裝方式靈活，能適配主流的機械人和工業設備，大幅節省現場改造與調試的成本和時間。",
  },
];

const sharedCTA: SeriesCTA = {
  title: "開啟工業具身智能 新紀元",
  subtitle:
    "我們的專家團隊已準備好為您量身定制工業智能解決方案。聯繫我們，獲取全方位的技術諮詢與報價建議。",
  primaryCta: { label: "獲取報價/諮詢", href: CONTACT_HREF },
  secondaryCta: { label: "預約線下演示", href: CONTACT_HREF },
};

/* ------------------------------------------------------------------ */
/*  Line 系列                                                           */
/* ------------------------------------------------------------------ */

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
    productImageDefault: "/images/series/line/hero-product.png",
    backgroundDefault: "/images/series/line/hero-bg.png",
  },
  // coreFeatures intentionally omitted — Line 系列 在 Figma 中不展示「核心特性」
  // 4-card 共享段，直接进入「核心優勢」+ 技術參數 + 典型測量場景。
  coreAdvantages: [
    {
      icon: "Zap",
      iconImage: "/images/series/line/advantage-1.png",
      title: "超高速高精度測量",
      description:
        "支援最高 2 kHz 全畫幅超高速檢測，Z 軸線性精度可達 0.4 μm，能滿足大規模工業量產線的在線檢測節拍要求。",
    },
    {
      icon: "ScanEye",
      iconImage: "/images/series/line/advantage-3.png",
      title: "超高解像度成像",
      description:
        "X 軸向支援 3200 像素高解像度輪廓採集，可生成清晰、完整的 3D 點雲模型，精準還原被測目標的細節特徵。",
    },
    {
      icon: "Sparkles",
      iconImage: "/images/series/line/advantage-4.png",
      title: "內置高精度藍色激光",
      description:
        "搭載 405 nm 波段藍色激光，毋須外部光源即可自動優化亮度，適配金屬、深色、高反光等複雜材質，有效解決成像干擾問題。",
    },
    {
      icon: "Plug",
      iconImage: "/images/series/line/advantage-2.png",
      title: "豐富接口與兼容性",
      description:
        "配備完整的 I/O 與串口通訊接口，可靈活對接 PLC、工控機等各類工業自動化設備，適配多種開發環境。",
    },
  ],
  coreAdvantagesBackground: "/images/series/line/advantages-bg.png",
  techSpecs: {
    models: [
      { id: "L10050", label: "L10050" },
      { id: "L10140", label: "L10140" },
      { id: "L10400", label: "L10400" },
      { id: "L11600", label: "L11600" },
    ],
    rows: [
      { label: "輪廓點數", values: ["3200", "3200", "3200", "3200"] },
      { label: "掃描速率", values: ["2k~10kHz", "2k~10kHz", "2k~10kHz", "2k~10kHz"] },
      { label: "基準距離 (mm)", values: ["50", "140", "400", "1500"] },
      { label: "測量範圍 Z 軸 (mm)", values: ["8.1", "43", "333", "1045"] },
      { label: "測量範圍 X 軸 — 基準距離 (mm)", values: ["16.3", "94", "219", "1216"] },
      { label: "測量範圍 X 軸 — 近側 (mm)", values: ["15.7", "84", "163", "860"] },
      { label: "測量範圍 X 軸 — 遠側 (mm)", values: ["17.1", "112", "320", "1600"] },
      { label: "X 軸解析度", values: ["5 μm", "35 μm", "100 μm", "500 μm"] },
      { label: "Z 軸重複精度", values: ["0.4 μm", "1 μm", "5 μm", "100 μm"] },
      { label: "Z 軸線性度", values: ["0.02% F.S", "0.02% F.S", "0.02% F.S", "0.02% F.S"] },
      { label: "重量", values: ["1.57 kg", "1.57 kg", "1.60 kg", "2.46 kg"] },
      { label: "尺寸 (mm)", values: ["220×127×60", "200×120.5×60", "230×115×60", "445×115.5×60"] },
      { label: "光源波長", values: ["450 nm（可定制）", "450 nm（可定制）", "450 nm（可定制）", "450 nm（可定制）"] },
      { label: "數據介面", values: ["千兆以太網", "千兆以太網", "千兆以太網", "千兆以太網"] },
      { label: "外殼防護等級", values: ["IP67", "IP67", "IP67", "IP67"] },
    ],
  },
  applicationCases: [
    {
      title: "PCB 板點雲（缺陷檢測）",
      caption: "",
      imageSlot: "series-line-case-pcb",
      defaultSrc: "",
    },
  ],
  fovCalculator: {
    defaultModel: "L10400",
    modelOptions: ["L10050", "L10140", "L10400", "L11600"],
    parameters: [
      { label: "產品型號" },
      { label: "距離", unit: "mm" },
      { label: "工作距離", unit: "mm" },
    ],
  },
  caseGallery: [
    {
      title: "新能源汽車 — 鋰電池蓋板測量",
      imageSlot: "series-line-gallery-battery-cap",
      defaultSrc: "",
    },
    {
      title: "新能源汽車 — 電池盒下箱體檢測",
      imageSlot: "series-line-gallery-battery-housing",
      defaultSrc: "",
    },
    {
      title: "新能源汽車 — 顯示屏背板測量",
      imageSlot: "series-line-gallery-display",
      defaultSrc: "",
    },
  ],
  cta: sharedCTA,
};

/* ------------------------------------------------------------------ */
/*  Advanced 系列                                                       */
/* ------------------------------------------------------------------ */

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
    productImageDefault: "/images/series/advanced/hero-product.png",
    backgroundDefault: "/images/series/advanced/hero-bg.png",
  },
  coreFeatures: sharedCoreFeatures,
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
  coreAdvantagesBackground: "/images/series/advanced/section-bg.png",
  techSpecs: {
    models: [
      { id: "A10400", label: "A10400" },
      { id: "A10700", label: "A10700" },
      { id: "A11100", label: "A11100" },
      { id: "A11600", label: "A11600" },
      { id: "A12500", label: "A12500" },
    ],
    rows: [
      { label: "推薦工作距離 (mm)", values: ["250~650", "500~1000", "······", "1000~2000", "2000~3000"] },
      { label: "解析度 (MP)", values: ["2448×2048 5MP 雙目", "2448×2048 5MP 雙目", "······", "2448×2048 5MP 雙目", "2448×2048 5MP 雙目"] },
      { label: "近視野 FOV (mm)", values: ["210×160 @0.25 m", "420×310 @0.5 m", "······", "930×610 @1 m", "1800×1200 @2 m"] },
      { label: "遠視野 FOV (mm)", values: ["500×420 @0.65 m", "760×610 @1 m", "······", "1770×1220 @2 m", "2600×1800 @3 m"] },
      { label: "是否配 RGB 相機", values: ["否", "否", "······", "否", "否"] },
      { label: "典型採集時間 (s)", values: ["1.0", "1.0", "······", "1.0", "1.0"] },
      { label: "Z 向單點重複精度", values: ["0.03 mm @0.4 m", "0.04 mm @0.7 m", "······", "0.1 mm @1.6 m", "1.4 mm @2.5 m"] },
      { label: "尺寸 (mm)", values: ["250×130×58", "340×128×58", "······", "514×114×58", "514×114×58"] },
      { label: "重量", values: ["1.7 kg", "2.30 kg", "······", "2.66 kg", "2.66 kg"] },
      { label: "光源", values: ["藍光 LED / 白光 LED", "藍光 LED / 白光 LED", "······", "藍光 LED / 白光 LED", "藍光 LED / 白光 LED"] },
      { label: "數據介面", values: ["千兆以太網", "千兆以太網", "······", "千兆以太網", "千兆以太網"] },
      { label: "外殼防護等級", values: ["IP67", "IP67", "······", "IP67", "IP67"] },
    ],
  },
  applicationCases: [
    {
      title: "新能源汽車 — 鋰電池蓋板測量",
      imageSlot: "series-advanced-case-battery-cap",
      defaultSrc: "",
    },
    {
      title: "新能源汽車 — 電池盒下箱體檢測",
      imageSlot: "series-advanced-case-battery-housing",
      defaultSrc: "",
    },
    {
      title: "新能源汽車 — 顯示屏背板測量",
      imageSlot: "series-advanced-case-display",
      defaultSrc: "",
    },
  ],
  fovCalculator: {
    defaultModel: "A10400",
    modelOptions: ["A10400", "A10700", "A11100", "A11600", "A12500"],
    parameters: [
      { label: "產品型號" },
      { label: "距離", unit: "mm" },
      { label: "工作距離", unit: "mm" },
    ],
  },
  caseGallery: [
    {
      title: "新能源汽車 — 鋰電池蓋板測量",
      imageSlot: "series-advanced-gallery-battery-cap",
      defaultSrc: "",
    },
    {
      title: "新能源汽車 — 電池盒下箱體檢測",
      imageSlot: "series-advanced-gallery-battery-housing",
      defaultSrc: "",
    },
    {
      title: "新能源汽車 — 顯示屏背板測量",
      imageSlot: "series-advanced-gallery-display",
      defaultSrc: "",
    },
  ],
  cta: { ...sharedCTA, backgroundDefault: "/images/series/advanced/cta-bg.png" },
};

/* ------------------------------------------------------------------ */
/*  Embodied Intelligence 系列                                          */
/* ------------------------------------------------------------------ */

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
    productImageDefault: "/images/series/ei/hero-product.png",
    backgroundDefault: "/images/series/ei/hero-bg.png",
  },
  coreFeatures: sharedCoreFeatures,
  coreAdvantages: [
    {
      icon: "Crosshair",
      iconImage: "/images/series/ei/advantage-1.png",
      title: "極致高精",
      description: "感知數據精準無誤，支撐機械人完成毫米級精度的抓取與裝配。",
    },
    {
      icon: "Activity",
      iconImage: "/images/series/ei/advantage-2.png",
      title: "極速實時",
      description: "毫秒級響應捕捉，實時輸出深度與語義信息，跟得上機械人決策節拍。",
    },
    {
      icon: "ShieldCheck",
      iconImage: "/images/series/ei/advantage-3.png",
      title: "持久穩定",
      description: "支援長期無故障運行，硬件級冗餘設計保障工業現場穩定性。",
    },
    {
      icon: "Box",
      iconImage: "/images/series/ei/advantage-4.png",
      title: "緊湊易用",
      description: "結構小巧，輕鬆整合至各類智能體，即裝即用無需大幅改造。",
    },
    {
      icon: "LayoutGrid",
      iconImage: "/images/series/ei/advantage-5.png",
      title: "全場景適應",
      description:
        "無懼透明、強反光及複雜光照環境，穩定輸出可靠的點雲與識別結果。",
    },
  ],
  coreAdvantagesBackground: "/images/series/ei/advantages-bg.png",
  // techSpecs / applicationCases / fovCalculator / caseGallery / cta intentionally
  // omitted — Figma 没有这些子 section，组件读到 undefined 后自动不渲染。
};

/* ------------------------------------------------------------------ */

export const seriesList: SeriesData[] = [lineSeries, advancedSeries, eiSeries];

export const seriesSlugs: SeriesSlug[] = seriesList.map((s) => s.slug);

export function getSeries(slug: string): SeriesData | undefined {
  return seriesList.find((s) => s.slug === slug);
}
