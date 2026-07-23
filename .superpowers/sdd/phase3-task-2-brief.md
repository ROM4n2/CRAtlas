### Task 2: 全局搜索弹窗（SearchModal.tsx）

**Files:**
- Create: `components/ui/SearchModal.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `search()`, `next/navigation` 的 `useRouter`
- Produces: `SearchModal` 组件

- [ ] **Step 1: 创建 SearchModal 组件**

Create `components/ui/SearchModal.tsx`:
```typescript
/**
 * @file    SearchModal.tsx
 * @brief   全局搜索弹窗——Cmd+K 触发，搜索人物/事件/派系。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { search } from '@/lib/data';
import type { SearchResult } from '@/lib/types';

export default function SearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setResults([]);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setResults(search(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = useCallback((result: SearchResult) => {
    const paths: Record<SearchResult['type'], string> = {
      person: '/person/',
      event: '/event/',
      faction: '/faction/',
    };
    router.push(`${paths[result.type]}${result.id}`);
    setIsOpen(false);
  }, [router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center border-b border-gray-200 px-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索人物、事件、派系..."
            className="flex-1 py-3 text-sm outline-none"
            autoFocus
          />
          <span className="text-xs text-gray-400">ESC 关闭</span>
        </div>
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            {results.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
                onClick={() => handleSelect(result)}
              >
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {result.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {result.type === 'person' ? '人物' : result.type === 'event' ? '事件' : '派系'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div className="px-4 py-3 text-sm text-gray-500">无匹配结果</div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 在 layout.tsx 中集成 SearchModal**

Modify `app/layout.tsx`，在 `<ErrorBoundary>` 内、`<main>` 前添加 `<SearchModal />`。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add components/ui/ app/layout.tsx
git commit -m "[Phase 3] feat(ui): 添加全局搜索弹窗 SearchModal (Cmd+K)"
```

---
