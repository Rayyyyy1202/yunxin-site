export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NewsItem {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  coverImage: string;
  content: string;
}

export interface CareerItem {
  id: string;
  title: string;
  location: string;
  type: string;
  externalUrl: string;
  image: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fileUrl?: string;
  fileSize?: string;
  version?: string;
  updatedAt: string;
}

export interface StitchPanelData {
  id: string;
  titleEn: string;
  titleCn: string;
  description: string;
  scanLabel: string;
  statusLabel: string;
  /** Full-bleed detail image shown when panel is active */
  detailImage: string;
}
