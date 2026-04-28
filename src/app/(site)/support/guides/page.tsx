import SupportListPage from "@/components/support/SupportListPage";
import { guides } from "@/data/documents";

export const metadata = {
  title: "技术指南",
  description:
    "AIeveR Robotics 技术指南，覆盖入门教程、进阶开发、性能优化与行业落地案例。",
};

export default function GuidesPage() {
  return (
    <SupportListPage
      title="技术指南"
      subtitle="教程、实战与最佳实践，帮助团队快速上手"
      sectionLabel="Technical Guides"
      sectionHeading="按主题选择合适的指南"
      sectionDescription="每篇指南都聚焦一个具体任务，并配套可运行的示例工程。"
      items={guides}
      variant="guide"
    />
  );
}
