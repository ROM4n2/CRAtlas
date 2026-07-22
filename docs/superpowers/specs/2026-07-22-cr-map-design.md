# CRAtlas — 文化大革命时期派系势力可视化平台

> 设计规范文档 · 2026-07-22

## 0. 项目概述

### 0.1 目标

构建一个交互式网站，可视化展示中华人民共和国 1966–1976 年（十年文化大革命）期间造反派与保皇派之间的势力演变、关键事件、重要人物及其关系网络。

### 0.2 意识形态立场

- 本项目以**马列毛主义**为基本编纂立场
- 明确区分"立场"与"史料"：立场是编纂视角和组织框架，史料是客观来源
- 所有信息标注史料出处和类型，用户可自行判断
- 不迎合西方资本主义/社民主义叙事，也不属于中国特色社会主义框架
- 详细的史料冲突处理策略和编纂立场边界见 §0.4

### 0.3 目标受众

- **主要**：马列毛主义者、进步人士、历史自学者
- **次要**：专业研究者（通过史料标注满足其需求）
- 设计为分层体验——概览模式给初学者，深度信息给研究者

### 0.4 史料冲突处理策略

> 当同一事件/人物/派系在不同史料中存在不同说法时，按以下规则处理：

**处理规则（优先级从高到低）**：

1. **多说并存**：当两种及以上来源对同一事实有冲突定性时，详情页并列呈现各方说法，标注各自来源。
2. **学术共识优先**：当学术研究与官方档案冲突时，优先呈现学术研究成果，同时标注官方说法。
3. **编纂立场兜底**：当史料完全缺失或冲突无法调和时，编纂立场介入判断，但必须在 `note` 字段明确标注"此处为编纂方判断"。
4. **禁止隐匿冲突**：不允许只呈现与编纂立场一致的史料而忽略其他说法。

**编纂立场介入边界**：

| 环节 | 优先方 | 说明 |
|------|--------|------|
| 分类框架（rebel/conservative/military） | 立场 | 这是编纂视角的核心组织逻辑 |
| 事件选择（收录哪些事件） | 立场 | 基于马列毛主义视角判断重要性 |
| 日期、地点、人名 | 史料 | 严格按史料，有冲突则多说并存 |
| 事件描述 | 史料为主 | 基于史料，立场体现在选材和编排 |
| 派系定性 | 史料+立场 | 优先史料，缺失时立场兜底并标注 |

**争议标注机制**：

在事件/人物/派系详情页，当存在史料冲突时，显示显式标注：

```
⚠️ 史料冲突：关于此事存在多种说法
- 说法 A（来源：xxx）
- 说法 B（来源：xxx）
```

### 0.5 核心功能

| 功能 | 描述 |
|------|------|
| 时间轴 | 1966–1976 年可控时间轴，支持播放/拖拽/范围选择 |
| 地图视图 | 中国省级地图，按派系势力着色，标注关键事件 |
| 关系图 | 知识图谱展示人物-派系隶属、事件因果、派系互动、人物社交 |
| 详情页 | 事件/人物/派系的详细信息，含史料出处 |
| 搜索 | 全局搜索人物/事件/派系 |
| 交流（后期） | 评论、笔记、内容贡献 |

### 0.6 部署约束

- **零服务器**：纯静态站点，托管 GitHub Pages
- **零成本**：无需购买服务器或数据库
- 评论通过 Giscus（GitHub Discussions 驱动）
- 笔记通过浏览器 localStorage
- 内容贡献通过 GitHub Pull Request

---

## 1. 技术栈

| 模块 | 选型 | 理由 |
|------|------|------|
| 框架 | **Next.js 14+ (App Router)** | 静态导出成熟、路由简洁、SSG 支持好 |
| 语言 | **TypeScript** | 数据结构复杂，类型安全必要 |
| 地图 | **ECharts** (echarts + echarts-for-react) | 中国省级地图内置、省份着色成熟、事件散点标注方便 |
| 关系图 | **Cytoscape.js** (react-cytoscapejs) | 专业图谱库，四种关系类型都能表达，布局算法丰富 |
| 时间轴 | **自定义 React 组件**（不依赖重型库，纯 React + CSS） | 可控性最强，与项目风格统一，无额外依赖 |
| 样式 | **Tailwind CSS** | 快速开发、响应式 |
| 数据 | **TypeScript/JSON 文件** | 编译期类型检查、版本控制友好 |
| 部署 | `next export` → **GitHub Pages** | 纯静态、免费 |
| 评论（后期） | **Giscus** | 基于 GitHub Discussions，零服务器 |
| 状态管理 | **Zustand** | 轻量，管理全局时间轴状态 |

---

## 2. 项目结构

