### Task 4: 数据查询层（lib/data.ts）

**Files:**
- Create: `lib/data.ts`
- Test: `lib/data.test.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 全部类型 + `data/*.ts` 数据集
- Produces: `getEventsByDate`, `getRegionControl`, `getRelationships`, `getCurrentAffiliations`, `getCurrentFactionIds`, `search`, `getPerson`, `getEvent`, `getFaction`, `getRegion`

- [ ] **Step 1: 编写失败测试**

Create `lib/data.test.ts`:
```typescript
/**
 * @file    data.test.ts
 * @brief   lib/data.ts 的单元测试——验证数据查询函数正确性。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import {
  getEventsByDate,
  getRegionControl,
  getCurrentFactionIds,
  search,
  getPerson,
  getEvent,
} from './data';
import { events } from '@/data/events';
import { people } from '@/data/people';

describe('getEventsByDate', () => {
  it('应返回指定日期及之前的所有事件', () => {
    const result = getEventsByDate('1966-05-16');
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.some((e) => e.id === 'feb-outline-1966')).toBe(true);
    expect(result.some((e) => e.id === 'may16-notice-1966')).toBe(true);
  });

  it('空日期应返回空数组', () => {
    const result = getEventsByDate('1965-01-01');
    expect(result).toEqual([]);
  });
});

describe('getCurrentFactionIds', () => {
  it('应返回人物在指定日期的派系 ID', () => {
    const jiangQing = people.find((p) => p.id === 'jiang-qing')!;
    const ids = getCurrentFactionIds(jiangQing, '1967-01-01');
    expect(ids).toContain('central-cultural-revolution-group');
  });

  it('日期在隶属范围外应返回空', () => {
    const kuaiDafu = people.find((p) => p.id === 'kuai-dafu')!;
    const ids = getCurrentFactionIds(kuaiDafu, '1970-01-01');
    expect(ids).toEqual([]);
  });
});

describe('search', () => {
  it('应按名称精确匹配', () => {
    const results = search('蒯大富');
    expect(results.some((r) => r.id === 'kuai-dafu')).toBe(true);
  });

  it('搜索"提纲"应匹配二月提纲事件', () => {
    const results = search('提纲');
    expect(results.some((r) => r.id === 'feb-outline-1966')).toBe(true);
  });
});

describe('getPerson / getEvent', () => {
  it('getPerson 应返回匹配的人物', () => {
    const person = getPerson('kuai-dafu');
    expect(person).toBeDefined();
    expect(person?.name).toBe('蒯大富');
  });

  it('getEvent 应返回匹配的事件', () => {
    const event = getEvent('feb-outline-1966');
    expect(event).toBeDefined();
    expect(event?.title).toContain('汇报提纲');
  });
});
```

- [ ] **Step 2: 运行测试验证失败**

Run: `cd D:\Code\CRAtlas && npx jest lib/data.test.ts`
Expected: FAIL — "Cannot find module './data'"

- [ ] **Step 3: 实现 lib/data.ts**

Create `lib/data.ts`:
```typescript
/**
 * @file    data.ts
 * @brief   数据查询层——所有组件访问数据的唯一入口。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @description
 * 封装所有数据查询逻辑，组件不得直接 import 数据文件。
 * 遵循依赖倒置：接口层 → 应用层 → 核心层 ← 基础设施层。
 */

import { events } from '@/data/events';
import { people } from '@/data/people';
import { factions } from '@/data/factions';
import { regions } from '@/data/regions';
import { relationships } from '@/data/relationships';
import { regionControls } from '@/data/regionControls';
import type {
  Event,
  Person,
  Faction,
  Region,
  Relationship,
  RegionControlMap,
  SearchResult,
  Affiliation,
} from '@/lib/types';

/**
 * 获取指定日期及之前发生的所有事件（按日期升序）。
 *
 * @param date - ISO 格式日期 (YYYY-MM-DD)
 * @returns 事件数组，无匹配返回空数组
 */
