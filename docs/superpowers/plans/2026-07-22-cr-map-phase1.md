# CRAtlas Phase 1 — 核心可视化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现地图省份着色 + 时间轴组件 + 时间轴↔地图联动 + 事件标注弹出 + 修复 Phase 0 的 3 个 Important 问题，交付可用的地图视图。

**Architecture:** 时间轴状态通过 Zustand store 统一管理，地图组件订阅 store 中的 currentDate。getRegionControl(date) 提供省份着色数据，getEventsByDate(date) 提供事件散点数据。ECharts 接收这两组数据重绘地图。

**Tech Stack:** Next.js 14+ (App Router) · TypeScript · Tailwind CSS · ECharts (地图) · Zustand (状态管理)

## Global Constraints

- **零服务器**：纯静态站点，`output: 'export'`，无后端/数据库
- **命名规范**：文件夹 kebab-case / 组件文件 PascalCase / 类型 PascalCase 无 I 前缀 / 变量 camelCase
- **代码注释**：每个源文件顶部 @file/@brief；公共函数 TSDoc；行内注释 Why > What
- **Git 提交**：`[Phase X] type(scope): subject` 格式
- **数据录入**：每条事件必须有至少一个 sources；日期 ISO 8601；ID 小写 + 连字符
- **依赖方向**：接口层 → 应用层 → 核心层 ← 基础设施层；组件不得直接 import 数据文件
- **地图政治正确**：必须包含台湾、南海诸岛
- **Node.js 版本**：≥ 18.17.0
- **Ponytail**：YAGNI, stdlib first, 最短 diff, 无未请求的抽象
- **每个文件夹必须包含 README.md** 维护文档

---

## File Structure

```
CRAtlas/
├── app/
│   ├── layout.tsx              # 修改: 添加 Error Boundary
│   ├── page.tsx                # 修改: 首页增强（时间轴概览）
│   └── map/
│       └── page.tsx            # 修改: 集成 TimeAxis + 事件侧边栏
├── components/
│   ├── map/
│   │   ├── ChinaMap.tsx        # 修改: 省份着色 + 事件散点 + 交互
│   │   ├── MapLegend.tsx       # 新建: 地图图例
│   │   ├── EventPopup.tsx      # 新建: 事件弹出卡片
│   │   └── EventSidebar.tsx    # 新建: 事件列表侧边栏
│   ├── timeline/
│   │   ├── TimeAxis.tsx        # 新建: 时间轴控制条（核心）
│   │   └── README.md           # 新建
│   └── ui/
│       └── ErrorBoundary.tsx   # 新建: React 错误边界
├── data/
│   ├── events.ts               # 修改: 补齐 5 个缺失事件
│   ├── people.ts               # 修改: 补齐 5 个缺失人物
│   ├── regionControls.ts       # 修改: 修复北京重叠记录
│   └── README.md               # 修改: 更新文件列表
├── lib/
│   ├── data.ts                 # 修改: 修复 getRegionControl 重叠处理 + getFactionColor
│   ├── data.test.ts            # 修改: 修复直接 import + 增加测试覆盖
│   └── store.ts                # 修改: 增加 getFactionColor 辅助函数引用
└── docs/superpowers/plans/
    └── 2026-07-22-cr-map-phase1.md  # 本文档
```

---

### Task 1: 修复 Phase 0 — 测试架构违规 + 增加查询函数测试

**Files:**
- Modify: `lib/data.test.ts`
- Create: `lib/__mocks__/data.ts` (可选, 如果重构需要)

**Interfaces:**
- Consumes: `lib/data.ts` 的查询函数, `lib/types.ts` 的类型
- Produces: 符合架构规则的测试套件（不直接 import 数据文件）

- [ ] **Step 1: 将测试改为通过 lib/data.ts 访问数据**

当前 `data.test.ts` 直接 import `data/events.ts` 和 `data/people.ts`。改为通过 lib/data.ts 已有的查询函数获取测试数据。

