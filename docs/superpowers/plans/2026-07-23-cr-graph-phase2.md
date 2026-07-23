# CRAtlas Phase 2 — 关系图实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 Cytoscape.js 知识图谱，展示人物-派系隶属、事件因果、派系互动、人物社交四种关系，含筛选面板、布局切换、节点详情侧边栏，交付可用的 `/graph` 视图。

**架构:** 关系图组件订阅 Zustand store 的 `currentDate`，通过 `lib/data.ts` 查询函数获取节点/边数据。Cytoscape 实例通过 `useRef` 持有，布局切换时重新运行 layout 算法。筛选面板控制显示的关系类型。

**Tech Stack:** Next.js 14+ (App Router) · TypeScript · Tailwind CSS · Cytoscape.js + react-cytoscapejs（关系图）· Zustand（状态管理）

## Global Constraints

- **零服务器**：纯静态站点，`output: 'export'`，无后端/数据库
- **命名规范**：文件夹 kebab-case / 组件文件 PascalCase / 类型 PascalCase 无 I 前缀 / 变量 camelCase
- **代码注释**：每个源文件顶部 @file/@brief；公共函数 TSDoc；行内注释 Why > What
- **Git 提交**：`[Phase X] type(scope): subject` 格式
- **依赖方向**：接口层 → 应用层 → 核心层 ← 基础设施层；组件不得直接 import 数据文件
- **Node.js 版本**：≥ 18.17.0
- **Ponytail**：YAGNI, stdlib first, 最短 diff, 无未请求的抽象
- **每个文件夹必须包含 README.md** 维护文档
- **Cytoscape SSR**：必须在客户端渲染（`next/dynamic` + `ssr: false`），避免 SSR 报错

---

## File Structure

```
CRAtlas/
├── app/
│   └── graph/
│       └── page.tsx                # 新建: 关系图视图页
├── components/
│   └── graph/
│       ├── FactionGraph.tsx        # 新建: Cytoscape 图谱核心组件
│       ├── GraphFilter.tsx         # 新建: 筛选面板（关系类型/派系/时间）
│       ├── NodeDetail.tsx          # 新建: 节点详情侧边栏
│       └── README.md               # 新建
├── lib/
│   ├── data.ts                     # 修改: 添加 getGraphNodes/getGraphEdges 查询函数
│   └── data.test.ts                # 修改: 增加图谱查询函数测试
└── docs/superpowers/plans/
    └── 2026-07-23-cr-graph-phase2.md  # 本文档
```

---

### Task 1: 安装 Cytoscape 依赖与类型

**Files:**
- Modify: `package.json`（通过 npm install）

**Interfaces:**
- Consumes: 无
- Produces: 可用的 Cytoscape 布局扩展和类型定义

- [ ] **Step 1: 安装 dagre 布局扩展和 Cytoscape 类型**

```bash
cd D:\Code\CRAtlas && npm install --save cytoscape-dagre@^2.5.0 && npm install --save-dev @types/cytoscape@^3.21.0
```

- [ ] **Step 2: 验证安装**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add package.json package-lock.json
git commit -m "[Phase 2] chore: 安装 cytoscape-dagre 布局扩展和 @types/cytoscape"
```

---

### Task 2: 图谱数据查询函数（lib/data.ts）

**Files:**
- Modify: `lib/data.ts`
- Modify: `lib/data.test.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `GraphNode`, `GraphEdge`, `CytoscapeEdgeStyle`, `Person`, `Event`, `Faction`, `Relationship`
- Produces: `getGraphNodes()`, `getGraphEdges()` 查询函数

- [ ] **Step 1: 在 lib/data.ts 添加图谱节点查询函数**

