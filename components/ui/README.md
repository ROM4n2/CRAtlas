# components/ui/

通用 UI 组件——无业务逻辑、跨视图复用的基础组件层（纯展示/交互）。

---

## 职责

- 提供与数据无关的纯 UI 组件，不 import 任何 `lib/` 层模块（`types.ts` / `data.ts` / `store.ts`）
- 负责渲染、布局、用户交互反馈，不关心业务状态
- 所有组件必须为 `'use client'` 或纯函数组件（无服务端依赖）
- 通过 props 接收数据和行为回调，不自发获取数据

---

## 文件清单

| 文件 | 职责 | 状态 |
|------|------|------|
| `ErrorBoundary.tsx` | React 错误边界，捕获子组件渲染异常防止白屏 | 已实现 |
| `SearchModal.tsx` | 全局搜索弹窗——按名称/标签检索实体 | <!-- TODO --> |
| `Tag.tsx` | 派系/事件标签徽章——按类型着色 | <!-- TODO --> |
| `Loading.tsx` | 加载中指示器（骨架屏 / spinner） | <!-- TODO --> |
| `Tooltip.tsx` | 悬浮提示组件 | <!-- TODO --> |
| `Modal.tsx` | 通用模态框容器 | <!-- TODO --> |
| `EmptyState.tsx` | 空数据占位提示 | <!-- TODO --> |

> **注意**：标记为 <!-- TODO --> 的组件尚未实现，按需添加。

---

## ErrorBoundary 详解

### 定位

根布局级别的全局安全网。在 `app/layout.tsx`（第 28-30 行）中包裹 `<main>` 区域：

```tsx
// app/layout.tsx
<ErrorBoundary>
  <main className="min-h-screen">{children}</main>
</ErrorBoundary>
```

当任意页面组件在渲染过程中抛出异常时，ErrorBoundary 捕获错误并展示 fallback UI，避免整个页面白屏。

### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `children` | `ReactNode` | 是 | — | 受保护的子组件树 |
| `fallback` | `ReactNode` | 否 | 内置错误提示 | 自定义错误 UI，若不传则使用内置样式 |

### 默认 Fallback UI

当未提供自定义 `fallback` 时，渲染居中布局的红色标题 + 灰色错误消息：

```tsx
<div className="p-8 text-center">
  <h2 className="text-xl font-bold text-red-600 mb-2">渲染出错</h2>
  <p className="text-gray-600 text-sm">{error.message || '未知错误'}</p>
</div>
```

### 错误日志

当前实现通过 `getDerivedStateFromError` 将错误对象存入 state 并展示 `error.message`。后续可扩展 `componentDidCatch` 上报错误到监控服务：

```tsx
// 未来扩展（当前未实现）
componentDidCatch(error: Error, info: ErrorInfo) {
  console.error('[ErrorBoundary]', error, info.componentStack);
  // TODO: 上报到 Sentry / 自定义日志端点
}
```

### 使用场景示例

**场景 1：根布局全局保护（现有用法）**

```tsx
<ErrorBoundary>
  <main className="min-h-screen">{children}</main>
</ErrorBoundary>
```

**场景 2：地图区域独立保护（推荐做法）**

```tsx
<ErrorBoundary fallback={<div className="flex items-center justify-center h-96 text-gray-500">地图加载失败，请刷新重试</div>}>
  <MapPanel />
</ErrorBoundary>
```

**场景 3：关系图局部保护**

```tsx
<ErrorBoundary fallback={<EmptyState message="关系图渲染异常" />}>
  <RelationshipGraph data={graphData} />
</ErrorBoundary>
```

**场景 4：侧边栏独立容错**

```tsx
<ErrorBoundary fallback={<aside className="p-4 text-sm text-yellow-700 bg-yellow-50">侧边栏暂时不可用</aside>}>
  <Sidebar />
</ErrorBoundary>
```

---

## 数据流 / 依赖关系

```
页面/视图组件 (app/*, components/*)
  │ 传入 props（业务数据 + 回调）
  ▼
components/ui/*   ← 纯组件，零 lib/ 依赖
  │
  └── 仅依赖 React、Tailwind 样式、极少数第三方 UI 库（如需要）
```

- **组件不直接 import** `lib/data.ts`、`lib/store.ts`、`lib/types.ts`
- 所有业务数据通过父组件的 props 注入
- 用户交互通过 props 回调（`onXxx`）通知父组件

---

## 约定

### 何时放入 ui/ 而非 feature 目录

| 放入 `components/ui/` | 放入 `components/<feature>/` |
|-----------------------|------------------------------|
| 被两个或以上 feature 复用 | 只在一个 feature 内使用 |
| 纯展示/交互，无业务语义 | 包含业务逻辑或领域术语 |
| 可通过 props 完全配置 | 依赖 store 或数据查询 |
| 示例：ErrorBoundary、Tag、Modal | 示例：TimelinePanel、MapView |

### 纯组件原则

所有 `ui/` 下的组件必须遵守以下规则：

1. **无业务逻辑** — 不调用 `useStore`、不调用 `getEvents()` 等数据查询函数
2. **无 side effect**（除非是纯粹的 UI 交互副作用，如 focus 管理）
3. **完全受控** — 数据和状态全部通过 props 传入，通过 props 回调（`onClick`、`onChange`、`onClose`）通知变化
4. **可测试** — 因无外部依赖，可直接通过 props 渲染测试
5. **Tailwind first** — 优先使用 Tailwind 类名，避免自定义 CSS

### 命名与导出

- 默认导出（`export default`）组件本身
- 如有配套类型，命名导出（`export interface XxxProps`）
- 文件使用 PascalCase（`ErrorBoundary.tsx`）
- Props 接口命名：`interface Props`（私有）或 `export interface XxxProps`（公开）

### 国际化

- 所有用户可见文本通过 props 传入（如 `emptyText`、`errorMessage`），组件内不硬编码中文字符串
- 默认值可使用中文，但必须可通过 props 覆盖

### 无障碍（Accessibility）

- 交互元素必须包含 `aria-*` 属性
- 模态框需支持 `Escape` 关闭 + focus trap
- 颜色对比度满足 WCAG AA