```
CRAtlas/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根布局（导航栏、全局状态）
│   ├── page.tsx                  # 首页（概览/入口）
│   ├── globals.css               # 全局样式
│   ├── map/
│   │   └── page.tsx              # 地图视图
│   ├── timeline/
│   │   └── page.tsx              # 时间轴视图
│   ├── graph/
│   │   └── page.tsx              # 关系图视图
│   ├── event/
│   │   └── [id]/page.tsx         # 事件详情（动态路由）
│   ├── person/
│   │   └── [id]/page.tsx         # 人物详情（动态路由）
│   ├── faction/
│   │   └── [id]/page.tsx         # 派系详情（动态路由）
│   └── about/
│       └── page.tsx              # 关于页
├── components/                   # 可视化与 UI 组件
│   ├── layout/
│   │   ├── Navbar.tsx            # 顶部导航栏
│   │   └── Footer.tsx            # 页脚
│   ├── map/
│   │   ├── ChinaMap.tsx          # ECharts 中国地图（核心）
│   │   ├── MapLegend.tsx         # 地图图例
│   │   └── EventPopup.tsx        # 事件弹出卡片
│   ├── graph/
│   │   ├── FactionGraph.tsx      # Cytoscape 关系图（核心）
│   │   ├── GraphFilter.tsx       # 筛选面板
│   │   └── NodeDetail.tsx        # 节点详情侧边栏
│   ├── timeline/
│   │   ├── TimeAxis.tsx          # 时间轴控制条（核心）
│   │   └── EventCard.tsx         # 事件卡片
│   ├── ui/
│   │   ├── SearchModal.tsx       # 全局搜索弹窗 (Cmd+K)
│   │   ├── SourceList.tsx        # 史料出处列表
│   │   └── Tag.tsx               # 标签组件
│   └── comments/
│       └── GiscusComments.tsx    # Giscus 评论（Phase 4，每实体一独立评论区）
├── data/                         # 数据层（TypeScript 文件）
│   ├── events.ts                 # 事件数据集
│   ├── people.ts                 # 人物数据集
│   ├── factions.ts               # 派系数据集
│   ├── regions.ts                # 地区数据集
│   ├── relationships.ts          # 关系数据集
│   └── regionControls.ts         # 地区控制时间线（地图着色核心数据）
├── lib/
│   ├── types.ts                  # TypeScript 类型定义
│   ├── data.ts                   # 数据查询/过滤函数
│   └── store.ts                  # Zustand 全局状态
├── public/
│   └── china.json                # 中国地图 GeoJSON（运行时从 DataV 获取并缓存，离线备用）
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions 自动部署
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-07-22-cr-map-design.md  # 本文档
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── CLAUDE.md                     # 项目 AI 开发指令
```

---

## 3. 数据模型

### 3.1 核心类型定义（lib/types.ts）

```typescript
/**
 * 派系类型：造反派 / 保皇派 / 军方 / 其他
 * 这是本项目的核心分类维度
 */
type FactionType = 'rebel' | 'conservative' | 'military' | 'other';

/**
 * 派系 — 造反派或保皇派组织
 */
interface Faction {
  id: string;                       // 唯一标识，如 "capital-three-headquarters"
  name: string;                     // 名称，如 "首都三司"
  factionType: FactionType;         // 派系类型
  foundedDate: string;              // 成立日期 ISO "1966-05-24"
  dissolvedDate?: string;           // 解散日期（可选）
  parentFactionId?: string;         // 上级/母组织 ID
  regionIds: string[];              // 活动地区 ID 列表
  description: string;              // 详细描述
  sources: Source[];                // 史料出处
}

/**
 * 人物 — 文革期间的关键人物
 */
interface Person {
  id: string;                       // 唯一标识，如 "kuai-dafu"
  name: string;                     // 姓名，如 "蒯大富"
  birthYear?: number;
  deathYear?: number;
  biography: string;                // 生平简介
  affiliations: Affiliation[];      // 带时间段的完整隶属历史（唯一数据源）
  sources: Source[];
}

/**
 * 带时间段的隶属关系 — 同一人在不同时期可属不同派系
 */
interface Affiliation {
  factionId: string;                // 派系 ID
  startDate: string;                // 开始日期
  endDate?: string;                 // 结束日期（可选，undefined 表示至今）
  role: string;                     // 角色，如 "司令"、"成员"、"顾问"
}

/**
 * 事件 — 文革期间的关键历史事件
 */
interface Event {
  id: string;                       // 唯一标识，如 "feb-outline-1966"
  title: string;                    // 标题，如 "《关于当前学术讨论的汇报提纲》"
  alias?: string[];                 // 别名，如 ["二月提纲"]
  date: string;                     // 发生日期 ISO "1966-02-01"
  endDate?: string;                 // 结束日期（跨天事件）
  location: {
    regionId: string;               // 地区 ID，如 "beijing"
    specific?: string;              // 具体地点，如 "北京钓鱼台"
  };
  description: string;              // 详细描述
  participants: string[];           // 参与人物 ID
  factionIds: string[];             // 相关派系 ID
  relatedEventIds: string[];        // 因果关联事件 ID
  significance: 'major' | 'significant' | 'minor';  // 重要性等级
  sources: Source[];
}

/**
 * 地区 — 行政区划
 */
interface Region {
  id: string;                       // 唯一标识，同 ECharts 地图名，如 "beijing"
  name: string;                     // 名称，如 "北京"
  level: 'province' | 'city' | 'district';
  parentId?: string;                // 上级地区 ID
}

/**
 * 关系类型 — 关系图中的四种边
 */
type RelationshipType =
  | 'membership'          // 人物→派系 隶属关系
  | 'causality'           // 事件→事件 因果关系
  | 'faction-interaction' // 派系→派系 对抗/合作/分裂/合并
  | 'social';             // 人物→人物 私人/工作/政治联盟

/**
 * 关系 — 用于关系图的边
 */
interface Relationship {
  id: string;
  type: RelationshipType;
  from: string;                     // 源节点 ID
  to: string;                       // 目标节点 ID
  fromType: 'person' | 'event' | 'faction';
  toType: 'person' | 'event' | 'faction';
  startDate: string;
  endDate?: string;
  description: string;              // 关系描述
  sources: Source[];
}

/**
 * 史料出处类型
 */
type SourceType =
  | 'official'       // 官方档案/中央文件
  | 'academic'       // 学术研究成果
  | 'media'          // 媒体报道（如《人民日报》原件）
  | 'memoir'         // 当事人回忆录
  | 'local-gazetteer'; // 地方志

/**
 * 史料出处 — 每条信息必须附带
 */
interface Source {
  title: string;                    // 文献标题
  type: SourceType;                 // 史料类型
  date?: string;                    // 文献日期
  url?: string;                     // 在线链接（可选）
  note?: string;                    // 补充说明
}

/**
 * 地区控制状态 — 某时间点某省被哪个派系控制
 */
interface RegionControl {
  factionId: string;                // 控制派系 ID
  strength: number;                 // 控制强度 0-1
}

type RegionControlMap = Record<string, RegionControl>;

/**
 * 关系图节点（Cytoscape 适配）
 */
interface GraphNode {
  id: string;
  label: string;
  type: 'person' | 'event' | 'faction';
  factionType?: FactionType;        // 仅派系节点
  color: string;
  shape: string;
}

/**
 * 关系图边（Cytoscape 适配）
 */
/** Cytoscape 边样式（仅本项目用到的属性子集） */
interface CytoscapeEdgeStyle {
  'line-color'?: string;
  'line-style'?: 'solid' | 'dashed' | 'dotted';
  'line-width'?: number;
  'target-arrow-shape'?: 'triangle' | 'none';
  'source-arrow-shape'?: 'triangle' | 'none';
  'curve-style'?: 'bezier' | 'unbundled-bezier';
  'arrow-scale'?: number;
  'opacity'?: number;
}

interface GraphEdge {
  id: string;
  source: string;                   // 源节点 ID
  target: string;                   // 目标节点 ID
  label: string;
  type: RelationshipType;
  style: CytoscapeEdgeStyle;        // Cytoscape 样式属性（类型安全）
}

/**
 * 时间轴关键标记
 */
interface KeyMarker {
  date: string;
  label: string;
  eventId: string;
}

/**
 * 搜索结果项
 */
interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'faction';
  name: string;
  description: string;
}
```

