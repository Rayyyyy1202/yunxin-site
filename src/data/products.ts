export interface ProductItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

export const products: ProductItem[] = [
  {
    number: "01",
    title: "Embodied Intelligence",
    subtitle: "具身智能3D視覺感測器產品線",
    description: "面向通用的具身感知操作智能",
    image: "/images/home/group-243/product-embodied-visual.png",
    href: "/products/depthsight/embodied-intelligence",
  },
  {
    number: "02",
    title: "DepthSight產品線",
    subtitle: "——高性能3D感測器",
    description: "面向工業的具身操作智能",
    image: "/images/home/group-243/product-depthsight-visual.png",
    href: "/products/depthsight/line",
  },
  {
    number: "03",
    title: "AIR智能軟體引擎",
    subtitle: "—— 智能視覺平臺",
    description: "讓機器\"看懂\"並\"做到\"",
    image: "/images/home/group-243/product-air-visual.png",
    href: "/products/air-intelligent-software-engine",
  },
];

export interface ApplicationItem {
  id: string;
  title: string;
  imageSrc: string;
  href?: string;
}

export const applications: ApplicationItem[] = [
  {
    id: "app-automotive",
    title: "汽車製造",
    imageSrc: "/images/home/group-243/industry-automotive.png",
    href: "/applications/high-flexibility-active-3d-workstation",
  },
  {
    id: "app-new-energy",
    title: "新能源電池",
    imageSrc: "/images/home/group-243/industry-new-energy.png",
    href: "/applications/precision-3d-detection",
  },
  {
    id: "app-electronics",
    title: "3C電子",
    imageSrc: "/images/home/group-243/industry-3c.png",
    href: "/applications/precision-3d-detection",
  },
  {
    id: "app-logistics",
    title: "物流倉儲",
    imageSrc: "/images/home/group-243/industry-logistics.png",
  },
  {
    id: "app-inspection",
    title: "工業檢測",
    imageSrc: "/images/home/group-243/industry-inspection.png",
    href: "/applications/precision-3d-detection",
  },
  {
    id: "app-education",
    title: "科研教育",
    imageSrc: "/images/home/group-243/industry-research.png",
  },
];
