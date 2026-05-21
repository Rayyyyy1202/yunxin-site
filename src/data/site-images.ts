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
      { id: "series-ei-hero", label: "Hero 產品大圖", defaultSrc: "/images/series/ei/hero-product.png", aspect: "5/4" },
    ],
  },
  {
    title: "首页 — Hero",
    slots: [
      {
        id: "hero-robot-arm",
        label: "机械臂背景",
        defaultSrc: "/images/hero/robot-arm-bg.jpg",
        aspect: "16/9",
      },
    ],
  },
  {
    title: "首页 — 具身智能三大能力",
    slots: [
      {
        id: "stitch-showcase",
        label: "三面板合成底图",
        defaultSrc: "/images/hero/embodied-showcase.jpg",
        aspect: "5/4",
      },
      {
        id: "stitch-perception",
        label: "具身感知 展开详情图",
        defaultSrc: "/images/hero/embodied-perception.jpg",
        aspect: "16/9",
      },
      {
        id: "stitch-manipulation",
        label: "具身操作 展开详情图",
        defaultSrc: "/images/hero/embodied-manipulation.jpg",
        aspect: "16/9",
      },
      {
        id: "stitch-mobility",
        label: "具身移动 展开详情图",
        defaultSrc: "/images/hero/embodied-mobility.jpg",
        aspect: "16/9",
      },
      {
        id: "embodied-perception-bg",
        label: "具身感知 章节背景",
        defaultSrc: "/images/home/embodied-perception-bg.png",
        aspect: "1/1",
      },
    ],
  },
  {
    title: "首页 — 产品展示",
    slots: [
      {
        id: "product-embodied",
        label: "具身智能平台",
        defaultSrc: "/images/home/product-embodied.jpg",
        aspect: "16/10",
      },
      {
        id: "product-depthquin",
        label: "DepthQuin™ 3D 结构光模组",
        defaultSrc: "/images/home/product-depthquin.jpg",
        aspect: "16/10",
      },
      {
        id: "product-toolkit",
        label: "AI 开发者工具套件",
        defaultSrc: "/images/home/product-toolkit.jpg",
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
        defaultSrc: "/images/home/app-automotive.jpg",
        aspect: "16/10",
      },
      {
        id: "app-new-energy",
        label: "新能源電池",
        defaultSrc: "/images/home/app-new-energy.jpg",
        aspect: "16/10",
      },
      {
        id: "app-electronics",
        label: "3C電子",
        defaultSrc: "/images/home/app-electronics.jpg",
        aspect: "16/10",
      },
      {
        id: "app-logistics",
        label: "物流倉儲",
        defaultSrc: "/images/home/app-logistics.jpg",
        aspect: "16/10",
      },
      {
        id: "app-inspection",
        label: "工業檢測",
        defaultSrc: "/images/home/app-inspection.jpg",
        aspect: "16/10",
      },
      {
        id: "app-education",
        label: "科研教育",
        defaultSrc: "/images/home/app-education.jpg",
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
        defaultSrc: "/images/home/resource-1.jpg",
        aspect: "16/10",
      },
      {
        id: "resource-2",
        label: "资源展示 2",
        defaultSrc: "/images/home/resource-2.jpg",
        aspect: "16/10",
      },
      {
        id: "resource-3",
        label: "资源展示 3",
        defaultSrc: "/images/home/resource-3.jpg",
        aspect: "16/10",
      },
      {
        id: "resource-4",
        label: "资源展示 4",
        defaultSrc: "/images/home/resource-4.jpg",
        aspect: "16/10",
      },
    ],
  },
  {
    title: "首页 — 认知过程",
    slots: [
      {
        id: "cognition-1",
        label: "感知 Perceive",
        defaultSrc: "/images/home/cognition-1.jpg",
        aspect: "4/3",
      },
      {
        id: "cognition-2",
        label: "理解 Understand",
        defaultSrc: "/images/home/cognition-2.jpg",
        aspect: "4/3",
      },
      {
        id: "cognition-3",
        label: "决策 Decide",
        defaultSrc: "/images/home/cognition-3.jpg",
        aspect: "4/3",
      },
      {
        id: "cognition-4",
        label: "行动 Act",
        defaultSrc: "/images/home/cognition-4.jpg",
        aspect: "4/3",
      },
    ],
  },
  {
    title: "关于我们 — 公司介绍",
    slots: [
      {
        id: "about-hero-network",
        label: "Hero 背景 · 全球网络地图",
        defaultSrc: "/images/about/global-network.png",
        aspect: "21/9",
      },
      {
        id: "about-company-bg",
        label: "公司介绍 背景 · 香港科学园",
        defaultSrc: "/images/about/hk-science-park.png",
        aspect: "16/9",
      },
      {
        id: "about-mission-bg",
        label: "使命与愿景 背景 · 山脉远景",
        defaultSrc: "/images/about/mountain-landscape.jpg",
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
        defaultSrc: "/images/about/company-1.jpg",
        aspect: "16/10",
      },
      {
        id: "company-2",
        label: "公司产品/使命",
        defaultSrc: "/images/about/company-2.jpg",
        aspect: "16/10",
      },
      {
        id: "milestone-1",
        label: "3D视觉平台 V2.0",
        defaultSrc: "/images/about/milestone-1.jpg",
        aspect: "16/10",
      },
      {
        id: "milestone-2",
        label: "具身智能模型发布",
        defaultSrc: "/images/about/milestone-2.jpg",
        aspect: "16/10",
      },
    ],
  },
  {
    title: "关于我们 — 招聘",
    slots: [
      {
        id: "career-perception",
        label: "3D视觉算法工程师",
        defaultSrc: "/images/about/career-perception.jpg",
        aspect: "16/10",
      },
      {
        id: "career-manipulation",
        label: "机器人操作算法工程师",
        defaultSrc: "/images/about/career-manipulation.jpg",
        aspect: "16/10",
      },
      {
        id: "career-slam",
        label: "SLAM & 导航工程师",
        defaultSrc: "/images/about/career-slam.jpg",
        aspect: "16/10",
      },
      {
        id: "career-embedded",
        label: "嵌入式软件工程师",
        defaultSrc: "/images/about/career-embedded.jpg",
        aspect: "16/10",
      },
      {
        id: "career-product",
        label: "产品经理",
        defaultSrc: "/images/about/career-product.jpg",
        aspect: "16/10",
      },
      {
        id: "career-solution",
        label: "行业解决方案专家",
        defaultSrc: "/images/about/career-solution.jpg",
        aspect: "16/10",
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
        defaultSrc: "/images/about/news-funding.jpg",
        aspect: "16/10",
      },
      {
        id: "news-perception",
        label: "3D视觉感知系统发布",
        defaultSrc: "/images/about/news-perception.jpg",
        aspect: "16/10",
      },
      {
        id: "news-partnership",
        label: "汽车制造商合作",
        defaultSrc: "/images/about/news-partnership.jpg",
        aspect: "16/10",
      },
      {
        id: "news-iros",
        label: "IROS 最佳论文",
        defaultSrc: "/images/about/news-iros.jpg",
        aspect: "16/10",
      },
      {
        id: "news-manipkit",
        label: "ManipKit 开源",
        defaultSrc: "/images/about/news-manipkit.jpg",
        aspect: "16/10",
      },
      {
        id: "news-warehouse",
        label: "智能仓储落地",
        defaultSrc: "/images/about/news-warehouse.jpg",
        aspect: "16/10",
      },
      {
        id: "news-summit",
        label: "年度技术峰会",
        defaultSrc: "/images/about/news-summit.jpg",
        aspect: "16/10",
      },
      {
        id: "news-humanoid",
        label: "Aria-One 人形机器人",
        defaultSrc: "/images/about/news-humanoid.jpg",
        aspect: "16/10",
      },
    ],
  },
];

/** Flat list of all image slot IDs for quick lookup. */
export const allImageSlots: ImageSlot[] = siteImageSections.flatMap(
  (s) => s.slots,
);
