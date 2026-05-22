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
    id: "product-selection-manual",
    title: "AIeveR Robotics 產品選型手冊 20260515",
    category: "產品手冊",
    fileType: "PDF",
    fileSize: "42.41 MB · 待外部存儲",
    imageSrc: "/images/figma/lineup-card-depthsight-product-shot.png",
  },
  {
    id: "depthsight-a-series-quick-start",
    title: "DepthSight A 系列產品快速使用指南",
    category: "技術指南",
    fileType: "PDF",
    fileSize: "866 KB",
    href: "/resources/guides/depthsight-a-series-quick-start.pdf",
    imageSrc: "/images/figma/lineup-card-depthsight-product-shot.png",
  },
  {
    id: "depthsight-a-series-software-manual",
    title: "DepthSight A 系列軟件使用手冊",
    category: "技術指南",
    fileType: "PDF",
    fileSize: "920 KB",
    href: "/resources/guides/depthsight-a-series-software-manual.pdf",
    imageSrc: "/images/figma/lineup-card-depthsight-product-shot.png",
  },
  {
    id: "depthsight-a-series-communication-reference",
    title: "DepthSight A 系列通信庫參考手冊",
    category: "技術指南",
    fileType: "PDF",
    fileSize: "896 KB",
    href: "/resources/guides/depthsight-a-series-communication-library-reference.pdf",
    imageSrc: "/images/figma/lineup-card-depthsight-product-shot.png",
  },
  {
    id: "depthsight-l-series-quick-start",
    title: "DepthSight L 系列產品快速使用指南",
    category: "技術指南",
    fileType: "PDF",
    fileSize: "1.01 MB",
    href: "/resources/guides/depthsight-l-series-quick-start.pdf",
    imageSrc: "/images/series/line/hero-product.png",
  },
  {
    id: "depthsight-l-series-software-manual",
    title: "DepthSight L 系列軟件使用手冊",
    category: "技術指南",
    fileType: "PDF",
    fileSize: "2.96 MB",
    href: "/resources/guides/depthsight-l-series-software-manual.pdf",
    imageSrc: "/images/series/line/hero-product.png",
  },
  {
    id: "depthsight-l-series-communication-reference",
    title: "DepthSight L 系列通信庫參考手冊",
    category: "技術指南",
    fileType: "PDF",
    fileSize: "3.00 MB",
    href: "/resources/guides/depthsight-l-series-communication-library-reference.pdf",
    imageSrc: "/images/series/line/hero-product.png",
  },
  {
    id: "ce-emc-certification",
    title: "CE 安規 EMC 認證",
    category: "認證證書",
    fileType: "PDF",
    fileSize: "1.69 MB",
    href: "/resources/certifications/ce-emc-certification.pdf",
    imageSrc: "/images/figma/lineup-card-standard-workstation-bg.png",
  },
  {
    id: "fcc-safety-certification",
    title: "FCC 安規認證",
    category: "認證證書",
    fileType: "PDF",
    fileSize: "1.67 MB",
    href: "/resources/certifications/fcc-safety-certification.pdf",
    imageSrc: "/images/figma/lineup-card-standard-workstation-bg.png",
  },
  {
    id: "ds-l10140-accuracy-certification",
    title: "DS-L10140 精度認證",
    category: "認證證書",
    fileType: "PDF",
    fileSize: "536 KB",
    href: "/resources/certifications/ds-l10140-accuracy-certification.pdf",
    imageSrc: "/images/series/line/hero-product.png",
  },
  {
    id: "ds-l10400-accuracy-certification",
    title: "DS-L10400 精度認證",
    category: "認證證書",
    fileType: "PDF",
    fileSize: "535 KB",
    href: "/resources/certifications/ds-l10400-accuracy-certification.pdf",
    imageSrc: "/images/series/line/hero-product.png",
  },
  {
    id: "line-scan-camera-software",
    title: "3D 線激光相機產品軟件",
    category: "產品軟件",
    fileType: "ZIP",
    fileSize: "349.36 MB · 待外部存儲",
    imageSrc: "/images/figma/lineup-card-air-engine-bg.png",
  },
  {
    id: "area-scan-camera-software",
    title: "3D 面陣相機產品軟件",
    category: "產品軟件",
    fileType: "ZIP",
    fileSize: "66.79 MB · 待外部存儲",
    imageSrc: "/images/figma/lineup-card-air-engine-bg.png",
  },
  {
    id: "line-scan-camera-sdk-manual",
    title: "3D 線激光相機 SDK 說明手冊",
    category: "產品軟件",
    fileType: "ZIP",
    fileSize: "30.64 MB · 待外部存儲",
    imageSrc: "/images/figma/lineup-card-air-engine-bg.png",
  },
];
