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
    image: "/images/home/product-embodied.jpg",
    href: "/support/docs",
  },
  {
    number: "02",
    title: "DepthSight產品線",
    subtitle: "——高性能3D感測器",
    description: "面向工業的具身操作智能",
    image: "/images/home/product-depthsight.jpg",
    href: "/support/docs",
  },
  {
    number: "03",
    title: "AIR智能軟體引擎",
    subtitle: "—— 智能視覺平臺",
    description: "讓機器\"看懂\"並\"做到\"",
    image: "/images/home/product-air.jpg",
    href: "/products/air-intelligent-software-engine",
  },
];

export interface ApplicationItem {
  id: string;
  title: string;
  imageSrc: string;
}

export const applications: ApplicationItem[] = [
  {
    id: "app-automotive",
    title: "汽車製造",
    imageSrc: "/images/home/app-automotive.jpg",
  },
  {
    id: "app-new-energy",
    title: "新能源電池",
    imageSrc: "/images/home/app-new-energy.jpg",
  },
  {
    id: "app-electronics",
    title: "3C電子",
    imageSrc: "/images/home/app-electronics.jpg",
  },
  {
    id: "app-logistics",
    title: "物流倉儲",
    imageSrc: "/images/home/app-logistics.jpg",
  },
  {
    id: "app-inspection",
    title: "工業檢測",
    imageSrc: "/images/home/app-inspection.jpg",
  },
  {
    id: "app-education",
    title: "科研教育",
    imageSrc: "/images/home/app-education.jpg",
  },
];