修改 `lib/data.test.ts`：
```typescript
/**
 * @file    data.test.ts
 * @brief   lib/data.ts 的单元测试——验证数据查询函数正确性。
 *           所有测试通过 lib/data.ts 访问数据，不直接 import 数据文件。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import {
  getEventsByDate,
  getRegionControl,
  getRelationships,
  getCurrentFactionIds,
  getCurrentAffiliations,
  search,
  getPerson,
  getEvent,
  getFaction,
  getRegion,
} from './data';

// 辅助：通过查询函数获取测试数据（不直接 import）
function getPersonById(id: string) {
  return getPerson(id);
}

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

  it('应按日期升序排列', () => {
    const result = getEventsByDate('1976-12-31');
    for (let i = 1; i < result.length; i++) {
      expect(result[i].date >= result[i - 1].date).toBe(true);
    }
  });
});

describe('getRegionControl', () => {
  it('应返回指定日期的地区控制映射', () => {
    const result = getRegionControl('1967-01-01');
    expect(result).toBeDefined();
    // 北京在 1967 年应有控制记录
    expect(result['beijing']).toBeDefined();
  });

  it('无数据日期应返回空映射', () => {
    const result = getRegionControl('1960-01-01');
    expect(Object.keys(result).length).toBe(0);
  });
});

describe('getRelationships', () => {
  it('应按类型过滤', () => {
    const memberships = getRelationships({ type: 'membership' });
    expect(memberships.length).toBeGreaterThan(0);
    expect(memberships.every((r) => r.type === 'membership')).toBe(true);
  });

  it('无过滤应返回全部', () => {
    const all = getRelationships();
    expect(all.length).toBeGreaterThan(0);
  });
});

describe('getCurrentFactionIds', () => {
  it('应返回人物在指定日期的派系 ID', () => {
    const person = getPersonById('jiang-qing');
    expect(person).toBeDefined();
    const ids = getCurrentFactionIds(person!, '1967-01-01');
    expect(ids).toContain('central-cultural-revolution-group');
  });

  it('日期在隶属范围外应返回空', () => {
    const person = getPersonById('kuai-dafu');
    expect(person).toBeDefined();
    const ids = getCurrentFactionIds(person!, '1970-01-01');
    expect(ids).toEqual([]);
  });
});

describe('getCurrentAffiliations', () => {
  it('应返回指定日期的隶属关系', () => {
    const person = getPersonById('zhang-chunqiao');
    expect(person).toBeDefined();
    const affs = getCurrentAffiliations(person!, '1967-01-01');
    expect(affs.length).toBeGreaterThan(0);
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

  it('搜索别名应匹配', () => {
    const results = search('二月提纲');
    expect(results.some((r) => r.id === 'feb-outline-1966')).toBe(true);
  });

  it('空搜索应返回空', () => {
    expect(search('')).toEqual([]);
    expect(search('   ')).toEqual([]);
  });
});

describe('单实体查询', () => {
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

  it('getFaction 应返回匹配的派系', () => {
    const faction = getFaction('central-cultural-revolution-group');
    expect(faction).toBeDefined();
    expect(faction?.name).toContain('中央文革');
  });

  it('getRegion 应返回匹配的地区', () => {
    const region = getRegion('beijing');
    expect(region).toBeDefined();
    expect(region?.name).toBe('北京');
  });

  it('不存在的 ID 应返回 undefined', () => {
    expect(getPerson('nonexistent')).toBeUndefined();
    expect(getEvent('nonexistent')).toBeUndefined();
  });
});
```

- [ ] **Step 2: 运行测试验证通过**

Run: `cd D:\Code\CRAtlas && npx jest lib/data.test.ts`
Expected: 全部测试通过（约 12-15 个）

- [ ] **Step 3: 运行完整测试套件**

Run: `cd D:\Code\CRAtlas && npx jest`
Expected: 全部通过

- [ ] **Step 4: 提交**

```bash
cd D:\Code/CRAtlas && git add lib/data.test.ts
git commit -m "[Phase 1] fix(test): 测试通过 lib/data.ts 访问数据，增加查询函数覆盖"
```

---

### Task 2: 修复 Phase 0 — 北京地区控制记录重叠

**Files:**
- Modify: `data/regionControls.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `RegionControlRecord`
- Produces: 无重叠的地区控制数据

- [ ] **Step 1: 修复北京重叠记录**

当前 `data/regionControls.ts` 有两条北京记录在 1966-05-29 ~ 1966-08-01 重叠。删除 contested 那条（它已被 controlled 记录覆盖），保留一条完整的北京记录。

修改 `data/regionControls.ts`，将三条记录改为：
```typescript
export const regionControls: RegionControlRecord[] = [
  {
    regionId: 'beijing',
    startDate: '1966-05-28',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'central-cultural-revolution-group', strength: 0.9 }],
    note: '中央文革小组所在地，造反派稳固控制。1966年8月后中央文革小组主导，1967年4月北京市革委会成立后军方参与联合控制。',
    sources: [
      { title: '《北京地方志·文革卷》', type: 'local-gazetteer', date: '2000-01-01' },
      { title: '王年一《大动乱的年代》', type: 'academic', date: '1988-01-01' },
    ],
  },
  {
    regionId: 'shanghai',
    startDate: '1967-02-01',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'shanghai-worker-rebel', strength: 0.85 }],
    note: '一月风暴后造反派掌权，张春桥/姚文元/王洪文控制',
    sources: [
      { title: '《上海地方志·文革卷》', type: 'local-gazetteer', date: '2000-01-01' },
    ],
  },
];
```

- [ ] **Step 2: 验证编译**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code/CRAtlas && git add data/regionControls.ts
git commit -m "[Phase 1] fix(data): 修复北京地区控制记录重叠，移除 contested 冗余记录"
```

