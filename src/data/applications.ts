/**
 * Application Cases / 行業中心 — 2 张主题索引 + 3 张案例详情。
 *
 * 由 Figma 设计稿提取（fileKey ZYyUze1aay4WXY1j7Fiz75）：
 *   - Group 215 → 高精度3D檢測與測量（INDEX）
 *   - Group 19  → 鋰電池蓋板測量（DETAIL）
 *   - Frame 47  → 柔性機器人視覺引導（INDEX）
 *   - Group 26  → 打磨機器人視覺引導及軌跡規劃（DETAIL）
 *   - Group 22  → 機器人抓取上下料（DETAIL）
 *
 * 数据结构与 `src/data/series.ts` 对齐：数据数组驱动 + slug 唯一 + 帮助函数。
 */

export type ApplicationTopicSlug =
  | "precision-3d-detection"
  | "flexible-robot-vision"
  | "high-flexibility-active-3d-workstation";

export const applicationIndustryFilters = [
  "汽車製造",
  "新能源電池",
  "3C電子",
  "物流倉儲",
  "冶金/重工",
  "科研教育",
] as const;

export type ApplicationIndustry =
  (typeof applicationIndustryFilters)[number];

/** 一段 bullet 列表，详情页"難點 / 方案 / 性能"区块使用。 */
export interface CaseDetailSection {
  heading: string;
  /** 段落型条目（无项目符号）— 客戶痛點 段使用。 */
  paragraph?: string;
  /** 项目符号列表 — 難點 / 方案 段使用。 */
  bullets?: string[];
}

/** 一张详情页 — Figma Group 19/26/22。 */
export interface AppCaseDetail {
  slug: string;
  /** 行业分类标签，供后续筛选或内容归类使用。 */
  industries: ApplicationIndustry[];
  /** Topic Index 卡片 + Detail Hero 标题。 */
  title: string;
  /** Detail Hero 右侧产品型号（如 "DS-L10140"）。可空。 */
  productLabel?: string;
  /** Detail Hero 右侧产品照片（PNG 路径，可空 → 不渲染产品图）。 */
  productImage?: string;
  /** Detail Hero 专用背景，未设置时回退到 topic hero。 */
  detailHeroBackground?: string;
  /** 详情页正文首段布局；media-summary 用于 Figma Group 22 左图右文结构。 */
  detailLayout?: "default" | "media-summary";
  /** 详情页正文首段左侧图片。 */
  detailLeadImage?: string;
  /** 详情页正文首段右侧紫色标题。 */
  detailLeadTitle?: string;
  /** Topic Index 卡片缩略图（详情 hero 复用即可）。 */
  cardImage: string;
  /** Topic Index 卡片描述（与详情页"方案"段可重叠/不同）。 */
  cardDescription: string;
  /** 详情页正文段落，按 Figma 顺序渲染。 */
  sections: CaseDetailSection[];
  /** 详情页底部可选附加横幅（机器人抓取页有"不同顏色/透明度/反光度"演示图）。 */
  trailer?: {
    title: string;
    image: string;
  };
  /** Figma Group 19 等详情页图片展示区。 */
  gallery?: {
    title?: string;
    layout?: "grid" | "stack";
    images: {
      src: string;
      alt: string;
      caption: string;
      width?: number;
      height?: number;
    }[];
  };
}

