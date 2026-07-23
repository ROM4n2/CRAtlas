# app/person/[id]/

人物详情页——展示单个人物的生平、派系隶属时间线、史料出处。

## 职责

人物详情页是 CRAtlas 的人物信息终端，用户从事件详情页、关系图、搜索结果等入口点击人物后进入此页面，获取人物的完整信息。

## 文件清单

| 文件 | 职责 |
|------|------|
| `page.tsx` | 人物详情页——展示姓名、生卒年、生平、派系隶属、史料出处 |
| `README.md` | 本文件 |

## 数据流 / 依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                  app/person/[id]/page.tsx                     │
│                                                              │
│  路由参数: params.id                                         │
│                                                              │
│        ┌────────────────────────────────────────────┐        │
│        │  数据查询: getPerson(params.id)             │        │
│        └────────────────────────────────────────────┘        │
│              │                                               │
│              ├──→ 未找到 → notFound()                        │
│              │                                               │
│              ├──→ affiliations: getFactionName(factionId)    │
│              │      └── Link → /faction/[id]                 │
│              │                                               │
│              └──→ SourceList (person.sources)                │
│                                                              │
│  generateStaticParams: people.map(p => ({ id: p.id }))      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 使用方式

人物详情页为静态生成页面（`generateStaticParams`），通过人物 ID 访问：

```tsx
// 导航至 /person/[id] 即可渲染本页面
<Link href="/person/kuai-dafu">蒯大富</Link>
```

页面为服务端组件（Server Component），无需 `'use client'`。

## 约定

- **静态生成**：使用 `generateStaticParams` 预生成所有人物页面（适配 `output: 'export'`）
- **404 处理**：ID 不存在时调用 `notFound()` 显示 Next.js 默认 404 页
- **派系隶属链接**：通过 `getFactionName()` 查询派系名称后生成 `/faction/[id]` 链接
- **史料出处**：复用 `SourceList` 组件展示
- **布局**：`max-w-3xl mx-auto` 居中阅读布局
