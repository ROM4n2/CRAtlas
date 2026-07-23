# Task 6 Report: 关系图页面（/graph）

## Status
**DONE**

## Summary
创建 `app/graph/page.tsx` 关系图视图页，集成 FactionGraph、GraphFilter、NodeDetail 三个组件，通过 `useState` 管理 activeTypes、layout、selectedNode 状态。FactionGraph 通过 `next/dynamic` 动态导入并禁用 SSR，避免 Cytoscape 在服务端渲染报错。

## Changes
- **app/graph/page.tsx**（+56 行，新建）:
  - `FactionGraph` 使用 `dynamic(() => import(...), { ssr: false })` 客户端渲染，loading 态显示灰色脉冲占位
  - 状态：`activeTypes`（默认全部 4 种关系类型）、`layout`（默认 cose）、`selectedNode`（默认 null）
  - 布局：左侧 flex-1 图谱区域 + 右侧 w-80 侧边栏（筛选面板 + 节点详情）
  - 页面高度 `calc(100vh - 3.5rem)` 适配顶部导航栏

## Verification
- **构建**: `npm run build` 通过，6/6 页面（含 `/graph`）

## Commit
b94e106 — [Phase 2] feat(graph): 关系图视图页（集成图谱+筛选+详情侧边栏）

## Concerns
无
