import type { DocumentItem } from "@/lib/types";

export const documents: DocumentItem[] = [
  {
    id: "doc-perception-overview",
    title: "3D 视觉感知系统概览",
    category: "感知系统",
    description:
      "介绍 AIeveR 感知栈的整体架构、核心模块和数据流，帮助开发者快速建立系统级认知。",
    fileUrl: "https://example.com/docs/perception-overview",
    updatedAt: "2026-03-28",
  },
  {
    id: "doc-perception-api",
    title: "感知 API 参考手册",
    category: "感知系统",
    description:
      "完整列出 PerceptionService gRPC/REST 接口定义、数据结构与调用示例。",
    fileUrl: "https://example.com/docs/perception-api",
    updatedAt: "2026-03-20",
  },
  {
    id: "doc-manipulation-sdk",
    title: "操作 SDK 集成指南",
    category: "机器人操作",
    description:
      "从环境准备、示例工程构建到自定义技能开发的完整集成流程。",
    fileUrl: "https://example.com/docs/manipulation-sdk",
    updatedAt: "2026-03-12",
  },
  {
    id: "doc-manipulation-policies",
    title: "可复用操作策略库",
    category: "机器人操作",
    description:
      "列出当前支持的抓取、装配、柔性物体操作等预置策略及其适用场景。",
    fileUrl: "https://example.com/docs/manipulation-policies",
    updatedAt: "2026-02-28",
  },
  {
    id: "doc-slam-config",
    title: "SLAM 建图参数配置",
    category: "导航建图",
    description:
      "建图过程中的关键参数说明，包括分辨率、闭环阈值、IMU 融合权重等。",
    fileUrl: "https://example.com/docs/slam-config",
    updatedAt: "2026-02-20",
  },
  {
    id: "doc-navigation-planner",
    title: "路径规划器详解",
    category: "导航建图",
    description:
      "全局规划器、局部避障、多机器人协同调度的算法原理与调参建议。",
    fileUrl: "https://example.com/docs/navigation-planner",
    updatedAt: "2026-02-05",
  },
  {
    id: "doc-hardware-integration",
    title: "硬件集成规范",
    category: "硬件对接",
    description:
      "机械臂、末端执行器、传感器、力控模块的接入要求与兼容列表。",
    fileUrl: "https://example.com/docs/hardware-integration",
    updatedAt: "2026-01-25",
  },
  {
    id: "doc-hardware-calibration",
    title: "手眼标定与传感器标定",
    category: "硬件对接",
    description:
      "覆盖相机-机械臂手眼标定、多传感器时空对齐的完整流程。",
    fileUrl: "https://example.com/docs/hardware-calibration",
    updatedAt: "2026-01-15",
  },
  {
    id: "doc-security-overview",
    title: "安全与合规白皮书",
    category: "安全合规",
    description:
      "系统安全模型、数据加密、访问控制、审计日志与 ISO 认证清单。",
    fileUrl: "https://example.com/docs/security-overview",
    updatedAt: "2025-12-20",
  },
  {
    id: "doc-deployment-onprem",
    title: "私有化部署指南",
    category: "部署运维",
    description:
      "面向企业客户的本地化部署架构、硬件选型建议与运维最佳实践。",
    fileUrl: "https://example.com/docs/deployment-onprem",
    updatedAt: "2025-12-05",
  },
  {
    id: "doc-deployment-cloud",
    title: "云端部署与扩缩容",
    category: "部署运维",
    description:
      "基于 Kubernetes 的云端部署拓扑、自动扩缩容策略与多可用区容灾。",
    fileUrl: "https://example.com/docs/deployment-cloud",
    updatedAt: "2025-11-18",
  },
  {
    id: "doc-troubleshooting",
    title: "故障排查速查表",
    category: "部署运维",
    description:
      "按模块组织的常见故障症状、诊断命令与修复方案。",
    fileUrl: "https://example.com/docs/troubleshooting",
    updatedAt: "2025-11-02",
  },
];

export const guides: DocumentItem[] = [
  {
    id: "guide-quickstart",
    title: "5 分钟快速上手",
    category: "入门教程",
    description:
      "从零搭建开发环境，运行第一个感知+操作联动 demo，完成你的第一次机器人任务。",
    fileUrl: "https://example.com/guides/quickstart",
    updatedAt: "2026-03-30",
  },
  {
    id: "guide-first-pipeline",
    title: "构建你的第一条感知-规划-控制流水线",
    category: "入门教程",
    description:
      "手把手教你串联感知、规划和控制三大模块，形成可运行的闭环系统。",
    fileUrl: "https://example.com/guides/first-pipeline",
    updatedAt: "2026-03-18",
  },
  {
    id: "guide-custom-skill",
    title: "自定义操作技能开发",
    category: "进阶开发",
    description:
      "学习如何基于 ManipKit 设计、训练并部署一个自定义的操作技能。",
    fileUrl: "https://example.com/guides/custom-skill",
    updatedAt: "2026-03-05",
  },
  {
    id: "guide-sim2real",
    title: "Sim2Real 迁移实战",
    category: "进阶开发",
    description:
      "从仿真训练到真实机器人的迁移流程，包含域随机化与硬件在环验证。",
    fileUrl: "https://example.com/guides/sim2real",
    updatedAt: "2026-02-22",
  },
  {
    id: "guide-performance-tuning",
    title: "性能调优与延迟诊断",
    category: "性能优化",
    description:
      "使用内置 profiler 识别瓶颈，针对感知、规划、通信链路逐段优化。",
    fileUrl: "https://example.com/guides/performance-tuning",
    updatedAt: "2026-02-10",
  },
  {
    id: "guide-edge-deployment",
    title: "边缘设备部署与量化",
    category: "性能优化",
    description:
      "模型蒸馏、INT8 量化、TensorRT 导出等方案在边缘设备上的实战对比。",
    fileUrl: "https://example.com/guides/edge-deployment",
    updatedAt: "2026-01-28",
  },
  {
    id: "guide-multi-robot",
    title: "多机器人协同调度",
    category: "行业案例",
    description:
      "以仓储分拣场景为例，演示多 AMR + 机械臂的任务分配与冲突避免。",
    fileUrl: "https://example.com/guides/multi-robot",
    updatedAt: "2026-01-12",
  },
  {
    id: "guide-quality-inspection",
    title: "3C 质检产线集成案例",
    category: "行业案例",
    description:
      "从视觉光路设计到缺陷模型训练，完整复盘一条 3C 质检产线的落地过程。",
    fileUrl: "https://example.com/guides/quality-inspection",
    updatedAt: "2025-12-28",
  },
  {
    id: "guide-safety-audit",
    title: "机器人安全评估清单",
    category: "安全与合规",
    description:
      "面向功能安全与信息安全的内部审计清单及典型发现项示例。",
    fileUrl: "https://example.com/guides/safety-audit",
    updatedAt: "2025-12-12",
  },
  {
    id: "guide-observability",
    title: "可观测性与告警配置",
    category: "运维实践",
    description:
      "Prometheus + Grafana 指标模板、日志聚合与告警规则最佳实践。",
    fileUrl: "https://example.com/guides/observability",
    updatedAt: "2025-11-28",
  },
];
