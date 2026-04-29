"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { stitchPanels } from "@/data/stitch-panels";
import { useSiteImage } from "@/components/SiteImageProvider";
import StitchPanel from "./StitchPanel";

// True geometric centroid x (as % of container width) of each panel's
// clipped trapezoid. Used both for label placement and for shifting
// each panel's source image so its centre lands inside the panel.
// Keep in sync with PANEL_RANGES.
const PANEL_CENTROID_X = [15.5, 50.5, 85] as const;
const PANEL_CENTERS = PANEL_CENTROID_X.map((x) => `${x}%`);

/**
 * Stitch three-panel showcase.
 *
 * Two modes:
 *   • **gateway** (prop `gateway={true}`): full-viewport landing page. Hover
 *     previews panels with directional wipes; clicking any panel triggers
 *     `onPanelClick` to enter the main site.
 *   • **inline** (default): normal section inside the page scroll.
 *
 * Based on Figma design ZYyUze1aay4WXY1j7Fiz75 nodes 222:292, Body-1/2/3.
 */

const SLANT = 8;

// Panel ranges are calibrated to the baked-in cuts in embodied-showcase.jpg.
// Measured cut positions (see /tmp/img-analyze): cut 1 at ~x=27% bottom /
// ~x=35% top; cut 2 at ~x=66% bottom / ~x=74% top — both share ~8% slant.
const PANEL_RANGES: Array<{ bottomStart: number; bottomEnd: number }> = [
  { bottomStart: 0, bottomEnd: 27 },
  { bottomStart: 27, bottomEnd: 66 },
  { bottomStart: 66, bottomEnd: 100 },
];

function buildClipPath(index: number): string {
  const { bottomStart, bottomEnd } = PANEL_RANGES[index];
  const isFirst = index === 0;
  const isLast = index === PANEL_RANGES.length - 1;
  // Outer edges of the leftmost / rightmost panels must stay flush with the
  // viewport (no slant), otherwise a black wedge appears in the corner.
  const topStart = isFirst ? bottomStart : Math.min(100, bottomStart + SLANT);
  const topEnd = isLast ? bottomEnd : Math.min(100, bottomEnd + SLANT);
  return `polygon(${topStart}% 0%, ${topEnd}% 0%, ${bottomEnd}% 100%, ${bottomStart}% 100%)`;
}

// Pre-compute static clip paths (one per panel, never changes)
const CLIP_PATHS = PANEL_RANGES.map((_, i) => buildClipPath(i));

const accentTeal = "#3ce0d0";
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

interface StitchAnimationProps {
  /** Full-viewport landing mode. */
  gateway?: boolean;
  /** Called when the user clicks a panel (gateway mode). */
  onPanelClick?: () => void;
}