```typescript
/**
 * 获取关系图节点列表（人物/事件/派系）。
 *
 * @param options - 过滤选项
 * @returns GraphNode 数组
 */
export function getGraphNodes(options?: {
  date?: string;
  types?: ('person' | 'event' | 'faction')[];
}): GraphNode[] {
  const { date, types } = options ?? {};
  const nodeTypes = types ?? ['person', 'event', 'faction'];
  const nodes: GraphNode[] = [];

  if (nodeTypes.includes('person')) {
    for (const p of people) {
      nodes.push({
        id: p.id,
        label: p.name,
        type: 'person',
        color: '#3B82F6',
        shape: 'circle',
      });
    }
  }

  if (nodeTypes.includes('event')) {
    for (const e of events) {
      if (date && e.date > date) continue;
      nodes.push({
        id: e.id,
        label: e.title,
        type: 'event',
        color: '#F59E0B',
        shape: 'diamond',
      });
    }
  }

  if (nodeTypes.includes('faction')) {
    for (const f of factions) {
      nodes.push({
        id: f.id,
        label: f.name,
        type: 'faction',
        factionType: f.factionType,
        color: getFactionColor(f.factionType),
        shape: 'square',
      });
    }
  }

  return nodes;
}
```

- [ ] **Step 2: 在 lib/data.ts 添加图谱边查询函数**

```typescript
/**
 * 获取关系图边列表（带 Cytoscape 样式）。
 *
 * faction-interaction 和 social 类型自动检测配对边并合并渲染。
 *
 * @param filter - 过滤选项
 * @returns GraphEdge 数组
 */
export function getGraphEdges(filter?: {
  type?: RelationshipType;
  date?: string;
}): GraphEdge[] {
  const relationships = getRelationships(filter);
  const edges: GraphEdge[] = [];

  for (const r of relationships) {
    const style = getEdgeStyle(r.type);
    edges.push({
      id: r.id,
      source: r.from,
      target: r.to,
      label: r.description,
      type: r.type,
      style,
    });
  }

  return edges;
}

/**
 * 根据关系类型返回 Cytoscape 边样式。
 */
function getEdgeStyle(type: RelationshipType): CytoscapeEdgeStyle {
  switch (type) {
    case 'membership':
      return { 'line-color': '#3B82F6', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier' };
    case 'causality':
      return { 'line-color': '#EF4444', 'line-style': 'dashed', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier' };
    case 'faction-interaction':
      return { 'line-color': '#9333EA', 'line-width': 3, 'target-arrow-shape': 'triangle', 'source-arrow-shape': 'triangle', 'curve-style': 'bezier' };
    case 'social':
      return { 'line-color': '#6B7280', 'line-style': 'dotted', 'target-arrow-shape': 'none', 'curve-style': 'bezier' };
  }
}
```

同时在 import 中添加 `GraphNode`, `GraphEdge`, `CytoscapeEdgeStyle`, `RelationshipType`：
```typescript
import type {
  Event,
  Person,
  Faction,
  Region,
  Relationship,
  RegionControlMap,
  SearchResult,
  Affiliation,
  FactionType,
  GraphNode,
  GraphEdge,
  CytoscapeEdgeStyle,
  RelationshipType,
} from '@/lib/types';
```

- [ ] **Step 3: 在 lib/data.test.ts 添加图谱查询测试**

```typescript
import { getGraphNodes, getGraphEdges } from './data';

describe('getGraphNodes', () => {
  it('应返回所有节点（默认）', () => {
    const nodes = getGraphNodes();
    expect(nodes.length).toBeGreaterThan(0);
  });

  it('应按类型过滤', () => {
    const persons = getGraphNodes({ types: ['person'] });
    expect(persons.every((n) => n.type === 'person')).toBe(true);
  });

  it('事件节点应按日期过滤', () => {
    const nodes = getGraphNodes({ types: ['event'], date: '1966-06-01' });
    // 1966-06-01 之前的事件应被包含
    expect(nodes.length).toBeGreaterThanOrEqual(1);
  });
});

describe('getGraphEdges', () => {
  it('应返回所有边', () => {
    const edges = getGraphEdges();
    expect(edges.length).toBeGreaterThan(0);
  });

  it('应按类型过滤', () => {
    const memberships = getGraphEdges({ type: 'membership' });
    expect(memberships.every((e) => e.type === 'membership')).toBe(true);
  });

  it('边应包含样式属性', () => {
    const edges = getGraphEdges();
    edges.forEach((e) => {
      expect(e.style).toBeDefined();
      expect(e.style['line-color']).toBeDefined();
    });
  });
});
```

- [ ] **Step 4: 验证测试**

