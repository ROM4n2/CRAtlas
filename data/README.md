# data/ — 数据源层（Data Source Layer）

本目录是 CRAtlas 的**静态数据源层**，存放所有示例/种子数据集。
上层可视化组件（地图、时间轴、关系图）通过 `lib/data.ts` 统一访问本层数据，
不直接 import 本目录下的文件。

## 文件清单

| 文件 | 说明 | 记录数（示例） |
| --- | --- | --- |
| `regions.ts` | 中国 34 省级行政区基础数据（id / name / level） | 34 |
| `factions.ts` | 派系示例数据（造反派 / 保皇派 / 军方组织） | 4 |
| `people.ts` | 人物示例数据（文革关键人物及其派系隶属） | 11 |
| `events.ts` | 事件示例数据（文革关键历史事件） | 10 |
| `relationships.ts` | 关系示例数据（人物-派系隶属、事件因果、派系互动） | 5 |
| `regionControls.ts` | 地区控制时间线（地图省份着色的核心输入） | 3 |

> 以上均为**示例数据**，用于 Phase 0 可视化可行性验证。
> 完整历史数据需通过 Phase 0 可行性预研后，按本文件所述规范逐步填充。

## 数据规范

### 1. ID 命名

- **格式**：`kebab-case`（小写字母 + 连字符），全局唯一。
- **人物**：拼音全名，如 `kuai-dafu`、`jiang-qing`、`zhang-chunqiao`。
- **派系**：英文描述性短语，如 `central-cultural-revolution-group`、`shanghai-worker-rebel`。
- **事件**：`{slug}-{year}`，如 `may16-notice-1966`、`jan-storm-1967`。
- **地区**：英文通用名，如 `beijing`、`shanghai`、`xinjiang`、`xizang`。
- **关系**：`rel-{from}-{to}` 或 `rel-{描述}`，如 `rel-kuai-capital`。

### 2. 日期格式

- **完整日期**：`YYYY-MM-DD`（ISO 8601），如 `1966-05-16`。
- **仅知年月**：`YYYY-MM`（省略日），如 `1966-05`。
- **仅知年份**：`YYYY`，如 `1966`。
- **时间区间**：使用 `startDate` / `endDate` 字段对；`endDate` 省略表示"至今"或"未知"。
- **不确定日期**：在对应实体的 `description` 或 `note` 字段中用"约""大约""？"等字样说明，
  仍按最可能日期填写。

### 3. 来源（sources）要求

- **每条记录必须包含至少 1 个 source**，否则视为"未审"数据，不得进入主分支。
- **来源类型**（`SourceType`）：
  - `official`：官方文件、档案、公报
  - `academic`：学术著作、论文
  - `media`：当时报刊、传单、广播
  - `memoir`：回忆录、口述史
  - `local-gazetteer`：地方志
- **必填字段**：`title`、`type`；`date` 与 `url` 尽可能提供。
- **多源原则**：重大事件 / 关键人物应提供 ≥2 个独立来源，避免孤证。

### 4. 其他约定

- **数组字段**（`regionIds`、`participants`、`factionIds`、`relatedEventIds`、`affiliations`、
  `sources`）：即使为空也必须显式写出 `[]`，禁止省略。
- **描述字段**（`description`、`biography`、`note`）：使用中文，保持客观中立，
  避免价值判断用语。
- **strength 字段**（`regionControls.factions[].strength`）：0.0–1.0 之间的数值，
  表示该派系在该时段对该地区的相对控制强度。

## 访问层：lib/data.ts

`lib/data.ts` 是**唯一的数据访问入口**（facade），职责包括：

1. **聚合**：将本目录下的 6 个数据集合并为统一的内存对象，供组件消费。
2. **索引**：提供按 ID 查找、按类型筛选、按时间范围过滤等辅助函数。
3. **解耦**：上层组件只依赖 `lib/data.ts` 导出的接口，不直接引用 `data/*` 文件。
   未来若替换为 API / 数据库 / JSON 文件等动态数据源，只需修改 `lib/data.ts`，
   无需改动任何组件。

```typescript
// 上层组件使用方式（示例）
import { getEventById, getFactionsByRegion } from '@/lib/data';

const event = getEventById('may16-notice-1966');
const factions = getFactionsByRegion('shanghai');
```

> 当前 `lib/data.ts` 尚未实现（计划在后续 Task 中创建）。
> 在此之前，组件可直接 import `data/*` 进行开发，但需在代码中标注
> `// TODO: 替换为 lib/data.ts 访问层`。