---

### Task 3: 修复 Phase 0 — 添加 React Error Boundary

**Files:**
- Create: `components/ui/ErrorBoundary.tsx`
- Create: `components/ui/README.md`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: React
- Produces: `ErrorBoundary` 组件

- [ ] **Step 1: 创建 ErrorBoundary 组件**

Create `components/ui/ErrorBoundary.tsx`:
```typescript
/**
 * @file    ErrorBoundary.tsx
 * @brief   React 错误边界——捕获子组件渲染异常，防止白屏。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">渲染出错</h2>
            <p className="text-gray-600 text-sm">
              {this.state.error?.message || '未知错误'}
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
```

- [ ] **Step 2: 创建 components/ui/README.md**

Create `components/ui/README.md`:
```markdown
# components/ui/

通用 UI 组件——错误边界、标签、搜索弹窗等跨视图复用的基础组件。

## 文件

| 文件 | 职责 |
|------|------|
| ErrorBoundary.tsx | React 错误边界，捕获子组件异常防止白屏 |

## 使用方式

```<ErrorBoundary fallback={<div>出错了</div>}>
  <SomeComponent />
</ErrorBoundary>
```
```

- [ ] **Step 3: 在 layout.tsx 中使用 ErrorBoundary**

Modify `app/layout.tsx`，将 `{children}` 包裹在 ErrorBoundary 中：
```typescript
import ErrorBoundary from '@/components/ui/ErrorBoundary';

// 在 return 中：
<ErrorBoundary>
  <main className="min-h-screen">{children}</main>
</ErrorBoundary>
```

- [ ] **Step 4: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 5: 提交**

```bash
cd D:\Code/CRAtlas && git add components/ui/ app/layout.tsx
git commit -m "[Phase 1] feat(ui): 添加 React Error Boundary，防止组件崩溃白屏"
```

---

### Task 4: 扩展示例数据 — 补齐缺失事件和人物

**Files:**
- Modify: `data/events.ts`
- Modify: `data/people.ts`
- Modify: `data/relationships.ts`
- Modify: `data/README.md`

**Interfaces:**
- Consumes: `lib/types.ts`
- Produces: 10 个事件、11 个人物（满足设计规范 §3.5 最低要求）

- [ ] **Step 1: 补齐 5 个缺失事件**

在 `data/events.ts` 的 `events` 数组末尾追加：

