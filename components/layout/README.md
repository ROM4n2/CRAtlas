# components/layout/

## 职责

布局组件定义应用的页面外壳（chrome），在根布局中被引用一次，为所有路由提供一致的导航与结构框架。属于四层架构中的 **接口层**。

## 文件清单

| 文件 | 说明 |
| --- | --- |
| `Navbar.tsx` | 顶部导航栏 — Logo + 三大视图入口（地图 / 时间轴 / 关系图）+ 关于页 |
| `README.md` | 本文件 |

<!-- TODO: 后续可能添加 Footer、Sidebar 等全局布局组件 -->

## 数据流 / 依赖关系

```
app/layout.tsx
  └─ <Navbar />
  └─ <main>{children}</main>    ← 页面内容由路由注入
       └─ page.tsx（地图 / 时间轴 / 关系图 / 关于）
```

布局组件通过 `app/layout.tsx` 将导航栏渲染在 `{children}` 外侧，保证所有页面共享同一套外壳，页面自身只关注内容。

## 使用方式

```tsx
// app/layout.tsx
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
```

## 组件 API

### Navbar

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| （无 props） | — | — | 纯展示组件，使用 `next/link` 导航 |

**技术要点：**
- 使用 `next/link` 进行客户端路由切换，无页面刷新
- 当前无 active 高亮指示；后续可基于 `usePathname()` + `clsx` 添加

## 扩展指南

- **添加新页面：** 同步更新 Navbar 中的 `<Link>` 数组
- **导航项增多（> 5 项）：** 建议抽离为配置数组 + 响应式折叠菜单（移动端 hamburger menu）
- **Footer 组件：** 如需页脚，在此目录新建 `Footer.tsx`，统一在 `app/layout.tsx` 引入
- **Active 状态：** 使用 `usePathname()` + `clsx` 实现当前页高亮

## 约定

- 每个文件一个组件，PascalCase 命名，与文件名一致。
- 仅当组件需要交互性（`useState`、事件处理等）时标记 `'use client'`；纯结构组件保持服务端组件。
- 样式使用 Tailwind 工具类；自定义样式通过 `globals.css` 中的 CSS 变量（如 faction 颜色）定义。
