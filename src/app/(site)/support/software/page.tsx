import SupportListPage from "@/components/support/SupportListPage";
import { software } from "@/data/downloads";

export const metadata = {
  title: "产品软件",
  description:
    "AIeveR Robotics SDK、开发工具、固件更新与扩展插件下载中心。",
};

export default function SoftwarePage() {
  return (
    <SupportListPage
      title="产品软件"
      subtitle="SDK、开发工具、固件与扩展插件"
      sectionLabel="Software"
      sectionHeading="选择合适的软件包开始开发"
      sectionDescription="所有软件包基于语义化版本发布，配套 changelog 与兼容性矩阵。"
      items={software}
      variant="software"
    />
  );
}
