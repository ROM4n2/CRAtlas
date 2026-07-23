### Task 2: 类型定义（lib/types.ts）

**Files:**
- Create: `lib/types.ts`
- Test: `lib/types.test.ts`（编译期验证）

**Interfaces:**
- Consumes: nothing
- Produces: 所有核心类型——`Faction`, `Person`, `Affiliation`, `Event`, `Region`, `Relationship`, `Source`, `RegionControl`, `RegionControlMap`, `GraphNode`, `GraphEdge`, `CytoscapeEdgeStyle`, `KeyMarker`, `SearchResult`, `ControlStatus`, `FactionType`, `RelationshipType`, `SourceType`

- [ ] **Step 1: 创建 lib/types.ts**

Create `lib/types.ts`，完整内容见设计文档 §3.1 + 自检修复部分。包含以下类型：

```typescript
/**
 * @file    types.ts
 * @brief   CRAtlas 全部核心类型定义——实体、关系、控制状态、图谱节点/边。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

// === 枚举/字面量类型 ===
export type FactionType = 'rebel' | 'conservative' | 'military' | 'other';
export type RelationshipType = 'membership' | 'causality' | 'faction-interaction' | 'social';
export type SourceType = 'official' | 'academic' | 'media' | 'memoir' | 'local-gazetteer';
export type ControlStatus = 'controlled' | 'contested' | 'transitional' | 'no-data';

// === 核心实体 ===
export interface Source {
  title: string;
  type: SourceType;
  date?: string;
  url?: string;
  note?: string;
}

export interface Faction {
  id: string;
  name: string;
  factionType: FactionType;
  foundedDate: string;
  dissolvedDate?: string;
  parentFactionId?: string;
  regionIds: string[];
  description: string;
  sources: Source[];
}

export interface Affiliation {
  factionId: string;
  startDate: string;
  endDate?: string;
  role: string;
}

export interface Person {
  id: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  biography: string;
  affiliations: Affiliation[];
  sources: Source[];
}

export interface Event {
  id: string;
  title: string;
  alias?: string[];
  date: string;
  endDate?: string;
  location: { regionId: string; specific?: string };
  description: string;
  participants: string[];
  factionIds: string[];
  relatedEventIds: string[];
  significance: 'major' | 'significant' | 'minor';
  sources: Source[];
}

export interface Region {
  id: string;
  name: string;
  level: 'province' | 'city' | 'district';
  parentId?: string;
}

export interface Relationship {
  id: string;
  type: RelationshipType;
  from: string;
  to: string;
  fromType: 'person' | 'event' | 'faction';
  toType: 'person' | 'event' | 'faction';
  startDate: string;
  endDate?: string;
  description: string;
  sources: Source[];
}

// === 地区控制 ===
export interface RegionControl {
  factionId: string;
  strength: number;
}
export type RegionControlMap = Record<string, RegionControl>;

export interface RegionControlRecord {
  regionId: string;
  startDate: string;
  endDate?: string;
  status: ControlStatus;
  factions: { factionId: string; strength: number }[];
  note?: string;
  sources: Source[];
}

// === 图谱适配 ===
export interface GraphNode {
  id: string;
  label: string;
  type: 'person' | 'event' | 'faction';
  factionType?: FactionType;
  color: string;
  shape: string;
}

export interface CytoscapeEdgeStyle {
  'line-color'?: string;
  'line-style'?: 'solid' | 'dashed' | 'dotted';
  'line-width'?: number;
  'target-arrow-shape'?: 'triangle' | 'none';
  'source-arrow-shape'?: 'triangle' | 'none';
  'curve-style'?: 'bezier' | 'unbundled-bezier';
  'arrow-scale'?: number;
  'opacity'?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: RelationshipType;
  style: CytoscapeEdgeStyle;
}

export interface KeyMarker {
  date: string;
  label: string;
  eventId: string;
}

export interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'faction';
  name: string;
  description: string;
}
```

> 注意：所有 interface 都加 `export`，因为数据文件和组件需要引用。

- [ ] **Step 2: 验证类型编译**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add lib/types.ts
git commit -m "[Phase 0] feat(types): 核心类型定义（实体/关系/控制/图谱）"
```

---