Run: `cd D:\Code\CRAtlas && npx jest lib/data.test.ts`
Expected: 全部测试通过

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add lib/data.ts lib/data.test.ts
git commit -m "[Phase 2] feat(data): 添加 getGraphNodes/getGraphEdges 图谱查询函数"
```

---

### Task 3: 关系图核心组件（FactionGraph.tsx）

**Files:**
- Create: `components/graph/FactionGraph.tsx`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getGraphNodes`, `getGraphEdges`
- Produces: `FactionGraph` 组件

- [ ] **Step 1: 创建 FactionGraph 组件**

```typescript
/**
 * @file    FactionGraph.tsx
 * @brief   Cytoscape 关系图核心组件——渲染人物/事件/派系节点与关系边。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 *
 * @description
 * 订阅 Zustand store 的 currentDate，通过 getGraphNodes/getGraphEdges 获取数据。
 * 支持布局切换（cose/dagre/concentric）和关系类型筛选。
 * 点击节点触发 onNodeClick 回调。
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { useTimeStore } from '@/lib/store';
import { getGraphNodes, getGraphEdges } from '@/lib/data';
import type { GraphNode, GraphEdge, RelationshipType } from '@/lib/types';

cytoscape.use(dagre);

interface FactionGraphProps {
  activeTypes: RelationshipType[];
  layout: 'cose' | 'dagre' | 'concentric';
  onNodeClick: (nodeId: string, nodeType: string) => void;
}

export default function FactionGraph({ activeTypes, layout, onNodeClick }: FactionGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const currentDate = useTimeStore((s) => s.currentDate);

  const updateGraph = useCallback(() => {
    if (!cyRef.current) return;

    const nodes = getGraphNodes({ date: currentDate });
    const edges = getGraphEdges({ date: currentDate, type: activeTypes.length === 1 ? activeTypes[0] : undefined });

    const elements: cytoscape.ElementDefinition[] = [
      ...nodes.map((n) => ({
        data: { id: n.id, label: n.label, type: n.type, color: n.color, shape: n.shape },
      })),
      ...edges.map((e) => ({
        data: { id: e.id, source: e.source, target: e.target, label: e.label, type: e.type },
      })),
    ];

    cyRef.current.elements().remove();
    cyRef.current.add(elements);

    const layoutConfig = getLayoutConfig(layout);
    cyRef.current.layout(layoutConfig).run();
  }, [currentDate, activeTypes, layout]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            label: 'data(label)',
            shape: 'data(shape)',
            'text-valign': 'bottom',
            'font-size': '10px',
            width: 30,
            height: 30,
          },
        },
        {
          selector: 'node[type="event"]',
          style: { shape: 'diamond' },
        },
        {
          selector: 'node[type="faction"]',
          style: { shape: 'rectangle' },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': 'data(color)',
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      onNodeClick(node.id(), node.data('type'));
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateGraph();
  }, [updateGraph]);

  return <div ref={containerRef} style={{ width: '100%', height: '600px' }} />;
}

function getLayoutConfig(layout: 'cose' | 'dagre' | 'concentric'): cytoscape.LayoutOptions {
  switch (layout) {
    case 'cose':
      return { name: 'cose', animate: false, padding: 30 } as cytoscape.LayoutOptions;
    case 'dagre':
      return { name: 'dagre', animate: false, padding: 30 } as cytoscape.LayoutOptions;
    case 'concentric':
      return { name: 'concentric', animate: false, padding: 30 } as cytoscape.LayoutOptions;
  }
}
```

