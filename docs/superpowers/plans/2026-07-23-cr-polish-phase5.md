# CRAtlas Phase 5 — 打磨与发布实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** 生产就绪 — 移动端适配、无障碍、404 页面、SEO、性能懒加载。

**Tech Stack:** Next.js 14+ (App Router, `output: 'export'`) · TypeScript · Tailwind CSS

## Global Constraints

- **零服务器**：纯静态站点，`output: 'export'`
- **命名规范**：文件夹 kebab-case / 组件文件 PascalCase
- **代码注释**：每个源文件顶部 @file/@brief；公共函数 TSDoc
- **Git 提交**：`[Phase X] type(scope): subject` 格式
- **依赖方向**：接口层 → 应用层 → 核心层 ← 基础设施层
- **Ponytail**：YAGNI, stdlib first, 最短 diff
- **每个文件夹必须包含 README.md**
- **SDD 文档**：每个 Task 前写 brief，每个 Task 后写 report

## 当前差距分析

| 项目 | 当前状态 | 目标 |
|------|----------|------|
| 404 页面 | ❌ 不存在（使用 Next.js 默认） | ✅ 自定义 404 页 |
| 移动端适配 | ❌ 仅 2 处响应式类 | ✅ 关键页面响应式 |
| 无障碍 ARIA | ❌ 仅 5 处 | ✅ 交互元素全覆盖 |
| SEO meta | ❌ 仅 layout 全局 meta | ✅ 每页独立 meta |
| 性能懒加载 | ❌ 图表组件未懒加载 | ✅ dynamic import |

---

