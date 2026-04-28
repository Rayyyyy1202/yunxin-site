import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "素材管理 | AIeveR Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-[#fdfbfe]">
      {children}
    </div>
  );
}
