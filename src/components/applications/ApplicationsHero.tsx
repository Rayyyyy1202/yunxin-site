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
  /** Detail pages use a bounded 1280x360 Figma frame instead of full-width cover. */
  variant?: "default" | "detail";
}

export default function ApplicationsHero({
  title,
  eyebrow,
  background,
  productImage,
  productLabel,
  variant = "default",
}: ApplicationsHeroProps) {
  if (variant === "detail") {
    return (
      <section className="overflow-x-hidden bg-bg-secondary pt-16 md:pt-20">
        <div className="relative isolate mx-auto h-[260px] max-w-[1280px] overflow-hidden bg-bg-secondary md:aspect-[1280/360] md:h-auto">
          <Image
            src={background}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="absolute inset-0 object-cover pointer-events-none opacity-95"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary/20 via-transparent to-bg-secondary/10" />

          <div className="absolute left-6 top-10 max-w-[calc(100%-48px)] md:left-10 md:top-[62px] md:max-w-[760px]">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:text-sm">
              {eyebrow}
            </p>
            <div aria-hidden className="mt-2 h-[3px] w-10 bg-purple-light" />

            <h1 className="mt-9 max-w-[300px] whitespace-normal bg-gradient-to-r from-[#7b66ff] to-[#492e8d] bg-clip-text text-[24px] font-medium uppercase leading-snug tracking-tight text-transparent drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] [overflow-wrap:anywhere] [word-break:break-all] md:mt-10 md:max-w-[829px] md:text-5xl md:leading-tight md:[word-break:break-word]">
              {title}
            </h1>

            <div aria-hidden className="mt-6 flex items-center gap-3">
              <span className="block h-[3px] w-[60px] rounded-full bg-purple-light" />
              <span className="block h-[3px] w-[144px] rounded-full bg-gradient-to-r from-purple-light/80 to-purple-primary/40" />
            </div>
          </div>

          {productImage && (
            <div className="absolute right-[10%] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
              <div className="relative h-[188px] w-[249px]">
                <Image
                  src={productImage}
                  alt={productLabel ?? "product"}
                  fill
                  className="object-contain"
                  sizes="249px"
                  priority
                />
              </div>
              {productLabel && (
                <span className="text-center text-2xl font-medium tracking-tight text-text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  {productLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

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
