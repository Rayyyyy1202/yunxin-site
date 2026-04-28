import type { Metadata } from "next";
import NewsView from "./NewsView";

export const metadata: Metadata = {
  title: "最新消息",
  description:
    "AIeveR Robotics 最新的产品发布、技术研究、合作伙伴与公司动态。",
};

export default function NewsPage() {
  return <NewsView />;
}
