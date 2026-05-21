import SubNav from "@/components/layout/SubNav";
import { mainNavigation } from "@/data/navigation";

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supportNav = mainNavigation.find((n) => n.href === "/support");
  const subItems = supportNav?.children ?? [];

  return (
    <>
      <SubNav items={subItems} hideOnRootPath="/support" />
      {children}
    </>
  );
}
