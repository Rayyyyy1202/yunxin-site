import SupportListPage from "@/components/support/SupportListPage";
import { documents } from "@/data/documents";

export const metadata = {
  title: "技术文档",
  description:
    "AIeveR Robotics 技术文档中心，涵盖感知、操作、导航、部署等全栈系统文档。",
};

export default function DocsPage() {
  return (
    <SupportListPage
      title="技术文档"
      subtitle="全面、结构化的 AIeveR Robotics 系统文档"
      sectionLabel="Technical Documentation"
      sectionHeading="选择一个领域开始阅读"
      sectionDescription="从系统架构到 API 细节，所有文档持续更新并版本化管理。"
      items={documents}
      variant="doc"
    />
  );
}
