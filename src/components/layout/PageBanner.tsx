import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageBanner({
  title,
  subtitle,
  backgroundImage,
}: PageBannerProps) {
  return (
    <section className="relative h-[240px] md:h-[320px] flex items-center justify-center overflow-hidden">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-bg-primary/70" />
        </>
      )}

      {!backgroundImage && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--bg-primary) 0%, var(--purple-primary) 50%, var(--bg-primary) 100%)",
            opacity: 0.3,
          }}
        />
      )}

      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-secondary text-lg mt-4 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
