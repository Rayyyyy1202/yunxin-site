import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocaleRuntime from "@/components/i18n/LocaleRuntime";
import { SiteImageProvider } from "@/components/SiteImageProvider";
import { normalizeLocale } from "@/lib/i18n";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale = normalizeLocale(requestedLocale);

  return (
    <SiteImageProvider>
      <LocaleRuntime locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </SiteImageProvider>
  );
}
