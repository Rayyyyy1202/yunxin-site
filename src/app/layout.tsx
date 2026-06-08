import type { Metadata } from "next";
import { headers } from "next/headers";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 全栈自研3D视觉，让机器人精准感知、灵巧操作`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "AIeveR Robotics 通过技术创新，打造机器人通用智能，开启机器人应用新时代。具身感知、具身操作、具身移动。",
  keywords: [
    "AIeveR Robotics",
    "机器人",
    "3D视觉",
    "具身智能",
    "机械臂",
    "人工智能",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | 全栈自研3D视觉`,
    description:
      "AIeveR Robotics 通过技术创新，打造机器人通用智能，开启机器人应用新时代。",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "全栈自研 3D 视觉，让机器人精准感知、灵巧操作。",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const requestedLocale = headerStore.get("x-yunxin-locale") ?? undefined;
  const locale = isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
