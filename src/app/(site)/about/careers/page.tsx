import type { Metadata } from "next";
import CareersView from "./CareersView";

export const metadata: Metadata = {
  title: "加入我們",
  description:
    "加入 AIeveR Robotics，與我們一起探索具身智能的無限可能。",
};

export default function CareersPage() {
  return <CareersView />;
}
