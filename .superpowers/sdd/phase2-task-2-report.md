# Task 2 Report: 图谱数据查询函数（lib/data.ts）

## Status
**DONE**

## Summary
在 `lib/data.ts` 中新增 `getGraphNodes()` 和 `getGraphEdges()` 两个图谱数据查询函数，支持按节点类型、日期、关系类型过滤，并返回带 Cytoscape 样式属性的边数据。同步在 `lib/data.test.ts` 新增 6 个测试用例。

## Changes
- **lib/data.ts**（+96 行）:
  - 新增 `getGraphNodes(options?)` — 按类型（person/event/faction）和日期过滤返回节点列表
  - 新增 `getGraphEdges(filter?)` — 按关系类型和日期过滤返回带样式的边列表
  - 新增 `getEdgeStyle(type)` — 根据关系类型返回 Cytoscape 边样式（隶属/因果/派系互动/社交）
  - import 新增 `GraphNode`, `GraphEdge`, `CytoscapeEdgeStyle`, `RelationshipType`
- **lib/data.test.ts**（+39 行）:
  - `getGraphNodes` 测试 3 个：默认返回全部节点、按类型过滤、事件按日期过滤
  - `getGraphEdges` 测试 3 个：返回全部边、按类型过滤、边包含样式属性

## Verification
- **测试**: `npx jest` 28 tests passed（+6 新增）

## Commit
7d1d777 — [Phase 2] feat(data): 添加 getGraphNodes/getGraphEdges 图谱查询函数

## Concerns
无
