/**
 * Application Cases / 行業中心 — 2 张主题索引 + 3 张案例详情。
 *
 * 由 Figma 设计稿提取（fileKey ZYyUze1aay4WXY1j7Fiz75）：
 *   - Group 24  → 高精度3D檢測與測量（INDEX）
 *   - Group 19  → 鋰電池蓋板測量（DETAIL）
 *   - Frame 47  → 柔性機器人視覺引導（INDEX）
 *   - Group 26  → 打磨機器人視覺引導及軌跡規劃（DETAIL）
 *   - Group 22  → 機器人抓取上下料（DETAIL）
 *
 * 数据结构与 `src/data/series.ts` 对齐：数据数组驱动 + slug 唯一 + 帮助函数。
 */

export type ApplicationTopicSlug =
  | "precision-3d-detection"
  | "flexible-robot-vision";

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
  /** Topic Index 卡片 + Detail Hero 标题。 */
  title: string;
  /** Detail Hero 右侧产品型号（如 "DS-L10140"）。可空。 */
  productLabel?: string;
  /** Detail Hero 右侧产品照片（PNG 路径，可空 → 不渲染产品图）。 */
  productImage?: string;
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
}

/** 一张主题索引 — Figma Group 24 / Frame 47。 */
export interface AppTopic {
  slug: ApplicationTopicSlug;
  title: string;
  /** 大标题上方小标，Figma 中所有索引均为 "APPLICATION CASES"。 */
  eyebrow: string;
  /** 顶部 hero 背景图。 */
  heroBackground: string;
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
 * Figma Group 24 占位时 5 张卡片都是"新能源汽車，電池盒下箱體檢測"；
 * 这里依旧排 5 张：第一张是真实案例 li-battery-cover-measurement（链
 * 接 Group 19 详情），其余 4 张沿用 Figma 占位文案，按钮先指向首个真实案例。
 */
const PRECISION_3D_DETECTION: AppTopic = {
  slug: "precision-3d-detection",
  title: "高精度3D檢測與測量",
  eyebrow: "APPLICATION CASES",
  heroBackground: "/applications/precision-3d-detection/hero.png",
  metaTitle: "高精度3D檢測與測量 — AIeveR Robotics 行業中心",
  metaDescription:
    "線鐳射與結構光相機在新能源、3C、汽車等高精度檢測場景中的應用案例。",
  cases: [
    {
      slug: "li-battery-cover-measurement",
      title: "新能源汽車，鋰電池蓋板測量",
      productLabel: "DS-L10140",
      productImage:
        "/applications/precision-3d-detection/li-battery-cover-measurement/product.png",
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
    },
    /* —— 下面 4 张沿用 Figma 占位（標題/描述/圖一致），尚未对应独立详情页 —— */
    {
      slug: "battery-box-lower-shell",
      title: "新能源汽車，電池盒下箱體檢測",
      productLabel: "DS-L10400",
      cardImage: "/applications/precision-3d-detection/case-battery-box.png",
      cardDescription:
        "3D線鐳射 DS-L10400 提供高精度箱體 3D 點雲，視覺軟體提供精準 3D 測量與 AI 檢測。三台線鐳射環狀分佈，同步拍攝，高精度融合拼接，快速掃描箱體四壁。輸出孔、螺母螺栓位置度、箱體皮安裝面平面度、焊點焊道質量。",
      sections: [],
    },
    {
      slug: "battery-box-lower-shell-2",
      title: "新能源汽車，電池盒下箱體檢測",
      productLabel: "DS-L10400",
      cardImage: "/applications/precision-3d-detection/case-battery-box.png",
      cardDescription:
        "3D線鐳射 DS-L10400 提供高精度箱體 3D 點雲，視覺軟體提供精準 3D 測量與 AI 檢測。三台線鐳射環狀分佈，同步拍攝，高精度融合拼接，快速掃描箱體四壁。輸出孔、螺母螺栓位置度、箱體皮安裝面平面度、焊點焊道質量。",
      sections: [],
    },
    {
      slug: "battery-box-lower-shell-3",
      title: "新能源汽車，電池盒下箱體檢測",
      productLabel: "DS-L10400",
      cardImage: "/applications/precision-3d-detection/case-battery-box.png",
      cardDescription:
        "3D線鐳射 DS-L10400 提供高精度箱體 3D 點雲，視覺軟體提供精準 3D 測量與 AI 檢測。三台線鐳射環狀分佈，同步拍攝，高精度融合拼接，快速掃描箱體四壁。輸出孔、螺母螺栓位置度、箱體皮安裝面平面度、焊點焊道質量。",
      sections: [],
    },
    {
      slug: "battery-box-lower-shell-4",
      title: "新能源汽車，電池盒下箱體檢測",
      productLabel: "DS-L10400",
      cardImage: "/applications/precision-3d-detection/case-battery-box.png",
      cardDescription:
        "3D線鐳射 DS-L10400 提供高精度箱體 3D 點雲，視覺軟體提供精準 3D 測量與 AI 檢測。三台線鐳射環狀分佈，同步拍攝，高精度融合拼接，快速掃描箱體四壁。輸出孔、螺母螺栓位置度、箱體皮安裝面平面度、焊點焊道質量。",
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
  heroBackground: "/applications/flexible-robot-vision/hero.png",
  metaTitle: "柔性機器人視覺引導 — AIeveR Robotics 行業中心",
  metaDescription:
    "AIRVision 結合 3D 結構光與線激光相機，為打磨、裁剪、塗膠、抓取等柔性機器人場景提供視覺與軌跡規劃方案。",
  cases: [
    {
      slug: "polishing-trajectory",
      title: "打磨機器人視覺引導及軌跡規劃",
      productLabel: "DS-L10140",
      productImage:
        "/applications/flexible-robot-vision/polishing-trajectory/product.png",
      cardImage: "/applications/flexible-robot-vision/case-polishing.png",
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
    },
    {
      slug: "robot-pick-and-place",
      title: "機器人抓取上下料",
      productLabel: "DS-A10700",
      productImage:
        "/applications/flexible-robot-vision/robot-pick-and-place/product.png",
      cardImage: "/applications/flexible-robot-vision/robot-pick-and-place/product.png",
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
      title: "視覺引導智能衣料裁剪",
      productLabel: "DS-L10400",
      cardImage: "/applications/flexible-robot-vision/case-fabric-cutting.png",
      cardDescription:
        "服裝為立體剪裁，傳統視覺難以做切割軌跡規劃；彈性布料容易變形，造成誤差。自研 L 系列 DS-L10400 相機配合移動平台掃描布料，AIRVision 定位裁剪線並生成軌跡，協作臂沿著生成的軌跡執行裁剪。",
      sections: [],
    },
    {
      slug: "battery-box-gluing",
      title: "新能源車電池盒智能塗膠引導",
      productLabel: "A10400",
      cardImage: "/applications/flexible-robot-vision/case-gluing.png",
      cardDescription:
        "協作臂掛載自研 3D 結構光相機 A10400 掃描電池盒底部，AIRVision 定位電池盒並分割底面，計算塗膠路徑及每個點位的塗膠速度。",
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
