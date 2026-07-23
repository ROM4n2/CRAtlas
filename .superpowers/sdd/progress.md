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

## Phase 5: 打磨与发布 — COMPLETE (6 commits, 030784a..b97f221)

- [x] Task 1: 自定义 404 页面 — 030784a (构建通过)
- [x] Task 2: 移动端适配 — 2bffaf4 + 7e75cca fix (Navbar hamburger + 底部抽屉)
- [x] Task 3: 无障碍 ARIA — 4f536e8 (6 组件增强)
- [x] Task 4: SEO meta — e5fbb50 (详情页独立 meta)
- [x] Task 5: 性能懒加载 — 无需修改 (已有 dynamic + ssr:false)
- [x] Task 6: 最终验证 — 2134b0f (33 tests, 51 页面, tsc clean)

## Phase 4: 交流功能 — COMPLETE (5 commits, 3f1e9dd..bcc6e13)

- [x] Task 1: Giscus 评论 — 3f1e9dd (@giscus/react, 三详情页集成)
- [x] Task 2: 笔记功能 — 0d658d5 (localStorage CRUD + NotesPanel)
- [x] Task 3: 贡献指南 — 650db70 (Issue 模板 + PR 模板)
- [x] Task 4: 关于页完善 — bcc6e13 (贡献指南文案)
- [x] Task 5: 最终验证 — ae6413a (33 tests, 51 页面, tsc clean)

## Phase 3: 详情页与内容填充 — COMPLETE (9 commits, e64d620..7d2e7e8)

- [x] Task 1: 史料出处组件 — e64d620 (SourceList.tsx, build pass)
- [x] Task 2: 全局搜索弹窗 — 60acab1 + 8020b25 fix (SearchModal.tsx, Cmd+K)
- [x] Task 3: 事件详情页 — 5e8cde7 (/event/[id], 10 SSG 页面)
- [x] Task 4: 人物详情页 — 7c9ba27 (/person/[id], 11 SSG 页面)
- [x] Task 5: 派系详情页 — 141ac2b (/faction/[id], 4 SSG 页面)
- [x] Task 6: 时间轴视图页 — 85901fc (/timeline + EventCard.tsx)
- [x] Task 7: 关于页 — 4860454 (/about)
- [x] Task 8: 内容扩充 — cb45533 + 7d2e7e8 fix (18 事件/18 人物/7 派系/19 关系)
- [x] Task 9: 最终验证与集成 — 无修复 (33 tests, 51 静态页面, tsc clean)