export default function StitchAnimation({
  gateway = false,
  onPanelClick,
}: StitchAnimationProps) {
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [activationToken, setActivationToken] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const activate = (index: number) => {
    setActivationToken((t) => t + 1);
    setActivePanel(index);
  };

  // In gateway mode the section fills the entire viewport, so it's
  // always "in view" — skip the IntersectionObserver gate.
  const visible = gateway || isInView;

  return (
    <section
      ref={ref}
      id="explore"
      className={cn(
        "relative bg-bg-primary overflow-hidden",
        gateway && "h-full flex flex-col",
      )}
    >
      {/* Stage (desktop) */}
      <motion.div
        initial={visible ? false : { opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: visible ? 0 : 0.25 }}
        className={cn(
          "hidden md:block relative overflow-hidden",
          gateway
            ? "flex-1 w-full"
            : "w-full aspect-[5/4] max-h-[860px]",
        )}
        onMouseLeave={() => setActivePanel(null)}
      >
        {/* Base composite — three panels clipped into slanted slices.
            Ambient Ken Burns wraps all three for subtle life. */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {stitchPanels.map((panel, i) => (
            <FoldedSlice
              key={panel.id}
              panel={panel}
              index={i}
              dimmed={activePanel !== null && activePanel !== i}
            />
          ))}
        </motion.div>

        {/* Edge vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(13,14,16,0) 60%, rgba(13,14,16,0.45) 100%)",
          }}
        />

        {/* Folded-state overlays */}
        <AnimatePresence>
          {activePanel === null && (
            <motion.div
              key="folded-overlays"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: SMOOTH_EASE }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Brand watermark */}
              <div className="absolute top-8 left-8 md:top-10 md:left-10 text-text-primary/90 select-none">
                <div className="text-sm md:text-base font-semibold tracking-wide">
                  AIeveR Robotics Limited
                </div>
                <div className="text-[10px] md:text-xs text-text-secondary tracking-[6px] mt-0.5">
                  雲 芯 機 器 人 有 限 公 司
                </div>
              </div>

              {/* EXPLORE INTELLIGENCE caption */}
              <div className="absolute bottom-10 md:bottom-14 left-0 right-0 flex justify-center">
                <span className="text-text-secondary text-[10px] md:text-xs uppercase tracking-[10px] md:tracking-[14px] font-light">
                  E X P L O R E &nbsp; I N T E L L I G E N C E
                </span>
              </div>

              {/* Per-panel titles — centred on each slanted slice. */}
              <div className="absolute inset-0">
                {stitchPanels.map((panel, i) => (
                  <div
                    key={panel.id}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{ left: PANEL_CENTERS[i] }}
                  >
                    <span className="block text-purple-light text-[10px] uppercase tracking-[3px] font-bold">
                      {panel.titleEn}
                    </span>
                    <h3 className="mt-2 text-text-primary text-2xl md:text-3xl font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                      {panel.titleCn}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden opacity-[0.07] pointer-events-none">
                <div
                  className="absolute inset-x-0 h-[2px] animate-scan-line"
                  style={{ background: `linear-gradient(90deg, transparent, ${accentTeal}, transparent)` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded detail overlay */}
        <AnimatePresence mode="popLayout">
          {activePanel !== null && (
            <ExpandedPanel
              key={`${stitchPanels[activePanel].id}-${activationToken}`}
              panel={stitchPanels[activePanel]}
              index={activePanel}
            />
          )}
        </AnimatePresence>

        {/* Panel boundary divider lines — SVG with non-uniform scaling so the
            diagonal stays locked to the clip-path cut regardless of container
            aspect ratio. The viewBox uses the same 0–100 % space as the panel
            polygons so the two definitions cannot drift apart. */}
        <svg
          aria-hidden
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        >
          <defs>
            <linearGradient id="stitch-divider-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentTeal} stopOpacity="0" />
              <stop offset="30%" stopColor={accentTeal} stopOpacity="1" />
              <stop offset="70%" stopColor={accentTeal} stopOpacity="1" />
              <stop offset="100%" stopColor={accentTeal} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[1, 2].map((i) => {
            const bottomX = PANEL_RANGES[i].bottomStart;
            const topX = bottomX + SLANT;
            return (
              <line
                key={i}
                x1={topX}
                y1={0}
                x2={bottomX}
                y2={100}
                stroke="url(#stitch-divider-fade)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                opacity={0.3}
              />
            );
          })}
        </svg>

        {/* Hover + click zones */}
        {stitchPanels.map((panel, index) => (
          <button
            type="button"
            key={panel.id}
            aria-label={
              gateway
                ? `进入 ${panel.titleCn}`
                : `预览 ${panel.titleCn}`
            }
            onMouseEnter={() => activate(index)}
            onFocus={() => activate(index)}
            onClick={(e) => {
              e.stopPropagation();
              onPanelClick?.();
            }}
            onBlur={(e) => {
              const related = e.relatedTarget instanceof Node ? e.relatedTarget : null;
              if (!e.currentTarget.parentElement?.contains(related)) {
                setActivePanel(null);
              }
            }}
            className="absolute inset-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-inset z-20"
            style={{
              clipPath: CLIP_PATHS[index],
              WebkitClipPath: CLIP_PATHS[index],
            }}
          />
        ))}
      </motion.div>

      {/* Mobile stacked cards */}
      <div
        className={cn(
          "md:hidden flex flex-col gap-4 px-6",
          gateway ? "flex-1 justify-center py-6" : "pb-16",
        )}
      >
        {stitchPanels.map((panel, index) => (
          <motion.div
            key={panel.id}
            initial={visible ? false : { opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            onClick={(e) => {
              e.stopPropagation();
              onPanelClick?.();
            }}
            className={onPanelClick ? "cursor-pointer" : undefined}
          >
            <StitchPanel data={panel} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FoldedSlice — one source image clipped into its panel polygon      */
/* ------------------------------------------------------------------ */

interface FoldedSliceProps {
  panel: (typeof stitchPanels)[number];
  index: number;
  dimmed: boolean;
}

function FoldedSlice({ panel, index, dimmed }: FoldedSliceProps) {
  const src = useSiteImage(panel.detailImage);
  // Shift the image so its centre aligns with the panel centroid — without
  // this, panel 0 / panel 2 only show the leftmost / rightmost slice of
  // their source image and the subject gets cropped away.
  const shiftXPercent = PANEL_CENTROID_X[index] - 50;
  return (
    <div
      aria-hidden
      className="absolute inset-0 transition-opacity duration-500"
      style={{
        clipPath: CLIP_PATHS[index],
        WebkitClipPath: CLIP_PATHS[index],
        opacity: dimmed ? 0.35 : 1,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ transform: `translateX(${shiftXPercent}%)` }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 34vw"
          className="object-cover"
          style={{ objectPosition: `center ${index === 1 ? "15%" : "center"}` }}
        />
      </div>
      {/* Tone overlay so folded tiles read as one composite */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,14,16,0.15) 0%, rgba(13,14,16,0.05) 45%, rgba(13,14,16,0.6) 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ExpandedPanel (directional wipe)                                   */
/* ------------------------------------------------------------------ */

interface ExpandedPanelProps {
  panel: (typeof stitchPanels)[number];
  index: number;
}

// Wipe start: zero-width slanted line matching panel SLANT angle
const WIPE_START_CLIP_PATHS: readonly string[] = [
  // Panel 0 (具身感知): collapsed slant line at left edge
  `polygon(${SLANT}% 0%, ${SLANT}% 0%, 0% 100%, 0% 100%)`,
  // Panel 1 (具身操作): collapsed slant line at center
  `polygon(${50 + SLANT}% 0%, ${50 + SLANT}% 0%, 50% 100%, 50% 100%)`,
  // Panel 2 (具身移动): collapsed slant line at right edge
  `polygon(${100 + SLANT}% 0%, ${100 + SLANT}% 0%, 100% 100%, 100% 100%)`,
];

// Wipe end: full coverage with slanted edges (overflow clips naturally)
const WIPE_END_CLIP_PATHS: readonly string[] = [
  // Panel 0: left→right, leading edge overshoots right with slant
  `polygon(0% 0%, ${100 + SLANT}% 0%, 100% 100%, 0% 100%)`,
  // Panel 1: center→out, both edges expand symmetrically
  `polygon(0% 0%, ${100 + SLANT + SLANT}% 0%, ${100 + SLANT}% 100%, -${SLANT}% 100%)`,
  // Panel 2: right→left, leading edge overshoots left with slant
  `polygon(0% 0%, ${100 + SLANT}% 0%, 100% 100%, -${SLANT}% 100%)`,
];

function ExpandedPanel({ panel, index }: ExpandedPanelProps) {
  const startClip = WIPE_START_CLIP_PATHS[index] ?? WIPE_END_CLIP_PATHS[0];
  const endClip = WIPE_END_CLIP_PATHS[index] ?? WIPE_END_CLIP_PATHS[0];
  const detailSrc = useSiteImage(panel.detailImage);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASE }}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      {/* Directional wipe */}
      <motion.div
        initial={{ clipPath: startClip }}
        animate={{ clipPath: endClip }}
        transition={{ duration: 1.1, ease: SMOOTH_EASE }}
        className="absolute inset-0"
        style={{ willChange: "clip-path" }}
      >
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: SMOOTH_EASE }}
          className="absolute inset-0"
        >
          <Image
            src={detailSrc}
            alt={panel.titleCn}
            fill
            sizes="100vw"
            className="object-cover"
            style={index === 1 ? { objectPosition: "center 15%" } : undefined}
            priority
          />
        </motion.div>

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,14,16,0.25) 0%, rgba(13,14,16,0.08) 40%, rgba(13,14,16,0.7) 100%)",
          }}
        />
      </motion.div>

      {/* Brand watermark — comes in shortly after the wipe begins */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE, delay: 0.15 }}
        className="absolute top-8 left-8 md:top-10 md:left-10 text-text-primary/90 select-none"
      >
        <div className="text-sm md:text-base font-semibold tracking-wide">
          AIeveR Robotics Limited
        </div>
        <div className="text-[10px] md:text-xs text-text-secondary tracking-[6px] mt-0.5">
          雲 芯 機 器 人 有 限 公 司
        </div>
      </motion.div>

      {/* Active-panel title — matches the folded-state label so the text
          inside the animation stays consistent with what surrounds it. */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE, delay: 0.15 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <span className="block text-purple-light text-[11px] md:text-xs uppercase tracking-[3px] font-bold">
          {panel.titleEn}
        </span>
        <h3 className="mt-2 text-text-primary text-3xl md:text-5xl font-bold drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]">
          {panel.titleCn}
        </h3>
      </motion.div>

      {/* EXPLORE INTELLIGENCE caption */}
      <motion.div
        initial={{ opacity: 0, letterSpacing: "6px" }}
        animate={{ opacity: 1, letterSpacing: "14px" }}
        transition={{ duration: 1, ease: SMOOTH_EASE, delay: 1 }}
        className="absolute bottom-10 md:bottom-14 left-0 right-0 flex justify-center"
      >
        <span className="text-text-secondary text-[10px] md:text-xs uppercase font-light">
          EXPLORE &nbsp; INTELLIGENCE
        </span>
      </motion.div>
    </motion.div>
  );
}
