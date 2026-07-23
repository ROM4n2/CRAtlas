# OpenHistory — 完整技术架构分析

> 分析日期：2026-07-23
> 源码路径：`D:\Code\CRAtlas\openhistory\openhistory-main\`
> 分析级别：very thorough

---

## 1. 概述

OpenHistory 是一个开源交互式历史地图。它在 MapLibre GL JS 地图上渲染来自 Wikipedia/Wikidata 的历史事件、地点和政治实体（polities），时间轴滑块覆盖公元前 600 年至今。领土边界作为矢量瓦片从 OpenHistoricalMap (OHM) 实时流式传输，并通过 Wikidata QID 查找动态着色。

技术栈：**React 19 + TypeScript + Vite**（前端）、**FastAPI + Python**（后端）、**PostgreSQL 16 on Railway**（数据库），Python 数据管道从 Wikidata SPARQL/API 拉取数据。

---

## 2. 技术栈

### 2.1 前端

| 层 | 技术 | 版本 | 说明 |
|---|---|---|---|
| 框架 | React | ^19.2.0 | 函数组件 + hooks |
| 语言 | TypeScript | ~5.9.3 | Strict 模式 |
| 构建 | Vite | ^7.3.1 | 自定义 `.geojson` 插件 |
| 地图引擎 | MapLibre GL JS | ^5.19.0 | GPU 加速矢量+栅格瓦片 |
| 样式 | 内联 CSS | — | 无 Tailwind，无 styled-components |
| 图标 | lucide-static | ^0.576.0 | `?raw` 导入，运行时渲染到 canvas |
| TopoJSON | topojson-client/server | ^3.1.0 | 领土多边形处理 |
| 分析 | posthog-js | ^1.373.4 | 产品分析 |

### 2.2 后端

| 层 | 技术 | 说明 |
|---|---|---|
| 框架 | FastAPI (Python) | 单文件 `server/main.py` (~2904 行) |
| 服务器 | Uvicorn | ASGI |
| DB 驱动 | psycopg2 | RealDictCursor |
| 缓存 | Redis | Wikidata 标签翻译，30 天 TTL |
| LLM | Anthropic Claude Haiku 4-5 | AI 日期/地点提取 |
| HTTP 客户端 | urllib.request (stdlib) | 出站请求 |

### 2.3 数据库

| 层 | 技术 | 说明 |
|---|---|---|
| RDBMS | PostgreSQL 16 | Railway 托管 |
| 扩展 | uuid-ossp | UUID 主键 |
| 索引 | GiST (int4range), GIN (JSONB) | 年份范围重叠查询 |
| 迁移 | 顺序 SQL 文件 | `db/migrations/001` ~ `023` |

### 2.4 数据管道

| 组件 | 文件 | 用途 |
|---|---|---|
| 事件摄入 | `pipeline/run_local.py` | SPARQL → Wikidata API → Wikipedia API → Postgres |
| 派系摄入 | `pipeline/run_polities.py` | 独立 SPARQL 管道 |
| 实体提取 | `pipeline/extract.py` | P31 分类、slug 生成、日期解析 |
| Postgres 加载 | `pipeline/load_postgres.py` | 三种实体类型的 upsert |
| 父级回填 | `pipeline/polity_parents.py` | Wikidata SPARQL 父子链接 |
| GeoJSON 导出 | `scripts/export_geojson.py` | Postgres → `seed.geojson` |

### 2.5 外部数据源

| 来源 | 协议 | 用途 |
|---|---|---|
| Wikidata SPARQL | HTTPS SPARQL | 按类别发现 QID |
| Wikidata API | `wbgetentities` | 实体 JSON |
| Wikipedia REST API | `page/summary` | 文章摘要 |
| OHM Vector Tiles | `vtiles.openhistoricalmap.org` | 领土边界多边形 |
| OHM Overpass API | `overpass-api.openhistoricalmap.org` | QID-地图查询 |
| OpenFreeMap | `tiles.openfreemap.org` | 底图栅格瓦片 |

---

## 3. 项目结构

```
openhistory-main/
├── CLAUDE.md                     # Claude Code 约定
├── README.md                     # 项目文档
├── ourstory-spec.md              # 设计规范（513 行）
├── requirements.txt              # Python 依赖
├── docker-compose.yml            # 本地 Postgres
├── railway.json                  # Railway 部署配置
├── frontend/                     # React + TypeScript SPA
│   ├── src/
│   │   ├── App.tsx               # 根组件，状态编排
│   │   ├── components/           # UI 组件
│   │   ├── hooks/                # 自定义钩子
│   │   ├── lib/                  # API 客户端
│   │   ├── theme/                # 颜色、图标、调色板
│   │   └── types/                # TypeScript 类型
│   └── public/data/
│       ├── seed.geojson          # 静态数据集
│       └── stories/              # 预生成故事 JSON
├── server/
│   └── main.py                   # 全部 API 端点 (~2904 行)
├── db/
│   ├── schema.sql                # 权威 Schema
│   └── migrations/               # 23 个迁移文件
├── pipeline/                     # 数据摄入管道
├── scripts/                      # 工具脚本
├── docs/                         # 架构文档
└── claude-worklog/               # 开发日志
```

---

## 4. 核心数据流

### 4.1 数据摄入管道（构建时）

```
Wikidata SPARQL → QID 列表
       ↓
