# app/event/[id]/

事件详情页——展示单个事件的全文描述、参与者、相关事件、史料出处。

## 职责

事件详情页是 CRAtlas 的事件信息终端，用户从地图、关系图、搜索结果等入口点击事件后进入此页面，获取事件的完整信息。

## 文件清单

| 文件 | 职责 |
|------|------|
| `page.tsx` | 事件详情页——展示标题、别名、日期、描述、地点、参与者、相关事件、史料出处 |
| `README.md` | 本文件 |

## 数据流 / 依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                  app/event/[id]/page.tsx                      │
│                                                              │
│  路由参数: params.id                                         │
│                                                              │
│        ┌────────────────────────────────────────────┐        │
│        │  数据查询: getEvent(params.id)              │        │
│        └────────────────────────────────────────────┘        │
│              │                                               │
│              ├──→ 未找到 → notFound()                        │
│              │                                               │
│              ├──→ participants: getPerson(id) × N            │
│              │      └── Link → /person/[id]                  │
│              │                                               │
│              ├──→ relatedEvents: getEvent(id) × N            │
│              │      └── Link → /event/[id]                   │
│              │                                               │
│              └──→ SourceList (event.sources)                 │
│                                                              │
│  generateStaticParams: events.map(e => ({ id: e.id }))       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 使用方式

事件详情页为静态生成页面（`generateStaticParams`），通过事件 ID 访问：

```tsx
// 导航至 /event/[id] 即可渲染本页面
<Link href="/event/may16-notice-1966">五一六通知</Link>
```

页面为服务端组件（Server Component），无需 `'use client'`。

## 约定

- **静态生成**：使用 `generateStaticParams` 预生成所有事件页面（适配 `output: 'export'`）
- **404 处理**：ID 不存在时调用 `notFound()` 显示 Next.js 默认 404 页
- **参与者链接**：通过 `getPerson()` 查询后生成 `/person/[id]` 链接（Phase 3 Task 4）
- **相关事件链接**：通过 `getEvent()` 查询后生成 `/event/[id]` 链接
- **史料出处**：复用 `SourceList` 组件展示
- **布局**：`max-w-3xl mx-auto` 居中阅读布局
