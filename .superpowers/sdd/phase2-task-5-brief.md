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
