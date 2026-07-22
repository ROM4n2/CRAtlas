# `lib/` — 核心类型、数据层与全局状态

本目录是 CRAtlas 的核心抽象层，定义整个应用共享的 TypeScript 类型、数据访问接口与全局状态。上层（组件、页面、hooks）只依赖本层，不直接耦合具体数据结构实现。

## 文件列表

| 文件 | 用途 |
| --- | --- |
| `types.ts` | 全部核心类型定义（实体、关系、控制状态、图谱节点/边） |
| `data.ts` | 数据查询层——组件访问数据的唯一入口（封装 `data/*.ts` 数据集） |
| `store.ts` | Zustand 全局状态管理——时间轴状态（日期/播放/速度/范围） |
| `README.md` | 本文件——目录说明 |

## 类型分层

`types.ts` 中的类型按职责分为四组：

1. **枚举/字面量类型** — `FactionType`、`RelationshipType`、`SourceType`、`ControlStatus`
2. **核心实体** — `Source`、`Faction`、`Affiliation`、`Person`、`Event`、`Region`、`Relationship`
3. **地区控制** — `RegionControl`、`RegionControlMap`、`RegionControlRecord`
4. **图谱适配** — `GraphNode`、`CytoscapeEdgeStyle`、`GraphEdge`、`KeyMarker`、`SearchResult`

## 依赖关系

```
lib/types.ts          ← 无内部依赖（基础层）
    ↑
lib/data.ts           ← 查询层（导入 data/*.ts + types.ts，对外暴露查询函数）
    ↑
lib/store.ts          ← 状态层（zustand，依赖 zustand 包；被上层组件订阅）
    ↑
data/*.ts             ← 数据集（填充实体，导入 types.ts）
    ↑
app/**, components/**, hooks/    ← 上层消费（通过 lib/data.ts 访问数据，通过 lib/store.ts 订阅状态）
```

- `lib/types.ts` **不依赖**本应用任何其他模块，可被任意层安全导入。
- `lib/data.ts` 是组件访问数据的**唯一入口**——架构规则禁止组件直接 import `data/*.ts` 文件。
- `lib/store.ts` 是时间轴状态的**唯一真相源**——地图、时间轴、图谱三视图通过 `useTimeStore` 共享 `currentDate`、`isPlaying`、`speed`、`dateRange`。
- 数据文件（`data/*.ts`）导入本模块的接口来约束实体形状。
- 组件与页面通过 `import { getPerson, search, ... } from '@/lib/data'` 引用查询函数。
- 组件通过 `import { useTimeStore } from '@/lib/store'` 订阅或修改时间轴状态。

## store.ts 架构角色

`lib/store.ts` 基于 zustand 提供轻量全局状态容器，职责限定在**时间轴控制**：

| 状态 | 类型 | 初始值 | 用途 |
| --- | --- | --- | --- |
| `currentDate` | `string` | `'1966-01-01'` | 当前时间轴游标位置（ISO 日期） |
| `isPlaying` | `boolean` | `false` | 播放/暂停开关 |
| `speed` | `number` | `1` | 播放速度倍率 |
| `dateRange` | `[string, string] \| null` | `null` | 时间轴可选区间过滤 |

动作：`setDate`、`togglePlay`、`setSpeed`、`setDateRange`。

订阅方：
- **地图视图** — 根据 `currentDate` 渲染地区控制状态。
- **时间轴组件** — 渲染游标、响应播放/速度控制。
- **图谱视图** — 根据 `currentDate` 过滤可见节点/边。

## 约定

- 所有 interface 均带 `export`，便于数据文件与组件引用。
- 可选字段用 `?` 标注，必填字段不得省略。
- 新增实体类型须在此文件登记，避免类型散落。
- 全局状态集中到 `lib/store.ts`，禁止在组件内另起 useState 管理跨视图共享的时间状态。
