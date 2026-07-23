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
