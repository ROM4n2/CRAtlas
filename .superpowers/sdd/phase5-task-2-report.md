### Task 2: 移动端适配 — Report

**Status:** DONE

**Commits:**
- `2bffaf4` [Phase 5] feat(responsive): 移动端响应式适配

**Files Modified:**

| File | Change |
|------|--------|
| `components/layout/Navbar.tsx` | 添加 `'use client'` + `useState`，移动端汉堡按钮 + 下拉菜单，桌面端保持水平导航 |
| `app/map/page.tsx` | 移动端侧边栏改为底部抽屉（带遮罩），浮动按钮触发；桌面端保持固定右侧边栏 |
| `app/graph/page.tsx` | 移动端筛选/详情面板合并为可折叠底部抽屉，浮动按钮触发 |
| `app/timeline/page.tsx` | 移动端减小内边距（`p-3`）和标题字号（`text-lg`），桌面端保持原样 |
| `components/timeline/TimeAxis.tsx` | 移动端控件垂直堆叠（`flex-col`），桌面端水平排列（`md:flex-row`） |

**Design Decisions:**
- 断点统一使用 `md` (768px) 作为移动/桌面分界，符合 Tailwind 约定
- 移动端侧边栏使用底部抽屉（bottom sheet）模式，符合移动端交互习惯
- 抽屉带半透明遮罩层，点击遮罩可关闭，符合无障碍实践
- 浮动操作按钮（FAB）固定在 `bottom-20 right-4`，避免与 TimeAxis 重叠
- 点击导航链接后自动关闭菜单（Navbar）和抽屉（Map/Graph）

**Build Verification:**
- `npm run build` — passed (exit 0)
- 51 static pages generated successfully
- No TypeScript errors, no lint warnings

**Self-Review Notes:**
- 桌面端布局完全未受影响（使用 `md:` 前缀实现响应式）
- 所有新增交互元素均带 `aria-label` / `aria-expanded` / `role="dialog"` 等无障碍属性
- Navbar 的 `isMenuOpen` state 在路由跳转后自动关闭（通过 `onClick` 回调）
- 未引入新依赖，纯 Tailwind 内置响应式工具

**Concerns:** 无