### 3.2 字段使用边界

**方案 A 选定：删除 `factionIds` 冗余字段，消除不一致根因。**

`affiliations` 是人物派系隶属的**唯一数据源**。需要"当前所属"时，通过 `lib/data.ts` 中的工具函数推导：

```typescript
/** 获取人物在指定日期的派系隶属（默认今天） */
function getCurrentAffiliations(person: Person, date?: string): Affiliation[];

/** 获取人物在指定日期的派系 ID 列表 */
function getCurrentFactionIds(person: Person, date?: string): string[];
```

**禁止**：任何组件不得期望 `Person` 上有 `factionIds` 字段。所有消费方必须通过工具函数查询。

### 3.3 数据设计原则

1. **ID 引用，不嵌套**：所有实体通过 `id` 字符串引用，不嵌套对象——方便独立更新和查询
2. **来源内嵌**：`sources` 字段内嵌在每个实体中——实现"每条信息都有出处"
3. **时间段支持**：`Affiliation` 和 `Relationship` 都带时间段——支持历史演变表达
4. **类型安全**：所有数据文件导出时符合 TypeScript 类型，编译期检查

### 3.4 地区控制数据（regionControls）

#### 3.4.1 数据文件：`data/regionControls.ts`

地图"省份着色"的核心数据源。每条记录描述某省在某时间段被哪个派系控制。

```typescript
/** 地区控制状态 */
type ControlStatus = 'controlled' | 'contested' | 'transitional' | 'no-data';
// controlled = 单一派系主导; contested = 多方割据/争夺中;
// transitional = 权力过渡期; no-data = 无足够史料判断

/** 单条地区控制记录 */
interface RegionControlRecord {
  regionId: string;                 // 地区 ID
  startDate: string;                // 控制起始日期
  endDate?: string;                 // 控制结束日期（undefined 表示延续到最后）
  status: ControlStatus;            // 控制状态
  factions: {                       // 参与派系及其权重（strength 总和为 1）
    factionId: string;
    strength: number;               // 0-1，控制强度/势力占比
  }[];
  note?: string;                    // 判断依据说明
  sources: Source[];                // 史料出处
}
```

#### 3.4.2 "控制"的操作性定义

> 判定"某派系在某时段控制某省"的可操作判据（满足两条及以上即认定）：

1. **权力机构**：省级革命委员会、党委、军管会的主要负责人来自该派系
2. **组织存在**：该派系在该省有大规模群众组织（非个别小组）
3. **舆论控制**：该省主要报刊/电台由该派系主导
4. **武装力量**：该省军区/军分区支持该派系（适用于军方控制）

> 史料冲突时：优先采信官方档案和学术研究，回忆录仅作辅助。判断依据写入 `note` 字段。

#### 3.4.3 `strength` 量化规则

| strength 范围 | 含义 |
|---------------|------|
| 0.8 - 1.0 | 稳固控制：权力机构、组织、舆论均在该派系手中 |
| 0.5 - 0.7 | 主导但不稳固：有对立派系存在但不足以挑战 |
| 0.3 - 0.4 | 弱势存在：有组织活动但未掌权 |
| contested 状态 | 多个派系 strength 相近（差值 < 0.2），标注为"争夺中" |

#### 3.4.4 史料可获得性风险与预研计划 ⚠️ 最高优先级风险

> **核心风险**：省级权力交替的派系归属在公开史料中既稀缺又高度争议。地图可视化的前提依赖于这些数据的可靠性。

**Phase 0 可行性预研（必须完成，否则 Phase 1 不启动）**：

选 5 个代表性省份（北京、上海、辽宁、广东、四川），实际查阅史料，尝试构建 1966-1976 逐季/逐年的控制时间线。预研结果写入 `docs/superpowers/specs/feasibility-spike.md`。

**降级方案**（按触发条件启用）：

| 条件 | 降级方案 |
|------|----------|
| 能为 ≥20 个省构建时间线 | 正常方案：全地图省级着色 |
| 能为 10-19 个省构建时间线 | 降级 A：有数据的省份着色，其余标"无数据" |
| 能为 <10 个省构建时间线 | 降级 B：只标注事件发生地（散点），不填充全省颜色 |
| 省级数据完全不可得 | 降级 C：粒度放宽到"大区"（东北/华北/华东/中南/西南/西北）|

