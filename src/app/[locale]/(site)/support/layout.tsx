import SubNav from "@/components/layout/SubNav";
import { getMainNavigation } from "@/data/navigation";
import { normalizeLocale } from "@/lib/i18n";

export default async function SupportLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requestedLocale } = await params;
  const locale = normalizeLocale(requestedLocale);
  const mainNavigation = getMainNavigation(locale);
  const supportNav = mainNavigation.find((n) => n.href === "/support");
  const subItems =
    supportNav?.children ??
    mainNavigation
      .find((n) => n.href.endsWith("/support"))
      ?.children ??
    [];

  return (
    <>
      <SubNav items={subItems} hideOnRootPath="/support" />
      {children}
    </>
  );
}
