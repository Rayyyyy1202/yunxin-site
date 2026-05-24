"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { stitchPanels } from "@/data/stitch-panels";
import { useSiteImage } from "@/components/SiteImageProvider";
import StitchPanel from "./StitchPanel";

// Keep centroid values aligned with PANEL_RANGES so labels and shifted images
// land in the visual centre of each slanted slice.
const PANEL_CENTROID_X = [17, 51.5, 84.5] as const;
const PANEL_CENTERS = PANEL_CENTROID_X.map((x) => `${x}%`);
const PANEL_OBJECT_POSITIONS = ["center 40%", "center 34%", "center 42%"] as const;
const FOLDED_IMAGE_SHIFT_X = [0, 0, 4] as const;

const SLANT = 6.5;
const PANEL_RANGES: Array<{ bottomStart: number; bottomEnd: number }> = [
  { bottomStart: 0, bottomEnd: 31 },
  { bottomStart: 31, bottomEnd: 66 },
  { bottomStart: 66, bottomEnd: 100 },
];

function buildClipPath(index: number): string {
  const { bottomStart, bottomEnd } = PANEL_RANGES[index];
  const isFirst = index === 0;
  const isLast = index === PANEL_RANGES.length - 1;
  const topStart = isFirst ? bottomStart : Math.min(100, bottomStart + SLANT);
  const topEnd = isLast ? bottomEnd : Math.min(100, bottomEnd + SLANT);

  return `polygon(${topStart}% 0%, ${topEnd}% 0%, ${bottomEnd}% 100%, ${bottomStart}% 100%)`;
}

const CLIP_PATHS = PANEL_RANGES.map((_, i) => buildClipPath(i));
const accentTeal = "#3ce0d0";
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

interface StitchAnimationProps {
  gateway?: boolean;
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
  const visible = gateway || isInView;

  const activate = (index: number) => {
    setActivationToken((t) => t + 1);
    setActivePanel(index);
  };

  return (
    <section
      ref={ref}
      id="explore"
      className={cn(
        "relative overflow-hidden bg-bg-primary",
        gateway && "flex h-full flex-col",
      )}
    >
      <motion.div
        initial={visible ? false : { opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: visible ? 0 : 0.25 }}
        className={cn(
          "hidden overflow-hidden md:block",
          gateway
            ? "absolute left-1/2 top-0 -translate-x-1/2"
            : "relative mx-auto w-full aspect-video max-h-[860px]",
        )}
        style={
          gateway
            ? {
                width: "max(100vw, 177.777vh)",
                height: "max(56.25vw, 100vh)",
              }
            : undefined
        }
        onMouseLeave={() => setActivePanel(null)}
      >
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

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(13,14,16,0) 60%, rgba(13,14,16,0.45) 100%)",
          }}
        />

        <AnimatePresence>
          {activePanel === null && (
            <motion.div
              key="folded-overlays"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: SMOOTH_EASE }}
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute left-8 top-8 select-none text-text-primary/90 md:left-10 md:top-10">
                <div className="text-sm font-semibold tracking-wide md:text-base">
                  AIeveR Robotics Limited
                </div>
                <div className="mt-0.5 text-[10px] tracking-[6px] text-text-secondary md:text-xs">
                  雲芯機器人有限公司
                </div>
              </div>

              <div className="absolute bottom-10 left-0 right-0 flex justify-center md:bottom-14">
                <span className="text-[10px] font-light uppercase tracking-[10px] text-text-secondary md:text-xs md:tracking-[14px]">
                  E X P L O R E &nbsp; I N T E L L I G E N C E
                </span>
              </div>

              <div className="absolute inset-0">
                {stitchPanels.map((panel, i) => (
                  <div
                    key={panel.id}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{ left: PANEL_CENTERS[i] }}
                  >
                    <span className="block text-[11px] font-bold uppercase tracking-[3px] text-purple-light md:text-xs">
                      {panel.titleEn}
                    </span>
                    <h3 className="mt-2 whitespace-nowrap text-3xl font-bold text-text-primary drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] md:text-5xl">
                      {panel.titleCn}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
                <div
                  className="animate-scan-line absolute inset-x-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentTeal}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {activePanel !== null && (
            <ExpandedPanel
              key={`${stitchPanels[activePanel].id}-${activationToken}`}
              panel={stitchPanels[activePanel]}
              index={activePanel}
            />
          )}
        </AnimatePresence>

        <svg
          aria-hidden
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
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

        {stitchPanels.map((panel, index) => (
          <button
            type="button"
            key={panel.id}
            aria-label={gateway ? `進入 ${panel.titleCn}` : `預覽 ${panel.titleCn}`}
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
            className="absolute inset-0 z-20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-light"
            style={{
              clipPath: CLIP_PATHS[index],
              WebkitClipPath: CLIP_PATHS[index],
            }}
          />
        ))}
      </motion.div>

      <div
        className={cn(
          "flex w-full flex-col gap-4 px-6 md:hidden",
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

interface FoldedSliceProps {
  panel: (typeof stitchPanels)[number];
  index: number;
  dimmed: boolean;
}

function FoldedSlice({ panel, index, dimmed }: FoldedSliceProps) {
  const src = useSiteImage(panel.detailImage);
  const shiftXPercent = PANEL_CENTROID_X[index] - 50 + FOLDED_IMAGE_SHIFT_X[index];

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
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: PANEL_OBJECT_POSITIONS[index] }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,14,16,0.12) 0%, rgba(13,14,16,0.04) 45%, rgba(13,14,16,0.6) 100%)",
        }}
      />
    </div>
  );
}

