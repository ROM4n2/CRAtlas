# SDD Progress Ledger — CRAtlas

## Phase 0 — COMPLETE (12 commits, 8494a34..8bda00b)

- Task 1: 项目脚手架 — df242cb
- Task 2: 类型定义 — 5bd488c
- Task 3: 示例数据 — 45f6c16
- Task 4: 数据查询层 — 09b6125
- Task 5: 状态管理 — 44dc135
- Task 6: GeoJSON — fb1b86c
- Task 7: GitHub Actions — c1018df
- Task 8: 页面骨架 — 7412f95
- Task 9: ECharts 地图 — 4ee06ea
- Task 10: CLAUDE.md — da3a5c3
- Task 11: 可行性预研 — 7911626

## Phase 1: 核心可视化 — COMPLETE (9 commits, f41f0c8..9851a4e)

- [x] Task 1: 修复测试架构违规 — 096206c (24/24 tests)
- [x] Task 2: 修复北京重叠 — 9a99821
- [x] Task 3: Error Boundary — 35b17d1 (build pass)
- [x] Task 4: 补齐数据 — 789ceaa (10事件/11人物)
- [x] Task 5: 辅助函数 — f41f0c8 (tsc clean)
- [x] Task 6: TimeAxis.tsx — e2fabda (build pass)
- [x] Task 7: MapLegend.tsx — f1bece0 (build pass)
- [x] Task 8: EventPopup.tsx — 7c03be0 (build pass)
- [x] Task 9: EventSidebar.tsx — 85194f3 (build pass)
- [x] Task 10: ChinaMap 增强 — 918edce (build pass)
- [x] Task 11: /map 页面集成 — 149ee95 (build pass)

## Phase 1 修复 — COMPLETE

- [x] F1: 事件散点坐标 [0,0] → 省份中心 — 149751f (34 省坐标 + 分级大小)
- [x] F2: 播放逻辑缺失 → setInterval 推进 — b9d6d07 (speed×30天/秒)
- [x] Minor: package.json name/engines + .gitattributes + ECharts tree-shake — a13624b
- [x] Docs: app/map/README.md + getRegionCoordinates 测试 — 56e0550

## Phase 2: 关系图 — COMPLETE (8 commits, 1c0a344..2a2cc31)

- [x] Task 1: 安装 Cytoscape 依赖与类型 — 1c0a344 (cytoscape-dagre + @types/cytoscape)
- [x] Task 2: 图谱数据查询函数 — 7d1d777 (33 tests, +6 新增)
- [x] Task 3: 关系图核心组件 — 4fa1887 (FactionGraph.tsx + dagre 类型)
- [x] Task 4: 筛选面板 — f50ebff (GraphFilter.tsx)
- [x] Task 5: 节点详情侧边栏 — 435a86e (NodeDetail.tsx)
- [x] Task 6: 关系图页面 — b94e106 (6/6 页面, build pass)
- [x] Task 7: 组件文档 — c0551a2 (components/graph/README.md)
- [x] Task 8: 最终验证与集成 — 2a2cc31 (33 tests, 6/6 页面, tsc clean)
