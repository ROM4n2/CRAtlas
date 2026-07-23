### Task 1: 史料出处组件（SourceList.tsx）

**Files:**
- Create: `components/ui/SourceList.tsx`
- Modify: `components/ui/README.md`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `Source`
- Produces: `SourceList` 组件

- [ ] **Step 1: 创建 SourceList 组件**

Create `components/ui/SourceList.tsx`:
```typescript
/**
 * @file    SourceList.tsx
 * @brief   史料出处展示组件——显示文献标题、类型、日期。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import type { Source } from '@/lib/types';

interface SourceListProps {
  sources: Source[];
}

const TYPE_LABELS: Record<Source['type'], string> = {
  official: '官方档案',
  academic: '学术研究',
  media: '媒体报道',
  memoir: '回忆录',
  'local-gazetteer': '地方志',
};

export default function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) {
    return <p className="text-sm text-gray-500">暂无史料出处</p>;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">史料出处</h4>
      <ul className="space-y-1">
        {sources.map((source, idx) => (
          <li key={idx} className="text-sm">
            <span className="text-gray-600">{source.title}</span>
            <span className="ml-2 text-xs text-gray-400">
              [{TYPE_LABELS[source.type]}]
              {source.date ? ` · ${source.date}` : ''}
            </span>
            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-xs text-blue-600 hover:underline"
              >
                链接 →
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: 更新 components/ui/README.md**

在文件清单中添加 SourceList.tsx。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add components/ui/
git commit -m "[Phase 3] feat(ui): 添加史料出处展示组件 SourceList"
```

---