interface ExpandedPanelProps {
  panel: (typeof stitchPanels)[number];
  index: number;
}

const WIPE_START_CLIP_PATHS: readonly string[] = [
  `polygon(${SLANT}% 0%, ${SLANT}% 0%, 0% 100%, 0% 100%)`,
  `polygon(${50 + SLANT}% 0%, ${50 + SLANT}% 0%, 50% 100%, 50% 100%)`,
  `polygon(${100 + SLANT}% 0%, ${100 + SLANT}% 0%, 100% 100%, 100% 100%)`,
];

const WIPE_END_CLIP_PATHS: readonly string[] = [
  `polygon(0% 0%, ${100 + SLANT}% 0%, 100% 100%, 0% 100%)`,
  `polygon(0% 0%, ${100 + SLANT + SLANT}% 0%, ${100 + SLANT}% 100%, -${SLANT}% 100%)`,
  `polygon(0% 0%, ${100 + SLANT}% 0%, 100% 100%, -${SLANT}% 100%)`,
];

function ExpandedPanel({ panel, index }: ExpandedPanelProps) {
  const startClip = WIPE_START_CLIP_PATHS[index] ?? WIPE_END_CLIP_PATHS[0];
  const endClip = WIPE_END_CLIP_PATHS[index] ?? WIPE_END_CLIP_PATHS[0];
  const detailSrc = useSiteImage(panel.detailImage);
  const detailVideoSrc = panel.detailVideo;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASE }}
      className="pointer-events-none absolute inset-0 z-10"
    >
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
          {detailVideoSrc ? (
            <video
              aria-label={panel.titleCn}
              autoPlay
              loop
              muted
              playsInline
              poster={detailSrc}
              preload="auto"
              className="h-full w-full object-cover"
              style={{ objectPosition: PANEL_OBJECT_POSITIONS[index] }}
            >
              <source src={detailVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={detailSrc}
              alt={panel.titleCn}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: PANEL_OBJECT_POSITIONS[index] }}
              priority
            />
          )}
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

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE, delay: 0.15 }}
        className="absolute left-8 top-8 select-none text-text-primary/90 md:left-10 md:top-10"
      >
        <div className="text-sm font-semibold tracking-wide md:text-base">
          AIeveR Robotics Limited
        </div>
        <div className="mt-0.5 text-[10px] tracking-[6px] text-text-secondary md:text-xs">
          雲芯機器人有限公司
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE, delay: 0.15 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <span className="block text-[11px] font-bold uppercase tracking-[3px] text-purple-light md:text-xs">
          {panel.titleEn}
        </span>
        <h3 className="mt-2 whitespace-nowrap text-3xl font-bold text-text-primary drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] md:text-5xl">
          {panel.titleCn}
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, letterSpacing: "6px" }}
        animate={{ opacity: 1, letterSpacing: "14px" }}
        transition={{ duration: 1, ease: SMOOTH_EASE, delay: 1 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center md:bottom-14"
      >
        <span className="text-[10px] font-light uppercase text-text-secondary md:text-xs">
          EXPLORE &nbsp; INTELLIGENCE
        </span>
      </motion.div>
    </motion.div>
  );
}
