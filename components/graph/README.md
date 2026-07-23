# components/graph/

关系图相关组件——基于 Cytoscape.js 的知识图谱可视化，展示人物-派系隶属、事件因果、派系互动、人物社交四种关系。

## 职责

| 组件 | 职责 |
|------|------|
| **FactionGraph.tsx** | Cytoscape 图谱核心渲染：节点/边样式、布局算法、点击交互 |
| **GraphFilter.tsx** | 筛选面板：按关系类型过滤、切换布局算法 |
| **NodeDetail.tsx** | 节点详情侧边栏：显示选中节点的基本信息 |

## 文件清单

| 文件 | 职责 | 输入 | 输出 | 依赖 |
|------|------|------|------|------|
| FactionGraph.tsx | 图谱渲染 + 交互 | `activeTypes`, `layout`, `onNodeClick` | Cytoscape 实例渲染 | `@/lib/store`, `@/lib/data`, `cytoscape`, `cytoscape-dagre` |
| GraphFilter.tsx | 筛选/布局控制 | `activeTypes`, `layout`, 回调 | 渲染筛选按钮 | `@/lib/types` |
| NodeDetail.tsx | 节点详情展示 | `nodeId`, `nodeType`, `onClose` | 渲染节点信息 | `@/lib/data`, `@/lib/types` |

## 数据流 / 依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                     app/graph/page.tsx                       │
│                                                              │
│  状态: activeTypes, layout, selectedNode                     │
│         │                                                    │
│         ├──→ GraphFilter (筛选/布局控制)                     │
│         │                                                    │
│         ├──→ FactionGraph (Cytoscape 渲染)                   │
│         │      ├── 订阅 useTimeStore.currentDate             │
│         │      ├── getGraphNodes() → 节点                    │
│         │      ├── getGraphEdges() → 边                      │
│         │      └── 布局: cose / dagre / concentric           │
│         │                                                    │
│         └──→ NodeDetail (节点详情展示)                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 节点样式

| 节点类型 | 形状 | 颜色 |
|----------|------|------|
| 人物 (person) | 圆形 (circle) | `#3B82F6` |
| 事件 (event) | 菱形 (diamond) | `#F59E0B` |
| 派系 (faction) | 方形 (rectangle) | 按 factionType 着色 |

## 边样式

| 关系类型 | 线型 | 箭头 |
|----------|------|------|
| 隶属 (membership) | 实线 | 有 |
| 因果 (causality) | 虚线 | 有 |
| 派系互动 (faction-interaction) | 粗实线 | 双向 |
| 社交 (social) | 点线 | 无 |

## 布局算法

| 布局 | 说明 |
|------|------|
| cose | 力导向，适合看整体网络结构 |
| dagre | 层级，适合看因果链和隶属层级 |
| concentric | 同心圆，适合看核心-边缘关系 |

## 约定

- Cytoscape 必须在客户端渲染（`ssr: false`），避免 SSR 报错
- 布局切换通过 `cy.layout().run()` 重新计算
- 节点点击通过 Cytoscape `tap` 事件监听
- 不要直接 import 数据文件，通过 `lib/data.ts` 查询函数获取数据
