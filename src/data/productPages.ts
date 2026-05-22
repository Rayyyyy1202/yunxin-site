export type ProductPageSlug =
  | "air-intelligent-software-engine"
  | "air-calibrator-engine"
  | "air-planner-engine"
  | "air-picking-station"
  | "robot-scan-station"
  | "air-vision-pro-station";

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductPageData {
  slug: ProductPageSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  tags: string[];
  features: ProductFeature[];
  workflow: ProductFeature[];
  specs: ProductSpec[];
  applications: ProductFeature[];
}

export const productPages: ProductPageData[] = [
  {
    slug: "air-intelligent-software-engine",
    title: "AIR智能軟體引擎",
    metaTitle: "AIR智能軟體引擎 | AIeveR Robotics",
    metaDescription:
      "AIR智能軟體引擎是面向高階複雜場景的 3D 視覺與機械人感知方案，整合 AIR Vision、AIR Planner、AIR Calibrator 與 RobotScan。",
    eyebrow: "AIR 智能軟體引擎",
    subtitle: "面向高階複雜場景的 3D 視覺與機械人感知方案",
    description:
      "從系統硬件、成像到演算法源頭，全面優化系統精度，全端技術自主可控。",
    heroImage: "/images/products/air-intelligent-software-engine/hero-bg.png",
    heroImageAlt: "AIR智能軟體引擎 3D 視覺與機械人感知方案",
    tags: ["AIR Vision", "AIR Planner", "AIR Calibrator", "RobotScan"],
    features: [],
    workflow: [],
    specs: [],
    applications: [],
  },
  {
    slug: "air-calibrator-engine",
    title: "AIR Calibrator Engine",
    metaTitle: "AIR Calibrator Engine | AIeveR Robotics",
    metaDescription:
      "AIR Calibrator 是新一代智能手眼校準系統，整合引導式自動化手眼校準與機械人本體 DH 校正。",
    eyebrow: "新一代智能手眼校準系統",
    subtitle: "不止於校準，更賦予機械人「絕對精度」",
    description:
      "全球首款整合引導式自動化手眼校準與機械人本體 DH 校正的校準軟件，只需一台相機與一塊校準板，即可提升系統精度。",
    heroImage: "/images/products/air-calibrator-engine/hero-bg.png",
    heroImageAlt: "AIR Calibrator 手眼校準系統",
    tags: ["Camera Calibration", "Robot Hand-Eye", "Multi-sensor Alignment"],
    features: [
      {
        title: "低代碼標定流程",
        description:
          "用可視化步驟完成相機內外參、手眼標定、治具座標與產線座標轉換設定。",
      },
      {
        title: "多設備一致性管理",
        description:
          "支援多相機、多感測器與多機器人的座標關係維護，降低換線與維修後重調成本。",
      },
      {
        title: "現場校驗與追溯",
        description:
          "沉澱標定結果、誤差記錄和版本資訊，方便工程師做復核、回退與品質追蹤。",
      },
    ],
    workflow: [
      { title: "建立設備拓撲", description: "錄入相機、感測器、機器人和治具之間的安裝關係。" },
      { title: "采集標定資料", description: "按引導完成標定板、工件或特徵點資料采集。" },
      { title: "生成座標模型", description: "自動計算並保存多設備坐標轉換與誤差評估。" },
      { title: "部署到產線", description: "將標定結果同步給 AIR Vision、PLC 或機械人控制流程。" },
    ],
    specs: [
      { label: "適用對象", value: "2D/3D 相機、DepthSight、機械人、工裝治具" },
      { label: "核心能力", value: "相機標定、手眼標定、多座標系對齊" },
      { label: "部署方式", value: "工控機 / 工作站本地部署" },
      { label: "典型場景", value: "抓取、裝配、定位、量測前校準" },
    ],
    applications: [
      { title: "機器人導引", description: "為抓取、放置、打磨和裝配任務提供穩定座標轉換。" },
      { title: "精密量測", description: "保障相機和 3D 感測器輸出結果在同一工件坐標下可比對。" },
      { title: "產線換型", description: "快速恢復換線、維修、改造後的視覺系統精度。" },
    ],
  },
  {
    slug: "air-planner-engine",
    title: "AIR Planner Engine",
    metaTitle: "AIR Planner Engine | AIeveR Robotics",
    metaDescription:
      "AIR Planner Engine 是面向機器人視覺導引、軌跡生成和任務編排的智能規劃引擎。",
    eyebrow: "AIR 智能軟體引擎",
    subtitle: "視覺驅動的任務規劃與機器人軌跡引擎",
    description:
      "把視覺感知結果轉換成可執行的機器人任務、抓取位姿和運動策略，支撐柔性產線快速部署。",
    heroImage: "/applications/flexible-robot-vision/polishing-trajectory/product.png",
    heroImageAlt: "機器人視覺導引與軌跡規劃示意",
    tags: ["Task Planning", "Trajectory", "Robot Guidance"],
    features: [
      {
        title: "視覺結果到動作",
        description:
          "接收 2D/3D 視覺定位、點雲和檢測結果，生成抓取、打磨、掃描或裝配動作。",
      },
      {
        title: "工藝流程編排",
        description:
          "把多個視覺節點、工藝節點和機器人節點串成可重用的任務模板。",
      },
      {
        title: "風險與邊界管理",
        description:
          "在規劃階段考慮可達性、碰撞、節拍和工藝約束，減少現場反覆調試。",
      },
    ],
    workflow: [
      { title: "導入視覺結果", description: "接入 AIR Vision 或 DepthSight 產生的定位與點雲資訊。" },
      { title: "設定工藝策略", description: "配置抓取點、加工路徑、避障區域與節拍目標。" },
      { title: "生成任務序列", description: "輸出機器人可執行的位姿、路徑和流程節點。" },
      { title: "在線微調", description: "結合現場反饋做參數修正，形成可復用方案。" },
    ],
    specs: [
      { label: "適用對象", value: "六軸機械人、協作機械人、龍門/直線模組" },
      { label: "輸入資料", value: "視覺定位、點雲、檢測結果、工藝約束" },
      { label: "輸出內容", value: "任務序列、抓取位姿、加工軌跡、流程參數" },
      { label: "典型場景", value: "打磨軌跡、抓取上下料、掃描路徑、裝配導引" },
    ],
    applications: [
      { title: "打磨軌跡規劃", description: "根據工件邊界和表面特徵生成機器人加工軌跡。" },
      { title: "柔性上下料", description: "根據不同姿態和堆疊狀態規劃抓取與放置流程。" },
      { title: "視覺掃描", description: "為多角度掃描和檢測任務生成穩定運動路徑。" },
    ],
  },
  {
    slug: "air-picking-station",
    title: "AIR Picking Station",
    metaTitle: "AIR Picking Station | AIeveR Robotics",
    metaDescription:
      "AIR Picking Station 是面向無序抓取、分揀和上下料場景的標準化視覺工作站。",
    eyebrow: "標準工作站",
    subtitle: "面向無序抓取與柔性上下料的標準工作站",
    description:
      "集成 3D 感測、AI 視覺算法、抓取規劃和機器人通訊，把散亂物料識別、定位和抓取流程標準化。",
    heroImage: "/applications/flexible-robot-vision/robot-pick-and-place/hero.png",
    heroImageAlt: "機器人抓取上下料工作站示意",
    tags: ["Bin Picking", "Robot Guidance", "Flexible Loading"],
    features: [
      {
        title: "散亂物料識別",
        description:
          "針對堆疊、遮擋和姿態多變的物料完成可抓取目標檢出與排序。",
      },
      {
        title: "抓取位姿生成",
        description:
          "結合點雲、夾具模型和碰撞約束，生成穩定抓取點與機械人執行位姿。",
      },
      {
        title: "標準化集成",
        description:
          "工作站預留感測器、光源、機器人和 PLC 接口，縮短現場導入周期。",
      },
    ],
    workflow: [
      { title: "感測采集", description: "DepthSight 采集料框、托盤或輸送線上的 3D 資料。" },
      { title: "目標識別", description: "AIR Vision 分割物料並判斷可抓取候選。" },
      { title: "抓取規劃", description: "AIR Planner 輸出抓取位姿、避障路徑與放置策略。" },
      { title: "產線閉環", description: "與 PLC、機械人和上位系統完成狀態交互。" },
    ],
    specs: [
      { label: "工作對象", value: "料框、托盤、輸送線散件" },
      { label: "核心配置", value: "DepthSight + AIR Vision + 機器人接口" },
      { label: "部署形態", value: "標準工作站 / 產線單元集成" },
      { label: "典型節點", value: "識別、定位、抓取、放置、狀態回傳" },
    ],
    applications: [
      { title: "無序抓取", description: "處理散亂堆疊、姿態不固定的零件上料任務。" },
      { title: "柔性分揀", description: "按照種類、姿態、位置或檢測結果分流物料。" },
      { title: "產線上下料", description: "替代人工完成重複抓取、轉運和投料動作。" },
    ],
  },
  {
    slug: "robot-scan-station",
    title: "Robot Scan Station",
    metaTitle: "Robot Scan Station | AIeveR Robotics",
    metaDescription:
      "Robot Scan Station 是面向大尺寸、多角度工件檢測與 3D 掃描的標準化工作站。",
    eyebrow: "標準工作站",
    subtitle: "機器人多視角掃描與 3D 檢測工作站",
    description:
      "以機器人帶動 3D 感測器完成多視角采集，支撐大尺寸工件、複雜曲面和多點位檢測任務。",
    heroImage: "/applications/precision-3d-detection/hero.png",
    heroImageAlt: "高精度 3D 檢測與測量場景",
    tags: ["3D Scan", "Inspection", "Robot Cell"],
    features: [
      {
        title: "多視角掃描",
        description:
          "規劃感測器運動姿態，從多角度采集工件表面與關鍵特徵。",
      },
      {
        title: "點雲拼接與檢測",
        description:
          "結合標定與視覺算法，形成完整點雲並完成尺寸、形貌或缺陷分析。",
      },
      {
        title: "標準工作站交付",
        description:
          "將機器人、感測器、控制櫃和安全單元封裝成可落地的產線檢測單元。",
      },
    ],
    workflow: [
      { title: "工件定位", description: "識別工件姿態並確認掃描起點與安全範圍。" },
      { title: "路徑生成", description: "按檢測面和遮擋情況生成多視角掃描路徑。" },
      { title: "點雲融合", description: "對多次采集資料做配準、融合與品質檢查。" },
      { title: "結果輸出", description: "輸出尺寸、缺陷、通過/不通過和追溯資料。" },
    ],
    specs: [
      { label: "工作對象", value: "大尺寸零件、曲面件、裝配件" },
      { label: "核心配置", value: "機器人 + DepthSight + AIR Calibrator" },
      { label: "檢測能力", value: "尺寸、形貌、孔位、邊緣、缺陷" },
      { label: "典型行業", value: "汽車、新能源、3C、金屬加工" },
    ],
    applications: [
      { title: "大件全檢", description: "對大尺寸工件進行多點位、多角度自動掃描。" },
      { title: "曲面測量", description: "對自由曲面、焊縫、邊緣和裝配面進行檢測。" },
      { title: "產線抽檢", description: "支撐批量生產中的節拍化掃描與品質追溯。" },
    ],
  },
  {
    slug: "air-vision-pro-station",
    title: "AIR Vision Pro Station",
    metaTitle: "AIR Vision Pro Station | AIeveR Robotics",
    metaDescription:
      "AIR Vision Pro Station 是集成 AIR Vision 視覺算法平台、DepthSight 感測與工業控制的專業視覺工作站。",
    eyebrow: "標準工作站",
    subtitle: "面向專業視覺算法部署與產線集成的工作站",
    description:
      "把 AIR Vision 視覺算法、相機/3D 感測器接入、流程編排、模型管理與現場通訊封裝到標準工作站中，降低從方案驗證到產線落地的難度。",
    heroImage: "/images/products/air-vision-engine/group48-hero-cover.png",
    heroImageAlt: "AIR Vision Pro Station 視覺工作站示意",
    tags: ["AIR Vision", "Industrial Workstation", "Vision Deployment"],
    features: [
      {
        title: "算法部署中樞",
        description:
          "集中承載 AIR Vision 流程、模型、相機配置和項目版本，方便工程團隊維護。",
      },
      {
        title: "硬體預集成",
        description:
          "預留相機、3D 感測器、光源、I/O 和網路接口，減少現場配線與環境適配工作。",
      },
      {
        title: "產線通訊閉環",
        description:
          "支援與 PLC、機械人、MES 或上位系統交換任務、狀態與檢測結果。",
      },
    ],
    workflow: [
      { title: "導入專案", description: "將 AIR Vision 流程、模型與參數載入工作站。" },
      { title: "連接設備", description: "配置相機、DepthSight、光源、PLC 和機械人通訊。" },
      { title: "現場調試", description: "完成標定、節拍測試、誤差校驗和異常處理規則。" },
      { title: "穩定運行", description: "在工作站內監控流程狀態、結果記錄和版本追溯。" },
    ],
    specs: [
      { label: "軟體平台", value: "AIR Vision Engine" },
      { label: "硬體接入", value: "2D/3D 相機、DepthSight、光源、I/O" },
      { label: "集成對象", value: "PLC、機械人、MES、上位機" },
      { label: "部署場景", value: "產線視覺檢測、定位、導引和測量" },
    ],
    applications: [
      { title: "算法驗證", description: "快速把 Figma/方案階段的視覺流程落成可演示工作站。" },
      { title: "產線部署", description: "作為現場視覺中控單元接入自動化產線。" },
      { title: "多設備協同", description: "承載多相機、多感測器和機械人任務的集中管理。" },
    ],
  },
];

export const productPageSlugs = productPages.map((page) => page.slug);

export function getProductPage(slug: string): ProductPageData | undefined {
  return productPages.find((page) => page.slug === slug);
}
