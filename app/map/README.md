# app/map/

地图视图页面——中国地图 + 时间轴 + 事件侧边栏 + 图例 + 弹出卡片。

## 职责

地图视图是 CRAtlas 的核心可视化入口，将派系势力分布、历史事件标注、时间轴控制集成在单一页面中。用户通过拖动时间轴观察 1966-1976 年间派系控制力的演变。

## 文件清单

| 文件 | 职责 |
|------|------|
| `page.tsx` | 地图页面——组合 ChinaMap、TimeAxis、MapLegend、EventPopup、EventSidebar |
| `README.md` | 本文件 |

## 数据流 / 依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                      app/map/page.tsx                        │
│                                                              │
│  状态: currentDate (from useTimeStore)                       │
│        selectedEvent (本地 useState)                         │
│                                                              │
│        ┌────────────────────────────────────────────┐        │
│        │  数据查询: getEventsByDate(currentDate)    │        │
│        └────────────────────────────────────────────┘        │
│              │                                               │
│              ├──→ ChinaMap (onEventSelect → setSelectedEvent)│
│              │      └── 订阅 useTimeStore.currentDate        │
│              │      └── getRegionControl() → 省份着色         │
│              │      └── getEventsByDate() → 事件散点          │
│              │                                               │
│              ├──→ MapLegend (静态展示)                       │
│              │                                               │
│              ├──→ EventPopup (selectedEvent 非空时显示)      │
│              │                                               │
│              └──→ EventSidebar (events 列表 + 点击选中)      │
│                                                              │
│        TimeAxis (底部全局时间控制条)                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 使用方式

地图视图为独立路由页面，通过顶部导航栏"地图"链接访问：

```tsx
// 导航至 /map 即可渲染本页面
<Link href="/map">地图</Link>
```

页面为 `'use client'` 组件，必须放在客户端渲染上下文中。

## 约定

- **动态导入 ECharts**：`ChinaMap` 使用 `next/dynamic` + `ssr: false` 避免 SSR 报错
- **状态管理**：当前选中日期通过 `useTimeStore` 全局共享，选中事件通过本地 `useState` 管理
- **布局**：采用 `flex flex-col h-[calc(100vh-3.5rem)]` 全屏布局，时间轴固定在底部
- **事件选择联动**：点击地图散点 → 弹出 EventPopup；点击侧边栏条目 → 同样触发 EventPopup