**触发规则**：Phase 0 第 1 周末评估预研结果，由项目组决定启用哪套方案。

### 3.5 地图 GeoJSON 来源

ECharts 5.x 起不再内置中国地图 GeoJSON。本项目地图数据来源：

- **方案**：使用阿里云 DataV.GeoAtlas（`https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json`）提供中国全境 GeoJSON，按省份 `adcode` 获取省级边界
- **备选**：使用 Natural Earth 数据或清华大学 GIS 数据
- **注意**：地图绘制须包含台湾、南海诸岛等中国领土（省略图），这是政治正确的必要要求
- **加载策略**：**构建时一次性下载到 `public/china.json`，纯静态引用**。不依赖运行时网络获取（与 §0.6 "零服务器" 约束一致，GitHub Pages 无 serverless 能力）
- **降级策略**：如果构建时下载失败，使用 `npm postinstall` 脚本重试；如果运行时 `china.json` 加载失败，显示文字提示 + 事件列表（不白屏）

### 3.5 示例数据（Phase 0 填充）

至少包含：
- **事件**：二月提纲(1966.02)、五一六通知(1966.05)、八届十一中全会(1966.08)、上海一月风暴(1967.01)、二月逆流(1967.02)、武汉七二〇事件(1967.07)、上山下乡运动开始(1968)、林彪事件(1971.09)、四五运动(1976.04)、粉碎四人帮(1976.10)
- **人物**：毛泽东、林彪、江青、张春桥、姚文元、王洪文、陈伯达、康生、戚本禹、蒯大富、谭力夫
- **派系**：中央文革小组、首都三司、上海工人革命造反派联合司令部、全国红色造反派联合委员会

---

## 4. 可视化组件详细设计

### 4.1 地图组件（components/map/ChinaMap.tsx）

**库**：ECharts + echarts-for-react

**职责**：渲染中国省级地图，按派系势力着色，标注事件

**Props**：
```typescript
interface ChinaMapProps {
  currentDate: string;              // 当前时间轴日期
  events: Event[];                  // 当前可见事件
  regionControl: RegionControlMap;  // 地区控制状态
  onRegionClick: (regionId: string) => void;
  onEventClick: (eventId: string) => void;
}
```

**渲染逻辑**：
1. 注册 ECharts 中国地图 (`echarts.registerMap('china', geoJson)`)
2. `geo` 组件：省份底图，`itemStyle.areaColor` 根据 `regionControl[regionId].factionId` 着色
3. `series.scatter`：事件散点，`symbolSize` 根据 `significance` 分级（major=12, significant=8, minor=5）
4. `series.effectScatter`：重大事件带涟漪效果

**颜色方案**：
| 派系类型 | 颜色 |
|----------|------|
| 造反派 (rebel) | `#DC2626` (红) |
| 保皇派 (conservative) | `#2563EB` (蓝) |
| 军方 (military) | `#CA8A04` (黄) |
| 争夺中 | `#9333EA` (紫) |
| 无数据 | `#9CA3AF` (灰) |

**交互**：
- 悬停省份 → Tooltip 显示省名 + 当前派系 + 事件数
- 点击省份 → `onRegionClick` → 跳转该省事件列表
- 点击事件散点 → `onEventClick` → 弹出 `EventPopup` 卡片

### 4.2 关系图组件（components/graph/FactionGraph.tsx）

**库**：Cytoscape.js + react-cytoscapejs

**职责**：渲染知识图谱，展示四种关系类型

**Props**：
```typescript
interface FactionGraphProps {
  nodes: GraphNode[];               // 人物/事件/派系节点
  edges: GraphEdge[];               // 关系边
  activeTypes: RelationshipType[];  // 当前显示的关系类型
  layout: 'cose' | 'dagre' | 'concentric';
  onNodeClick: (nodeId: string, nodeType: string) => void;
}
```

**节点样式**：
| 节点类型 | 形状 | 颜色 |
|----------|------|------|
| 人物 (person) | 圆形 | `#3B82F6` |
| 事件 (event) | 菱形 | `#F59E0B` |
| 派系-造反派 (faction:rebel) | 方形 | `#DC2626` |
| 派系-保皇派 (faction:conservative) | 方形 | `#2563EB` |
| 派系-军方 (faction:military) | 方形 | `#CA8A04` |

**边样式**：
| 关系类型 | 线型 | 箭头 |
|----------|------|------|
| 隶属 (membership) | 实线 | 有 |
| 因果 (causality) | 虚线 | 有 |
| 派系互动 (faction-interaction) | 粗实线 | 双向（数据层用两条有向边 A→B + B→A 表示，查询函数自动合并为一条双向箭头渲染） |
| 社交 (social) | 点线 | 无 |

**布局算法**：
- `cose`（力导向）：默认，适合看整体网络结构
- `dagre`（层级）：适合看因果链和隶属层级
- `concentric`（同心圆）：适合看核心-边缘关系

**交互**：
- 点击节点 → `onNodeClick` → 侧边栏显示详情
- 拖拽节点 → 手动调整
- 滚轮缩放 / 拖拽平移
- 搜索框输入 → 高亮定位节点
- 筛选面板 → 按类型/派系/时间范围过滤

**`faction-interaction` 渲染实现**：
- 数据层：双向互动存储为两条有向 `Relationship`（A→B 和 B→A），`description` 相同
- 查询层：`lib/data.ts` 的 `getRelationships()` 检测到同 `description` 的配对边时，自动合并为一条 Cytoscape 边
- 渲染层：Cytoscape 使用 `curve-style: bezier` + 同时设置 `target-arrow` 和 `source-arrow` 实现双向箭头
- `social` 类型同理：私人关系也是无向的，用两条有向边表示，渲染时去掉箭头