export function getEventsByDate(date: string): Event[] {
  return events
    .filter((e) => e.date <= date)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * 获取指定日期的地区控制状态映射。
 *
 * @param date - ISO 格式日期
 * @returns RegionControlMap（regionId → { factionId, strength }）
 */
export function getRegionControl(date: string): RegionControlMap {
  const result: RegionControlMap = {};
  for (const rc of regionControls) {
    if (rc.startDate <= date && (!rc.endDate || rc.endDate >= date)) {
      // contested 状态取 strength 最高的派系着色
      const dominant = rc.factions.reduce((max, f) =>
        f.strength > max.strength ? f : max,
        rc.factions[0]
      );
      if (dominant) {
        result[rc.regionId] = {
          factionId: dominant.factionId,
          strength: dominant.strength,
        };
      }
    }
  }
  return result;
}

/**
 * 获取所有关系（可按类型过滤）。
 *
 * @param filter - 可选过滤条件
 * @returns Relationship 数组
 */
export function getRelationships(filter?: {
  type?: Relationship['type'];
  date?: string;
}): Relationship[] {
  let result = relationships;
  if (filter?.type) {
    result = result.filter((r) => r.type === filter.type);
  }
  if (filter?.date) {
    const d = filter.date;
    result = result.filter(
      (r) => r.startDate <= d && (!r.endDate || r.endDate >= d)
    );
  }
  return result;
}

/**
 * 获取人物在指定日期的隶属关系。
 *
 * @param person - 人物对象
 * @param date - ISO 格式日期（默认今天）
 * @returns Affiliation 数组
 */
export function getCurrentAffiliations(
  person: Person,
  date: string = new Date().toISOString().slice(0, 10)
): Affiliation[] {
  return person.affiliations.filter(
    (a) => a.startDate <= date && (!a.endDate || a.endDate >= date)
  );
}

/**
 * 获取人物在指定日期的派系 ID 列表。
 *
 * @param person - 人物对象
 * @param date - ISO 格式日期（默认今天）
 * @returns 派系 ID 数组
 */
export function getCurrentFactionIds(
  person: Person,
  date: string = new Date().toISOString().slice(0, 10)
): string[] {
  return getCurrentAffiliations(person, date).map((a) => a.factionId);
}

/**
 * 全局搜索——搜索人物/事件/派系。
 *
 * 排序规则：精确匹配 > 前缀匹配 > 子串匹配；
 * 同等级内按重要性 major > significant > minor（事件）或类型优先级。
 *
 * @param query - 搜索关键词
 * @returns SearchResult 数组
 */
export function search(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  // 搜索人物
  for (const p of people) {
    const nameLower = p.name.toLowerCase();
    if (nameLower === q) {
      results.push({ id: p.id, type: 'person', name: p.name, description: p.biography, _rank: 0 });
    } else if (nameLower.startsWith(q)) {
      results.push({ id: p.id, type: 'person', name: p.name, description: p.biography, _rank: 1 });
    } else if (nameLower.includes(q)) {
      results.push({ id: p.id, type: 'person', name: p.name, description: p.biography, _rank: 2 });
    }
  }

  // 搜索事件
  for (const e of events) {
    const titleLower = e.title.toLowerCase();
    const aliasLower = (e.alias || []).map((a) => a.toLowerCase());
    const allNames = [titleLower, ...aliasLower];
    for (const name of allNames) {
      if (name === q) {
        results.push({ id: e.id, type: 'event', name: e.title, description: e.description, _rank: 0 });
        break;
      } else if (name.startsWith(q)) {
        results.push({ id: e.id, type: 'event', name: e.title, description: e.description, _rank: 1 });
        break;
      } else if (name.includes(q)) {
        results.push({ id: e.id, type: 'event', name: e.title, description: e.description, _rank: 2 });
        break;
      }
    }
  }

  // 搜索派系
  for (const f of factions) {
    const nameLower = f.name.toLowerCase();
    if (nameLower === q) {
      results.push({ id: f.id, type: 'faction', name: f.name, description: f.description, _rank: 0 });
    } else if (nameLower.startsWith(q)) {
      results.push({ id: f.id, type: 'faction', name: f.name, description: f.description, _rank: 1 });
    } else if (nameLower.includes(q)) {
      results.push({ id: f.id, type: 'faction', name: f.name, description: f.description, _rank: 2 });
    }
  }

  // 排序：精确 > 前缀 > 子串
  return results
    .sort((a, b) => a._rank - b._rank)
    .map(({ _rank, ...rest }) => rest);
}

// === 单实体查询 ===

export function getPerson(id: string): Person | undefined {
  return people.find((p) => p.id === id);
}

export function getEvent(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function getFaction(id: string): Faction | undefined {
  return factions.find((f) => f.id === id);
}

export function getRegion(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}
```

> 注意：`SearchResult` 需要扩展一个临时 `_rank` 字段用于排序，排序后删除。或者更好的做法是在 `lib/types.ts` 中给 `SearchResult` 加一个可选的 `_rank` 字段。

- [ ] **Step 4: 更新 SearchResult 类型**

在 `lib/types.ts` 的 `SearchResult` 中加一行：
```typescript
export interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'faction';
  name: string;
  description: string;
  _rank?: number;  // 搜索排序用，消费方忽略
}
```

- [ ] **Step 5: 配置 Jest**

Create `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};
```

- [ ] **Step 6: 运行测试验证通过**

Run: `cd D:\Code\CRAtlas && npx jest lib/data.test.ts`
Expected: PASS（全部测试通过）

- [ ] **Step 7: 提交**

```bash
cd D:\Code\CRAtlas && git add lib/data.ts lib/data.test.ts jest.config.js
git commit -m "[Phase 0] feat(data): 数据查询层 + 单元测试（getEventsByDate/getRegionControl/search/getCurrentFactionIds）"
```

---

