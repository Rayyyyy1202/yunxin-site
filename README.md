# yunxin-site

AIeveR Robotics / 雲芯機器人官网项目，基于 Next.js App Router、React、TypeScript 和 Tailwind CSS v4。

## 快速开始

```powershell
npm install
npm run dev
```

默认本地地址通常是 `http://localhost:3000`。

常用验证命令：

```powershell
npm run lint
npm run build
```

## 项目结构

- `src/app/(site)`: 官网页面、路由分组和布局。
- `src/app/(admin)`: 素材管理后台。
- `src/app/api`: 联系表单和后台图片接口。
- `src/components`: 页面区块、布局组件和通用 UI。
- `src/data`: 产品、应用、新闻、资源、导航等静态内容。
- `src/lib`: 常量、类型、图片 manifest 和工具函数。
- `public/images`: 页面图片和 Figma 导出资产。

## 新页面开发

新页面以 Figma 为视觉源、代码仓库为实现源、Vercel 预览为验收结果。当前默认使用 Chrome 已登录 Figma 做视觉对照和截图/录屏证据，Figma MCP 只作为额度允许时的可选增强。正式开发前请先查看页面进度清单，再建立 node 清单并按 section 逐步实现和验证。

完整流程见：

- `D:\web-solo\docs\figma-page-development-workflow.md`
- `D:\web-solo\docs\page-progress-checklist.md`
- `D:\web-solo\docs\templates\figma-node-inventory.md`
- `D:\web-solo\docs\templates\new-page-delivery-checklist.md`

## 环境变量

按需创建 `.env.local`：

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_FROM_ADDRESS="AIeveR Site <onboarding@resend.dev>"
ADMIN_SECRET=
```

## 交接文档

仓库外的 `D:\web-solo\docs` 保存了当前项目交接文档，包括架构、开发环境、已知风险和 Figma 新页面开发工作流。
