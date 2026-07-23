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
