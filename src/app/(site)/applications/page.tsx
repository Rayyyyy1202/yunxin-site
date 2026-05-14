import { redirect } from "next/navigation";
import { applicationTopics } from "@/data/applications";

export const metadata = {
  title: "行業中心 — AIeveR Robotics",
  description: "雲芯機器人的應用案例索引。",
};

/**
 * 行業中心入口 — 当前只有 2 个主题，直接跳到第一个 topic index。
 * 后续若新增"主题总览"再独立渲染。
 */
export default function ApplicationsIndexPage() {
  const first = applicationTopics[0];
  redirect(`/applications/${first.slug}`);
}
