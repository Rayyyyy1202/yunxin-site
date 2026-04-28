import type { DocumentItem } from "@/lib/types";

export const downloads: DocumentItem[] = [
  {
    id: "dl-perception-datasheet",
    title: "3D 感知模块技术规格书",
    category: "产品手册",
    description:
      "包含感知模块硬件参数、接口定义、环境要求与兼容列表的完整规格文档。",
    fileUrl: "https://example.com/downloads/perception-datasheet.pdf",
    fileSize: "4.2 MB",
    version: "v2.1",
    updatedAt: "2026-03-28",
  },
  {
    id: "dl-manipulation-datasheet",
    title: "机械臂控制器规格书",
    category: "产品手册",
    description:
      "ManipX 系列机械臂控制器的通讯协议、供电要求与机械结构图纸。",
    fileUrl: "https://example.com/downloads/manipulation-datasheet.pdf",
    fileSize: "3.7 MB",
    version: "v1.8",
    updatedAt: "2026-03-15",
  },
  {
    id: "dl-amr-datasheet",
    title: "AMR 底盘选型指南",
    category: "产品手册",
    description:
      "覆盖从轻载到重载场景的 AMR 底盘型号、载荷与续航对比。",
    fileUrl: "https://example.com/downloads/amr-datasheet.pdf",
    fileSize: "2.8 MB",
    version: "v1.4",
    updatedAt: "2026-02-28",
  },
  {
    id: "dl-whitepaper-embodied",
    title: "具身智能技术白皮书 2025",
    category: "白皮书",
    description:
      "系统阐述 AIeveR 在感知、操作、决策三大方向的技术路线与落地实践。",
    fileUrl: "https://example.com/downloads/embodied-2025.pdf",
    fileSize: "8.9 MB",
    version: "2025",
    updatedAt: "2025-11-05",
  },
  {
    id: "dl-whitepaper-security",
    title: "机器人系统安全白皮书",
    category: "白皮书",
    description:
      "机器人系统的威胁模型、防护策略、合规认证与企业部署建议。",
    fileUrl: "https://example.com/downloads/security-whitepaper.pdf",
    fileSize: "5.1 MB",
    version: "2025",
    updatedAt: "2025-10-22",
  },
  {
    id: "dl-case-automotive",
    title: "汽车产线柔性装配案例集",
    category: "案例研究",
    description:
      "多家整车厂柔性装配工站的部署数据、ROI 分析与客户证言。",
    fileUrl: "https://example.com/downloads/case-automotive.pdf",
    fileSize: "6.3 MB",
    version: "v1.0",
    updatedAt: "2026-01-18",
  },
  {
    id: "dl-case-warehouse",
    title: "智慧仓储落地案例集",
    category: "案例研究",
    description:
      "日处理 12 万单的智慧仓储方案剖析，涵盖硬件拓扑、调度策略与运营数据。",
    fileUrl: "https://example.com/downloads/case-warehouse.pdf",
    fileSize: "5.7 MB",
    version: "v1.0",
    updatedAt: "2025-12-15",
  },
  {
    id: "dl-brand-kit",
    title: "AIeveR 品牌资产包",
    category: "品牌素材",
    description:
      "官方 Logo、主视觉、字体规范与配色系统文件，供合作伙伴使用。",
    fileUrl: "https://example.com/downloads/brand-kit.zip",
    fileSize: "58 MB",
    version: "v3.0",
    updatedAt: "2025-09-28",
  },
  {
    id: "dl-integration-template",
    title: "系统集成方案模板",
    category: "工程资料",
    description:
      "面向 SI 合作伙伴的标准化集成方案模板，包含 Visio/Draw.io 拓扑图与 BOM 清单。",
    fileUrl: "https://example.com/downloads/integration-template.zip",
    fileSize: "21 MB",
    version: "v2.3",
    updatedAt: "2026-02-08",
  },
];

