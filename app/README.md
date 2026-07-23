# app/

## 职责

`app/` 是 Next.js App Router 的页面路由目录，负责定义所有 URL 路由及其对应的页面组件。作为四层架构的最顶层（接口层），它组织应用的导航结构并编排各组件的组合方式。

## 路由结构

| 路由 | 文件路径 | 说明 |
|------|----------|------|
| `/` | `app/page.tsx` | 首页：项目简介 + 三大视图入口（地图/时间轴/关系图） |
| `/map` | `app/map/page.tsx` | 地图视图：中国地图 + 时间轴 + 事件侧边栏 + 图例 + 弹出卡片 |

> 首页中 `/timeline` 和 `/graph` 两个链接指向计划中的路由，尚未实现。

## 布局

`app/layout.tsx` 是根布局文件，为所有页面提供统一的外壳：

- **HTML 结构**：`<html lang="zh-CN">` 设定文档语言为简体中文
- **导航栏**：全局 `Navbar` 组件，固定在页面顶部
- **错误边界**：`ErrorBoundary` 包裹主内容区域，捕获渲染异常
- **主内容区**：`<main className="min-h-screen">` 承载各页面子组件
- **元数据**：页面标题 `CRAtlas — 文革派系势力可视化` 和描述信息

## 架构位置

`app/` 位于四层架构的最顶层（**接口层**），严格遵循依赖方向：

```
接口层 (app/, components/) → 应用层 (lib/data.ts, lib/store.ts) → 核心层 (lib/types.ts) ← 基础设施层 (data/)
```

- 页面组件直接消费 `components/` 中的 UI 组件和 `lib/` 中的数据查询与状态管理模块
- 页面组件**不得直接 import** `data/` 目录下的数据文件，所有数据访问必须通过 `lib/data.ts` 的查询函数

## 约定

- **App Router**：使用 Next.js App Router（而非 Pages Router），路由对应文件夹层级
- **静态导出**：`output: 'export'` 全站生成静态 HTML，无服务端运行时（SSG → GitHub Pages）
- **客户端组件**：当页面需要交互性（事件处理、状态、生命周期）时，在文件顶部添加 `'use client'` 指令
- **路由命名**：文件夹使用 kebab-case（小写字母 + 连字符），如 `app/map/`
- **数据获取**：在页面层完成数据查询，将结果通过 props 传递给子组件
- **动态导入**：对依赖浏览器 API 的组件（如 ECharts 地图），使用 `next/dynamic` 配合 `ssr: false` 避免 SSR 兼容问题
