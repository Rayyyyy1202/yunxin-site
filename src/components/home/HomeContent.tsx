"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import StitchAnimation from "./StitchAnimation";
import HeroSection from "./HeroSection";
import EmbodiedPerception from "./EmbodiedPerception";
import ProductShowcase from "./ProductShowcase";
import ApplicationsGrid from "./ApplicationsGrid";
import ResourceCenter from "./ResourceCenter";
import NewsPreview from "./NewsPreview";
import PartnersSection from "./PartnersSection";
import CTASection from "./CTASection";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function HomeContent() {
  const [entered, setEntered] = useState(false);

  // Mark the initial history entry on mount so popstate can distinguish it.
  useEffect(() => {
    window.history.replaceState({ gateway: true }, "");
  }, []);

  const handleEnter = useCallback(() => {
    if (entered) return;
    window.history.pushState({ gateway: false }, "");
    setEntered(true);
  }, [entered]);

  // Listen for browser back (popstate) to restore the gateway.
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (e.state?.gateway === true) {
        setEntered(false);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Lock body scroll while the gateway is active.
  useEffect(() => {
    const cls = "is-gateway-locked";
    if (!entered) {
      document.documentElement.classList.add(cls);
    } else {
      document.documentElement.classList.remove(cls);
    }
    return () => {
      document.documentElement.classList.remove(cls);
    };
  }, [entered]);

  return (
    <>
      {/* Full-screen gateway */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="gateway"
            exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: SMOOTH_EASE }}
            className="fixed inset-0 z-[70] bg-bg-primary"
          >
            <StitchAnimation gateway onPanelClick={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main homepage (revealed after click) */}
      <div
        style={{
          opacity: entered ? 1 : 0,
          transition: "opacity 1s ease",
          transitionDelay: entered ? "0.5s" : "0s",
        }}
      >
        <HeroSection />
        <EmbodiedPerception />
        <ProductShowcase />
        <ApplicationsGrid />
        <ResourceCenter />
        {/* News + Partners shared background */}
        <section className="relative isolate overflow-hidden bg-bg-primary">
          <Image
            src="/images/home/news-partners-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,14,16,0.75) 0%, rgba(13,14,16,0.55) 50%, rgba(13,14,16,0.75) 100%)",
            }}
          />
          <div className="relative z-10">
            <NewsPreview />
            <PartnersSection />
          </div>
        </section>
        <CTASection />
      </div>
    </>
  );
}
