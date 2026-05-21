import { redirect } from "next/navigation";
import { isLocale, toLocalizedPath } from "@/lib/i18n";

export const metadata = {
  title: "行業應用 — AIeveR Robotics",
  description: "查看 AIeveR Robotics 已公開的行業應用案例。",
};

interface ApplicationsIndexPageProps {
  params: Promise<{ locale?: string }>;
}

export default async function ApplicationsIndexPage({
  params,
}: ApplicationsIndexPageProps) {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams?.locale)
    ? resolvedParams.locale
    : undefined;

  redirect(
    locale
      ? (toLocalizedPath(locale, "/applications/precision-3d-detection") ??
          "/applications/precision-3d-detection")
      : "/applications/precision-3d-detection",
  );
}