export const software: DocumentItem[] = [
  {
    id: "sw-perception-sdk",
    title: "AIeveR Perception SDK",
    category: "核心 SDK",
    description:
      "感知系统开发工具包，提供 C++/Python 双语言接口、示例工程与预训练模型。",
    fileUrl: "https://example.com/software/perception-sdk-2.1.0.tar.gz",
    fileSize: "412 MB",
    version: "2.1.0",
    updatedAt: "2026-03-30",
  },
  {
    id: "sw-manipulation-sdk",
    title: "AIeveR Manipulation SDK",
    category: "核心 SDK",
    description:
      "机械臂与末端执行器控制 SDK，内置轨迹规划、力控与安全保护模块。",
    fileUrl: "https://example.com/software/manipulation-sdk-1.8.2.tar.gz",
    fileSize: "287 MB",
    version: "1.8.2",
    updatedAt: "2026-03-22",
  },
  {
    id: "sw-nav-sdk",
    title: "AIeveR Navigation SDK",
    category: "核心 SDK",
    description:
      "建图、定位与路径规划 SDK，支持多传感器融合与多机器人协同调度。",
    fileUrl: "https://example.com/software/nav-sdk-1.5.0.tar.gz",
    fileSize: "196 MB",
    version: "1.5.0",
    updatedAt: "2026-03-10",
  },
  {
    id: "sw-studio",
    title: "AIeveR Studio (桌面端)",
    category: "开发工具",
    description:
      "可视化机器人开发与调试平台，集成任务编辑器、实时监控与远程诊断。",
    fileUrl: "https://example.com/software/studio-3.0.0-mac.dmg",
    fileSize: "345 MB",
    version: "3.0.0",
    updatedAt: "2026-03-28",
  },
  {
    id: "sw-simkit",
    title: "AIeveR SimKit 仿真平台",
    category: "开发工具",
    description:
      "基于 Isaac Sim 的高保真仿真环境，预置 30+ 场景与 20+ 机器人模型。",
    fileUrl: "https://example.com/software/simkit-1.2.0.tar.gz",
    fileSize: "2.4 GB",
    version: "1.2.0",
    updatedAt: "2026-02-25",
  },
  {
    id: "sw-firmware-controller",
    title: "控制器固件包",
    category: "固件更新",
    description:
      "ManipX 系列控制器最新固件，修复若干安全问题并新增力控自适应模式。",
    fileUrl: "https://example.com/software/controller-firmware-4.2.1.bin",
    fileSize: "68 MB",
    version: "4.2.1",
    updatedAt: "2026-03-18",
  },
  {
    id: "sw-firmware-amr",
    title: "AMR 底盘固件",
    category: "固件更新",
    description:
      "AMR 底盘 OTA 升级包，优化低速稳定性并提升 IMU 校准精度。",
    fileUrl: "https://example.com/software/amr-firmware-2.8.0.bin",
    fileSize: "42 MB",
    version: "2.8.0",
    updatedAt: "2026-02-12",
  },
  {
    id: "sw-plugin-cad",
    title: "CAD 插件（SolidWorks / UG）",
    category: "扩展插件",
    description:
      "将 CAD 模型一键导入 AIeveR Studio，自动生成抓取点与装配序列。",
    fileUrl: "https://example.com/software/cad-plugin-1.4.0.zip",
    fileSize: "54 MB",
    version: "1.4.0",
    updatedAt: "2026-01-30",
  },
  {
    id: "sw-plugin-ros",
    title: "ROS 2 集成插件",
    category: "扩展插件",
    description:
      "将 AIeveR 全栈 SDK 以 ROS 2 package 形式发布，支持 Humble / Iron 版本。",
    fileUrl: "https://example.com/software/ros-plugin-2.3.0.tar.gz",
    fileSize: "118 MB",
    version: "2.3.0",
    updatedAt: "2026-02-02",
  },
];
