# Task 5 Report: 节点详情侧边栏（NodeDetail.tsx）

## Status
**DONE**

## Summary
创建 `NodeDetail.tsx` 节点详情侧边栏组件，根据节点类型（person/event/faction）调用对应的 `getPerson`/`getEvent`/`getFaction` 查询函数，展示节点的基本信息（姓名/标题、日期/年份、简介）和详情页链接。

## Changes
- **components/graph/NodeDetail.tsx**（+90 行，新建）:
  - 未选中节点时显示"点击节点查看详情"提示
  - 人物节点：显示姓名、生卒年份、生平简介、详情链接
  - 事件节点：显示标题、日期、描述、详情链接
  - 派系节点：显示名称、派系类型、描述、详情链接
  - 右上角关闭按钮（✕），点击触发 `onClose` 回调
  - 使用 `next/link` 提供跳转到详情页的链接

## Verification
- **构建**: `npm run build` 通过

## Commit
435a86e — [Phase 2] feat(graph): 节点详情侧边栏组件

## Concerns
无
