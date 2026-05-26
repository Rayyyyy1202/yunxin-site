export type CopyInputType = "text" | "textarea";

export interface CopySlot {
  id: string;
  label: string;
  defaultValue: string;
  inputType?: CopyInputType;
  maxLength?: number;
}

export interface CopySection {
  title: string;
  slots: CopySlot[];
}

export const siteCopySections: CopySection[] = [
  {
    title: "首页 — Hero",
    slots: [
      {
        id: "home-hero-badge",
        label: "标签",
        defaultValue: "Embodied Intelligence v2.0",
        maxLength: 80,
      },
      {
        id: "home-hero-title-primary",
        label: "主标题第一行",
        defaultValue: "AIeveR Robotics Limited",
        maxLength: 120,
      },
      {
        id: "home-hero-title-secondary",
        label: "主标题第二行",
        defaultValue: "雲芯機器人",
        maxLength: 80,
      },
      {
        id: "home-hero-description",
        label: "简介",
        defaultValue:
          "雲芯機器人有限公司（AIeveR Robotics Limited）成立於香港，是InnoHK香港物流機械人中心的孵化企業，由世界頂尖機器人專家、香港工程院院士劉雲輝教授領銜。公司業務覆蓋具身感知、具身操作、具身移動三大核心板塊，致力於為機器人提供通用具身操作智能技術及產品。",
        inputType: "textarea",
        maxLength: 800,
      },
      {
        id: "home-hero-primary-cta",
        label: "主按钮",
        defaultValue: "開始探索",
        maxLength: 40,
      },
      {
        id: "home-hero-secondary-cta",
        label: "次按钮",
        defaultValue: "聯絡我們",
        maxLength: 40,
      },
    ],
  },
  {
    title: "首页 — 三分 Gateway",
    slots: [
      {
        id: "home-stitch-brand-title",
        label: "Gateway 品牌英文",
        defaultValue: "AIeveR Robotics Limited",
        maxLength: 120,
      },
      {
        id: "home-stitch-brand-subtitle",
        label: "Gateway 品牌中文",
        defaultValue: "雲芯機器人有限公司",
        maxLength: 120,
      },
      {
        id: "home-stitch-perception-title-en",
        label: "具身感知英文标题",
        defaultValue: "Embodied Perception",
        maxLength: 80,
      },
      {
        id: "home-stitch-perception-title-cn",
        label: "具身感知中文标题",
        defaultValue: "具身感知",
        maxLength: 40,
      },
      {
        id: "home-stitch-perception-description",
        label: "具身感知说明",
        defaultValue:
          "全栈自研 3D 视觉与 AI 感知系统，让机器在复杂环境中看得清、判得准，理解物体与空间关系。",
        inputType: "textarea",
        maxLength: 300,
      },
      {
        id: "home-stitch-manipulation-title-en",
        label: "具身操作英文标题",
        defaultValue: "Embodied Manipulation",
        maxLength: 80,
      },
      {
        id: "home-stitch-manipulation-title-cn",
        label: "具身操作中文标题",
        defaultValue: "具身操作",
        maxLength: 40,
      },
      {
        id: "home-stitch-manipulation-description",
        label: "具身操作说明",
        defaultValue:
          "融合视觉感知、运动控制与操作策略，支撑机器人完成抓取、装配、检测等高精度任务。",
        inputType: "textarea",
        maxLength: 300,
      },
      {
        id: "home-stitch-mobility-title-en",
        label: "具身移动英文标题",
        defaultValue: "Embodied Mobility",
        maxLength: 80,
      },
      {
        id: "home-stitch-mobility-title-cn",
        label: "具身移动中文标题",
        defaultValue: "具身移动",
        maxLength: 40,
      },
      {
        id: "home-stitch-mobility-description",
        label: "具身移动说明",
        defaultValue:
          "结合自主导航、路径规划与多模态感知，让机器人在动态场景中稳定移动、灵活协同。",
        inputType: "textarea",
        maxLength: 300,
      },
    ],
  },
  {
    title: "首页 — 具身感知章节",
    slots: [
      {
        id: "home-perception-eyebrow",
        label: "小标题",
        defaultValue: "◇ EMBODIED INTELLIGENCE V2.0",
        maxLength: 100,
      },
      {
        id: "home-perception-title",
        label: "标题",
        defaultValue: "具身感知",
        maxLength: 80,
      },
      {
        id: "home-perception-accent-title",
        label: "紫色副标题",
        defaultValue: "機器\"慧眼\"，破解複雜視覺難題",
        maxLength: 120,
      },
      {
        id: "home-perception-description",
        label: "正文",
        defaultValue:
          "具身感知事業部專注於\"3D視覺+AI\"融合的具身操作智能技術及產品研發，構建了從晶片、嵌入式模組到感知演算法、AI模型的全棧自研體系。以3D視覺感測器和智能軟體為核心，系統性攻克高反光、黑色吸光、透明物體等工業視覺痛點，讓機器在複雜工業及民生場景中\"看得清、判得準、做得到\"，為工業自動化、具身操作、具身移動提供精準的感知支撐。",
        inputType: "textarea",
        maxLength: 900,
      },
    ],
  },
  {
    title: "首页 — 产品展示",
    slots: [
      {
        id: "home-products-eyebrow",
        label: "英文小标题",
        defaultValue:
          "Full-Stack Independent R&D · Multi-Dimensional Intelligent Visual Product Suite",
        maxLength: 160,
      },
      {
        id: "home-products-title",
        label: "区块标题",
        defaultValue: "全棧自研 · 多維智能視覺產品集群",
        maxLength: 120,
      },
      {
        id: "home-products-description",
        label: "区块说明",
        defaultValue:
          "從核心硬體到智能軟體，覆蓋具身感知與工業操作全場景。",
        inputType: "textarea",
        maxLength: 260,
      },
      {
        id: "home-products-card-01-title",
        label: "产品卡 01 标题",
        defaultValue: "Embodied Intelligence",
        maxLength: 80,
      },
      {
        id: "home-products-card-01-subtitle",
        label: "产品卡 01 副标题",
        defaultValue: "具身智能3D視覺感測器產品線",
        maxLength: 120,
      },
      {
        id: "home-products-card-01-description",
        label: "产品卡 01 说明",
        defaultValue: "面向通用的具身感知操作智能",
        maxLength: 160,
      },
      {
        id: "home-products-card-02-title",
        label: "产品卡 02 标题",
        defaultValue: "DepthSight產品線",
        maxLength: 80,
      },
      {
        id: "home-products-card-02-subtitle",
        label: "产品卡 02 副标题",
        defaultValue: "——高性能3D感測器",
        maxLength: 120,
      },
      {
        id: "home-products-card-02-description",
        label: "产品卡 02 说明",
        defaultValue: "面向工業的具身操作智能",
        maxLength: 160,
      },
      {
        id: "home-products-card-03-title",
        label: "产品卡 03 标题",
        defaultValue: "AIR智能軟體引擎",
        maxLength: 80,
      },
      {
        id: "home-products-card-03-subtitle",
        label: "产品卡 03 副标题",
        defaultValue: "—— 智能視覺平臺",
        maxLength: 120,
      },
      {
        id: "home-products-card-03-description",
        label: "产品卡 03 说明",
        defaultValue: "讓機器\"看懂\"並\"做到\"",
        maxLength: 160,
      },
      {
        id: "home-products-learn-more",
        label: "了解更多文字",
        defaultValue: "了解更多",
        maxLength: 40,
      },
    ],
  },
  {
    title: "首页 — 行业应用",
    slots: [
      {
        id: "home-applications-eyebrow",
        label: "英文小标题",
        defaultValue: "Industry Solutions",
        maxLength: 80,
      },
      {
        id: "home-applications-title",
        label: "区块标题",
        defaultValue: "深耕行業 · 落地有聲",
        maxLength: 120,
      },
      {
        id: "home-applications-description",
        label: "区块说明",
        defaultValue:
          "從新能源汽車到3C電子，AIeveR Robotics方案已服務多個智能製造一線場景。",
        inputType: "textarea",
        maxLength: 260,
      },
      {
        id: "home-applications-app-automotive-title",
        label: "应用卡 · 汽车制造",
        defaultValue: "汽車製造",
        maxLength: 80,
      },
      {
        id: "home-applications-app-new-energy-title",
        label: "应用卡 · 新能源电池",
        defaultValue: "新能源電池",
        maxLength: 80,
      },
      {
        id: "home-applications-app-electronics-title",
        label: "应用卡 · 3C电子",
        defaultValue: "3C電子",
        maxLength: 80,
      },
      {
        id: "home-applications-app-logistics-title",
        label: "应用卡 · 物流仓储",
        defaultValue: "物流倉儲",
        maxLength: 80,
      },
      {
        id: "home-applications-app-inspection-title",
        label: "应用卡 · 工业检测",
        defaultValue: "工業檢測",
        maxLength: 80,
      },
      {
        id: "home-applications-app-education-title",
        label: "应用卡 · 科研教育",
        defaultValue: "科研教育",
        maxLength: 80,
      },
    ],
  },
  {
    title: "首页 — 资源中心",
    slots: [
      {
        id: "home-resources-description",
        label: "区块说明",
        defaultValue:
          "從新能源汽車到3C電子，AIeveR Robotics方案已服務多個智能製造一線場景。",
        inputType: "textarea",
        maxLength: 260,
      },
      {
        id: "home-resources-eyebrow",
        label: "英文小标题",
        defaultValue: "Industry Solutions",
        maxLength: 80,
      },
      {
        id: "home-resources-title",
        label: "区块标题",
        defaultValue: "眼見為實 · 資源中心",
        maxLength: 120,
      },
      {
        id: "home-resources-card-resource-factory-title",
        label: "资源卡 01 标题",
        defaultValue: "智能製造現場",
        maxLength: 80,
      },
      {
        id: "home-resources-card-resource-vision-title",
        label: "资源卡 02 标题",
        defaultValue: "3D視覺應用資料",
        maxLength: 80,
      },
      {
        id: "home-resources-card-resource-demo-title",
        label: "资源卡 03 标题",
        defaultValue: "應用案例與演示",
        maxLength: 80,
      },
      {
        id: "home-resources-all-link",
        label: "查看全部资源按钮",
        defaultValue: "查看全部資源",
        maxLength: 60,
      },
    ],
  },
  {
    title: "首页 — 新闻与伙伴",
    slots: [
      {
        id: "home-news-title",
        label: "新闻区标题",
        defaultValue: "新聞動態",
        maxLength: 80,
      },
      {
        id: "home-partners-title",
        label: "合作伙伴区标题",
        defaultValue: "信賴雲芯的合作夥伴",
        maxLength: 100,
      },
    ],
  },
  {
    title: "首页 — CTA",
    slots: [
      {
        id: "home-cta-title",
        label: "标题",
        defaultValue: "多維視覺驅動具身智能無限可能",
        maxLength: 120,
      },
      {
        id: "home-cta-description",
        label: "说明",
        defaultValue:
          "探索全棧自研3D視覺感測器與AI引擎，看AIeveR Robotics如何賦能汽車、新能源、3C等行業。",
        inputType: "textarea",
        maxLength: 260,
      },
      {
        id: "home-cta-primary",
        label: "主按钮",
        defaultValue: "聯繫我們",
        maxLength: 40,
      },
      {
        id: "home-cta-secondary",
        label: "次按钮",
        defaultValue: "技術文檔",
        maxLength: 40,
      },
    ],
  },
];

export const allCopySlots: CopySlot[] = siteCopySections.flatMap(
  (section) => section.slots,
);

export const copySlotById = new Map(allCopySlots.map((slot) => [slot.id, slot]));
