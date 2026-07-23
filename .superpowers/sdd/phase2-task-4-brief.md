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