Wikidata API (wbgetentities, 50/批) → 实体 JSON
       ↓
Wikipedia REST API (8 线程并行) → 摘要
       ↓
pipeline/extract.py → 分类、解析日期、解析地点
       ↓
pipeline/load_postgres.py → upsert 入 PostgreSQL
       ↓
scripts/export_geojson.py → seed.geojson（静态打包）
```

### 4.2 运行时数据流（浏览器）

```
浏览器:
  1. fetch('/data/seed.geojson') → 静态 polities/locations
  2. fetch('/api/polities/manual') → 手动导入
  3. fetch('/api/events?year_min&year_max') → 滑动窗口事件
  4. 时间轴拖动 → 300ms 防抖 → API 查询

FastAPI 服务器:
  GET  /api/events              → 滑动窗口事件特征
  GET  /api/search              → 标题搜索
  GET  /api/ohm-qid-map         → osm_id → QID 查找
  PATCH /api/features/{id}      → 事件修正
  POST  /api/ohm/update-element → OHM 写入 (OAuth)

PostgreSQL 16:
  events, locations, polities, ohm_territory_links, hidden_modern_nations
```

### 4.3 事件可见性窗口

- 基于当前步长计算年份窗口（±25 年 ~ ±500 年）
- 时间轴退出已加载窗口时获取新数据
- 距边缘 20% 时预取相邻窗口
- 300ms 防抖 + AbortController 取消过期请求
- 内存中最多保留 2 个窗口

---

## 5. 数据库 Schema

### 核心表

| 表 | 行数 | 用途 |
|---|---|---|
| `events` | ~2125 | 历史事件（含年份范围、地点、类别） |
| `locations` | ~742 | 地点（城市/地区/国家） |
| `polities` | ~1275 | 政治实体（帝国/王国/共和国） |
| `ohm_territory_links` | — | OHM 领土 → 派系链接 |
| `hidden_modern_nations` | — | 现代国家隐藏控制 |

### 关键索引

- **GiST** on `events.year_range` — 区间重叠查询
- **GIN** on `polities.parents`, `events.part_of_qids` — JSONB/数组

---

## 6. 关键组件与 UI/UX 逻辑

### 6.1 App.tsx — 状态编排中心

管理 ~40 个状态：数据、时间轴、地图、UI、OHM 编辑。

**关键派生状态**：
- `geojson` = merge(staticFeatures, eventFeatures, overrideMap)
- `suppressedPolityIds` — 共首都去重

### 6.2 MapView.tsx — 地图渲染引擎（2025 行）

**图层架构**（自底向上）：
1. OHM 边界线
2. OHM 多边形填充（动态着色）
3. 事件圆点（主要/次要）
4. 事件图标（预渲染 canvas 图像）
5. 派系首都星标
6. 文字标签

**OHM 领土着色** (`rebuildColors`)：
1. 查询渲染的 OHM 特征
2. 剥离日期后缀
3. 通过 `osm_id → wikidata_qid` 连接
4. 通过 `getPolityColorAtYear()` 解析颜色
5. 构建 match 表达式应用填充色

### 6.3 TimelineBar.tsx — 时间导航

- 整数日期编码：`(year + 10000) * 10000 + month * 100 + day`
- 步长选项：1d, 1mo, 1yr, 5yr, 10yr, 25yr, 50yr, 100yr, 250yr
- 播放：1-50 步/秒
- 键盘：Space = 播放/暂停，方向键 = 步进

### 6.4 颜色级联系统

**`getPolityColorAtYear()` 解析**：
1. 查找当前年份的活跃父级
2. 递归解析父级颜色
3. 首都兄弟回退（如法西斯意大利 → 意大利王国 via 罗马）
4. 循环保护

**源优先级**：`manual > P150 > P361 > P131 > P127 > P17`

---

## 7. 与 CRAtlas 对比

| 方面 | OpenHistory | CRAtlas |
|---|---|---|
| 地图引擎 | MapLibre GL JS + 实时矢量瓦片 | ECharts + 静态 GeoJSON |
| 领土数据 | OHM 实时瓦片 | 本地 GeoJSON |
| 后端 | FastAPI + PostgreSQL | 零服务器（纯静态） |
| 数据流 | 滑动窗口 API 动态获取 | 全部静态打包 |
| 颜色系统 | 父链级联解析 | 派系类型简单映射 |
| 规模 | ~5000 特征 | 18 事件 |
| 编辑 | Wikidata OAuth + OHM 写入 | 无 |
| 部署 | Railway | GitHub Pages |

### 值得 CRAtlas 借鉴的模式
1. **滑动窗口数据获取** — 时间轴拖动时按需加载
2. **覆盖合并模式** — `overrideMap` 支持用户编辑
3. **Ref-for-Stale-Closure** — 地图回调避免闭包陷阱
4. **颜色级联** — 基于父实体链的颜色继承

---

## 8. 关键设计模式

### 8.1 覆盖合并模式

前端维护 `overrideMap` 存储用户编辑。启动时加载稀疏特征（仅变更字段），`geojson` useMemo 浅合并：

```ts
merged = { ...baseFeature, properties: { ...base.properties, ...override.properties } }
```

### 8.2 Ref-for-Stale-Closure 模式

`rebuildColors` 在 `useEffect([])` 中注册一次。所有 props 通过 ref 镜像避免过期闭包：

```ts
const currentDateIntRef = useRef(currentDateInt);
currentDateIntRef.current = currentDateInt; // 每次渲染更新
```

### 8.3 手动编辑保护

Pipeline upsert 跳过 `manually_edited_at IS NOT NULL` 的行，确保用户修正不被覆盖。

---

## 9. 已知限制

1. **OHM 写入路径被 Cloudflare 阻断** — 部分写入操作回退到 iD 编辑器
2. **无原住民广泛 SPARQL** — 需手动导入
3. **自然语言搜索未构建** — 计划通过 Wikidata Embeddings + pgvector
4. **单大陆日期窗口** — 当前 DB 仅覆盖 1750-1830
5. **无本地 DB 回退** — 所有脚本需要 Railway DATABASE_URL

---

*本报告基于 40+ 个源码文件的完整阅读，包括 server/main.py、App.tsx、MapView.tsx、polityPalettes.ts、useEventSource.ts、useTimeline.ts 等核心文件。*
