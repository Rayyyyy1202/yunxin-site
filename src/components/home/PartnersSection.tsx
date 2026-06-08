"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteCopy, useSiteImage } from "@/components/SiteImageProvider";

const partners = [
  {
    name: "合作伙伴 01",
    logo: "/images/home/partners/partner-01.png",
    width: 148,
    height: 180,
    className: "w-16 md:w-20",
  },
  {
    name: "合作伙伴 02",
    logo: "/images/home/partners/partner-02.png",
    width: 202,
    height: 180,
    className: "w-20 md:w-24",
  },
  {
    name: "理想汽车",
    logo: "/images/home/partners/li-auto.png",
    width: 900,
    height: 180,
    className: "w-48 md:w-64",
  },
  {
    name: "珞石机器人",
    logo: "/images/home/partners/rokae.png",
    width: 1153,
    height: 180,
    className: "w-56 md:w-72",
  },
];

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const title = useSiteCopy("home-partners-title", "信賴雲芯的合作夥伴");

  return (
    <div ref={ref} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.h2
          className="text-center text-2xl font-semibold uppercase tracking-[5px] text-text-primary md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-5 md:gap-7"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {partners.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  const logo = useSiteImage(partner.logo);

  return (
    <div className="flex h-24 items-center justify-center rounded-lg border border-white/10 bg-white/90 px-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 md:h-28 md:px-8">
      <Image
        src={logo}
        alt={partner.name}
        width={partner.width}
        height={partner.height}
        sizes="(min-width: 768px) 288px, 224px"
        className={`${partner.className} max-h-16 object-contain md:max-h-20`}
      />
    </div>
  );
}
