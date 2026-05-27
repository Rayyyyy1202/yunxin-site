import Image from "next/image";

type WorkstationUseCasesSectionProps = {
  title: string;
  cases: string[];
  imageSrc: string;
  imageAlt: string;
  id?: string;
  className?: string;
};

export default function WorkstationUseCasesSection({
  title,
  cases,
  imageSrc,
  imageAlt,
  id,
  className = "",
}: WorkstationUseCasesSectionProps) {
  return (
    <section id={id} className={`bg-[#010001] ${className}`}>
      <div className="mx-auto hidden max-w-[1280px] md:block">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1280}
          height={598}
          sizes="1280px"
          className="h-auto w-full"
        />
      </div>

      <div className="px-5 py-14 md:hidden">
        <div className="mx-auto max-w-[560px]">
          <div className="relative overflow-hidden bg-[#010001] px-4 py-8 text-center">
            <div className="absolute left-0 top-1/2 h-px w-[30%] -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(123,102,255,0.72))]" />
            <div className="absolute right-0 top-1/2 h-px w-[30%] -translate-y-1/2 bg-[linear-gradient(90deg,rgba(123,102,255,0.72),transparent)]" />
            <h2 className="relative text-3xl font-semibold leading-tight text-[#fdfbfe]">
              {title}
            </h2>
          </div>

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
        </div>
      </div>
    </section>
  );
}
