"use client";

import { useSiteImage } from "@/components/SiteImageProvider";

/**
 * Drop-in replacement for `<img>` that resolves managed image overrides.
 * If the admin has uploaded a replacement for `src`, the uploaded URL is used.
 */
export default function SiteImg(
  props: React.ComponentPropsWithoutRef<"img">,
) {
  const resolved = useSiteImage(typeof props.src === "string" ? props.src : "");

  /* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */
  return <img {...props} src={resolved} />;
}
