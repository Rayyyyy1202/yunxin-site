import Image from "next/image";

interface ApplicationFullImageHeroProps {
  src: string;
  alt: string;
}

export default function ApplicationFullImageHero({
  src,
  alt,
}: ApplicationFullImageHeroProps) {
  return (
    <section className="bg-bg-secondary pt-16 md:pt-20">
      <div className="mx-auto max-w-[1672px]">
        <Image
          src={src}
          alt={alt}
          width={1672}
          height={941}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
