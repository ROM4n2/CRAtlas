### Task 5: 派系详情页（/faction/[id]）

**Files:**
- Create: `app/faction/[id]/page.tsx`
- Create: `app/faction/[id]/README.md`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getFaction()`, `data/factions.ts` 的 `factions`（用于 generateStaticParams）
- Produces: 派系详情页

- [ ] **Step 1: 创建派系详情页**

Create `app/faction/[id]/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   派系详情页——概述、组织演变、史料出处。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import { factions } from '@/data/factions';
import { getFaction } from '@/lib/data';
import SourceList from '@/components/ui/SourceList';

export function generateStaticParams() {
  return factions.map((f) => ({ id: f.id }));
}

export default function FactionPage({ params }: { params: { id: string } }) {
  const faction = getFaction(params.id);
  if (!faction) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{faction.name}</h1>
      <p className="text-sm text-gray-500 mt-1">{faction.factionType}</p>

      <div className="mt-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">概述</h2>
          <p className="text-gray-600 mt-2">{faction.description}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">组织信息</h2>
          <p className="text-sm text-gray-600 mt-2">
            成立：{faction.foundedDate}
            {faction.dissolvedDate && ` · 解散：${faction.dissolvedDate}`}
          </p>
        </section>

        <section>
          <SourceList sources={faction.sources} />
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 app/faction/[id]/README.md**

参照 `app/event/[id]/README.md` 格式。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/faction/
git commit -m "[Phase 3] feat(faction): 添加派系详情页 /faction/[id]"
```

---
