type WorkstationUseCasesSectionProps = {
  title: string;
  cases: string[];
  id?: string;
  className?: string;
};

export default function WorkstationUseCasesSection({
  title,
  cases,
  id,
  className = "",
}: WorkstationUseCasesSectionProps) {
  return (
    <section id={id} className={`bg-[#010001] ${className}`}>
      <div className="mx-auto hidden h-[598px] max-w-[1280px] md:block">
        <div className="relative h-full overflow-hidden bg-[#010001]">
          <UseCasesHeading title={title} />

          <div className="absolute left-8 right-8 top-[109px] grid grid-cols-3 gap-[29px]">
            {cases.map((item) => (
              <article key={item} className="text-center text-white">
                <div className="h-[257px] rounded-[15px] border-2 border-[rgba(123,102,255,0.4)] bg-black" />
                <h3 className="mx-auto mt-6 max-w-[297px] text-2xl font-bold uppercase leading-9">
                  {item}
                </h3>
              </article>
            ))}
          </div>

          <BottomGlow />
        </div>
      </div>

      <div className="px-5 py-14 md:hidden">
        <div className="mx-auto max-w-[560px]">
          <UseCasesHeading title={title} compact />

          <div className="mt-8 grid gap-5">
            {cases.map((item) => (
              <article
                key={item}
                className="overflow-hidden rounded-[15px] border-2 border-[rgba(123,102,255,0.4)] bg-black text-center text-white"
              >
                <div className="aspect-[386/257] bg-black" />
                <h3 className="px-6 py-6 text-xl font-bold leading-8">
                  {item}
                </h3>
              </article>
            ))}
          </div>

          <div className="relative mt-10 h-10">
            <BottomGlow compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesHeading({
  title,
  compact = false,
}: {
  title: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "relative flex min-h-[96px] items-center justify-center overflow-hidden bg-[#010001] px-4 text-center"
          : "relative h-[107px] overflow-hidden bg-[#010001]"
      }
    >
      <TitleWing className={compact ? "left-0 w-[32%]" : "left-10 w-[300px]"} />
      <TitleWing
        mirrored
        className={compact ? "right-0 w-[32%]" : "right-10 w-[300px]"}
      />
      <h2
        className={
          compact
            ? "relative z-10 max-w-[86%] bg-[#010001] px-3 text-[28px] font-semibold leading-tight text-[#fdfbfe]"
            : "absolute left-1/2 top-[31px] z-10 -translate-x-1/2 whitespace-nowrap text-4xl font-semibold leading-8 text-[#fdfbfe]"
        }
      >
        {title}
      </h2>
    </div>
  );
}

function TitleWing({
  mirrored = false,
  className,
}: {
  mirrored?: boolean;
  className: string;
}) {
  return (
    <span
      aria-hidden
      className={`absolute top-[30px] h-[28px] opacity-90 ${
        mirrored ? "scale-x-[-1]" : ""
      } ${className}`}
    >
      <span className="absolute left-0 top-[6px] h-px w-[118px] bg-[linear-gradient(90deg,transparent,#492e8d_18%,#7b66ff_100%)]" />
      <span className="absolute left-[100px] top-[5px] h-px w-[60px] origin-left rotate-45 bg-[#7b66ff]" />
      <span className="absolute left-[146px] top-[17px] h-px w-[74px] bg-[#492e8d]" />
      <span className="absolute left-[216px] top-[17px] h-px w-[84px] bg-[linear-gradient(90deg,#492e8d,transparent)]" />
      <span className="absolute left-8 top-[18px] flex gap-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="size-1 rounded-full bg-[#7b66ff] shadow-[0_0_8px_rgba(123,102,255,0.9)]"
          />
        ))}
      </span>
    </span>
  );
}

function BottomGlow({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden
      className={
        compact
          ? "absolute inset-x-0 bottom-0 h-10"
          : "absolute bottom-[68px] left-8 right-8 h-10"
      }
    >
      <div className="absolute left-0 right-0 top-1/2 h-px bg-[linear-gradient(90deg,rgba(123,102,255,0.08),rgba(123,102,255,0.65),rgba(123,102,255,0.08))]" />
      <div className="absolute left-1/2 top-1/2 h-9 w-[420px] max-w-[72vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(123,102,255,0.58)_0%,rgba(73,46,141,0.24)_38%,transparent_72%)] blur-sm" />
    </div>
  );
}
