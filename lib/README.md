# `lib/` — 核心类型与数据层

本目录是 CRAtlas 的核心抽象层，定义整个应用共享的 TypeScript 类型与数据访问接口。上层（组件、页面、hooks）只依赖本层，不直接耦合具体数据结构实现。

## 文件列表

| 文件 | 用途 |
| --- | --- |
| `types.ts` | 全部核心类型定义（实体、关系、控制状态、图谱节点/边） |
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
lib/data/*.ts         ← 数据文件（填充实体）
    ↑
app/**, components/**, hooks/    ← 上层消费
```

- `lib/types.ts` **不依赖**本应用任何其他模块，可被任意层安全导入。
- 数据文件（后续任务创建）导入本模块的接口来约束实体形状。
- 组件与页面通过 `import type { ... } from '@/lib/types'` 引用，保持类型层与运行时解耦。

## 约定

- 所有 interface 均带 `export`，便于数据文件与组件引用。
- 可选字段用 `?` 标注，必填字段不得省略。
- 新增实体类型须在此文件登记，避免类型散落。