### 4.3 时间轴组件（components/timeline/TimeAxis.tsx）

**库**：自定义 React 组件（不依赖重型库）

**职责**：全局时间控制，联动地图和关系图

**Props**：
```typescript
interface TimeAxisProps {
  startDate: string;                // "1966-01-01"
  endDate: string;                  // "1976-10-31"
  currentDate: string;              // 当前选中日期
  isPlaying: boolean;               // 是否正在播放
  speed: number;                    // 播放速度（天/秒）
  keyMarkers: KeyMarker[];          // 关键事件标记
  onDateChange: (date: string) => void;
  onPlayToggle: () => void;
  onSpeedChange: (speed: number) => void;
}
```

**功能**：
- 横向时间轴，1966–1976 年
- 支持按月/季/年缩放
- 播放/暂停按钮 + 速度调节（1x/2x/4x）
- 关键事件位置标记（小三角 + 标签）
- 拖拽选择时间范围
- 当前日期指示器（垂直线）

**`dateRange` 语义定义**：

`dateRange` 是**当前视图的时间过滤窗口**，影响所有三个视图：

| 视图 | `dateRange` 的作用 |
|------|-------------------|
| 地图 | 显示该时间范围内发生的所有事件散点（累积显示） |
| 关系图 | 只显示在该时间范围内生效的关系（`startDate` ≤ range 结束 且 `endDate` ≥ range 开始） |
| 时间轴 | 播放范围限制在此区间内 |

> 当 `dateRange` 为 `null` 时，表示"全时间范围"（1966-01-01 至 1976-10-31），不进行过滤。

**播放速度基准**：`1x = 30 天/秒`（即 1 秒走一个月，全 10 年约 120 秒播完）。`speed` 换算公式：`实际天/秒 = speed × 30`。

**全局状态（Zustand store.ts）**：
```typescript
interface TimeState {
  currentDate: string;              // 当前选中日期（播放头位置）
  isPlaying: boolean;               // 是否正在播放
  speed: number;                    // 倍率（1x/2x/4x），实际天/秒 = speed × 30
  dateRange: [string, string] | null;  // 时间过滤窗口（null = 全范围）
  setDate: (date: string) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setDateRange: (range: [string, string] | null) => void;
}
```

---

## 5. 页面结构

### 5.1 路由清单

| 路由 | 页面文件 | 功能描述 |
|------|----------|----------|
| `/` | `app/page.tsx` | 首页：项目简介、三大视图入口、时间轴概览 |
| `/map` | `app/map/page.tsx` | 地图视图：中国地图 + 时间轴 + 事件侧边栏 |
| `/timeline` | `app/timeline/page.tsx` | 时间轴视图：横向时间轴 + 事件卡片流 + 筛选器 |
| `/graph` | `app/graph/page.tsx` | 关系图视图：Cytoscape 图谱 + 筛选面板 + 详情侧边栏 |
| `/event/[id]` | `app/event/[id]/page.tsx` | 事件详情：全文、参与者、相关事件、史料出处 |
| `/person/[id]` | `app/person/[id]/page.tsx` | 人物详情：生平、派系隶属时间线、参与事件、社交关系 |
| `/faction/[id]` | `app/faction/[id]/page.tsx` | 派系详情：概述、组织演变、成员、控制地区 |
| `/about` | `app/about/page.tsx` | 关于页：项目说明、立场声明、史料来源说明、使用指南 |

### 5.2 分层体验设计

每个详情页提供**概览层**和**深度层**，通过"展开更多"按钮切换。

| 页面 | 概览层（默认，面向初学者） | 深度层（展开后，面向研究者） |
|------|--------------------------|---------------------------|
| 事件详情 | 一句话概要 + 时间地点 + 3 个关键影响 | 全文描述 + 所有参与者 + 完整史料出处 + 学术争议标注 |
| 人物详情 | 头像 + 一句话定位 + 派系标签 | 完整生平 + 派系隶属时间线 + 参与事件列表 + 社交关系 |
| 派系详情 | 名称 + 类型标签 + 一句话概述 | 组织演变时间线 + 全部成员 + 控制地区变化 + 史料出处 |

**切换机制**：页面底部固定"展开深度信息"按钮，点击后展开深度层内容（平滑动画），按钮变为"收起"。状态保存在组件本地（无需全局状态）。

**首页分层**：首页默认显示概览模式（三大视图入口 + 简短介绍），点击"深入了解"展开项目背景、方法论、史料说明。

### 5.3 用户流程

```
首页 (/)
  │
  ├── ──→ 地图视图 (/map)
  │         ├── 点击省份 → 该省事件列表
  │         └── 点击事件散点 → 事件详情 (/event/[id])
  │                              └── 点击参与者 → 人物详情 (/person/[id])
  │
  ├── ──→ 时间轴视图 (/timeline)
  │         ├── 拖拽/播放时间 → 事件卡片更新
  │         └── 点击事件卡片 → 事件详情 (/event/[id])
  │
  └── ──→ 关系图视图 (/graph)
            ├── 搜索人物 → 高亮节点 → 点击 → 人物详情
            └── 按类型筛选 → 查看因果链/隶属网
```

### 5.4 全局元素

- **顶部导航栏**（`Navbar.tsx`）：Logo + 三大视图切换链接 + 搜索按钮 (Cmd+K) + 关于页链接
- **时间轴状态条**（地图/时间轴页面底部）：全局时间控制条
- **搜索弹窗**（`SearchModal.tsx`）：Cmd+K 触发，搜索人物/事件/派系，回车跳转详情