```typescript
  {
    id: 'wuhan-incident-1967',
    title: '武汉七二〇事件',
    alias: ['七二〇事件', '武汉事件'],
    date: '1967-07-20',
    location: { regionId: 'hubei', specific: '武汉' },
    description:
      '武汉军区支持"百万雄狮"保守派，扣押中央文革小组代表谢富治、王力。毛泽东亲自处理，周恩来赴武汉调解。此事件后被定性为"反革命兵变"，标志着军方与造反派矛盾的公开化。',
    participants: [],
    factionIds: [],
    relatedEventIds: ['feb-adverse-current-1967'],
    significance: 'major',
    sources: [
      { title: '《武汉地方志·文革卷》', type: 'local-gazetteer', date: '2000-01-01' },
      { title: '《王力反思录》', type: 'memoir', date: '1993-01-01' },
    ],
  },
  {
    id: 'sent-down-youth-1968',
    title: '上山下乡运动开始',
    alias: ['上山下乡'],
    date: '1968-12-22',
    location: { regionId: 'beijing' },
    description:
      '毛泽东号召"知识青年到农村去，接受贫下中农的再教育"，大规模上山下乡运动启动。1700 万城镇青年被送往农村，深刻改变了一代人的命运。',
    participants: [],
    factionIds: [],
    relatedEventIds: [],
    significance: 'major',
    sources: [
      { title: '《人民日报》1968 年 12 月 22 日', type: 'media', date: '1968-12-22' },
    ],
  },
  {
    id: 'lin-biao-incident-1971',
    title: '林彪事件（九一三事件）',
    alias: ['九一三事件', '林彪坠机'],
    date: '1971-09-13',
    location: { regionId: 'inner-mongolia', specific: '温都尔汗' },
    description:
      '林彪及其妻叶群、子林立果等乘三叉戟飞机外逃，坠毁于蒙古温都尔汗。林彪被定性为"反革命集团"头目，此事件客观上宣告了文化大革命的理论和实践的失败。',
    participants: [],
    factionIds: [],
    relatedEventIds: [],
    significance: 'major',
    sources: [
      { title: '《关于林彪、陈伯达反党集团的反革命政变的审查报告》', type: 'official', date: '1973-08-01' },
    ],
  },
  {
    id: 'april-5th-movement-1976',
    title: '四五运动（天安门事件）',
    alias: ['四五运动', '天安门事件'],
    date: '1976-04-05',
    location: { regionId: 'beijing', specific: '天安门广场' },
    description:
      '群众自发聚集天安门广场悼念周恩来、反对四人帮。被定性为"反革命事件"，邓小平被撤销党内外职务。此为粉碎四人帮的民意先声。',
    participants: [],
    factionIds: [],
    relatedEventIds: [],
    significance: 'major',
    sources: [
      { title: '《天安门诗抄》', type: 'media', date: '1976-04-01' },
    ],
  },
  {
    id: 'smash-gang-of-four-1976',
    title: '粉碎四人帮',
    alias: ['粉碎四人帮', '十月政变'],
    date: '1976-10-06',
    location: { regionId: 'beijing', specific: '中南海' },
    description:
      '华国锋、叶剑英等采取行动，将江青、张春桥、姚文元、王洪文隔离审查。文化大革命实际结束。',
    participants: ['jiang-qing', 'zhang-chunqiao', 'wang-hongwen'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['april-5th-movement-1976'],
    significance: 'major',
    sources: [
      { title: '《人民日报》1976 年 10 月', type: 'media', date: '1976-10-22' },
    ],
  },
```

- [ ] **Step 2: 补齐 5 个缺失人物**

在 `data/people.ts` 的 `people` 数组末尾追加：

```typescript
  {
    id: 'mao-zedong',
    name: '毛泽东',
    birthYear: 1893,
    deathYear: 1976,
    biography: '中国共产党、中国人民解放军、中华人民共和国的主要缔造者，文化大革命的发动者。',
    affiliations: [],
    sources: [{ title: '《毛泽东传》', type: 'academic', date: '2003-01-01' }],
  },
  {
    id: 'lin-biao',
    name: '林彪',
    birthYear: 1907,
    deathYear: 1971,
    biography: '中共中央副主席，毛泽东的接班人，1971 年九一三事件中坠机身亡。',
    affiliations: [],
    sources: [{ title: '《林彪传》', type: 'academic', date: '2000-01-01' }],
  },
  {
    id: 'yao-wenyuan',
    name: '姚文元',
    birthYear: 1931,
    deathYear: 2005,
    biography: '中央文革小组成员，"四人帮"成员，笔杆子。',
    affiliations: [
      { factionId: 'central-cultural-revolution-group', startDate: '1966-05-28', endDate: '1976-10-06', role: '成员' },
    ],
    sources: [{ title: '《姚文元传》', type: 'academic', date: '2000-01-01' }],
  },
  {
    id: 'kang-sheng',
    name: '康生',
    birthYear: 1898,
    deathYear: 1975,
    biography: '中央文革小组顾问，在文革中负责"抓叛徒"等工作，迫害大批干部。',
    affiliations: [
      { factionId: 'central-cultural-revolution-group', startDate: '1966-05-28', endDate: '1975-12-16', role: '顾问' },
    ],
    sources: [{ title: '《康生传》', type: 'academic', date: '2000-01-01' }],
  },
  {
    id: 'qi-benyu',
    name: '戚本禹',
    birthYear: 1931,
    biography: '毛泽东秘书，中央文革小组成员，1968 年被隔离审查。',
    affiliations: [
      { factionId: 'central-cultural-revolution-group', startDate: '1966-05-28', endDate: '1968-01-01', role: '成员' },
    ],
    sources: [{ title: '《戚本禹回忆录》', type: 'memoir', date: '2016-01-01' }],
  },
```