- [ ] **Step 2: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add components/graph/FactionGraph.tsx
git commit -m "[Phase 2] feat(graph): Cytoscape 关系图核心组件（节点/边渲染 + 布局）"
```

---

### Task 4: 筛选面板（GraphFilter.tsx）

**Files:**
- Create: `components/graph/GraphFilter.tsx`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `RelationshipType`
- Produces: `GraphFilter` 组件

- [ ] **Step 1: 创建 GraphFilter 组件**

```typescript
/**
 * @file    GraphFilter.tsx
 * @brief   关系图筛选面板——按关系类型、布局算法筛选。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import type { RelationshipType } from '@/lib/types';

interface GraphFilterProps {
  activeTypes: RelationshipType[];
  onTypesChange: (types: RelationshipType[]) => void;
  layout: 'cose' | 'dagre' | 'concentric';
  onLayoutChange: (layout: 'cose' | 'dagre' | 'concentric') => void;
}

const ALL_TYPES: { value: RelationshipType; label: string }[] = [
  { value: 'membership', label: '隶属' },
  { value: 'causality', label: '因果' },
  { value: 'faction-interaction', label: '派系互动' },
  { value: 'social', label: '社交' },
];

const LAYOUTS: { value: 'cose' | 'dagre' | 'concentric'; label: string }[] = [
  { value: 'cose', label: '力导向' },
  { value: 'dagre', label: '层级' },
  { value: 'concentric', label: '同心圆' },
];

export default function GraphFilter({ activeTypes, onTypesChange, layout, onLayoutChange }: GraphFilterProps) {
  const toggleType = (type: RelationshipType) => {
    if (activeTypes.includes(type)) {
      onTypesChange(activeTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...activeTypes, type]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 text-sm">
      <h3 className="font-medium text-gray-700 mb-3">筛选</h3>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">关系类型</p>
        <div className="flex flex-wrap gap-2">
          {ALL_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => toggleType(t.value)}
              className={`px-2 py-1 rounded text-xs transition ${
                activeTypes.includes(t.value)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2">布局</p>
        <div className="flex gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l.value}
              onClick={() => onLayoutChange(l.value)}
              className={`px-2 py-1 rounded text-xs transition ${
                layout === l.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add components/graph/GraphFilter.tsx
git commit -m "[Phase 2] feat(graph): 筛选面板（关系类型 + 布局切换）"
```

---

### Task 5: 节点详情侧边栏（NodeDetail.tsx）

**Files:**
- Create: `components/graph/NodeDetail.tsx`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `Person`, `Event`, `Faction`
- Produces: `NodeDetail` 组件

- [ ] **Step 1: 创建 NodeDetail 组件**

```typescript
/**
 * @file    NodeDetail.tsx
 * @brief   节点详情侧边栏——显示选中节点的基本信息。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import Link from 'next/link';
import { getPerson, getEvent, getFaction } from '@/lib/data';
import type { Person, Event, Faction } from '@/lib/types';

interface NodeDetailProps {
  nodeId: string | null;
  nodeType: string | null;
  onClose: () => void;
}

export default function NodeDetail({ nodeId, nodeType, onClose }: NodeDetailProps) {
  if (!nodeId || !nodeType) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-500">
        点击节点查看详情
      </div>
    );
  }

  let content: React.ReactNode = null;

  if (nodeType === 'person') {
    const person: Person | undefined = getPerson(nodeId);
    if (person) {
      content = (
        <>
          <h3 className="font-bold text-gray-900">{person.name}</h3>
          <p className="text-xs text-gray-500 mt-1">
            {person.birthYear ?? '?'} — {person.deathYear ?? '?'}
          </p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-4">{person.biography}</p>
          <Link href={`/person/${person.id}`} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            查看详情 →
          </Link>
        </>
      );
    }
  } else if (nodeType === 'event') {
    const event: Event | undefined = getEvent(nodeId);
    if (event) {
      content = (
        <>
          <h3 className="font-bold text-gray-900">{event.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{event.date}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-4">{event.description}</p>
          <Link href={`/event/${event.id}`} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            查看详情 →
          </Link>
        </>
      );
    }
  } else if (nodeType === 'faction') {
    const faction: Faction | undefined = getFaction(nodeId);
    if (faction) {
      content = (
        <>
          <h3 className="font-bold text-gray-900">{faction.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{faction.factionType}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-4">{faction.description}</p>
          <Link href={`/faction/${faction.id}`} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            查看详情 →
          </Link>
        </>
      );
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 text-sm relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="关闭"
      >
        ✕
      </button>
      {content ?? <p className="text-gray-500">未找到节点信息</p>}
    </div>
  );
}
```

- [ ] **Step 2: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add components/graph/NodeDetail.tsx
git commit -m "[Phase 2] feat(graph): 节点详情侧边栏组件"
```

---

### Task 6: 关系图页面（/graph）

**Files:**
- Create: `app/graph/page.tsx`

**Interfaces:**
- Consumes: FactionGraph, GraphFilter, NodeDetail
- Produces: `/graph` 视图页

- [ ] **Step 1: 创建 /graph 页面**

```typescript
/**
 * @file    page.tsx
 * @brief   关系图视图页——Cytoscape 图谱 + 筛选面板 + 节点详情侧边栏。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import GraphFilter from '@/components/graph/GraphFilter';
import NodeDetail from '@/components/graph/NodeDetail';
import type { RelationshipType } from '@/lib/types';

const FactionGraph = dynamic(() => import('@/components/graph/FactionGraph'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 animate-pulse" />,
});

export default function GraphPage() {
  const [activeTypes, setActiveTypes] = useState<RelationshipType[]>([
    'membership',
    'causality',
    'faction-interaction',
    'social',
  ]);
  const [layout, setLayout] = useState<'cose' | 'dagre' | 'concentric'>('cose');
  const [selectedNode, setSelectedNode] = useState<{ id: string; type: string } | null>(null);

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex-1 p-4">
        <FactionGraph
          activeTypes={activeTypes}
          layout={layout}
          onNodeClick={(id, type) => setSelectedNode({ id, type })}
        />
      </div>
      <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto space-y-4">
        <GraphFilter
          activeTypes={activeTypes}
          onTypesChange={setActiveTypes}
          layout={layout}
          onLayoutChange={setLayout}
        />
        <NodeDetail
          nodeId={selectedNode?.id ?? null}
          nodeType={selectedNode?.type ?? null}
          onClose={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，6/6 页面

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add app/graph/page.tsx
git commit -m "[Phase 2] feat(graph): 关系图视图页（集成图谱+筛选+详情侧边栏）"
```

---

### Task 7: 组件文档（components/graph/README.md）

**Files:**
- Create: `components/graph/README.md`

**Interfaces:**
- Consumes: 无
- Produces: 图谱组件目录文档

- [ ] **Step 1: 创建 README**

```markdown
# components/graph/

关系图相关组件——基于 Cytoscape.js 的知识图谱可视化，展示人物-派系隶属、事件因果、派系互动、人物社交四种关系。

## 职责

| 组件 | 职责 |
|------|------|
| **FactionGraph.tsx** | Cytoscape 图谱核心渲染：节点/边样式、布局算法、点击交互 |
| **GraphFilter.tsx** | 筛选面板：按关系类型过滤、切换布局算法 |
| **NodeDetail.tsx** | 节点详情侧边栏：显示选中节点的基本信息 |

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
```

- [ ] **Step 2: 提交**

```bash
cd D:\Code\CRAtlas && git add components/graph/README.md
git commit -m "[Phase 2] docs: 添加 components/graph/README.md"
```

---

### Task 8: 最终验证与集成

**Files:**
- 无新建文件，全量验证

**Interfaces:**
- Consumes: 全部 Phase 2 交付物
- Produces: 验证通过的完整构建

- [ ] **Step 1: 运行完整测试套件**

Run: `cd D:\Code\CRAtlas && npx jest`
Expected: 全部测试通过（含新增图谱查询测试）

- [ ] **Step 2: 运行构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，6/6 页面（含 `/graph`）

- [ ] **Step 3: 运行类型检查**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 4: 验证 Navbar 链接**

确认 Navbar 中"关系图"链接指向 `/graph` 且页面可访问。

- [ ] **Step 5: 最终提交（如有修复）**

如有修复，提交：
```bash
cd D:\Code\CRAtlas && git add -A
git commit -m "[Phase 2] fix(graph): 集成验证修复"
```

---

## Phase 2 验收清单

完成全部 Task 后，逐项验证：

- [ ] `npm run build` 成功，6/6 页面（含 `/graph`）
- [ ] `npx jest` 全部测试通过
- [ ] `npx tsc --noEmit` 无错误
- [ ] `/graph` 页面能渲染 Cytoscape 图谱
- [ ] 节点按类型显示不同形状/颜色
- [ ] 边按关系类型显示不同线型/箭头
- [ ] 筛选面板能过滤关系类型
- [ ] 布局切换（力导向/层级/同心圆）正常工作
- [ ] 点击节点显示详情侧边栏
- [ ] 时间轴日期变化时图谱节点/边更新
- [ ] 每个新建文件夹含 README.md
- [ ] 所有代码已提交到 git

---

*本计划覆盖 Phase 2（关系图）。Phase 3（详情页与内容填充）将在 Phase 2 完成后另行制定。*
