import Image from "next/image";

interface ApplicationsHeroProps {
  /** 大标题（白色 → 紫色渐变）。 */
  title: string;
  /** 标题上方小标，例 "APPLICATION CASES"。 */
  eyebrow: string;
  /** 顶部全幅背景图（PNG 路径）。 */
  background: string;
  /** 右侧固定产品照片，仅详情页传入。 */
  productImage?: string;
  /** 详情页右下角产品型号，例 "DS-L10140"。 */
  productLabel?: string;
}

export default function ApplicationsHero({
  title,
  eyebrow,
  background,
  productImage,
  productLabel,
}: ApplicationsHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-bg-secondary pt-24 md:pt-32 pb-16 md:pb-20 min-h-[420px] md:min-h-[460px]">
      {/* Background image — Figma hero bg */}
      <Image
        src={background}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover pointer-events-none opacity-90"
      />

      {/* Soft purple radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 12% 50%, rgba(73,46,141,0.45) 0%, rgba(13,14,16,0) 65%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10">
        {/* Left — eyebrow + gradient title */}
        <div className="max-w-[820px]">
          <p className="text-text-primary text-xs md:text-sm uppercase tracking-[3px] font-semibold mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            {eyebrow}
          </p>

          <h1 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#bfb1ff] via-[#8d77cf] to-[#492e8d] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            {title}
          </h1>

          {/* Decorative double-stack underline (Figma: line1 144 + line3 60). */}
          <div aria-hidden className="mt-6 flex items-center gap-3">
            <span className="block h-[3px] w-[60px] rounded-full bg-purple-light" />
            <span className="block h-[3px] w-[144px] rounded-full bg-gradient-to-r from-purple-light/80 to-purple-primary/40" />
          </div>
        </div>

        {/* Right — product photo + label (only on detail pages) */}
        {productImage && (
          <div className="hidden lg:flex flex-col items-center gap-3 shrink-0">
            <div className="relative w-[260px] h-[190px]">
              <Image
                src={productImage}
                alt={productLabel ?? "product"}
                fill
                className="object-contain"
                sizes="260px"
              />
            </div>
            {productLabel && (
              <span className="text-text-primary text-xl md:text-2xl font-medium tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {productLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
