import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocaleRuntime from "@/components/i18n/LocaleRuntime";
import { SiteImageProvider } from "@/components/SiteImageProvider";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteImageProvider>
      <LocaleRuntime locale={DEFAULT_LOCALE} />
      <Header locale={DEFAULT_LOCALE} />
      <main className="flex-1">{children}</main>
      <Footer locale={DEFAULT_LOCALE} />
    </SiteImageProvider>
  );
}
