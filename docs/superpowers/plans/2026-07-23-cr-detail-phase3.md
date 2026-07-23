# CRAtlas Phase 3 — 详情页与内容填充实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现事件/人物/派系详情页 + 时间轴视图页 + 全局搜索 + 史料出处组件，扩充内容数据，交付完整的浏览体验。

**架构:** 详情页为静态生成（`generateStaticParams`），通过 `lib/data.ts` 查询函数获取实体数据。搜索弹窗通过 Cmd+K 触发，调用 `search()` 函数。时间轴页面复用 `TimeAxis` 组件。

**Tech Stack:** Next.js 14+ (App Router, `output: 'export'`) · TypeScript · Tailwind CSS · Zustand

## Global Constraints

- **零服务器**：纯静态站点，`output: 'export'`，无后端/数据库
- **命名规范**：文件夹 kebab-case / 组件文件 PascalCase / 类型 PascalCase 无 I 前缀 / 变量 camelCase
- **代码注释**：每个源文件顶部 @file/@brief；公共函数 TSDoc；行内注释 Why > What
- **Git 提交**：`[Phase X] type(scope): subject` 格式
- **数据录入**：每条事件/人物必须有至少一个 sources；日期 ISO 8601；ID 小写 + 连字符
- **依赖方向**：接口层 → 应用层 → 核心层 ← 基础设施层；组件不得直接 import 数据文件
- **Node.js 版本**：≥ 18.17.0
- **Ponytail**：YAGNI, stdlib first, 最短 diff, 无未请求的抽象
- **每个文件夹必须包含 README.md** 维护文档
- **SDD 文档**：每个 Task 前写 brief（`.superpowers/sdd/phase3-task-{M}-brief.md`），每个 Task 后写 report（`.superpowers/sdd/phase3-task-{M}-report.md`）

---

## File Structure

```
CRAtlas/
├── app/
│   ├── event/
│   │   └── [id]/
│   │       └── page.tsx              # 新建: 事件详情页
│   ├── person/
│   │   └── [id]/
│   │       └── page.tsx              # 新建: 人物详情页
│   ├── faction/
│   │   └── [id]/
│   │       └── page.tsx              # 新建: 派系详情页
│   ├── timeline/
│   │   └── page.tsx                  # 新建: 时间轴视图页
│   └── about/
│       └── page.tsx                  # 新建: 关于页
├── components/
│   ├── ui/
│   │   ├── SearchModal.tsx           # 新建: 全局搜索弹窗 (Cmd+K)
│   │   └── SourceList.tsx            # 新建: 史料出处展示组件
│   └── timeline/
│       └── EventCard.tsx             # 新建: 事件卡片
├── data/
│   ├── events.ts                     # 修改: 扩充事件数据
│   ├── people.ts                     # 修改: 扩充人物数据
│   ├── factions.ts                   # 修改: 扩充派系数据
│   └── relationships.ts              # 修改: 扩充关系数据
└── lib/
    └── data.ts                       # 修改: 添加详情页辅助查询函数
```

---

### Task 1: 史料出处组件（SourceList.tsx）

**Files:**
- Create: `components/ui/SourceList.tsx`
- Create: `components/ui/README.md`（如已有则修改）

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

import type { Source } from '@/types';

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

### Task 2: 全局搜索弹窗（SearchModal.tsx）

**Files:**
- Create: `components/ui/SearchModal.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `search()`
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
import { search } from '@/data';
import type { SearchResult } from '@/types';

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

Modify `app/layout.tsx`，在 `<ErrorBoundary>` 内添加 `<SearchModal />`。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add components/ui/ app/layout.tsx
git commit -m "[Phase 3] feat(ui): 添加全局搜索弹窗 SearchModal (Cmd+K)"
```

---

### Task 3: 事件详情页（/event/[id]）

