# app/faction/[id]/

派系详情页——展示单个派系的概述、组织信息、史料出处。

## 职责

派系详情页是 CRAtlas 的派系信息终端，用户从地图、关系图、搜索结果等入口点击派系后进入此页面，获取派系的完整信息。

## 文件清单

| 文件 | 职责 |
|------|------|
| `page.tsx` | 派系详情页——展示名称、类型、概述、组织信息（成立/解散日期）、史料出处 |
| `README.md` | 本文件 |

## 数据流 / 依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                  app/faction/[id]/page.tsx                    │
│                                                              │
│  路由参数: params.id                                         │
│                                                              │
│        ┌────────────────────────────────────────────┐        │
│        │  数据查询: getFaction(params.id)            │        │
│        └────────────────────────────────────────────┘        │
│              │                                               │
│              ├──→ 未找到 → notFound()                        │
│              │                                               │
│              ├──→ faction.name / factionType                 │
│              │                                               │
│              ├──→ faction.description                        │
│              │                                               │
│              ├──→ faction.foundedDate / dissolvedDate        │
│              │                                               │
│              └──→ SourceList (faction.sources)               │
│                                                              │
│  generateStaticParams: factions.map(f => ({ id: f.id }))    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 使用方式

派系详情页为静态生成页面（`generateStaticParams`），通过派系 ID 访问：

```tsx
// 导航至 /faction/[id] 即可渲染本页面
<Link href="/faction/central-cultural-revolution-group">中央文革小组</Link>
```

页面为服务端组件（Server Component），无需 `'use client'`。

## 约定

- **静态生成**：使用 `generateStaticParams` 预生成所有派系页面（适配 `output: 'export'`）
- **404 处理**：ID 不存在时调用 `notFound()` 显示 Next.js 默认 404 页
- **史料出处**：复用 `SourceList` 组件展示
- **布局**：`max-w-3xl mx-auto` 居中阅读布局