/** 一张主题索引 — Figma Group 215 / Frame 47。 */
export interface AppTopic {
  slug: ApplicationTopicSlug;
  title: string;
  /** 大标题上方小标，Figma 中所有索引均为 "APPLICATION CASES"。 */
  eyebrow: string;
  /** 顶部 hero 背景图。 */
  heroBackground: string;
  /** 详情页默认 hero 背景，避免 full-image topic banner 被详情页复用。 */
  detailHeroBackground?: string;
  /** 临时整图首屏，用于 Figma 尚未拆分的完整 banner。 */
  heroVariant?: "default" | "full-image";
  /** Topic 页案例列表特殊布局。 */
  caseListVariant?: "default" | "frame-244-workstation";
  /** Topic Index 列出的卡片；其中 slug 命中详情数组即可点开。 */
  cases: AppCaseDetail[];
  metaTitle: string;
  metaDescription: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

/**
 * Topic 1 — 高精度3D檢測與測量
 *
 * Figma Group 215 对应高精度 3D 检测主题页；正文卡片使用 Frame 27
 * 同款列表样式。重复的"新能源汽車，電池盒下箱體檢測"占位只保留一张。
 */
const PRECISION_3D_DETECTION: AppTopic = {
  slug: "precision-3d-detection",
  title: "高精度3D檢測與測量",
  eyebrow: "APPLICATION CASES",
  heroBackground: "/applications/precision-3d-detection/hero-figma.png",
  heroVariant: "full-image",
  metaTitle: "高精度3D檢測與測量 — AIeveR Robotics 行業中心",
  metaDescription:
    "線鐳射與結構光相機在新能源、3C、汽車等高精度檢測場景中的應用案例。",
  cases: [
    {
      slug: "li-battery-cover-measurement",
      industries: ["新能源電池", "汽車製造"],
      title: "新能源汽車，鋰電池蓋板測量",
      productLabel: "DS-L10140",
      productImage:
        "/applications/precision-3d-detection/li-battery-cover-measurement/product.png",
      detailHeroBackground:
        "/applications/precision-3d-detection/li-battery-cover-measurement/hero.png",
      cardImage:
        "/applications/precision-3d-detection/li-battery-cover-measurement/product.png",
      cardDescription:
        "3D線激光DS-L10140配合高精度直線模組提供3D點雲，視覺軟件自動定位並測量電極片平整度、蓋板平整度以及極片平行度等參數。",
      sections: [
        {
          heading: "難點",
          bullets: ["金屬反光；精度／節拍要求高。"],
        },
        {
          heading: "方案",
          bullets: [
            "3D線激光 DS-L10140，配合高精度直線模組，提供高精度3D點雲；",
            "視覺軟件在3D點雲上自動定位，測量電極片平整度、蓋板平整度以及極片平行度等參數。",
          ],
        },
        {
          heading: "性能",
          bullets: [
            "最大闊度：112mm",
            "XY 解析度：0.035mm",
            "Z 軸重複精度要求：0.01mm",
            "Z 軸數據一致性要求：0.02mm",
            "檢測時間：2 秒/件",
          ],
        },
      ],
      gallery: {
        title: "檢測圖像展示",
        images: [
          {
            src: "/applications/uploaded/precision-3d-detection/image-02.png",
            alt: "鋰電池蓋板實拍圖",
            caption: "鋰電池蓋板實拍圖",
          },
          {
            src: "/applications/uploaded/precision-3d-detection/image-03.png",
            alt: "鋰電池蓋板 3D 點雲",
            caption: "鋰電池蓋板 3D 點雲",
          },
          {
            src: "/applications/uploaded/precision-3d-detection/image-04.png",
            alt: "蓋板平整度點雲",
            caption: "蓋板平整度點雲",
          },
          {
            src: "/applications/uploaded/precision-3d-detection/image-05.png",
            alt: "平面度檢測熱圖",
            caption: "平面度檢測熱圖",
          },
        ],
      },
    },
    /* —— Figma 占位卡片，尚未对应独立详情页 —— */
    {
      slug: "battery-box-lower-shell",
      industries: ["新能源電池", "汽車製造"],
      title: "新能源汽車，電池盒下箱體檢測",
      productLabel: "DS-L10400",
      cardImage:
        "/applications/uploaded/precision-3d-detection/image-01.png",
      cardDescription:
        "3D線鐳射 DS-L10400 提供高精度箱體 3D 點雲，視覺軟體提供精準 3D 測量與 AI 檢測。三台線鐳射環狀分佈，同步拍攝，高精度融合拼接，快速掃描箱體四壁。輸出孔、螺母螺栓位置度、箱體皮安裝面平面度、焊點焊道質量。",
      sections: [],
    },
    {
      slug: "display-backplane-measurement",
      industries: ["3C電子"],
      title: "新能源汽車，顯示屏背板測量",
      productLabel: "DS-L10400",
      cardImage:
        "/applications/uploaded/precision-3d-detection/image-17.png",
      cardDescription:
        "3D線激光配合高精度直線模組提供高精度 3D 點雲，視覺軟件根據客戶需求自動定位並測量對應平面的平整度，適配尺寸範圍內的多種產品。",
      sections: [],
    },
    {
      slug: "mini-led-defect-inspection",
      industries: ["3C電子"],
      title: "3C 行業，Mini-LED 缺陷檢測",
      productLabel: "DS-L10140",
      cardImage:
        "/applications/uploaded/precision-3d-detection/image-23.png",
      cardDescription:
        "面對黑色物體、交叉反射和高精度要求，採用多相機分時頻閃點雲拼接方案，結合自研 3D 點雲處理與 AI 缺陷檢測算法，定位螺絲浮高、下沉、滑絲和打偏等缺陷。",
      sections: [],
    },
    {
      slug: "modular-precast-floor-inspection",
      industries: ["科研教育", "冶金/重工"],
      title: "模塊化建築預製板檢測：樓板視覺質檢",
      productLabel: "DS-L11600",
      cardImage:
        "/applications/uploaded/precision-3d-detection/image-13.png",
      cardDescription:
        "3D 線激光相機提供高精度 3D 點雲，雙相機融合拼接提升視野並保持精度與節拍，在 9 米 × 4 米超大視野內輸出 MiC 構件高度與空間位置。",
      sections: [],
    },
    {
      slug: "pcb-defect-inspection",
      industries: ["3C電子"],
      title: "PCB 缺陷檢測",
      productLabel: "DS-L10140",
      cardImage:
        "/applications/uploaded/precision-3d-detection/image-36.png",
      cardDescription:
        "針對 PCB 板缺陷類型多、表面結構複雜和高精度要求，自研 3D 點雲處理與 AI 缺陷檢測算法，可檢測崩缺、元器件有無、標籤有無、金線斷裂、短路和 PIN 針彎曲等缺陷。",
      sections: [],
    },
    {
      slug: "lithium-battery-weld-defect-inspection",
      industries: ["新能源電池"],
      title: "鋰電池焊縫缺陷檢測",
      productLabel: "DS-L10140",
      cardImage:
        "/applications/uploaded/precision-3d-detection/image-40.png",
      cardDescription:
        "3D 線激光 DS-L10140 提供高精度 3D 點雲，視覺軟件在點雲上進行 AI 檢測並定位缺陷，輸出斷焊、炸點、劃痕、針孔等位置。",
      sections: [],
    },
  ],
};

/**
 * Topic 2 — 柔性機器人視覺引導
 *
 * Figma Frame 47 列了 3 张卡片；其中 polishing-trajectory 与
 * robot-pick-and-place 有详情页（Group 26 / 22），fabric-cutting 暂只
 * 在索引卡片中出现。
 */
const FLEXIBLE_ROBOT_VISION: AppTopic = {
  slug: "flexible-robot-vision",
  title: "柔性機器人視覺引導",
  eyebrow: "APPLICATION CASES",
  heroBackground: "/applications/flexible-robot-vision/frame-47-banner.png",
  detailHeroBackground: "/applications/flexible-robot-vision/hero.png",
  heroVariant: "full-image",
  metaTitle: "柔性機器人視覺引導 — AIeveR Robotics 行業中心",
  metaDescription:
    "AIRVision 結合 3D 結構光與線激光相機，為打磨、裁剪、塗膠、抓取等柔性機器人場景提供視覺與軌跡規劃方案。",
  cases: [
    {
      slug: "polishing-trajectory",
      industries: ["汽車製造", "冶金/重工"],
      title: "打磨機器人視覺引導及軌跡規劃",
      productLabel: "DS-L10140",
      productImage:
        "/applications/flexible-robot-vision/polishing-trajectory/product.png",
      detailHeroBackground:
        "/applications/flexible-robot-vision/polishing-trajectory/hero.png",
      cardImage:
        "/applications/uploaded/flexible-robot-vision/image-02.png",
      cardDescription:
        "3D結構光 DS-A10700 配合工業機械臂，AIRVision 進行工件定位、曲率計算與特徵提取，軌跡規劃軟件自動生成打磨路徑；AI 模型結合人工判斷生成打磨工藝，配合浮動力控實現精準打磨。",
      sections: [
        {
          heading: "客戶痛點",
          paragraph:
            "人工打磨極度依賴工人的經驗和水平，打磨效果的一致性難以保證；打磨工作環境嘈雜，長期暴露容易患上職業病；工作強度高，產能受限。因此需要採用打磨機械人，以提升效率、減少操作人員。另外，由於零件多變、工藝複雜，傳統打磨機械人均採用人工示教打磨路徑的方式，調試週期長、維護成本高。",
        },
        {
          heading: "難點",
          bullets: [
            "金屬件反光；",
            "視野大、精度高；",
            "工藝複雜多變：不同零件與加工及表面處理工藝、不同拋光需求，打磨工藝均有所差異。",
          ],
        },
        {
          heading: "方案",
          bullets: [
            "3D結構光 DS-A10700，配合工業機械臂，全方位提供高精度3D點雲；",
            "視覺軟件 AIRVision 進行工件定位、曲率計算、特徵提取，並根據不同幾何特徵進行分類；",
            "軌跡規劃軟件，自動生成打磨路徑；",
            "AI 模型工藝選擇，結合人工判斷，生成打磨工藝；",
            "結合浮動力控，實現精準打磨。",
          ],
        },
        {
          heading: "性能",
          bullets: ["成像與視覺定位精度：0.1mm", "提升打磨效率：70%"],
        },
      ],
      gallery: {
        layout: "stack",
        images: [
          {
            src: "/applications/flexible-robot-vision/polishing-trajectory/gallery-01-real.png",
            alt: "打磨工件實物圖",
            caption: "實物圖",
            width: 600,
            height: 205,
          },
          {
            src: "/applications/flexible-robot-vision/polishing-trajectory/gallery-02-pointcloud.png",
            alt: "打磨工件點雲示意圖",
            caption: "點雲示意圖",
            width: 600,
            height: 215,
          },
          {
            src: "/applications/flexible-robot-vision/polishing-trajectory/gallery-03-real.png",
            alt: "打磨工件第二張實物圖",
            caption: "實物圖",
            width: 600,
            height: 221,
          },
          {
            src: "/applications/flexible-robot-vision/polishing-trajectory/gallery-04-pointcloud.png",
            alt: "打磨工件第二張點雲示意圖",
            caption: "點雲示意圖",
            width: 600,
            height: 221,
          },
        ],
      },
    },
    {
      slug: "robot-pick-and-place",
      industries: ["物流倉儲"],
      title: "機器人抓取上下料",
      productLabel: "DS-A10700",
      productImage:
        "/applications/flexible-robot-vision/robot-pick-and-place/product.png",
      detailHeroBackground:
        "/applications/flexible-robot-vision/robot-pick-and-place/hero.png",
      detailLayout: "media-summary",
      detailLeadImage: "/applications/uploaded/flexible-robot-vision/image-01.png",
      detailLeadTitle: "3D視覺引導機器人自動抓取",
      cardImage: "/applications/uploaded/flexible-robot-vision/image-01.png",
      cardDescription:
        "3D視覺引導機器人自動抓取。A 系列相機 DS-A10700-P 專門針對透明等特殊材質進行優化，視野範圍 840mm × 640mm，拍攝時間 0.8 秒。",
      sections: [
        {
          heading: "難點",
          bullets: ["不同顏色物體成像", "透明物體成像"],
        },
        {
          heading: "方案",
          bullets: [
            "A 系列相機 DS-A10700-P，專門針對透明等特殊材質進行優化。",
          ],
        },
        {
          heading: "性能",
          bullets: [
            "視野範圍：840mm × 640mm",
            "XY 解析度：0.22 – 0.43mm",
            "拍攝時間：0.8 秒",
          ],
        },
      ],
      trailer: {
        title: "不同顏色 / 透明度 / 反光度產品定位引導抓取影片",
        image:
          "/applications/flexible-robot-vision/robot-pick-and-place/diversity-grid.png",
      },
    },
    {
      slug: "fabric-cutting",
      industries: [],
      title: "視覺引導智能衣料裁剪",
      productLabel: "DS-L10400",
      cardImage: "/applications/uploaded/flexible-robot-vision/image-08.png",
      cardDescription:
        "服裝為立體剪裁，傳統視覺難以做切割軌跡規劃；彈性布料容易變形，造成誤差。自研 L 系列 DS-L10400 相機配合移動平台掃描布料，AIRVision 定位裁剪線並生成軌跡，協作臂沿著生成的軌跡執行裁剪。",
      sections: [],
    },
    {
      slug: "battery-box-gluing",
      industries: ["新能源電池", "汽車製造"],
      title: "新能源車電池盒智能塗膠引導",
      productLabel: "A10400",
      cardImage: "/applications/uploaded/flexible-robot-vision/image-16.png",
      cardDescription:
        "協作臂掛載自研 3D 結構光相機 A10400 掃描電池盒底部，AIRVision 定位電池盒並分割底面，計算塗膠路徑及每個點位的塗膠速度。",
      sections: [],
    },
    {
      slug: "supermarket-auto-sorting",
      industries: ["物流倉儲"],
      title: "無人超市自動分揀",
      productLabel: "DS-A10700",
      cardImage: "/applications/uploaded/flexible-robot-vision/image-05.png",
      cardDescription:
        "3D 視覺可在透明、黑色等複雜材質場景中完成重建，配合機器人抓取策略實現無人零售場景下的自動分揀。",
      sections: [],
    },
    {
      slug: "gear-machine-loading",
      industries: ["汽車製造"],
      title: "插齒機上下料",
      productLabel: "DS-A10700",
      cardImage: "/applications/uploaded/flexible-robot-vision/image-10.png",
      cardDescription:
        "工件為異型件且金屬反光較強，對成像和上下料精度有較高要求；採用眼在手上的 3D 視覺方案，提供高質量點雲和更高換型靈活性。",
      sections: [],
    },
    {
      slug: "automotive-sheet-metal-loading",
      industries: ["汽車製造"],
      title: "汽車鈑金上料",
      productLabel: "DS-A10700",
      cardImage: "/applications/uploaded/flexible-robot-vision/image-11.png",
      cardDescription:
        "針對鈑金件反光、表面不規則和來料位置偏移，採用手上安裝方式與大視野定位，糾正來料偏差並將相機拍照與點雲處理控制在 2 秒內。",
      sections: [],
    },
    {
      slug: "parcel-depalletizing",
      industries: ["物流倉儲"],
      title: "包裹拆碼垛",
      productLabel: "DS-L12500",
      cardImage: "/applications/uploaded/flexible-robot-vision/image-12.png",
      cardDescription:
        "面向不同尺寸箱子混碼擺放、箱體無規律堆疊等物流場景，結合多維視覺引導與抓取策略，提升包裹拆碼垛和上料效率。",
      sections: [],
    },
  ],
};

/**
 * Topic 3 — 高柔性主動式3D工作站
 *
 * Figma Group 293 是首屏整图；Frame 244 是 P2 三条左图右文案例卡。
 * 当前只有页面内列表，没有独立详情页，因此 sections 为空，避免生成空详情路由。
 */
const HIGH_FLEXIBILITY_ACTIVE_3D_WORKSTATION: AppTopic = {
  slug: "high-flexibility-active-3d-workstation",
  title: "高柔性主動式3D工作站",
  eyebrow: "APPLICATION CASES",
  heroBackground:
    "/applications/high-flexibility-active-3d-workstation/group-293-hero.png",
  heroVariant: "full-image",
  caseListVariant: "frame-244-workstation",
  metaTitle: "高柔性主動式3D工作站 — AIeveR Robotics 行業中心",
  metaDescription:
    "面向螺母自動凸焊站的 3D 引導與 2D 檢測工作站方案，融合主動感知、柔性協作與高精定位。",
  cases: [
    {
      slug: "polishing-trajectory-planning",
      industries: ["汽車製造"],
      title: "打磨機械人視覺引導及軌跡規劃",
      productLabel: "DS-A10700",
      cardImage:
        "/applications/high-flexibility-active-3d-workstation/frame-244-small-01.jpg",
      cardDescription:
        "3D結構光DS-A10700，配合工業機械臂，全方位提供高精度3D點雲；視覺軟件AIRVision進行工件定位、曲率計算、特徵提取，根據不同幾何特徵進行分類；軌跡規劃軟件，自動生成打磨路徑；AI模型工藝選擇、結合人工判斷，生成打磨工藝；結合浮動力控，精準打磨。",
      sections: [],
    },
    {
      slug: "fabric-cutting",
      industries: ["科研教育"],
      title: "視覺引導智能衣料裁剪",
      productLabel: "DS-L10400",
      cardImage:
        "/applications/high-flexibility-active-3d-workstation/frame-244-small-02.jpg",
      cardDescription:
        "服裝為立體剪裁，傳統視覺難以做切割軌跡規劃；彈性布料容易變形，造成誤差；兼容不同產品換型切換功能。自研L系列DS-L10400相機配合移動平台掃描布料。AIRVision定位裁剪線，生成軌跡。專用工件標定軟件，進行刀具標定。協作臂沿著生成的軌跡，執行裁剪。",
      sections: [],
    },
    {
      slug: "battery-box-gluing",
      industries: ["新能源電池", "汽車製造"],
      title: "新能源車電池盒智能塗膠引導",
      productLabel: "A10400",
      cardImage:
        "/applications/high-flexibility-active-3d-workstation/frame-244-main.png",
      cardDescription:
        "協作臂掛載自研3D結構光相機A10400掃描電池盒底部。AIRVision定位電池盒，並分割底面。計算塗膠路徑、及每個點位處的塗膠速度。",
      sections: [],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Exports & helpers                                                    */
/* ------------------------------------------------------------------ */

export const applicationTopics: AppTopic[] = [
  PRECISION_3D_DETECTION,
  FLEXIBLE_ROBOT_VISION,
  HIGH_FLEXIBILITY_ACTIVE_3D_WORKSTATION,
];

export const topicSlugs = applicationTopics.map((t) => t.slug);

export function getTopic(slug: string): AppTopic | undefined {
  return applicationTopics.find((t) => t.slug === slug);
}

export interface TopicAndCase {
  topic: AppTopic;
  case: AppCaseDetail;
}

export function getCase(
  topicSlug: string,
  caseSlug: string,
): TopicAndCase | undefined {
  const topic = getTopic(topicSlug);
  if (!topic) return undefined;
  const found = topic.cases.find((c) => c.slug === caseSlug);
  return found ? { topic, case: found } : undefined;
}

/** Only the cases that have real detail content (non-empty sections). */
export function caseHasDetail(c: AppCaseDetail): boolean {
  return c.sections.length > 0;
}

/** All `[topicSlug, caseSlug]` pairs for `generateStaticParams`. */
export function allCaseParams(): { topic: string; case: string }[] {
  return applicationTopics.flatMap((t) =>
    t.cases
      .filter(caseHasDetail)
      .map((c) => ({ topic: t.slug, case: c.slug })),
  );
}
