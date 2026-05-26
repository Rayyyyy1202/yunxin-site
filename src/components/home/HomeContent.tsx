"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";
import StitchAnimation from "./StitchAnimation";
import HeroSection from "./HeroSection";
import EmbodiedPerception from "./EmbodiedPerception";
import ProductShowcase from "./ProductShowcase";
import ApplicationsGrid from "./ApplicationsGrid";
import ResourceCenter from "./ResourceCenter";
import NewsPreview from "./NewsPreview";
import PartnersSection from "./PartnersSection";
import CTASection from "./CTASection";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;
const INTRO_VIDEO_SRC = "/videos/home/intro/opening.mp4";

declare global {
  interface Window {
    __yunxinHomeIntroEntered?: boolean;
  }
}

interface HomeContentProps {
  locale?: Locale;
}

function hasEnteredHomeIntro() {
  return (
    typeof window !== "undefined" && window.__yunxinHomeIntroEntered === true
  );
}

export default function HomeContent({
  locale = DEFAULT_LOCALE,
}: HomeContentProps) {
  const [entered, setEntered] = useState(() => hasEnteredHomeIntro());
  const [introComplete, setIntroComplete] = useState(() =>
    hasEnteredHomeIntro(),
  );
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const newsPartnersBg = useSiteImage("/images/home/news-partners-bg.jpg");

  // Mark the initial history entry on mount so popstate can distinguish it.
  useEffect(() => {
    window.history.replaceState({ gateway: !hasEnteredHomeIntro() }, "");
  }, []);

  const handleEnter = useCallback(() => {
    if (entered) return;
    window.__yunxinHomeIntroEntered = true;
    window.history.pushState({ gateway: false }, "");
    setEntered(true);
  }, [entered]);

  const finishIntro = useCallback(() => {
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (entered || introComplete) return;

    const video = introVideoRef.current;
    if (!video) return;

    let cancelled = false;

    const playIntro = async () => {
      video.muted = false;
      video.volume = 1;

      try {
        await video.play();
      } catch {
        if (cancelled) return;

        video.defaultMuted = true;
        video.muted = true;

        try {
          await video.play();
        } catch {
          if (!cancelled) finishIntro();
        }
      }
    };

    void playIntro();

    return () => {
      cancelled = true;
    };
  }, [entered, finishIntro, introComplete]);

  // Listen for browser back (popstate) to restore the gateway.
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (e.state?.gateway === true) {
        setEntered(false);
        setIntroComplete(true);
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
      {/* Full-screen intro video */}
      <AnimatePresence>
        {!entered && !introComplete && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: SMOOTH_EASE }}
            className="fixed inset-0 z-[80] bg-bg-primary"
          >
            <video
              ref={introVideoRef}
              aria-label="AIeveR Robotics opening animation"
              autoPlay
              playsInline
              controls={false}
              preload="auto"
              className="h-full w-full object-cover"
              onEnded={finishIntro}
              onError={finishIntro}
            >
              <source src={INTRO_VIDEO_SRC} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen gateway */}
      <AnimatePresence>
        {!entered && introComplete && (
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
        <ProductShowcase locale={locale} />
        <ApplicationsGrid />
        <ResourceCenter />
        {/* News + Partners shared background */}
        <section className="relative isolate overflow-hidden bg-bg-primary">
          <Image
            src={newsPartnersBg}
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
