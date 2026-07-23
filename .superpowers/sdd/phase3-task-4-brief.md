### Task 4: 人物详情页（/person/[id]）

**Files:**
- Create: `app/person/[id]/page.tsx`
- Create: `app/person/[id]/README.md`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getPerson()`, `getEvent()`, `getFactionName()`, `data/people.ts` 的 `people`（用于 generateStaticParams）
- Produces: 人物详情页

- [ ] **Step 1: 创建人物详情页**

Create `app/person/[id]/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   人物详情页——生平、派系隶属时间线、史料出处。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { people } from '@/data/people';
import { getPerson, getFactionName } from '@/lib/data';
import SourceList from '@/components/ui/SourceList';

export function generateStaticParams() {
  return people.map((p) => ({ id: p.id }));
}

export default function PersonPage({ params }: { params: { id: string } }) {
  const person = getPerson(params.id);
  if (!person) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{person.name}</h1>
      <p className="text-sm text-gray-500 mt-1">
        {person.birthYear ?? '?'} — {person.deathYear ?? '?'}
      </p>

      <div className="mt-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">生平</h2>
          <p className="text-gray-600 mt-2">{person.biography}</p>
        </section>

        {person.affiliations.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">派系隶属</h2>
            <div className="space-y-1 mt-2">
              {person.affiliations.map((aff, idx) => (
                <div key={idx} className="text-sm text-gray-600">
                  <Link
                    href={`/faction/${aff.factionId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {getFactionName(aff.factionId)}
                  </Link>
                  <span className="text-gray-400 ml-2">
                    {aff.startDate} ~ {aff.endDate ?? '至今'} · {aff.role}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <SourceList sources={person.sources} />
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 app/person/[id]/README.md**

参照 `app/event/[id]/README.md` 格式。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/person/
git commit -m "[Phase 3] feat(person): 添加人物详情页 /person/[id]"
```

---
