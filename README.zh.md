# CRAtlas

CRAtlas（原名 CRMap）是一个静态站点应用，通过交互式地图、时间轴和关系图可视化文化大革命（1966–1976）期间造反派与保皇派的势力演变。项目基于 Next.js、TypeScript 和 Tailwind CSS 构建，以纯静态导出方式部署到 GitHub Pages。

## 项目概述

CRAtlas 将历史数据渲染为：

- **省级填色地图** — 基于 ECharts 展示各省派系控制（造反派 / 保皇派 / 军方 / 争夺中）随时间的变化。
- **时间轴** — 可拖动、可播放的时间控制条，联动地图和关系图视图。
- **关系图** — 基于 Cytoscape 的人物-派系隶属、事件因果、派系互动、社交关系图谱。
- **详情页** — 事件、人物、派系详情页，含史料出处和评论功能。

所有数据均为静态（TypeScript 模块 + GeoJSON），构建时打包。无后端、无数据库、无运行时 API 调用。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Next.js 14（静态导出，`output: 'export'`） |
| 语言 | TypeScript 5 |
| UI | React 18 |
| 样式 | Tailwind CSS 3 + PostCSS + Autoprefixer |
| 图表 | ECharts 5 + echarts-for-react |
| 图谱 | Cytoscape 3 + react-cytoscapejs |
| 状态管理 | Zustand 4 |
| 测试 | Jest 29 + ts-jest |
| 代码检查 | ESLint + eslint-config-next |

## 快速开始

### 前置条件

- Node.js 18+
- npm 9+

### 安装

```bash
npm install
```

### 开发

```bash
npm run dev
```

打开 <http://localhost:3000>，开发服务器支持热更新。

### 构建（静态导出）

```bash
npm run build
```

输出到 `out/` 目录，部署到 GitHub Pages。

### 测试

```bash
npm test            # 运行一次
npm run test:watch  # 监听模式
```

### 代码检查

```bash
npm run lint
```

## 环境变量

复制 `.env.example` 到 `.env.local` 并根据需要填写：

```bash
cp .env.example .env.local
```

| 变量 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages 子路径（如 `/CRAtlas`） |
| `NEXT_PUBLIC_GISCUS_REPO` | Giscus 评论仓库 |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | Giscus 仓库 ID |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | Giscus 讨论分类 |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | Giscus 分类 ID |

## 项目结构

```
app/                # Next.js App Router 页面与布局
  event/[id]/       # 事件详情页
  person/[id]/      # 人物详情页
  faction/[id]/     # 派系详情页
  map/              # 地图视图页
  graph/            # 关系图视图页
  timeline/         # 时间轴视图页
  about/            # 关于页
components/         # 共享 React 组件
  map/              # 地图组件（ChinaMap、MapLegend、EventPopup、EventSidebar）
  graph/            # 图谱组件（FactionGraph、GraphFilter、NodeDetail）
  timeline/         # 时间轴组件（TimeAxis、EventCard）
  layout/           # 布局组件（Navbar）
  ui/               # UI 组件（ErrorBoundary、SearchModal、SourceList、NotesPanel）
  comments/         # 评论组件（GiscusComments）
data/               # 静态 TypeScript 数据集（事件、人物、派系、地区、关系）
lib/                # 核心库（类型定义、数据查询、状态管理、笔记功能）
public/             # 静态资源（china.json 中国地图 GeoJSON）
docs/               # 项目文档与设计规范
.superpowers/       # SDD 进度台账与任务简报/报告
.github/            # Issue 模板与 PR 模板
```

## 数据模型

CRAtlas 使用五种核心实体类型，均定义在 `lib/types.ts` 中：

| 实体 | 数量 | 说明 |
| --- | --- | --- |
| 事件 | 18 | 含日期、地点、参与者、重要性等级 |
| 人物 | 18 | 含生平简介与派系隶属关系 |
| 派系 | 7 | 造反派 / 保皇派 / 军方组织 |
| 地区 | 34 | 中国省级行政区，含地图坐标 |
| 关系 | 19 | 隶属、因果、派系互动、社交四类 |

## 贡献指南

欢迎通过以下两种方式贡献：

- **低门槛入口**：使用我们的[修正](https://github.com/ROM4n2/CRAtlas/issues/new?template=correction.md)或[新增](https://github.com/ROM4n2/CRAtlas/issues/new?template=addition.md) Issue 模板提交建议。
- **正式入口**：提交 Pull Request，参见 [PR 模板](https://github.com/ROM4n2/CRAtlas/blob/main/.github/PULL_REQUEST_TEMPLATE.md)。

所有贡献须附可验证的史料出处。

## 许可证

待定
