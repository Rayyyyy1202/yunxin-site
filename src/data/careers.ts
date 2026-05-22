import type { CareerDetail, CareerItem } from "@/lib/types";

export const careers: CareerItem[] = [
  {
    id: "perception-lead",
    title: "高級視覺算法工程師",
    location: "深圳 / 香港",
    type: "全職",
    image: "/images/about/career-perception.jpg",
    summary: "負責 3D 點雲感知、缺陷檢測與工業視覺算法落地。",
    tags: ["3D Vision", "Point Cloud", "AI Inspection"],
  },
  {
    id: "manipulation-engineer",
    title: "機器人操作算法工程師",
    location: "深圳 / 香港",
    type: "全職",
    image: "/images/about/career-manipulation.jpg",
    summary: "將感知結果轉化為可執行的抓取、裝配與軌跡策略。",
    tags: ["Robot Control", "Planning", "Manipulation"],
  },
  {
    id: "slam-engineer",
    title: "SLAM 與導航工程師",
    location: "深圳 / 香港",
    type: "全職",
    image: "/images/about/career-slam.jpg",
    summary: "面向移動工作站與多視角掃描搭建定位、建圖與路徑能力。",
    tags: ["SLAM", "Navigation", "Mapping"],
  },
  {
    id: "embedded-engineer",
    title: "嵌入式軟件工程師",
    location: "深圳 / 香港",
    type: "全職",
    image: "/images/about/career-embedded.jpg",
    summary: "負責相機、控制器與產品設備底層通信和穩定性建設。",
    tags: ["Embedded", "Device IO", "Industrial"],
  },
  {
    id: "market-product-manager",
    title: "市場產品經理",
    location: "香港 / 深圳",
    type: "全職",
    href: "/about/careers/market-product-manager",
    image: "/images/about/career-product.jpg",
    summary:
      "連接產品、行業方案與市場敘事，推動 AIeveR 產品被準確理解和採用。",
    tags: ["Product Marketing", "Go-to-market", "Industry Insight"],
    featured: true,
  },
  {
    id: "solution-engineer",
    title: "行業解決方案專家",
    location: "深圳 / 香港",
    type: "全職",
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
    location: "香港 / 深圳",
    type: "全職",
    workMode: "混合辦公",
    experience: "3 年以上 B2B / 工業科技產品經驗",
    summary:
      "負責公司市場策略制定與落地，串聯產品、行業方案與市場敘事，提升品牌影響力與產品市場滲透率。",
    heroImage: "/images/about/careers/careers-hero-bg.png",
    metrics: [
      { label: "Team", value: "產品與市場部" },
      { label: "Focus", value: "工業 AI / 機器人" },
      { label: "Location", value: "香港 / 深圳" },
    ],
    responsibilities: [
      "負責公司整體市場策略制定與落地，聚焦具身感知核心業務。",
      "統籌市場宣傳物料規劃與迭代，確保內容符合業務特色。",
      "負責市場活動全流程管理，提升活動轉化率與品牌曝光度。",
      "搭建並優化市場團隊工作流程，定期輸出市場分析報告。",
    ],
    requirements: [
      "本科及以上學歷，市場營銷、工商管理、電子信息、自動化等相關專業優先。",
      "3 年及以上市場管理經驗，具備工業自動化、3D 視覺、機器人或具身智能行業經驗者優先。",
      "具備紮實的市場策劃、品牌推廣、物料統籌和跨部門協作能力。",
    ],
    bonuses: [
      "有 3D 視覺、工業相機、自動化設備等產品市場推廣經驗。",
      "有科研教育行業市場推廣經驗或相關行業資源。",
      "具備優秀文案能力與視覺審美，能獨立完成宣傳物料策劃。",
    ],
    process: ["簡歷篩選", "產品與市場面試", "業務案例討論", "Offer 溝通"],
    applyHref: "/about/contact",
    consultHref: "/about/contact",
    qrImage: "/images/about/careers/market-product-manager-qr.png",
    detailSections: [
      {
        title: "崗位職責",
        content:
          "1. 負責公司整體市場策略制定與落地，聚焦具身感知核心業務（工業線激光 3D 相機、工業結構光 3D 相機、工業視覺檢測軟件等），聯動具身操作、具身移動業務，統籌市場宣傳全鏈路工作，提升公司品牌影響力與產品市場滲透率。\n\n2. 統籌各類市場宣傳物料的籌備與規劃，包括但不限於：視頻號、公眾號等新媒體內容策劃與運營，官網內容更新與優化，產品手冊、宣傳海報等物料設計與迭代，展會（行業展會、學術展會等）的策劃、籌備與執行，確保宣傳內容貼合業務特色、傳遞核心價值。\n\n3. 負責市場活動的全流程管理，包括活動策劃、資源協調、執行落地、效果復盤，提升活動轉化率與品牌曝光度；聯動銷售團隊提供市場支持，助力銷售轉化。\n\n4. 搭建並優化市場團隊工作流程，統籌市場相關工作的分工與推進，確保各項市場工作高效落地；定期輸出市場分析報告、推廣效果復盤報告，為公司決策提供數據支持。",
      },
      {
        title: "任職要求",
        content:
          "（一）學歷與專業\n\n本科及以上學歷，市場營銷、工商管理、電子信息、自動化等相關專業優先；3 年及以上市場管理經驗，其中 1 年及以上工業自動化、3D 視覺、機器人、具身智能等相關行業市場工作經驗者優先。\n\n（二）核心能力\n\n1. 具備紮實的市場策劃、品牌推廣、物料籌備能力，有新媒體（視頻號、公眾號）運營、展會策劃、產品手冊製作的實操經驗，能獨立統籌各類市場宣傳工作。\n\n2. 深入了解工業自動化、具身智能、科研教育行業市場動態，熟悉 3D 相機等相關產品，能精準挖掘產品優勢與市場需求，制定貼合行業的推廣策略。\n\n3. 具備較強的組織協調能力、溝通表達能力、執行能力，能高效對接設計、銷售、研發等部門，推動各項市場工作落地；具備一定的團隊管理經驗，能帶領團隊完成市場目標。\n\n4. 對具身感知、具身智能領域有濃厚興趣，具備敏銳的市場洞察力和創新思維，能及時捕捉行業趨勢，優化市場推廣方案。\n\n5. 具備良好的抗壓能力、責任心和結果導向，能獨立應對市場推廣中的各類問題，確保市場目標達成。",
      },
      {
        title: "加分項",
        content:
          "1. 有 3D 視覺、工業相機、自動化設備等產品的市場推廣經驗，熟悉同類 3D 相機產品者優先。\n\n2. 有科研教育行業市場推廣經驗，具備相關行業資源者優先。\n\n3. 具備優秀的文案撰寫、視覺審美能力，能獨立完成精準的宣傳文案、物料策劃者優先。",
      },
    ],
  },
];

export const careerDetailSlugs = careerDetails.map((item) => item.slug);

export function getCareerDetail(slug: string): CareerDetail | undefined {
  return careerDetails.find((item) => item.slug === slug);
}
