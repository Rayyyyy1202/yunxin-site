import type { Metadata } from "next";
import AdminAuthGate from "@/components/admin/AdminAuthGate";

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
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <AdminAuthGate>{children}</AdminAuthGate>
    </div>
  );
}
