/**
 * Central catalog of every manageable image slot on the site.
 * The admin panel reads this to render editable image cards.
 * The public site uses `getImageSrc()` from `@/lib/images` to resolve paths.
 */

export interface ImageSlot {
  /** Unique identifier (used as filename prefix on upload). */
  id: string;
  /** Human-readable label shown in admin. */
  label: string;
  /** Default path under /public (may not exist yet). */
  defaultSrc: string;
  /** Recommended aspect ratio hint for the admin preview. */
  aspect: string;
}

export interface ImageSection {
  /** Section title in admin panel. */
  title: string;
  slots: ImageSlot[];
}

export const siteImageSections: ImageSection[] = [
  {
    title: "Line 系列 · DepthSight",
    slots: [
      { id: "series-line-hero", label: "Hero 產品大圖", defaultSrc: "/images/series/line/hero-product.png", aspect: "5/4" },
      { id: "series-line-spec-l10050", label: "技術參數 · L10050 型號圖", defaultSrc: "/images/series/line/specs/l10050.png", aspect: "1/1" },
      { id: "series-line-spec-l10140", label: "技術參數 · L10140 型號圖", defaultSrc: "/images/series/line/specs/l10140.png", aspect: "1/1" },
      { id: "series-line-spec-l10400", label: "技術參數 · L10400 型號圖", defaultSrc: "/images/series/line/specs/l10400.png", aspect: "1/1" },
      { id: "series-line-spec-l11600", label: "技術參數 · L11600 型號圖", defaultSrc: "/images/series/line/specs/l11600.png", aspect: "1/1" },
      { id: "series-line-scenario-pcb", label: "PCB 板 · 測量場景照片", defaultSrc: "", aspect: "4/3" },
      { id: "series-line-pointcloud-pcb", label: "PCB 板 · 點雲示例", defaultSrc: "", aspect: "4/3" },
      { id: "series-line-gallery-battery-cap", label: "案例集 · 鋰電池蓋板", defaultSrc: "", aspect: "4/3" },
      { id: "series-line-gallery-battery-housing", label: "案例集 · 電池盒下箱體", defaultSrc: "", aspect: "4/3" },
      { id: "series-line-gallery-display", label: "案例集 · 顯示屏背板", defaultSrc: "", aspect: "4/3" },
    ],
  },
  {
    title: "Advanced 系列 · DepthSight",
    slots: [
      { id: "series-advanced-hero", label: "Hero 產品大圖", defaultSrc: "/images/series/advanced/hero-product.png", aspect: "5/4" },
      { id: "series-advanced-spec-a10400", label: "技術參數 · A10400 型號圖", defaultSrc: "/images/series/advanced/specs/a10400.png", aspect: "1/1" },
      { id: "series-advanced-spec-a10700", label: "技術參數 · A10700 型號圖（與 A11100 共用素材）", defaultSrc: "/images/series/advanced/specs/a10700.png", aspect: "1/1" },
      { id: "series-advanced-spec-a11100", label: "技術參數 · A11100 型號圖（與 A10700 共用素材）", defaultSrc: "/images/series/advanced/specs/a11100.png", aspect: "1/1" },
      { id: "series-advanced-spec-a11600", label: "技術參數 · A11600 型號圖（與 A12500 共用素材）", defaultSrc: "/images/series/advanced/specs/a11600.png", aspect: "1/1" },
      { id: "series-advanced-spec-a12500", label: "技術參數 · A12500 型號圖（與 A11600 共用素材）", defaultSrc: "/images/series/advanced/specs/a12500.png", aspect: "1/1" },
      { id: "series-advanced-scenario-pcb", label: "PCB 板 · 測量場景照片", defaultSrc: "", aspect: "4/3" },
      { id: "series-advanced-pointcloud-pcb", label: "PCB 板 · 點雲示例", defaultSrc: "", aspect: "4/3" },
      { id: "series-advanced-gallery-battery-cap", label: "案例集 · 鋰電池蓋板", defaultSrc: "", aspect: "4/3" },
      { id: "series-advanced-gallery-battery-housing", label: "案例集 · 電池盒下箱體", defaultSrc: "", aspect: "4/3" },
      { id: "series-advanced-gallery-display", label: "案例集 · 顯示屏背板", defaultSrc: "", aspect: "4/3" },
    ],
  },
  {
    title: "Standard 系列 · DepthSight",
    slots: [
      { id: "series-standard-hero", label: "Hero 產品大圖", defaultSrc: "/images/series/standard/hero-product.png", aspect: "5/4" },
      { id: "series-standard-spec-nano-plus", label: "技術參數 · Nano Plus 型號圖（待獨立素材）", defaultSrc: "/images/series/standard/specs/nano-plus.png", aspect: "1/1" },
      { id: "series-standard-spec-dp", label: "技術參數 · DP 型號圖", defaultSrc: "/images/series/standard/specs/dp.png", aspect: "1/1" },
      { id: "series-standard-spec-s", label: "技術參數 · S 型號圖", defaultSrc: "/images/series/standard/specs/s.png", aspect: "1/1" },
      { id: "series-standard-spec-m", label: "技術參數 · M 型號圖（待獨立素材）", defaultSrc: "/images/series/standard/specs/m.png", aspect: "1/1" },
      { id: "series-standard-spec-l", label: "技術參數 · L 型號圖（待獨立素材）", defaultSrc: "/images/series/standard/specs/l.png", aspect: "1/1" },
      { id: "series-standard-scenario-pcb", label: "PCB 板 · 測量場景照片", defaultSrc: "/images/series/standard/measurement-scene-pcb.png", aspect: "4/3" },
      { id: "series-standard-pointcloud-pcb", label: "PCB 板 · 點雲示例", defaultSrc: "/images/series/standard/pointcloud-pcb.png", aspect: "4/3" },
      { id: "series-standard-gallery-battery-cap", label: "案例集 · 鋰電池蓋板", defaultSrc: "/images/series/standard/case-battery-cap.png", aspect: "4/3" },
      { id: "series-standard-gallery-battery-housing", label: "案例集 · 電池盒下箱體", defaultSrc: "/images/series/standard/case-battery-housing.png", aspect: "4/3" },
      { id: "series-standard-gallery-display", label: "案例集 · 顯示屏背板", defaultSrc: "/images/series/standard/case-display-backplane.png", aspect: "4/3" },
    ],
  },
  {
    title: "Embodied Intelligence 系列 · DepthSight",
    slots: [
      { id: "series-ei-hero", label: "Hero 產品大圖", defaultSrc: "/images/series/ei/group11-product.png", aspect: "16/9" },
    ],
  },
  {
    title: "首页 — Hero",
    slots: [
      {
        id: "hero-robot-arm",
        label: "Hero 工业机械臂背景",
        defaultSrc: "/images/home/group-243/industrial-robot-arm-b.png",
        aspect: "16/9",
      },
    ],
  },
  {
    title: "首页 — 具身智能三大能力",
    slots: [
      {
        id: "stitch-perception",
        label: "具身感知 展开详情图",
        defaultSrc: "/images/home/gateway/embodied-perception-still.jpg",
        aspect: "16/9",
      },
      {
        id: "stitch-manipulation",
        label: "具身操作 展开详情图",
        defaultSrc: "/images/home/gateway/embodied-manipulation-still.jpg",
        aspect: "16/9",
      },
      {
        id: "stitch-mobility",
        label: "具身移动 展开详情图",
        defaultSrc: "/images/home/gateway/embodied-mobility-still.jpg",
        aspect: "16/9",
      },
      {
        id: "embodied-perception-bg",
        label: "具身感知 章节背景",
        defaultSrc: "/images/home/group-243/industrial-robot-arm-a.png",
        aspect: "16/9",
      },
    ],
  },
  {
    title: "首页 — 产品展示",
    slots: [
      {
        id: "product-embodied",
        label: "产品卡 · Embodied Intelligence",
        defaultSrc: "/images/home/group-243/product-embodied-visual.png",
        aspect: "16/10",
      },
      {
        id: "product-depthquin",
        label: "产品卡 · DepthSight 产品线",
        defaultSrc: "/images/home/group-243/product-depthsight-visual.png",
        aspect: "16/10",
      },
      {
        id: "product-toolkit",
        label: "产品卡 · AIR 智能软件引擎",
        defaultSrc: "/images/home/group-243/product-air-visual.png",
        aspect: "16/10",
      },
    ],
  },
  {
    title: "首页 — 应用场景",
    slots: [
      {
        id: "app-automotive",
        label: "汽車製造",
        defaultSrc: "/images/home/group-243/industry-automotive.png",
        aspect: "16/10",
      },
      {
        id: "app-new-energy",
        label: "新能源電池",
        defaultSrc: "/images/home/group-243/industry-new-energy.png",
        aspect: "16/10",
      },
      {
        id: "app-electronics",
        label: "3C電子",
        defaultSrc: "/images/home/group-243/industry-3c.png",
        aspect: "16/10",
      },
      {
        id: "app-logistics",
        label: "物流倉儲",
        defaultSrc: "/images/home/group-243/industry-logistics.png",
        aspect: "16/10",
      },
      {
        id: "app-inspection",
        label: "工業檢測",
        defaultSrc: "/images/home/group-243/industry-inspection.png",
        aspect: "16/10",
      },
      {
        id: "app-education",
        label: "科研教育",
        defaultSrc: "/images/home/group-243/industry-research.png",
        aspect: "16/10",
      },
    ],
  },
  {
    title: "首页 — CTA 行动号召",
    slots: [
      {
        id: "cta-bg",
        label: "CTA 背景 · 多维视觉驱动",
        defaultSrc: "/images/home/cta-bg.jpg",
        aspect: "16/9",
      },
    ],
  },
  {
    title: "首页 — 资源中心",
    slots: [
      {
        id: "resource-1",
        label: "资源展示 1",
        defaultSrc: "/images/home/group-243/resource-01.png",
        aspect: "16/10",
      },
      {
        id: "resource-2",
        label: "资源展示 2",
        defaultSrc: "/images/home/group-243/resource-02.png",
        aspect: "16/10",
      },
      {
        id: "resource-3",
        label: "资源展示 3",
        defaultSrc: "/images/home/group-243/resource-03.png",
        aspect: "16/10",
      },
    ],
  },
  {
    title: "首页 — 新闻与伙伴",
    slots: [
      {
        id: "home-news-partners-bg",
        label: "新闻与合作伙伴背景",
        defaultSrc: "/images/home/news-partners-bg.jpg",
        aspect: "16/9",
      },
      {
        id: "home-news-cover-hong-kong-innovation-aiever",
        label: "首页新闻封面 · 香港科创力量",
        defaultSrc: "/images/about/news-uploaded/hong-kong-innovation-aiever/image-01.png",
        aspect: "16/10",
      },
      {
        id: "home-news-cover-federation-spring-dinner",
        label: "首页新闻封面 · 工总春茗",
        defaultSrc: "/images/about/news-uploaded/federation-spring-dinner/image-01.jpeg",
        aspect: "16/10",
      },
      {
        id: "home-news-cover-china-resources-visit",
        label: "首页新闻封面 · 华润到访",
        defaultSrc: "/images/about/news-uploaded/china-resources-visit/image-01.jpeg",
        aspect: "16/10",
      },
      {
        id: "home-news-cover-beijing-auto-show-embodied-ai",
        label: "首页新闻封面 · 北京车展",
        defaultSrc: "/images/about/news-uploaded/beijing-auto-show-embodied-ai/image-01.webp",
        aspect: "16/10",
      },
      {
        id: "home-partner-01",
        label: "合作伙伴 Logo 01",
        defaultSrc: "/images/home/partners/partner-01.png",
        aspect: "1/1",
      },
      {
        id: "home-partner-02",
        label: "合作伙伴 Logo 02",
        defaultSrc: "/images/home/partners/partner-02.png",
        aspect: "1/1",
      },
      {
        id: "home-partner-li-auto",
        label: "合作伙伴 Logo · 理想汽车",
        defaultSrc: "/images/home/partners/li-auto.png",
        aspect: "5/1",
      },
      {
        id: "home-partner-rokae",
        label: "合作伙伴 Logo · 珞石机器人",
        defaultSrc: "/images/home/partners/rokae.png",
        aspect: "6/1",
      },
    ],
  },
  {
    title: "关于我们 — 公司介绍",
    slots: [
      {
        id: "about-hero-network",
        label: "Hero 背景 · image 76 全球网络",
        defaultSrc: "/images/about/company-hero-image76.png",
        aspect: "16/9",
      },
      {
        id: "about-company-bg",
        label: "公司介绍 背景 · 香港科学园",
        defaultSrc: "/images/about/company-intro-bg-figma.png",
        aspect: "16/9",
      },
      {
        id: "about-mission-bg",
        label: "使命与愿景 背景 · 山脉远景",
        defaultSrc: "/images/about/mission-vision-bg-figma.png",
        aspect: "21/9",
      },
      {
        id: "about-patent-diploma",
        label: "日内瓦金奖证书",
        defaultSrc: "/images/about/patent-diploma.png",
        aspect: "3/4",
      },
      {
        id: "about-patent-document",
        label: "专利证书样本",
        defaultSrc: "/images/about/patent-document.png",
        aspect: "3/4",
      },
      {
        id: "company-1",
        label: "公司实验室",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "company-2",
        label: "公司产品/使命",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "milestone-1",
        label: "3D视觉平台 V2.0",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "milestone-2",
        label: "具身智能模型发布",
        defaultSrc: "",
        aspect: "16/10",
      },
    ],
  },
  {
    title: "关于我们 — 招聘",
    slots: [
      {
        id: "career-hero-bg",
        label: "招聘页 / 岗位详情首屏背景",
        defaultSrc: "/images/about/careers/careers-hero-bg.png",
        aspect: "16/7",
      },
      {
        id: "career-perception",
        label: "3D视觉算法工程师",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "career-manipulation",
        label: "机器人操作算法工程师",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "career-slam",
        label: "SLAM & 导航工程师",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "career-embedded",
        label: "嵌入式软件工程师",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "career-product",
        label: "产品经理",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "career-solution",
        label: "行业解决方案专家",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "career-market-product-manager-qr",
        label: "市场产品经理咨询二维码",
        defaultSrc: "/images/about/careers/market-product-manager-qr.png",
        aspect: "1/1",
      },
    ],
  },
  {
    title: "关于我们 — 新闻",
    slots: [
      {
        id: "news-hero",
        label: "新闻动态页首屏",
        defaultSrc: "/images/about/news-hero.png",
        aspect: "16/7",
      },
      {
        id: "news-funding",
        label: "A轮融资",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "news-perception",
        label: "3D视觉感知系统发布",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "news-partnership",
        label: "汽车制造商合作",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "news-iros",
        label: "IROS 最佳论文",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "news-manipkit",
        label: "ManipKit 开源",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "news-warehouse",
        label: "智能仓储落地",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "news-summit",
        label: "年度技术峰会",
        defaultSrc: "",
        aspect: "16/10",
      },
      {
        id: "news-humanoid",
        label: "Aria-One 人形机器人",
        defaultSrc: "",
        aspect: "16/10",
      },
    ],
  },
];

/** Flat list of all image slot IDs for quick lookup. */
export const allImageSlots: ImageSlot[] = siteImageSections.flatMap(
  (s) => s.slots,
);
