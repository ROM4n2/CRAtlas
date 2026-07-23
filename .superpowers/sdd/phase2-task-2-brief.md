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
