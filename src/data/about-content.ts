/**
 * Centralized content for the "About Us" page.
 *
 * Text and image-slot IDs live here so copy and art direction can be
 * updated independently of component markup.
 *
 * Image paths are consumed by components through `useSiteImage()` — the
 * admin panel (see `src/data/site-images.ts`) can swap any `defaultSrc`
 * at runtime without code changes.
 */

export interface AboutHeroContent {
  eyebrow: string;
  title: string;
  titleLines?: string[][];
  description: string;
  descriptionLines?: string[];
  /** Background network/map image slot. */
  backgroundSrc: string;
}

export interface AboutCompanyIntroContent {
  title: string;
  paragraphs: string[];
  /** Full-width background (HK Science Park / facility exterior). */
  backgroundSrc: string;
}

export interface MissionVisionItem {
  index: string;
  label: string;
  body: string;
}

export interface AboutMissionVisionContent {
  eyebrow: string;
  title: string;
  /** Scenic background (mountains / landscape). */
  backgroundSrc: string;
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

export interface PatentAwardItem {
  id: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
}

export interface AboutPatentsAwardsContent {
  titleZh: string;
  titleEn: string;
  items: PatentAwardItem[];
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  companyIntro: AboutCompanyIntroContent;
  missionVision: AboutMissionVisionContent;
  patentsAwards: AboutPatentsAwardsContent;
}

export const aboutContent: AboutPageContent = {
  hero: {
    eyebrow: "◇ Embodied Intelligence v2.0",
    title: "源自香港，智連大陸，視達全球",
    titleLines: [["源自香港，"], ["智連大陸，", "視達全球"]],
    description:
      "以香港為窗口吸納全球前沿技術，以內地市場為根基深度賦能中國智造，以國際化視野服務全球客戶。",
    descriptionLines: [
      "以香港為窗口吸納全球前沿技術，以內地市場為根基",
      "深度賦能中國智造，以國際化視野服務全球客戶。",
    ],
    backgroundSrc: "/images/about/company-hero-image76.png",
  },

  companyIntro: {
    title: "雲芯機械人有限公司",
    paragraphs: [
      "雲芯機械人有限公司（AleveR Robotics Limited）於香港成立，為InnoHK香港物流機械人中心之孵化企業，由世界頂尖機械人專家、香港工程院院士劉雲輝教授領銜，深耕具身智能領域，致力為機械人提供通用具身操作智能技術及產品，推動機械人技術由「感知」至「操作」再至「移動」之全維度突破。",
      "公司構建由晶片、嵌入式模組至感知演算法、AI模型，再至機械人本體之全棧自研體系，以3D視覺感測器、智能軟件及機械人本體為核心，系統性攻克高反光、黑色吸光、透明物件等工業視覺難題，實現機械人於複雜環境中之「精準感知、智能決策、柔順執行」，形成具身感知、具身操作、具身移動三大範疇協同發展之核心格局。",
      "公司匯聚香港中文大學、浙江大學、哈爾濱工業大學、武漢大學、電子科技大學等頂尖院校之博士精英團隊，於AI、機械視覺、運動控制、機械人本體設計等領域擁有深厚技術積累，核心成員均具備多年行業研發及應用經驗。憑藉自研底層技術及核心部件構建高壁壘之競爭優勢，已獲香港特區政府RAISe+資助、香港科學園科創培育計劃支持，並完成由聯想創投領投之天使輪融資，榮獲日內瓦國際發明展金獎，彰顯公司於具身智能領域之技術實力及業界認可度。",
    ],
    backgroundSrc: "/images/about/company-intro-bg-figma.png",
  },

  missionVision: {
    eyebrow: "◇ Embodied Intelligence v2.0",
    title: "使命與願景",
    backgroundSrc: "/images/about/mission-vision-bg-figma.png",
    mission: {
      index: "01",
      label: "使命",
      body: "通過多維視覺與人工智慧的融合，賦能合作夥伴集群，將精準、可靠、智能的感知能力，轉化為各行各業超額價值的生產力。",
    },
    vision: {
      index: "02",
      label: "願景",
      body: "成為全球多維視覺通用具身操作智能的領導者。",
    },
  },

  patentsAwards: {
    titleZh: "專利與榮譽",
    titleEn: "PATENTS AND AWARDS",
    items: [
      {
        id: "geneva-diploma",
        caption: "48屆國際日內瓦發明展金獎",
        imageSrc: "/images/about/patent-diploma.png",
        imageAlt: "日內瓦國際發明展金獎證書 DIPLÔME",
      },
      {
        id: "patents-20plus",
        caption: "20+篇專利",
        imageSrc: "/images/about/patent-document.png",
        imageAlt: "短期專利證書",
      },
    ],
  },
};
