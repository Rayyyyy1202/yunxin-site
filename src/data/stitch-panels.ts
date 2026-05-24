import type { StitchPanelData } from "@/lib/types";

export const stitchPanels: StitchPanelData[] = [
  {
    id: "perception",
    titleEn: "Embodied Perception",
    titleCn: "具身感知",
    description:
      "全栈自研 3D 视觉与 AI 感知系统，让机器在复杂环境中看得清、判得准，理解物体与空间关系。",
    scanLabel: "SCAN_001",
    statusLabel: "NEURAL_RT",
    detailImage: "/images/home/gateway/embodied-perception.png",
    detailVideo: "/videos/home/gateway/embodied-perception.mp4",
  },
  {
    id: "manipulation",
    titleEn: "Embodied Manipulation",
    titleCn: "具身操作",
    description:
      "融合视觉感知、运动控制与操作策略，支撑机器人完成抓取、装配、检测等高精度任务。",
    scanLabel: "CTRL_002",
    statusLabel: "MOTOR_RT",
    detailImage: "/images/home/gateway/embodied-manipulation.png",
    detailVideo: "/videos/home/gateway/embodied-manipulation.mp4",
  },
  {
    id: "mobility",
    titleEn: "Embodied Mobility",
    titleCn: "具身移动",
    description:
      "结合自主导航、路径规划与多模态感知，让机器人在动态场景中稳定移动、灵活协同。",
    scanLabel: "NAV_003",
    statusLabel: "PATH_RT",
    detailImage: "/images/home/gateway/embodied-mobility.png",
    detailVideo: "/videos/home/gateway/embodied-mobility.mp4",
  },
];