### Task 1: 自定义 404 页面

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/not-found/README.md`

**Interfaces:**
- Consumes: 无
- Produces: 自定义 404 页面

- [ ] **Step 1: 创建 404 页面**

Create `app/not-found.tsx`:
```typescript
/**
 * @file    not-found.tsx
 * @brief   自定义 404 页面——页面未找到时显示。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mt-4">页面未找到</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        您访问的页面不存在。可能是链接已失效，或页面已被移除。
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        返回首页
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: 创建 README**

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/not-found.tsx app/not-found/README.md
git commit -m "[Phase 5] feat(ui): 添加自定义 404 页面"
```

---

### Task 2: 移动端适配

**Files:**
- Modify: `app/map/page.tsx`
- Modify: `app/graph/page.tsx`
- Modify: `app/timeline/page.tsx`
- Modify: `components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: 无
- Produces: 响应式布局

- [ ] **Step 1: Navbar 移动端适配**

Modify `components/layout/Navbar.tsx`：
- 添加移动端 hamburger menu（小屏幕显示汉堡按钮，点击展开导航链接）
- 使用 `useState` 控制菜单开关，标记 `'use client'`

- [ ] **Step 2: 地图页面移动端适配**

Modify `app/map/page.tsx`：
- 小屏幕：侧边栏从右侧改为底部抽屉或隐藏
- 地图高度自适应

- [ ] **Step 3: 关系图页面移动端适配**

Modify `app/graph/page.tsx`：
- 小屏幕：筛选面板和详情侧边栏改为可折叠

- [ ] **Step 4: 时间轴页面移动端适配**

Modify `app/timeline/page.tsx`：
- 小屏幕：调整时间轴控件布局

- [ ] **Step 5: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 6: 提交**

```bash
cd D:\Code\CRAtlas && git add app/ components/layout/Navbar.tsx
git commit -m "[Phase 5] feat(responsive): 移动端响应式适配"
```

---

### Task 3: 无障碍增强（ARIA）

**Files:**
- Modify: `components/timeline/TimeAxis.tsx`
- Modify: `components/map/ChinaMap.tsx`
- Modify: `components/graph/GraphFilter.tsx`
- Modify: `components/ui/SearchModal.tsx`
- Modify: `components/timeline/EventCard.tsx`

**Interfaces:**
- Consumes: 无
- Produces: ARIA 属性增强

- [ ] **Step 1: 为交互元素添加 ARIA 属性**

逐文件检查并添加：
- 所有 `<button>` 确保有 `aria-label`（如已有可见文本则不需要）
- 所有 `<input>` 确保有 `aria-label` 或关联 `<label>`
- 模态框（SearchModal）添加 `role="dialog"` `aria-modal="true"` `aria-labelledby`
- 导航栏添加 `role="navigation"`
- 搜索结果列表添加 `role="listbox"` 和 `role="option"`
- 时间轴滑块添加 `aria-valuemin` `aria-valuemax` `aria-valuenow`

- [ ] **Step 2: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add components/
git commit -m "[Phase 5] feat(a11y): 无障碍 ARIA 属性增强"
```

---

### Task 4: SEO 每页 meta 标签

**Files:**
- Modify: `app/event/[id]/page.tsx`
- Modify: `app/person/[id]/page.tsx`
- Modify: `app/faction/[id]/page.tsx`
- Create: `app/about/page.tsx`（如需要增强）

**Interfaces:**
- Consumes: 实体数据
- Produces: 每页独立 meta

- [ ] **Step 1: 事件详情页 meta**

Modify `app/event/[id]/page.tsx`，添加：
```typescript
export async function generateStaticParams() { ... }

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = getEvent(params.id);
  if (!event) return { title: '事件未找到 - CRAtlas' };
  return {
    title: `${event.title} - CRAtlas`,
    description: event.description.slice(0, 160),
  };
}
```

- [ ] **Step 2: 人物详情页 meta**

Modify `app/person/[id]/page.tsx`，添加 `generateMetadata`。

- [ ] **Step 3: 派系详情页 meta**

Modify `app/faction/[id]/page.tsx`，添加 `generateMetadata`。

- [ ] **Step 4: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add app/event/ app/person/ app/faction/
git commit -m "[Phase 5] feat(seo): 详情页独立 meta 标签"
```

---

### Task 5: 性能懒加载

**Files:**
- Modify: `app/map/page.tsx`
- Modify: `app/graph/page.tsx`

**Interfaces:**
- Consumes: 无
- Produces: dynamic import 懒加载

- [ ] **Step 1: 地图页面 Chart 懒加载**

确认 `ChinaMap` 已使用 `dynamic(() => import(...), { ssr: false })`（Phase 1 已实现）。
如未完全，补充 `loading` 占位。

- [ ] **Step 2: 关系图页面懒加载**

确认 `FactionGraph` 已使用 `dynamic(() => import(...), { ssr: false })`（Phase 2 已实现）。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/
git commit -m "[Phase 5] perf: 图表组件懒加载优化"
```

---

### Task 6: 最终验证与发布准备

**Files:**
- 无新建文件，全量验证

**Interfaces:**
- Consumes: 全部 Phase 5 交付物
- Produces: 验证通过的完整构建

- [ ] **Step 1: 运行完整测试套件**

Run: `cd D:\Code\CRAtlas && npx jest`
Expected: 全部测试通过

- [ ] **Step 2: 运行构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 3: 运行类型检查**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 4: 检查所有页面可访问**

确认所有路由页面可访问，无 404（除测试 404 页面本身）。

- [ ] **Step 5: 提交（如有修复）**

如有修复，提交：
```bash
cd D:\Code\CRAtlas && git add -A
git commit -m "[Phase 5] fix: 发布前验证修复"
```

---

## Phase 5 验收清单

- [ ] 自定义 404 页面显示正常
- [ ] 移动端（375px 宽度）地图/图谱/时间轴页面可用
- [ ] Navbar 移动端 hamburger menu 正常
- [ ] 所有交互元素有 ARIA 属性
- [ ] 详情页有独立 title 和 description
- [ ] 图表组件懒加载正常
- [ ] `npm run build` 成功
- [ ] `npx jest` 全部通过
- [ ] `npx tsc --noEmit` 无错误
- [ ] SDD brief + report 齐全
- [ ] progress.md 更新

---

*本计划覆盖 Phase 5（打磨与发布）。*
