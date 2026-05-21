import type { CareerDetail, CareerItem } from "@/lib/types";

export const careers: CareerItem[] = [
  {
    id: "perception-lead",
    title: "3D 視覺算法工程師",
    location: "北京 / 深圳",
    type: "技術研發",
    externalUrl: "https://example.com/careers/perception-lead",
    image: "/images/about/career-perception.jpg",
    summary: "負責 3D 點雲感知、缺陷檢測與工業視覺算法落地。",
    tags: ["3D Vision", "Point Cloud", "AI Inspection"],
  },
  {
    id: "manipulation-engineer",
    title: "機器人操作算法工程師",
    location: "北京 / 上海",
    type: "技術研發",
    externalUrl: "https://example.com/careers/manipulation-engineer",
    image: "/images/about/career-manipulation.jpg",
    summary: "把感知結果轉化為可執行的抓取、裝配與軌跡策略。",
    tags: ["Robot Control", "Planning", "Manipulation"],
  },
  {
    id: "slam-engineer",
    title: "SLAM 與導航工程師",
    location: "北京",
    type: "技術研發",
    externalUrl: "https://example.com/careers/slam-engineer",
    image: "/images/about/career-slam.jpg",
    summary: "面向移動工作站與多視角掃描構建定位、建圖與路徑能力。",
    tags: ["SLAM", "Navigation", "Mapping"],
  },
  {
    id: "embedded-engineer",
    title: "嵌入式軟件工程師",
    location: "深圳",
    type: "技術研發",
    externalUrl: "https://example.com/careers/embedded-engineer",
    image: "/images/about/career-embedded.jpg",
    summary: "負責相機、控制器與產線設備的底層通信和穩定性建設。",
    tags: ["Embedded", "Device IO", "Industrial"],
  },
  {
    id: "market-product-manager",
    title: "市場產品經理",
    location: "深圳 / 上海",
    type: "產品與市場",
    href: "/about/careers/market-product-manager",
    image: "/images/about/career-product.jpg",
    summary: "連接產品、行業方案與市場敘事，推動 AIeveR 產品被準確理解和採用。",
    tags: ["Product Marketing", "Go-to-market", "Industry Insight"],
    featured: true,
  },
  {
    id: "solution-engineer",
    title: "行業解決方案專家",
    location: "上海 / 華東",
    type: "業務拓展",
    externalUrl: "https://example.com/careers/solution-engineer",
    image: "/images/about/career-solution.jpg",
    summary: "面向汽車、新能源、3C 等場景設計可落地的視覺與機器人方案。",
    tags: ["Solution", "Pre-sales", "Industrial"],
  },
];

export const careerDetails: CareerDetail[] = [
  {
    slug: "market-product-manager",
    title: "市場產品經理",
    department: "產品與市場部",
    location: "深圳 / 上海",
    type: "全職",
    workMode: "混合辦公",
    experience: "3 年以上 B2B / 工業科技產品經驗",
    summary:
      "你將負責把 AIeveR 的 3D 視覺、智能軟體引擎與機器人工作站能力轉化為清晰的產品定位、行業敘事與市場材料，協同研發、銷售和交付團隊推動產品進入真實產線。",
    heroImage: "/images/about/global-network.png",
    metrics: [
      { label: "Team", value: "產品與市場" },
      { label: "Focus", value: "工業 AI / 機器人" },
      { label: "Location", value: "深圳 / 上海" },
    ],
    responsibilities: [
      "梳理 DepthSight、AIR Vision、AIR Calibrator、AIR Planner 與標準工作站的產品定位、核心賣點和目標客戶。",
      "將研發能力、行業案例和客戶痛點轉化為官網頁面、產品手冊、演示腳本、銷售工具包與發布材料。",
      "參與行業應用和產品頁的信息架構設計，確保頁面跳轉、內容層級和業務線索清晰一致。",
      "與銷售、解決方案和交付團隊共建客戶場景資料庫，沉澱新能源、汽車、3C、物流等行業話術。",
      "跟蹤競品、展會、客戶反饋與市場趨勢，定期輸出產品化和市場策略建議。",
    ],
    requirements: [
      "具備 B2B 科技、工業自動化、機器人、AI 視覺或智能製造相關產品市場 / 產品經理經驗。",
      "能快速理解技術產品，並用結構化文字、圖示和頁面邏輯向非技術受眾講清楚價值。",
      "熟悉官網、產品資料、案例包、展會物料或銷售 enablement 的策劃與交付流程。",
      "具備跨部門推動能力，能在研發、設計、銷售和管理層之間對齊信息與優先級。",
      "中文寫作能力優秀；能閱讀英文技術資料，具備英文產品材料能力者優先。",
    ],
    bonuses: [
      "有機器視覺、3D 相機、工業軟體、機器人集成或智能製造方案經驗。",
      "有 Figma / Notion / CMS / 官網內容管理經驗，能與設計和開發高效協作。",
      "曾主導新品上市、展會發布、行業白皮書或產品品牌升級。",
    ],
    process: ["簡歷篩選", "產品與市場面試", "業務案例討論", "Offer 溝通"],
    applyHref: "/about/contact",
  },
];

export const careerDetailSlugs = careerDetails.map((item) => item.slug);

export function getCareerDetail(slug: string): CareerDetail | undefined {
  return careerDetails.find((item) => item.slug === slug);
}
