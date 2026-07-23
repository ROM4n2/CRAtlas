# Task 4 Report: 筛选面板（GraphFilter.tsx）

## Status
**DONE**

## Summary
创建 `GraphFilter.tsx` 筛选面板组件，提供关系类型（隶属/因果/派系互动/社交）的多选过滤和布局算法（力导向/层级/同心圆）的切换功能。

## Changes
- **components/graph/GraphFilter.tsx**（+85 行，新建）:
  - `ALL_TYPES` 常量定义 4 种关系类型的值和中文标签
  - `LAYOUTS` 常量定义 3 种布局算法的值和中文标签
  - `toggleType` 函数：切换关系类型的激活状态
  - UI：白色卡片式面板，激活按钮蓝色高亮，未激活按钮灰色

## Verification
- **构建**: `npm run build` 通过

## Commit
f50ebff — [Phase 2] feat(graph): 筛选面板（关系类型 + 布局切换）

## Concerns
无