### 5.5 关于页内容（/about）

1. **项目说明**：本项目是什么、为谁而作
2. **意识形态立场声明**：
   - 以马列毛主义为编纂立场
   - 区分编纂视角与史料来源
   - 不声称"价值中立"，但承诺史料准确
3. **史料来源说明**：
   - 使用的史料类型（官方档案、学术研究、回忆录、地方志等）
   - 史料可靠性分级说明
   - 主要参考书目
4. **使用指南**：如何使用三大视图、如何阅读关系图
5. **贡献指南**：
   - **低门槛入口（推荐）**：每个详情页底部"建议修正"按钮 → 跳转 GitHub Issues 预填模板（用户只需写文字，不用懂 Git）
   - **正式入口**：GitHub Pull Request（适合熟悉 Git 的贡献者）
   - **Issue 模板**包含：问题类型（修正/补充/新增）、涉及实体 ID、建议内容、史料来源

---

## 6. 数据流架构

```
┌─────────────────────────────────────────────────────┐
│                    用户交互                           │
│              (拖拽时间轴 / 点击地图 / 筛选图谱)         │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Zustand Store (lib/store.ts)            │
│  ┌─────────────────────────────────────────────┐    │
│  │  currentDate: "1966-08-12"                  │    │
│  │  isPlaying: true                            │    │
│  │  activeRelationTypes: ["membership", ...]   │    │
│  │  selectedRegion: "beijing"                  │    │
│  └─────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│           数据查询层 (lib/data.ts)                    │
│                                                      │
│  getEventsByDate(date) → Event[]                    │
│  getRegionControl(date) → RegionControlMap          │
│  getRelationships(filter) → Relationship[]         │
│  getCurrentFactionIds(person, date) → string[]      │
│  search(query) → SearchResult[]                     │
│   排序规则: 精确匹配 > 前缀匹配 > 子串匹配;          │
│   同等级内按重要性 major > significant > minor       │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              数据源 (data/*.ts)                       │
│  events.ts │ people.ts │ factions.ts │ relationships.ts │
└─────────────────────────────────────────────────────┘
```

**关键原则**：
- 单一数据源：所有组件从 `data/*.ts` 读取
- 状态集中：时间轴状态在 Zustand store，组件订阅
- 查询封装：所有数据查询逻辑在 `lib/data.ts`，组件不直接操作数据

---

## 7. 分阶段开发路线图

### Phase 0：基础设施（第 1 周）

**目标**：项目骨架 + 部署流水线 + 示例数据

- [ ] Next.js + TypeScript + Tailwind 项目初始化
- [ ] ECharts / Cytoscape 集成验证（能渲染空白图表）
- [ ] GitHub 仓库创建 + GitHub Actions 自动部署到 Pages
- [ ] `lib/types.ts` 完成全部类型定义
- [ ] `data/*.ts` 填充示例数据（3-5 事件、5-8 人物、3-4 派系）
- [ ] `lib/data.ts` 基础查询函数
- [ ] `lib/store.ts` Zustand 时间轴状态
- [ ] `CLAUDE.md` 项目 AI 开发指令

**验收标准**：
1. `npm run build && next export` 成功，GitHub Pages 能访问空白首页
2. **ECharts 能成功注册并渲染中国地图**（省份轮廓正确显示，哪怕无数据着色）
3. **Cytoscape 能在 Next.js App Router 中正确初始化**并渲染 10 个测试节点（验证 SSR 兼容性）
4. **Zustand store 的 `currentDate` 能在两个组件间同步**（如时间轴组件改日期，地图组件收到更新）
5. **可行性预研完成**：输出 `docs/superpowers/specs/feasibility-spike.md`，决定地图着色方案（正常/降级 A/B/C）

> 第 2-5 项是 Phase 1 的地基，Phase 0 不验证，Phase 1 会踩坑。

### Phase 1：核心可视化（第 2-3 周）

**目标**：地图 + 时间轴 + 联动

- [ ] `ChinaMap.tsx`：中国地图渲染 + 省份着色 + 事件散点
- [ ] `TimeAxis.tsx`：基础时间轴 + 播放控制
- [ ] 时间轴 ↔ 地图联动（拖动时间轴，地图重绘）
- [ ] `MapLegend.tsx` 图例
- [ ] `EventPopup.tsx` 事件弹出卡片
- [ ] 首页 + 导航栏 + 关于页（静态内容）
- [ ] `/map` 页面完整功能

**验收标准**：地图上能看到示例事件标注，拖动时间轴地图颜色和标注变化

### Phase 2：关系图（第 4 周）

**目标**：知识图谱 + 筛选

- [ ] `FactionGraph.tsx`：Cytoscape 图谱渲染
- [ ] 四种关系类型的节点/边样式
- [ ] `GraphFilter.tsx`：按类型/派系/时间筛选
- [ ] 布局切换（cose/dagre/concentric）
- [ ] `NodeDetail.tsx`：节点详情侧边栏
- [ ] `/graph` 页面完整功能

**验收标准**：能查看人物-派系隶属网络，能筛选关系类型，能切换布局

### Phase 3：详情页与内容填充（第 5-6 周）

**目标**：完整浏览体验 + 内容扩充

- [ ] `/event/[id]` 事件详情页
- [ ] `/person/[id]` 人物详情页（含派系隶属时间线）
- [ ] `/faction/[id]` 派系详情页
- [ ] `/timeline` 时间轴视图页面
- [ ] 内容扩充：每年至少 5-10 个关键事件
  - **规模估算**：Phase 3 完成时预期——事件 50-100 个、人物 30-50 个、派系 15-25 个、关系 100-200 条
  - **节点总量**：关系图约 100-200 个节点 + 100-200 条边，Cytoscape Canvas 渲染可轻松应对，**无需虚拟滚动**
  - **性能判断**：此数据量级不构成性能风险，§10 "数据量大导致性能问题" 降级为低优先级
