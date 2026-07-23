# app/graph/

关系图视图页——Cytoscape 图谱 + 筛选面板 + 节点详情侧边栏。

## 职责

关系图是 CRAtlas 的派系关系可视化入口，将人物、事件、派系之间的关联以节点-边图谱呈现。用户通过筛选关系类型、切换布局算法、点击节点探查具体实体的详情与出处。

## 文件清单

| 文件 | 职责 |
|------|------|
| `page.tsx` | 关系图页面——组合 FactionGraph、GraphFilter、NodeDetail |
| `README.md` | 本文件 |

## 数据流 / 依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                      app/graph/page.tsx                      │
│                                                              │
│  状态: activeTypes (本地 useState, RelationshipType[])       │
│        layout (本地 useState, 'cose'|'dagre'|'concentric')   │
│        selectedNode (本地 useState, {id, type} | null)       │
│                                                              │
│        ┌────────────────────────────────────────────┐        │
│        │  数据查询: getGraphNodes(activeTypes)      │        │
│        │            getGraphEdges(activeTypes)      │        │
│        └────────────────────────────────────────────┘        │
│              │                                               │
│              ├──→ FactionGraph (动态导入, ssr: false)        │
│              │      └── 订阅 activeTypes / layout            │
│              │      └── onNodeClick → setSelectedNode        │
│              │                                               │
│              ├──→ GraphFilter (关系类型筛选 + 布局切换)       │
│              │                                               │
│              └──→ NodeDetail (selectedNode 非空时显示)       │
│                     └── getEntityById() → 实体详情 + 出处     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 使用方式

关系图视图为独立路由页面，通过顶部导航栏"关系图"链接访问：

```tsx
// 导航至 /graph 即可渲染本页面
<Link href="/graph">关系图</Link>
```

页面为 `'use client'` 组件，必须放在客户端渲染上下文中。

## 约定

- **动态导入 Cytoscape**：`FactionGraph` 使用 `next/dynamic` + `ssr: false` 避免 SSR 报错
- **状态管理**：筛选条件与布局通过本地 `useState` 管理，选中节点通过 `onNodeClick` 回调提升
- **布局**：采用 `flex h-[calc(100vh-3.5rem)]` 全屏布局，右侧固定 320px 侧边栏
- **节点点击联动**：点击图谱节点 → 右侧 NodeDetail 展示实体详情、派系归属、史料出处