**Files:**
- Create: `app/event/[id]/page.tsx`
- Create: `app/event/[id]/README.md`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getEvent()`, `getPerson()`, `getFaction()`, `getFactionName()`
- Produces: 事件详情页

- [ ] **Step 1: 创建事件详情页**

Create `app/event/[id]/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   事件详情页——全文、参与者、相关事件、史料出处。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { events } from '@/data/events';
import { getEvent, getPerson, getFactionName } from '@/data';
import SourceList from '@/components/ui/SourceList';

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEvent(params.id);
  if (!event) notFound();

  const participants = event.participants
    .map((id) => getPerson(id))
    .filter(Boolean);

  const relatedEvents = event.relatedEventIds
    .map((id) => getEvent(id))
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
      {event.alias && event.alias.length > 0 && (
        <p className="text-sm text-gray-500 mt-1">
          别名：{event.alias.join('、')}
        </p>
      )}
      <p className="text-sm text-gray-500 mt-1">{event.date}</p>

      <div className="mt-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">事件描述</h2>
          <p className="text-gray-600 mt-2">{event.description}</p>
        </section>

        {event.location.specific && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">地点</h2>
            <p className="text-gray-600 mt-2">{event.location.specific}</p>
          </section>
        )}

        {participants.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">参与者</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {participants.map((p) => (
                <Link
                  key={p!.id}
                  href={`/person/${p!.id}`}
                  className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  {p!.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedEvents.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">相关事件</h2>
            <div className="space-y-1 mt-2">
              {relatedEvents.map((e) => (
                <Link
                  key={e!.id}
                  href={`/event/${e!.id}`}
                  className="block text-sm text-blue-600 hover:underline"
                >
                  {e!.title} ({e!.date})
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <SourceList sources={event.sources} />
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 app/event/[id]/README.md**

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，页面数增加

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/event/
git commit -m "[Phase 3] feat(event): 添加事件详情页 /event/[id]"
```

---

### Task 4: 人物详情页（/person/[id]）

**Files:**
- Create: `app/person/[id]/page.tsx`
- Create: `app/person/[id]/README.md`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getPerson()`, `getCurrentAffiliations()`, `getEvent()`, `getFactionName()`
- Produces: 人物详情页

- [ ] **Step 1: 创建人物详情页**

Create `app/person/[id]/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   人物详情页——生平、派系隶属时间线、参与事件、社交关系。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { people } from '@/data/people';
import { getPerson, getEvent, getFactionName } from '@/data';
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

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/person/
git commit -m "[Phase 3] feat(person): 添加人物详情页 /person/[id]"
```

---

### Task 5: 派系详情页（/faction/[id]）

**Files:**
- Create: `app/faction/[id]/page.tsx`
- Create: `app/faction/[id]/README.md`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getFaction()`, `getPerson()`, `getFactionType()`
- Produces: 派系详情页

- [ ] **Step 1: 创建派系详情页**

Create `app/faction/[id]/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   派系详情页——概述、组织演变、成员、控制地区。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { factions } from '@/data/factions';
import { getFaction, getPerson } from '@/data';
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

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/faction/
git commit -m "[Phase 3] feat(faction): 添加派系详情页 /faction/[id]"
```

---

### Task 6: 时间轴视图页（/timeline）

**Files:**
- Create: `app/timeline/page.tsx`
- Create: `components/timeline/EventCard.tsx`
- Create: `app/timeline/README.md`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getEventsByDate()`, `useTimeStore`
- Produces: 时间轴视图页

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
import type { Event } from '@/types';

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

- [ ] **Step 3: 更新 Navbar 链接**

确认 Navbar 中"时间轴"链接指向 `/timeline` 且页面已存在。

- [ ] **Step 4: 创建 app/timeline/README.md**

- [ ] **Step 5: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 6: 提交**

```bash
cd D:\Code\CRAtlas && git add app/timeline/ components/timeline/EventCard.tsx
git commit -m "[Phase 3] feat(timeline): 添加时间轴视图页 /timeline + EventCard"
```

---

### Task 7: 关于页（/about）

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/about/README.md`

**Interfaces:**
- Consumes: 无（静态内容）
- Produces: 关于页

- [ ] **Step 1: 创建关于页**

Create `app/about/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   关于页——项目说明、立场声明、史料来源说明、使用指南。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">关于 CRAtlas</h1>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">项目说明</h2>
        <p className="text-gray-600 mt-2">
          CRAtlas 是 1966-1976 年文化大革命期间造反派与保皇派势力演变、关键事件、人物关系的可视化平台。本项目以马列毛主义为基本编纂立场，旨在为马列毛主义者、进步人士和历史自学者提供可靠的历史参考资料。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">意识形态立场声明</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>以马列毛主义为编纂立场</li>
          <li>区分编纂视角与史料来源</li>
          <li>不声称"价值中立"，但承诺史料准确</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">史料来源说明</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>官方档案/中央文件</li>
          <li>学术研究成果</li>
          <li>媒体报道（如《人民日报》原件）</li>
          <li>当事人回忆录</li>
          <li>地方志</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">使用指南</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>地图视图：按省份查看派系势力分布与事件标注</li>
          <li>时间轴视图：按时间顺序浏览关键事件</li>
          <li>关系图视图：探索人物、派系、事件之间的关系网络</li>
          <li>搜索：按 Cmd+K 打开全局搜索</li>
        </ul>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: 创建 app/about/README.md**

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/about/
git commit -m "[Phase 3] feat(about): 添加关于页 /about"
```

---

### Task 8: 内容扩充

**Files:**
- Modify: `data/events.ts`
- Modify: `data/people.ts`
- Modify: `data/factions.ts`
- Modify: `data/relationships.ts`

**Interfaces:**
- Consumes: `lib/types.ts`
- Produces: 扩充后的数据集

- [ ] **Step 1: 扩充事件数据**

在 `data/events.ts` 中追加更多关键事件（至少覆盖 1966-1976 每年 1-2 个事件）。参考设计规范 §3.5 的示例事件列表。

- [ ] **Step 2: 扩充人物数据**

在 `data/people.ts` 中追加更多关键人物。

- [ ] **Step 3: 扩充派系数据**

在 `data/factions.ts` 中追加更多派系。

- [ ] **Step 4: 扩充关系数据**

在 `data/relationships.ts` 中追加更多关系。

- [ ] **Step 5: 验证构建和测试**

Run: `cd D:\Code\CRAtlas && npm run build && npx jest`
Expected: 构建成功，测试通过

- [ ] **Step 6: 提交**

```bash
cd D:\Code\CRAtlas && git add data/
git commit -m "[Phase 3] feat(data): 扩充事件/人物/派系/关系数据"
```

---

### Task 9: 最终验证与集成

**Files:**
- 无新建文件，全量验证

**Interfaces:**
- Consumes: 全部 Phase 3 交付物
- Produces: 验证通过的完整构建

- [ ] **Step 1: 运行完整测试套件**

Run: `cd D:\Code\CRAtlas && npx jest`
Expected: 全部测试通过

- [ ] **Step 2: 运行构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，所有静态页面生成

- [ ] **Step 3: 运行类型检查**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 4: 检查 Navbar 所有链接**

确认 Navbar 中所有路由（地图/时间轴/关系图/关于）对应的页面均存在。

- [ ] **Step 5: 提交（如有修复）**

如有修复，提交：
```bash
cd D:\Code\CRAtlas && git add -A
git commit -m "[Phase 3] fix: 集成验证修复"
```

---

## Phase 3 验收清单

完成全部 Task 后，逐项验证：

- [ ] `npm run build` 成功，所有静态页面生成
- [ ] `npx jest` 全部测试通过
- [ ] `npx tsc --noEmit` 无错误
- [ ] `/event/[id]` 事件详情页可访问，信息完整
- [ ] `/person/[id]` 人物详情页可访问，含派系隶属
- [ ] `/faction/[id]` 派系详情页可访问
- [ ] `/timeline` 时间轴视图页可访问
- [ ] `/about` 关于页可访问
- [ ] Cmd+K 搜索弹窗可用，能跳转到详情页
- [ ] Navbar 所有链接不 404
- [ ] 每个新建文件夹含 README.md
- [ ] 所有代码已提交到 git
- [ ] SDD brief + report 文件齐全
- [ ] progress.md 台账更新

---

*本计划覆盖 Phase 3（详情页与内容填充）。Phase 4（交流功能）将在 Phase 3 完成后另行制定。*