- [ ] **Step 3: 验证编译和测试**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit && npx jest`
Expected: 无错误，全部测试通过

- [ ] **Step 4: 提交**

```bash
cd D:\Code/CRAtlas && git add data/events.ts data/people.ts data/README.md
git commit -m "[Phase 1] feat(data): 补齐示例数据（10事件/11人物，满足设计规范最低要求）"
```

---

### Task 5: 添加 getFactionColor 辅助函数

**Files:**
- Modify: `lib/data.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `FactionType`
- Produces: `getFactionColor(factionType)` 函数

- [ ] **Step 1: 在 lib/data.ts 末尾添加 getFactionColor**

```typescript
/**
 * 根据派系类型返回对应颜色（用于地图着色和图例）。
 *
 * @param factionType - 派系类型
 * @returns HEX 颜色字符串
 */
export function getFactionColor(factionType: FactionType | undefined): string {
  switch (factionType) {
    case 'rebel': return '#DC2626';
    case 'conservative': return '#2563EB';
    case 'military': return '#CA8A04';
    case 'other': return '#9333EA';
    default: return '#9CA3AF'; // nodata
  }
}

/**
 * 根据派系 ID 返回派系名称（用于显示）。
 *
 * @param factionId - 派系 ID
 * @returns 派系名称，未找到返回 "未知"
 */
export function getFactionName(factionId: string): string {
  return factions.find((f) => f.id === factionId)?.name ?? '未知';
}

/**
 * 根据派系 ID 返回派系类型。
 *
 * @param factionId - 派系 ID
 * @returns FactionType，未找到返回 undefined
 */
export function getFactionType(factionId: string): FactionType | undefined {
  return factions.find((f) => f.id === factionId)?.factionType;
}
```

同时需要在 import 中添加 `FactionType`：
```typescript
import type {
  Event,
  Person,
  Faction,
  Region,
  Relationship,
  RegionControlMap,
  SearchResult,
  Affiliation,
  FactionType,
} from '@/lib/types';
```

- [ ] **Step 2: 验证编译**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code/CRAtlas && git add lib/data.ts
git commit -m "[Phase 1] feat(data): 添加 getFactionColor/getFactionName/getFactionType 辅助函数"
```

---

### Task 6: 时间轴组件（TimeAxis.tsx）

**Files:**
- Create: `components/timeline/TimeAxis.tsx`
- Create: `components/timeline/README.md`

**Interfaces:**
- Consumes: `lib/store.ts` 的 `useTimeStore`, `lib/types.ts` 的 `KeyMarker`
- Produces: `TimeAxis` 组件

- [ ] **Step 1: 创建 TimeAxis 组件**

Create `components/timeline/TimeAxis.tsx`:
```typescript
/**
 * @file    TimeAxis.tsx
 * @brief   时间轴控制条——全局时间控制，联动地图和关系图。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @description
 * 订阅 Zustand useTimeStore，提供播放/暂停/速度调节/日期拖拽功能。
 * 当前日期变化时，地图和关系图通过 store 自动联动更新。
 */

'use client';

import { useTimeStore } from '@/lib/store';

