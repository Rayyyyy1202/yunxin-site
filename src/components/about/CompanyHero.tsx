"use client";

import Image from "next/image";
import { useSiteImage } from "@/components/SiteImageProvider";
import { aboutContent } from "@/data/about-content";

export default function CompanyHero() {
  const { hero } = aboutContent;
  const bg = useSiteImage(hero.backgroundSrc);

  return (
    <section className="w-full bg-bg-primary pt-16 md:pt-20">
      <Image
        src={bg}
        alt="AIeveR Robotics global network company introduction"
        width={1280}
        height={720}
        preload
        sizes="100vw"
        className="block h-auto w-full object-contain"
      />
    </section>
  );
}
