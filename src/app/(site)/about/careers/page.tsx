import type { Metadata } from "next";
import CareersView from "./CareersView";

export const metadata: Metadata = {
  title: "加入我们",
  description:
    "加入 AIeveR Robotics，与顶尖科学家和工程师一起定义具身智能的下一个十年。查看我们在北京、上海、深圳的最新职位。",
};

export default function CareersPage() {
  return <CareersView />;
}