- [ ] `SearchModal.tsx` 全局搜索
- [ ] `SourceList.tsx` 史料出处展示组件

**验收标准**：每个详情页信息完整、有出处、有关联链接；搜索能跳转

### Phase 4：交流功能（第 7-8 周）

**目标**：社区互动

- [ ] `GiscusComments.tsx` 评论集成
  - **评论粒度**：每个实体（事件/人物/派系）一个独立评论区
  - **Giscus 配置**：使用 GitHub Discussions 的 `pathname` 匹配（`window.location.pathname`），每个页面的 pathname 唯一对应一个 Discussion
  - **分类**：在 Discussions 中创建"事件讨论"、"人物讨论"、"派系讨论"三个分类
- [ ] 笔记/标注功能（localStorage）
- [ ] 内容贡献指南 + PR 模板 + **低门槛 Issue 入口**（见 P2.4）
- [ ] `/about` 页完善贡献说明

**验收标准**：用户能在事件页评论，能做个人笔记

### Phase 5：打磨与发布（第 9-10 周）

**目标**：生产就绪

- [ ] 性能优化（大数据量渲染、懒加载）
- [ ] 移动端适配
- [ ] 无障碍（ARIA、键盘导航）
- [ ] 内容审校（史料准确性）
- [ ] 404 页面
- [ ] SEO meta 标签
- [ ] 正式发布

---

## 8. 开发规范

### 8.1 工程架构与模块分层

项目遵循清晰的职责分层，禁止跨层直接调用：

| 层级 | 目录 | 职责 | 依赖规则 |
|------|------|------|----------|
| **核心层 (Core/Domain)** | `lib/types.ts` | 定义实体、值对象、核心业务类型 | 不依赖任何框架和外部基础设施 |
| **应用层 (Application)** | `lib/data.ts`, `lib/store.ts` | 编排数据查询、状态管理、业务用例 | 仅依赖核心层 |
| **接口层 (Interface)** | `app/` (pages + components) | 处理页面路由、用户交互、可视化渲染 | 调用应用层 |
| **基础设施层 (Infrastructure)** | `data/*.ts` | 实现数据源（文件读取、数据结构） | 实现核心层定义的类型约束 |

**调用方向**：接口层 → 应用层 → 核心层 ← 基础设施层

> 组件不允许直接 `import` 数据文件，必须通过 `lib/data.ts` 的查询函数间接访问。

### 8.2 命名规范

| 类别 | 规范 | 示例 |
|------|------|------|
| **文件夹** | `kebab-case` | `user-profile/`, `event-detail/` |
| **文件** | `kebab-case`（PascalCase 用于组件文件） | `china-map.tsx`, `time-axis.tsx` |
| **类/接口/类型** | `PascalCase`，接口**禁止**加 `I` 前缀 | `Person`, `Relationship`, `GraphNode` |
| **变量/函数/方法** | `camelCase` | `getCurrentFactionIds`, `startDate` |
| **布尔值** | `is`/`has`/`should` 前缀 | `isPlaying`, `hasData`, `shouldRender` |
| **常量** | `UPPER_SNAKE_CASE`（仅全局不变常量） | `MAX_SPEED`, `DEFAULT_DATE` |
| **Props 接口** | `组件名 + Props` | `ChinaMapProps`, `TimeAxisProps` |

### 8.3 代码注释规范

注释遵循 **"Why > What"** 原则——解释背后意图而非复述代码。

#### 8.3.1 文件头注释

每个核心模块、组件、工具函数的源文件顶部必须包含：

```typescript
/**
 * @file    china-map.tsx
 * @brief   中国省级地图可视化组件，按派系势力着色并标注事件散点。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */
```

#### 8.3.2 函数/方法注释

所有对外暴露的公共方法、复杂私有方法必须使用 TSDoc 标准：

```typescript
/**
 * 获取指定日期的地区控制状态，用于地图省份着色。
 *
 * @param date - ISO 格式日期字符串 (YYYY-MM-DD)
 * @returns 地区控制映射表，key 为 regionId，value 为控制派系和强度
 * @throws {Error} 当 date 格式非法或超出 1966-1976 范围时抛出
 * @example
 * const control = getRegionControl('1967-01-01');
 * // { beijing: { factionId: 'xxx', strength: 0.8 }, ... }
 */
function getRegionControl(date: string): RegionControlMap;
```

必须包含：`@param`（含类型和用途）、`@returns`、`@throws`（若适用）、`@example`（推荐）。

#### 8.3.3 行内注释

- **复杂逻辑**：在难以理解的算法、正则、状态机前，用 `//` 解释业务背景或边界条件
- **TODO/FIXME**：必须附上负责人和日期，格式：`// TODO(author 2026-07-22): 描述`
- **禁止**：对显而易见的代码添加注释（如 `const count = 0; // 初始化 count 为 0`）

#### 8.3.4 各层注释重点

| 文件类型 | 注释重点 |
|----------|----------|
| 数据文件 (`data/*.ts`) | 数据来源、覆盖范围、更新方式、史料出处 |
| 组件文件 (`components/**/*`) | 组件职责、Props 接口、使用方式、渲染逻辑 |
| 工具函数 (`lib/data.ts`) | 功能、参数、返回值、使用示例、边界条件 |
| 页面文件 (`app/**/page.tsx`) | 页面功能、数据依赖、路由参数 |

### 8.4 数据录入规范

- 每条事件必须有至少一个 `sources` 条目
- 日期格式统一 ISO 8601 (`YYYY-MM-DD`)
- ID 命名规则：小写 + 连字符，如 `feb-outline-1966`
- 新数据提交需通过 PR，附带史料来源说明

