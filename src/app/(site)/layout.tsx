import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteImageProvider } from "@/components/SiteImageProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteImageProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </SiteImageProvider>
  );
}
