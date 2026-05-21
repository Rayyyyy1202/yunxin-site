export interface NavItem {
  label: string;
  href: string;
  children?: NavMenuLink[];
  megaMenu?: NavMenuGroup[];
  menuOnly?: boolean;
}

export interface NavMenuGroup {
  label: string;
  items: NavMenuLink[];
}

export interface NavMenuLink {
  label: string;
  href?: string;
  disabled?: boolean;
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
  href?: string;
  externalUrl?: string;
  image: string;
  summary?: string;
  tags?: string[];
  featured?: boolean;
}

export interface CareerMetric {
  label: string;
  value: string;
}

export interface CareerDetail {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  workMode: string;
  experience: string;
  summary: string;
  heroImage: string;
  metrics: CareerMetric[];
  responsibilities: string[];
  requirements: string[];
  bonuses: string[];
  process: string[];
  applyHref: string;
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
