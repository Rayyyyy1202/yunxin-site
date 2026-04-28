import type { StitchPanelData } from "@/lib/types";

export const stitchPanels: StitchPanelData[] = [
  {
    id: "perception",
    titleEn: "Embodied Perception",
    titleCn: "具身感知",
    description:
      "全栈自研 3D 视觉系统，实现高精度环境感知与物体识别，赋予机器人观察与理解世界的能力。",
    scanLabel: "SCAN_001",
    statusLabel: "NEURAL_RT",
    detailImage: "/images/hero/embodied-perception.jpg",
  },
  {
    id: "manipulation",
    titleEn: "Embodied Manipulation",
    titleCn: "具身操作",
    description:
      "智能灵巧操作技术，让机器人精准执行复杂任务，实现从感知到行动的闭环控制。",
    scanLabel: "CTRL_002",
    statusLabel: "MOTOR_RT",
    detailImage: "/images/hero/embodied-manipulation.jpg",
  },
  {
    id: "mobility",
    titleEn: "Embodied Mobility",
    titleCn: "具身移动",
    description:
      "自主导航与路径规划，使机器人在复杂环境中自由移动，适应多种场景需求。",
    scanLabel: "NAV_003",
    statusLabel: "PATH_RT",
    detailImage: "/images/hero/embodied-mobility.jpg",
  },
];
