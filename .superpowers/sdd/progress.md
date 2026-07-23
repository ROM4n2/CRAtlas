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

## Phase 1: 核心可视化 — FILES CREATED, NEEDS BASH VERIFY

- [x] Task 1: 修复测试架构违规 — 096206c (24/24 tests ✅)
- [x] Task 2: 修复北京重叠 — 9a99821
- [x] Task 3: Error Boundary — 35b17d1 (build ✅)
- [x] Task 4: 补齐数据 — 789ceaa (10事件/11人物)
- [x] Task 5: 辅助函数 — f41f0c8 (tsc ✅)
- [x] Task 6: TimeAxis.tsx — 文件已创建，待验证提交
- [x] Task 7: MapLegend.tsx — 文件已创建，待验证提交
- [x] Task 8: EventPopup.tsx — 文件已创建，待验证提交
- [x] Task 9: EventSidebar.tsx — 文件已创建，待验证提交
- [x] Task 10: ChinaMap.tsx + README.md — 文件已创建，待验证提交
- [x] Task 11: app/map/page.tsx + app/page.tsx — 文件已创建，待验证提交

## 待 Bash 恢复后执行

1. 提交文件命名整理（.git add .superpowers/sdd/）
2. npm run build（验证全部 Task 6-11 构建）
3. npx jest（验证测试仍通过）
4. git add + commit 所有新文件（Task 6 到 Task 11，共 6 个 commit）

## Findings Buffer (Minor)

- T1(Phase0): package.json name "crmap" vs CRAtlas
- T1(Phase0): no "engines" field
- T1(Phase0): no .gitattributes for CRLF
- T9(Phase0): ECharts full import 622kB — tree-shake later
- 安全分类器间歇性不可用，主代理需补验补提交
