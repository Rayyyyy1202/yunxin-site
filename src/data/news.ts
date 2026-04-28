import type { NewsItem } from "@/lib/types";

export const news: NewsItem[] = [
  {
    slug: "aiever-series-a-funding",
    title: "AIeveR 完成数亿元 A 轮融资，加速具身智能商业化落地",
    summary:
      "本轮融资将用于 3D 视觉感知算法研发、具身操作模型训练以及行业解决方案的规模化部署，进一步巩固公司在机器人智能化领域的技术领先地位。",
    date: "2026-03-28",
    category: "公司动态",
    coverImage: "/images/about/news-funding.jpg",
    content: `
AIeveR Robotics 宣布完成数亿元人民币 A 轮融资，本轮融资由头部产业资本领投，多家知名机构跟投。

融资所得将用于以下四大战略方向：

1. **3D 视觉感知算法** — 自研多模态点云/深度融合模型，覆盖从工业质检到服务场景的全链路感知需求；
2. **具身操作模型** — 基于大规模操作数据训练通用抓取、装配、柔性物体操作策略；
3. **机器人移动导航** — 在室内外复杂环境下实现厘米级 SLAM 与实时避障；
4. **规模化行业落地** — 在汽车制造、3C 电子、智慧物流、医疗辅助等核心场景加速部署。

"我们相信未来十年，具身智能将成为机器人产业的决定性技术拐点。" AIeveR 创始人表示，"AIeveR 会持续以全栈自研的技术积累，帮助机器人从'执行命令'走向'理解世界'。"
    `.trim(),
  },
  {
    slug: "3d-perception-v2-launch",
    title: "全栈自研 3D 视觉感知系统 V2.0 正式发布",
    summary:
      "新一代感知系统在复杂工业场景的识别精度提升 43%，延迟降低至 18ms，支持动态光照与反光材质的高精度物体位姿估计。",
    date: "2026-03-15",
    category: "产品发布",
    coverImage: "/images/about/news-perception.jpg",
    content: `
3D 视觉感知 V2.0 针对工业部署中最棘手的光照变化、反光金属件、透明物体等场景进行了系统性升级：

- 精度提升 43%（对比 V1.0 基准测试集）
- 端到端推理延迟降至 18ms
- 原生支持 6 DoF 位姿估计与语义分割联合输出
- 提供 ROS 2 / C++ / Python 三套 SDK

目前已在多家头部制造企业完成验证，即将进入规模化部署阶段。
    `.trim(),
  },
  {
    slug: "partnership-automotive-leader",
    title: "AIeveR 与头部汽车制造商达成战略合作",
    summary:
      "双方将共同推进柔性装配产线的智能化升级，首批机器人工站已在其新能源车工厂落地，整线换型时间缩短 60%。",
    date: "2026-02-20",
    category: "合作伙伴",
    coverImage: "/images/about/news-partnership.jpg",
    content: `
AIeveR 与头部汽车制造商签署战略合作协议，合作聚焦于新能源车型总装线的柔性智能化改造。

首批落地成果：

- 6 条产线完成具身机器人工站部署
- 换型时间由 45 分钟缩短至 18 分钟
- 混线生产节拍提升 22%
- 缺陷率降低至百万分之 8
    `.trim(),
  },
  {
    slug: "iros-2025-best-paper",
    title: "AIeveR 论文入选 IROS 2025 最佳论文提名",
    summary:
      "研究团队提出的多任务具身操作学习框架，在 50 余项基准任务中取得 SOTA 成绩，引起学术界与工业界广泛关注。",
    date: "2026-01-18",
    category: "技术研究",
    coverImage: "/images/about/news-iros.jpg",
    content: `
AIeveR 研究团队论文《Unified Embodied Manipulation via Multi-Task Distillation》入选 IROS 2025 最佳论文提名。

论文核心贡献：

- 统一的多任务操作学习架构
- 在 50+ 基准任务上取得 SOTA
- 支持零样本迁移到新物体类别
- 数据效率相比基线提升 5.7 倍

论文代码与预训练模型已在 GitHub 开源。
    `.trim(),
  },
  {
    slug: "open-source-manipulation-toolkit",
    title: "AIeveR 开源机器人操作工具包 ManipKit",
    summary:
      "ManipKit 集成数据采集、仿真训练、Sim2Real 迁移全流程工具，首发版本已支持 12 款主流机械臂与 8 种末端执行器。",
    date: "2025-12-08",
    category: "开源计划",
    coverImage: "/images/about/news-manipkit.jpg",
    content: `
我们很高兴宣布 ManipKit v0.1 正式开源！

ManipKit 为研究者与开发者提供端到端的机器人操作开发体验：

- **数据采集**：VR 遥操作 + 高保真力反馈
- **仿真训练**：基于 Isaac Sim 的大规模并行环境
- **策略学习**：模仿学习 + 强化学习统一接口
- **Sim2Real**：自动域随机化 + 硬件在环验证

硬件兼容性：12 款主流机械臂，8 种末端执行器，持续扩展中。
    `.trim(),
  },
  {
    slug: "smart-warehouse-deployment",
    title: "AIeveR 智能仓储解决方案落地头部物流企业",
    summary:
      "结合视觉分拣、移动机器人协同与调度优化算法，单仓日处理能力提升至 12 万单，人工成本降低 65%。",
    date: "2025-11-25",
    category: "行业应用",
    coverImage: "/images/about/news-warehouse.jpg",
    content: `
AIeveR 智能仓储解决方案在头部物流企业华北分拣中心正式上线，覆盖从入库到出库的全流程智能化改造。

实际运行数据：

- 单仓日均处理订单 12 万单
- 分拣准确率 99.97%
- 人工成本降低 65%
- 高峰期吞吐能力提升 3.2 倍
    `.trim(),
  },
  {
    slug: "annual-tech-summit-2025",
    title: "AIeveR 年度技术峰会圆满举办",
    summary:
      "首届 AIeveR Tech Summit 汇聚逾 800 位学术与产业专家，围绕具身智能的下一个十年展开深度研讨。",
    date: "2025-10-30",
    category: "公司动态",
    coverImage: "/images/about/news-summit.jpg",
    content: `
首届 AIeveR Tech Summit 于北京顺利举办，吸引超过 800 位来自高校、研究院所与产业界的专家参与。

峰会亮点：

- 15 场 Keynote 演讲，覆盖感知、操作、导航、大模型等前沿议题
- 32 篇技术海报展示
- 5 个动手工作坊与现场机器人演示
- 发布《具身智能技术白皮书 2025》
    `.trim(),
  },
  {
    slug: "humanoid-robot-prototype",
    title: "AIeveR 发布通用人形机器人研究平台 Aria-One",
    summary:
      "Aria-One 高 168cm，配备 32 自由度、双臂力控与全身感知系统，面向研究机构开放合作申请。",
    date: "2025-09-12",
    category: "产品发布",
    coverImage: "/images/about/news-humanoid.jpg",
    content: `
我们正式发布通用人形机器人研究平台 **Aria-One**。

Aria-One 关键规格：

- 身高 168cm，体重 62kg
- 32 自由度（含双臂 14 DoF、双腿 12 DoF、头部 3 DoF、腰 3 DoF）
- 双臂末端力控精度 ±0.1N
- 全身 IMU + 多目视觉 + 力触觉阵列
- 开放 ROS 2 + Python SDK

面向高校、研究机构与头部企业，即日起开放合作申请。
    `.trim(),
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}
