export const resourceCenterCategories = [
  "產品軟件",
  "產品手冊",
  "技術指南",
  "認證證書",
] as const;

export type ResourceCenterCategory = (typeof resourceCenterCategories)[number];

export interface ResourceCenterItem {
  id: string;
  title: string;
  category: ResourceCenterCategory;
  fileType: string;
  fileSize: string;
  href?: string;
  imageSrc?: string;
}

export const resourceCenterItems: ResourceCenterItem[] = [
  {
    id: "depthsight-a-series-product",
    title: "DepthSight - A系列工业级面阵3D相机产品",
    category: "產品手冊",
    fileType: "PDF",
    fileSize: "1.01 mb",
    imageSrc: "/images/figma/lineup-card-depthsight-product-shot.png",
  },
  {
    id: "depthsight-line-series-product",
    title: "DepthSight - Line系列線激光3D相機產品",
    category: "產品手冊",
    fileType: "PDF",
    fileSize: "1.01 mb",
    imageSrc: "/images/series/line/hero-product.png",
  },
  {
    id: "depthsight-advanced-series-product",
    title: "DepthSight - Advanced系列高精度3D相機產品",
    category: "產品手冊",
    fileType: "PDF",
    fileSize: "1.01 mb",
    imageSrc: "/images/series/advanced/hero-product.png",
  },
  {
    id: "air-vision-engine-software",
    title: "AIR Vision Engine 產品軟件安裝包",
    category: "產品軟件",
    fileType: "ZIP",
    fileSize: "待提供",
    imageSrc: "/images/figma/lineup-card-air-engine-bg.png",
  },
  {
    id: "air-picking-station-guide",
    title: "AIR Picking Station 集成部署技術指南",
    category: "技術指南",
    fileType: "PDF",
    fileSize: "待提供",
    imageSrc: "/images/products/air-picking-station/hero-bg.png",
  },
  {
    id: "depthsight-certificates",
    title: "DepthSight 系列認證證書與合規資料",
    category: "認證證書",
    fileType: "PDF",
    fileSize: "待提供",
    imageSrc: "/images/figma/lineup-card-standard-workstation-bg.png",
  },
];
