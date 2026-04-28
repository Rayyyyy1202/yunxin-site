"use client";

import { useSiteImage } from "@/components/SiteImageProvider";

/**
 * Drop-in replacement for `<img>` that resolves managed image overrides.
 * If the admin has uploaded a replacement for `src`, the uploaded URL is used.
 */
type SiteImgProps = React.ComponentPropsWithoutRef<"img"> & {
  alt: string;
};

export default function SiteImg(props: SiteImgProps) {
  const resolved = useSiteImage(typeof props.src === "string" ? props.src : "");

  /* eslint-disable-next-line @next/next/no-img-element */
  return <img {...props} src={resolved} alt={props.alt} />;
}
