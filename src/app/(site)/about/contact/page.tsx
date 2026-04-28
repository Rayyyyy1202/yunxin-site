import type { Metadata } from "next";
import PageBanner from "@/components/layout/PageBanner";
import ContactInfo from "@/components/about/ContactInfo";
import ContactForm from "@/components/about/ContactForm";
import MapEmbed from "@/components/about/MapEmbed";

export const metadata: Metadata = {
  title: "联系我们",
  description:
    "联系 AIeveR Robotics。我们随时欢迎合作交流，为您提供专业的机器人智能化解决方案。",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="联系我们"
        subtitle="与 AIeveR 团队取得联系"
      />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <MapEmbed />
      </section>
    </>
  );
}
