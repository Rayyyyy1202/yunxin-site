import SupportListPage from "@/components/support/SupportListPage";
import { downloads } from "@/data/downloads";

export const metadata = {
  title: "下载中心",
  description:
    "AIeveR Robotics 产品手册、白皮书、案例研究与品牌素材集中下载。",
};

export default function DownloadsPage() {
  return (
    <SupportListPage
      title="下载中心"
      subtitle="产品手册、白皮书、案例研究与品牌素材"
      sectionLabel="Downloads"
      sectionHeading="按分类获取所需资料"
      sectionDescription="所有文件经过版本管理，附带更新时间与文件大小，便于集成到企业知识库。"
      items={downloads}
      variant="download"
    />
  );
}
