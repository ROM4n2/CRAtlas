### Task 6: 时间轴视图页（/timeline）

**Files:**
- Create: `app/timeline/page.tsx`
- Create: `components/timeline/EventCard.tsx`
- Create: `app/timeline/README.md`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getEventsByDate()`, `lib/store.ts` 的 `useTimeStore`
- Produces: 时间轴视图页 + EventCard 组件

- [ ] **Step 1: 创建 EventCard 组件**

Create `components/timeline/EventCard.tsx`:
```typescript
/**
 * @file    EventCard.tsx
 * @brief   事件卡片——在时间轴页面中显示事件摘要。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import Link from 'next/link';
import type { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{event.title}</h3>
        <span
          className={`text-xs px-1.5 py-0.5 rounded ml-2 shrink-0 ${
            event.significance === 'major'
              ? 'bg-red-100 text-red-700'
              : event.significance === 'significant'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {event.significance === 'major'
            ? '重大'
            : event.significance === 'significant'
            ? '重要'
            : '一般'}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{event.date}</p>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {event.description}
      </p>
      <Link
        href={`/event/${event.id}`}
        className="text-xs text-blue-600 hover:underline mt-2 inline-block"
      >
        查看详情 →
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: 创建时间轴页面**

Create `app/timeline/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   时间轴视图页——横向时间轴 + 事件卡片流。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import TimeAxis from '@/components/timeline/TimeAxis';
import EventCard from '@/components/timeline/EventCard';
import { useTimeStore } from '@/lib/store';
import { getEventsByDate } from '@/lib/data';

export default function TimelinePage() {
  const currentDate = useTimeStore((s) => s.currentDate);
  const events = getEventsByDate(currentDate);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900 mb-4">时间轴</h1>
          <div className="space-y-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {events.length === 0 && (
            <p className="text-gray-500">当前时间点暂无事件</p>
          )}
        </div>
      </div>
      <TimeAxis />
    </div>
  );
}
```

- [ ] **Step 3: 创建 app/timeline/README.md**

参照 `app/map/README.md` 格式。

- [ ] **Step 4: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add app/timeline/ components/timeline/EventCard.tsx
git commit -m "[Phase 3] feat(timeline): 添加时间轴视图页 /timeline + EventCard"
```

---