### 8.5 Git 提交与版本管理

严格遵循 **Conventional Commits（约定式提交）** 规范：

**格式**：`[Phase X] type(scope): subject`（subject 首字母小写，不加句号）

**type 强制分类**：

| type | 含义 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 Bug |
| `docs` | 仅文档变更 |
| `style` | 不影响代码含义的变动（空格、格式化等） |
| `refactor` | 代码重构（既不是新功能也不是修复） |
| `perf` | 性能优化 |
| `test` | 增加或修正测试 |
| `chore` | 构建工具、辅助工具的变动 |

**示例**：
```
[Phase 1] feat(map): 地图省份着色功能
[Phase 1] fix(timeline): 修复播放头超出范围的问题
[Phase 2] docs(spec): 补充关系图组件接口说明
[Phase 3] refactor(data): 提取 getCurrentFactionIds 工具函数
```

**分支策略**：`main`（生产）+ `develop`（开发）+ 功能分支（`feature/xxx`、`fix/xxx`）

**标签**：每个 Phase 完成后打 tag（`v0.1.0`、`v0.2.0`……）

### 8.6 错误处理与日志规范

> 本项目为静态前端站点（无后端），错误处理聚焦于前端边界。

| 场景 | 处理方式 |
|------|----------|
| 组件渲染失败 | React Error Boundary 捕获，显示降级 UI（不白屏） |
| GeoJSON 加载失败 | 降级为文字提示 + 事件列表（见 §3.5） |
| 数据查询异常 | `lib/data.ts` 函数返回空数组 + `console.warn`，不抛异常 |
| 第三方库初始化失败 | try/catch 包裹 + 显示友好提示 |

**日志分级**（使用 `console`）：

| 级别 | 使用场景 |
|------|----------|
| `console.error` | 不可恢复的错误（地图无法渲染、构建失败） |
| `console.warn` | 降级、数据缺失、配置缺失 |
| `console.info` | 仅开发模式使用，生产环境移除（通过 ESLint 规则 `no-console` 控制） |

**全局捕获**：在 `app/layout.tsx` 设置 React Error Boundary + `window.onerror` 兜底。

### 8.7 测试规范

| 类别 | 要求 |
|------|------|
| **构建测试** | `npm run build` 通过 = 类型检查 + 静态导出均成功 |
| **单元测试** | `lib/data.ts` 查询函数必须覆盖（核心数据逻辑），覆盖率 ≥ 80% |
| **组件测试** | 关键组件（ChinaMap、FactionGraph）至少一个渲染测试 |
| **测试文件** | 与源文件同级，后缀 `.test.ts` / `.test.tsx` |
| **测试结构** | 严格遵循 AAA 模式（Arrange-Act-Assert） |
| **禁止** | 测试用例中使用 `if` 条件判断 |

> Phase 0-2 聚焦构建验证，Phase 3+ 补充单元测试，Phase 5 完善测试覆盖。

### 8.8 安全与环境配置

- **禁止硬编码凭证**：所有第三方服务密钥（如 Giscus 仓库 ID）通过环境变量注入
- **环境变量模板**：提供 `.env.example`，包含所有必需变量键名及占位符，说明用途

```bash
# .env.example
# Giscus 评论配置（https://giscus.app 获取）
NEXT_PUBLIC_GISCUS_REPO=your-org/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Discussions
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

- **静态站点安全**：本项目无后端、无数据库、无用户认证，攻击面极小
- **依赖安全**：定期 `npm audit`，GitHub Dependabot 自动监控

### 8.9 文档维护

- 本设计文档是开发期间的"合同"，任何设计变更需先更新本文档
- 每个 Phase 完成后更新本文档的实际进展记录
- `CLAUDE.md` 记录项目特定的 AI 开发指令

---

## 9. 验证与测试

### 9.1 构建验证

```bash
npm run build          # TypeScript 编译 + Next.js 构建
npm run export         # 静态导出
npm run lint           # ESLint 检查
```

### 9.2 功能验证清单

- [ ] GitHub Pages 自动部署成功
- [ ] 地图正确渲染中国全境（34 个省级行政区）
- [ ] 时间轴拖动后地图和事件联动更新
- [ ] 关系图能渲染预期数据量（100-200 节点 + 100-200 边）流畅交互
- [ ] 所有详情页路由可访问
- [ ] 搜索功能返回正确结果
- [ ] 移动端基本可用

### 9.3 内容验证

- [ ] 示例事件（二月提纲等）信息准确
- [ ] 所有 `sources` 字段非空
- [ ] 派系分类（rebel/conservative/military）有据可查

---

## 10. 风险与注意事项

| 风险 | 缓解措施 |
|------|----------|
| ⚠️ 省级派系控制史料稀缺且争议（最高优先级） | Phase 0 可行性预研验证；不通过则启用降级方案（降级 A/B/C）；详见 §3.4.4 |
| 史料来源争议与冲突 | §0.4 多说并存策略 + 学术共识优先 + 编纂立场兜底并标注 |
| 派系分类简化 | 承认分类是粗略的，详情页说明复杂性，争议标注机制 |
| 数据量大导致性能问题 | **低优先级**——预期 200 节点，Cytoscape Canvas 可轻松应对，无需虚拟滚动 |
| GitHub Pages 构建限制 | 控制产物大小，必要时用 Vercel |
| 意识形态争议 | 关于页明确声明立场，§0.4 定义编纂立场介入边界 |
| GeoJSON 加载失败 | 构建时下载缓存 + 运行时失败降级为文字提示 + 事件列表 |

---

*本文档为 CRAtlas 项目设计规范，所有开发活动以此为准。*