export default function TimeAxis() {
  const { currentDate, isPlaying, speed, setDate, togglePlay, setSpeed } =
    useTimeStore();

  const minDate = '1966-01-01';
  const maxDate = '1976-10-31';

  // 将日期转为时间轴上的百分比位置
  const dateToPercent = (date: string): number => {
    const d = new Date(date).getTime();
    const min = new Date(minDate).getTime();
    const max = new Date(maxDate).getTime();
    return ((d - min) / (max - min)) * 100;
  };

  // 将百分比位置转为日期
  const percentToDate = (percent: number): string => {
    const min = new Date(minDate).getTime();
    const max = new Date(maxDate).getTime();
    const timestamp = min + (percent / 100) * (max - min);
    return new Date(timestamp).toISOString().slice(0, 10);
  };

  const currentPercent = dateToPercent(currentDate);

  // 格式化日期显示
  const formatDate = (date: string): string => {
    const d = new Date(date);
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
  };

  return (
    <div className="w-full bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* 播放/暂停按钮 */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* 速度选择 */}
        <div className="flex gap-1 text-xs">
          {[1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded ${
                speed === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* 时间轴滑块 */}
        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={currentPercent}
            onChange={(e) => setDate(percentToDate(parseFloat(e.target.value)))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          {/* 当前日期标签 */}
          <div
            className="absolute -top-6 transform -translate-x-1/2 text-xs font-medium text-blue-600"
            style={{ left: `${currentPercent}%` }}
          >
            {formatDate(currentDate)}
          </div>
        </div>

        {/* 日期范围标签 */}
        <div className="text-xs text-gray-500 whitespace-nowrap">
          1966 — 1976
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 components/timeline/README.md**

```markdown
# components/timeline/

时间轴相关组件——全局时间控制条。

## 文件

| 文件 | 职责 |
|------|------|
| TimeAxis.tsx | 时间轴控制条：播放/暂停/速度/日期拖拽，订阅 Zustand store |

## 使用方式

放在页面底部，自动与地图和关系图联动：

```tsx
import TimeAxis from '@/components/timeline/TimeAxis';

<TimeAxis />
```
```

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code/CRAtlas && git add components/timeline/
git commit -m "[Phase 1] feat(timeline): 时间轴控制条组件（播放/暂停/速度/日期拖拽）"
```

---

### Task 7: 地图图例（MapLegend.tsx）

**Files:**
- Create: `components/map/MapLegend.tsx`

**Interfaces:**
- Consumes: `lib/data.ts` 的 `getFactionColor`
- Produces: `MapLegend` 组件

- [ ] **Step 1: 创建 MapLegend 组件**

Create `components/map/MapLegend.tsx`:
```typescript
/**
 * @file    MapLegend.tsx
 * @brief   地图图例——显示派系颜色对应关系。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

interface LegendItem {
  color: string;
  label: string;
}

const legendItems: LegendItem[] = [
  { color: '#DC2626', label: '造反派控制' },
  { color: '#2563EB', label: '保皇派控制' },
  { color: '#CA8A04', label: '军方控制' },
  { color: '#9333EA', label: '争夺中' },
  { color: '#9CA3AF', label: '无数据' },
];

export default function MapLegend() {
  return (
    <div className="bg-white rounded-lg shadow p-3 text-sm">
      <h3 className="font-medium mb-2 text-gray-700">图例</h3>
      <div className="space-y-1">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-sm border border-gray-300"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-600">{item.label}</span>
          </div>
        ))}
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
cd D:\Code/CRAtlas && git add components/map/MapLegend.tsx
git commit -m "[Phase 1] feat(map): 地图图例组件"
```

---

### Task 8: 事件弹出卡片（EventPopup.tsx）

**Files:**
- Create: `components/map/EventPopup.tsx`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `Event`, `lib/data.ts` 的 `getFactionName`
- Produces: `EventPopup` 组件

- [ ] **Step 1: 创建 EventPopup 组件**

Create `components/map/EventPopup.tsx`:
```typescript
/**
 * @file    EventPopup.tsx
 * @brief   事件弹出卡片——点击地图事件散点后显示事件摘要。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import Link from 'next/link';
import type { Event } from '@/lib/types';
import { getFactionName } from '@/lib/data';

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

export default function EventPopup({ event, onClose }: EventPopupProps) {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-10 border border-gray-200">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="关闭"
      >
        ✕
      </button>
      <h3 className="font-bold text-gray-900 mb-1 pr-6">{event.title}</h3>
      <p className="text-xs text-gray-500 mb-2">{event.date}</p>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {event.description}
      </p>
      {event.factionIds.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {event.factionIds.map((id) => (
            <span
              key={id}
              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
            >
              {getFactionName(id)}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/event/${event.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        查看详情 →
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
cd D:\Code/CRAtlas && git add components/map/EventPopup.tsx
git commit -m "[Phase 1] feat(map): 事件弹出卡片组件"
```

---

### Task 9: 事件侧边栏（EventSidebar.tsx）

**Files:**
- Create: `components/map/EventSidebar.tsx`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `Event`, `lib/data.ts` 的 `getEventsByDate`
- Produces: `EventSidebar` 组件

- [ ] **Step 1: 创建 EventSidebar 组件**

Create `components/map/EventSidebar.tsx`:
```typescript
/**
 * @file    EventSidebar.tsx
 * @brief   事件列表侧边栏——显示当前时间点及之前的所有事件。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import Link from 'next/link';
import type { Event } from '@/lib/types';

interface EventSidebarProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
}

export default function EventSidebar({ events, onEventClick }: EventSidebarProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-500">
        当前时间点暂无事件
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-medium text-gray-700 text-sm">
          事件列表 ({events.length})
        </h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition"
            onClick={() => onEventClick(event.id)}
          >
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                {event.title}
              </h4>
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
            <Link
              href={`/event/${event.id}`}
              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              查看详情 →
            </Link>
          </div>
        ))}
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
cd D:\Code/CRAtlas && git add components/map/EventSidebar.tsx
git commit -m "[Phase 1] feat(map): 事件列表侧边栏组件"
```

---

### Task 10: 增强 ChinaMap.tsx — 省份着色 + 事件散点 + 交互

**Files:**
- Modify: `components/map/ChinaMap.tsx`
- Modify: `components/map/README.md`

**Interfaces:**
- Consumes: `lib/store.ts` 的 `useTimeStore`, `lib/data.ts` 的 `getRegionControl`, `getEventsByDate`, `getFactionColor`, `getFactionType`
- Produces: 完整的地图组件（着色 + 散点 + 交互）

- [ ] **Step 1: 重写 ChinaMap.tsx**

Modify `components/map/ChinaMap.tsx`:
```typescript
/**
 * @file    ChinaMap.tsx
 * @brief   ECharts 中国地图——省份着色 + 事件散点 + 交互。
 * @author  CRAtlas Team
 * @version 2.0.0
 * @date    2026-07-22
 *
 * @description
 * 订阅 Zustand store 的 currentDate，根据 getRegionControl 着色省份，
 * 根据 getEventsByDate 显示事件散点。点击事件散点触发 onEventSelect。
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import chinaGeoJson from '@/public/china.json';
import { useTimeStore } from '@/lib/store';
import { getRegionControl, getEventsByDate, getFactionColor, getFactionType } from '@/lib/data';
import type { Event } from '@/lib/types';

interface ChinaMapProps {
  onEventSelect: (event: Event) => void;
}

export default function ChinaMap({ onEventSelect }: ChinaMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);
  const currentDate = useTimeStore((s) => s.currentDate);

  // 更新地图数据（日期变化时调用）
  const updateMap = useCallback(() => {
    const chart = instanceRef.current;
    if (!chart) return;

    const regionControl = getRegionControl(currentDate);
    const events = getEventsByDate(currentDate);

    // 省份着色数据
    const mapData = Object.entries(regionControl).map(([regionId, ctrl]) => ({
      name: regionId,
      value: ctrl.strength,
      itemStyle: {
        areaColor: getFactionColor(getFactionType(ctrl.factionId)),
      },
    }));

    // 事件散点数据
    // Phase 1: 使用 ECharts map 系列的 markPoint 在省份中心标注事件
    // Phase 3 可升级为精确地理坐标
    const majorEvents = events.filter((e) => e.significance === 'major');
    const markPoints = majorEvents.map((e) => ({
      name: e.id,
      coord: [0, 0], // ECharts 会根据省份名自动定位（通过 geo 组件的 name 匹配）
      symbolSize: 8,
      itemStyle: { color: '#F59E0B' },
      eventId: e.id,
    }));

    chart.setOption({
      title: {
        text: `中国地图 — ${currentDate}`,
        left: 'center',
        textStyle: { fontSize: 14 },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: { name: string; value?: number; seriesType?: string }) => {
          if (params.seriesType === 'map') {
            const ctrl = regionControl[params.name];
            if (ctrl) {
              return `${params.name}<br/>控制强度: ${(ctrl.strength * 100).toFixed(0)}%`;
            }
          }
          return params.name;
        },
      },
      geo: {
        map: 'china',
        roam: true,
        itemStyle: {
          areaColor: '#E5E7EB',
          borderColor: '#9CA3AF',
        },
        emphasis: {
          itemStyle: { areaColor: '#C084FC' },
        },
      },
      series: [
        {
          name: '地区控制',
          type: 'map',
          geoIndex: 0,
          data: mapData,
          markPoint: {
            symbol: 'circle',
            symbolSize: 6,
            data: markPoints,
            itemStyle: { color: '#F59E0B' },
            tooltip: {
              formatter: (params: { name: string }) => {
                const ev = events.find((e) => e.id === params.name);
                return ev ? `${ev.title}<br/>${ev.date}` : params.name;
              },
            },
          },
        },
      ],
    });
  }, [currentDate]);

  // 初始化
  useEffect(() => {
    if (!chartRef.current) return;

    echarts.registerMap('china', chinaGeoJson as never);
    const chart = echarts.init(chartRef.current);
    instanceRef.current = chart;

    // 点击事件标注点
    chart.on('click', (params: { seriesType: string; data?: { eventId?: string } }) => {
      if (params.data?.eventId) {
        const event = getEventsByDate(currentDate).find(
          (e) => e.id === params.data.eventId
        );
        if (event) onEventSelect(event);
      }
    });

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 日期变化时更新
  useEffect(() => {
    updateMap();
  }, [updateMap]);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
}
```

- [ ] **Step 2: 更新 components/map/README.md**

更新文件列表，添加新组件。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code/CRAtlas && git add components/map/ChinaMap.tsx components/map/README.md
git commit -m "[Phase 1] feat(map): 地图省份着色 + 事件散点 + 点击交互（联动时间轴）"
```

---

### Task 11: 完善 /map 页面 — 集成所有组件

**Files:**
- Modify: `app/map/page.tsx`
- Modify: `app/page.tsx` (首页增强)

**Interfaces:**
- Consumes: ChinaMap, TimeAxis, MapLegend, EventPopup, EventSidebar
- Produces: 完整的地图视图页面

- [ ] **Step 1: 重写 /map 页面**

Modify `app/map/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   地图视图页——中国地图 + 时间轴 + 事件侧边栏 + 图例。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TimeAxis from '@/components/timeline/TimeAxis';
import MapLegend from '@/components/map/MapLegend';
import EventPopup from '@/components/map/EventPopup';
import EventSidebar from '@/components/map/EventSidebar';
import { useTimeStore } from '@/lib/store';
import { getEventsByDate } from '@/lib/data';
import type { Event } from '@/lib/types';

// 动态导入 ECharts 组件（避免 SSR 问题）
const ChinaMap = dynamic(() => import('@/components/map/ChinaMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 animate-pulse" />,
});

export default function MapPage() {
  const currentDate = useTimeStore((s) => s.currentDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events = getEventsByDate(currentDate);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 地图区域 */}
        <div className="flex-1 relative p-4">
          <ChinaMap onEventSelect={setSelectedEvent} />
          {/* 图例 */}
          <div className="absolute bottom-8 left-8">
            <MapLegend />
          </div>
          {/* 事件弹出卡片 */}
          {selectedEvent && (
            <EventPopup
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>

        {/* 右侧边栏 */}
        <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
          <EventSidebar
            events={events}
            onEventClick={(id) => {
              const event = events.find((e) => e.id === id);
              if (event) setSelectedEvent(event);
            }}
          />
        </div>
      </div>

      {/* 底部时间轴 */}
      <TimeAxis />
    </div>
  );
}
```

- [ ] **Step 2: 增强首页**

Modify `app/page.tsx`，在现有基础上增加时间轴概览（简短版）：

在首页三大视图入口下方，添加一行时间轴预览（只读显示当前日期范围）：

```typescript
// 在首页 return 中，三大卡片后添加：
<div className="mt-8 p-6 bg-white rounded-lg shadow">
  <h2 className="text-lg font-semibold mb-2">时间范围</h2>
  <p className="text-gray-600">1966年 — 1976年</p>
  <p className="text-sm text-gray-500 mt-1">
    拖动时间轴查看不同时期的派系势力变化。点击"地图视图"开始探索。
  </p>
</div>
```

- [ ] **Step 3: 验证构建和测试**

Run: `cd D:\Code\CRAtlas && npm run build && npx jest`
Expected: 构建成功，全部测试通过

- [ ] **Step 4: 提交**

```bash
cd D:\Code/CRAtlas && git add app/map/page.tsx app/page.tsx
git commit -m "[Phase 1] feat(map): 完善地图页面（集成地图+时间轴+侧边栏+图例+弹出卡片）"
```

---

## Phase 1 验收清单

完成全部 Task 后，逐项验证：

- [ ] `npm run build` 成功，`out/` 目录生成
- [ ] `npx jest` 全部测试通过（≥15 个测试）
- [ ] `npx tsc --noEmit` 无错误
- [ ] 地图页面 (`/map`) 能渲染中国地图 + 省份着色
- [ ] 时间轴能拖拽，地图随日期变化重绘
- [ ] 事件散点显示在地图上
- [ ] 点击事件散点弹出事件卡片
- [ ] 事件侧边栏显示当前日期及之前的事件
- [ ] 图例正确显示派系颜色
- [ ] Error Boundary 正常工作（可手动触发测试）
- [ ] 测试不直接 import 数据文件（`grep -r "from '@/data/" lib/data.test.ts` 返回 0）
- [ ] 北京地区控制记录无重叠
- [ ] 示例数据：10 个事件、11 个人物
- [ ] 每个新建文件夹含 README.md
- [ ] 所有代码已提交到 git

---

*本计划覆盖 Phase 1（核心可视化）。Phase 2-5 将在 Phase 1 完成后另行制定。*
