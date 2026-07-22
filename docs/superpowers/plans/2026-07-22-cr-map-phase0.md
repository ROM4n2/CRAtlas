# CRAtlas Phase 0 — 基础设施实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建 CRAtlas 项目骨架——Next.js + TypeScript + Tailwind 项目初始化、核心依赖安装、类型定义、示例数据、数据查询层、状态管理、GitHub Actions 自动部署、以及 Phase 0 可行性预研。

**Architecture:** 纯静态站点（Next.js SSG → GitHub Pages），四层架构（Core → Application → Interface → Infrastructure）。数据以 TypeScript 文件存储，通过 `lib/data.ts` 查询函数访问，Zustand 管理全局时间轴状态。

**Tech Stack:** Next.js 14+ (App Router) · TypeScript · Tailwind CSS · ECharts + echarts-for-react · Cytoscape.js + react-cytoscapejs · Zustand · GitHub Actions · GitHub Pages

## Global Constraints

- **零服务器**：纯静态站点，`next export` 产物托管 GitHub Pages，无后端/数据库
- **命名规范**：文件夹 kebab-case / 组件文件 PascalCase / 类型 PascalCase 无 I 前缀 / 变量 camelCase / 常量 UPPER_SNAKE_CASE
- **代码注释**：每个源文件顶部 @file/@brief 文件头注释；公共函数 TSDoc（@param/@returns/@throws/@example）；行内注释 Why > What
- **Git 提交**：`[Phase X] type(scope): subject` 格式，遵循 Conventional Commits
- **数据录入**：每条事件必须有至少一个 `sources` 条目；日期 ISO 8601；ID 小写 + 连字符
- **依赖方向**：接口层 → 应用层 → 核心层 ← 基础设施层；组件不得直接 import 数据文件，必须通过 `lib/data.ts`
- **史料冲突**：多说并存 > 学术共识 > 编纂立场兜底（标注"此处为编纂方判断"）
- **地图政治正确**：必须包含台湾、南海诸岛等中国领土
- **Node.js 版本**：≥ 18.17.0（Next.js 14 最低要求）

---

## File Structure

```
CRAtlas/
├── app/
│   ├── layout.tsx              # 根布局（Navbar + Error Boundary）
│   ├── page.tsx                # 首页（三大视图入口）
│   ├── globals.css             # 全局样式 + Tailwind 指令
│   └── map/page.tsx            # 地图视图（Phase 0 仅占位）
├── components/
│   ├── layout/Navbar.tsx       # 顶部导航栏
│   └── map/ChinaMap.tsx        # ECharts 地图组件（Phase 0 验证渲染）
├── data/
│   ├── events.ts               # 示例事件数据（3-5 条）
│   ├── people.ts               # 示例人物数据（5-8 条）
│   ├── factions.ts             # 示例派系数据（3-4 条）
│   ├── regions.ts              # 地区数据（34 省级行政区）
│   ├── relationships.ts        # 示例关系数据
│   └── regionControls.ts       # 示例地区控制数据
├── lib/
│   ├── types.ts                # 全部 TypeScript 类型定义
│   ├── data.ts                 # 数据查询/过滤函数
│   └── store.ts                # Zustand 全局时间轴状态
├── public/
│   └── china.json              # 中国地图 GeoJSON（构建时下载）
├── .github/workflows/deploy.yml # GitHub Actions 自动部署
├── scripts/download-geojson.sh # GeoJSON 下载脚本
├── package.json
├── tsconfig.json
├── next.config.js              # output: 'export', images: { unoptimized: true }
├── tailwind.config.ts
├── postcss.config.js
├── .env.example
└── CLAUDE.md                   # 项目 AI 开发指令
```

---

### Task 1: 项目脚手架与依赖安装

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Create: `.env.example`

**Interfaces:**
- Consumes: nothing
- Produces: 可运行的 Next.js 项目骨架，`npm run dev` 启动开发服务器

- [ ] **Step 1: 初始化 package.json 并安装依赖**

Run: `cd D:\Code\CRMap && npm init -y`
Expected: 创建 package.json

手动编辑 `package.json`，设置：
```json
{
  "name": "crmap",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "download-geojson": "bash scripts/download-geojson.sh"
  }
}
```

- [ ] **Step 2: 安装核心依赖**

Run: `cd D:\Code\CRMap && npm install next@^14.2.0 react@^18.3.0 react-dom@^18.3.0`
Expected: 安装成功，node_modules 创建

- [ ] **Step 3: 安装开发依赖**

Run: `cd D:\Code\CRMap && npm install -D typescript@^5.4.0 @types/node@^20.11.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0 eslint@^8.57.0 eslint-config-next@^14.2.0`
Expected: 安装成功

- [ ] **Step 4: 安装运行时依赖**

Run: `cd D:\Code\CRMap && npm install echarts@^5.5.0 echarts-for-react@^3.0.2 cytoscape@^3.29.0 react-cytoscapejs@^2.0.0 zustand@^4.5.0`
Expected: 安装成功

- [ ] **Step 5: 安装测试依赖**

Run: `cd D:\Code\CRMap && npm install -D jest@^29.7.0 @types/jest@^29.5.0 ts-jest@^29.1.0`
Expected: 安装成功

- [ ] **Step 6: 创建 tsconfig.json**

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 7: 创建 next.config.js**

Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
```

> `output: 'export'` 是静态导出的关键配置。`trailingSlash: true` 让 GitHub Pages 路由兼容。

- [ ] **Step 8: 创建 tailwind.config.ts**

Create `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rebel: '#DC2626',
        conservative: '#2563EB',
        military: '#CA8A04',
        contested: '#9333EA',
        nodata: '#9CA3AF',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 9: 创建 postcss.config.js**

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 10: 创建 .gitignore**

Create `.gitignore`:
```
node_modules/
.next/
out/
build/
.env
.env.local
*.log
.DS_Store
coverage/
```

- [ ] **Step 11: 创建 .env.example**

Create `.env.example`:
```bash
# GitHub Pages 部署配置（仓库名，用于静态资源路径）
NEXT_PUBLIC_BASE_PATH=/CRAtlas

# Giscus 评论配置（Phase 4 使用，https://giscus.app 获取）
NEXT_PUBLIC_GISCUS_REPO=your-org/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Discussions
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

- [ ] **Step 12: 验证项目启动**

Run: `cd D:\Code\CRMap && npm run dev`
Expected: 启动成功（即使页面报 404 也可接受，因为页面文件尚未创建）

- [ ] **Step 13: 提交**

```bash
cd D:\Code/CRMap && git add .
git commit -m "[Phase 0] chore(project): Next.js + TypeScript + Tailwind 项目初始化"
```

---

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

Run: `cd D:\Code\CRMap && npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRMap && git add lib/types.ts
git commit -m "[Phase 0] feat(types): 核心类型定义（实体/关系/控制/图谱）"
```

---

### Task 3: 示例数据填充

**Files:**
- Create: `data/events.ts`
- Create: `data/people.ts`
- Create: `data/factions.ts`
- Create: `data/regions.ts`
- Create: `data/relationships.ts`
- Create: `data/regionControls.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 中的类型
- Produces: 符合类型的示例数据集，供 Phase 1 可视化使用

- [ ] **Step 1: 创建 data/regions.ts（34 省级行政区）**

Create `data/regions.ts`:
```typescript
/**
 * @file    regions.ts
 * @brief   中国 34 省级行政区基础数据。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Region } from '@/lib/types';

export const regions: Region[] = [
  { id: 'beijing', name: '北京', level: 'province' },
  { id: 'shanghai', name: '上海', level: 'province' },
  { id: 'tianjin', name: '天津', level: 'province' },
  { id: 'chongqing', name: '重庆', level: 'province' },
  { id: 'heilongjiang', name: '黑龙江', level: 'province' },
  { id: 'jilin', name: '吉林', level: 'province' },
  { id: 'liaoning', name: '辽宁', level: 'province' },
  { id: 'inner-mongolia', name: '内蒙古', level: 'province' },
  { id: 'hebei', name: '河北', level: 'province' },
  { id: 'xinjiang', name: '新疆', level: 'province' },
  { id: 'gansu', name: '甘肃', level: 'province' },
  { id: 'qinghai', name: '青海', level: 'province' },
  { id: 'ningxia', name: '宁夏', level: 'province' },
  { id: 'shaanxi', name: '陕西', level: 'province' },
  { id: 'shanxi', name: '山西', level: 'province' },
  { id: 'henan', name: '河南', level: 'province' },
  { id: 'shandong', name: '山东', level: 'province' },
  { id: 'sichuan', name: '四川', level: 'province' },
  { id: 'hubei', name: '湖北', level: 'province' },
  { id: 'anhui', name: '安徽', level: 'province' },
  { id: 'jiangsu', name: '江苏', level: 'province' },
  { id: 'zhejiang', name: '浙江', level: 'province' },
  { id: 'fujian', name: '福建', level: 'province' },
  { id: 'jiangxi', name: '江西', level: 'province' },
  { id: 'hunan', name: '湖南', level: 'province' },
  { id: 'guizhou', name: '贵州', level: 'province' },
  { id: 'yunnan', name: '云南', level: 'province' },
  { id: 'guangdong', name: '广东', level: 'province' },
  { id: 'guangxi', name: '广西', level: 'province' },
  { id: 'hainan', name: '海南', level: 'province' },
  { id: 'xizang', name: '西藏', level: 'province' },
  { id: 'taiwan', name: '台湾', level: 'province' },
  { id: 'hongkong', name: '香港', level: 'province' },
  { id: 'macau', name: '澳门', level: 'province' },
];

export default regions;
```

- [ ] **Step 2: 创建 data/factions.ts（4 个示例派系）**

Create `data/factions.ts`:
```typescript
/**
 * @file    factions.ts
 * @brief   派系示例数据——造反派/保皇派/军方组织。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Faction } from '@/lib/types';

export const factions: Faction[] = [
  {
    id: 'central-cultural-revolution-group',
    name: '中央文革小组',
    factionType: 'rebel',
    foundedDate: '1966-05-28',
    dissolvedDate: '1969-04-01',
    regionIds: ['beijing'],
    description:
      '1966 年 5 月成立的中央文化革命小组，在文革初期实际取代中央政治局成为最高权力机构。组长陈伯达，顾问康生，副组长江青、张春桥等。',
    sources: [
      {
        title: '《关于无产阶级文化大革命的决定》（五一六通知）',
        type: 'official',
        date: '1966-05-16',
      },
      {
        title: '金冲及主编《二十世纪中国史纲》',
        type: 'academic',
        date: '2009-01-01',
      },
    ],
  },
  {
    id: 'capital-three-headquarters',
    name: '首都三司（首都大专院校红卫兵革命造反总司令部）',
    factionType: 'rebel',
    foundedDate: '1966-09-01',
    regionIds: ['beijing'],
    description:
      '北京高等院校造反派红卫兵组织，蒯大富等参与领导。与谭力夫为首的"老红卫兵"（保皇派）形成对立。',
    sources: [
      {
        title: '《蒯大富回忆录》',
        type: 'memoir',
        date: '2000-01-01',
      },
    ],
  },
  {
    id: 'shanghai-worker-rebel',
    name: '上海工人革命造反派联合司令部',
    factionType: 'rebel',
    foundedDate: '1966-11-01',
    regionIds: ['shanghai'],
    description:
      '上海工人造反派组织，1967 年"一月风暴"中参与夺权，是张春桥、王洪文依靠的重要力量。',
    sources: [
      {
        title: '《上海地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    id: 'beijing-red-guard',
    name: '北京老红卫兵（西城纠察队等）',
    factionType: 'conservative',
    foundedDate: '1966-05-29',
    dissolvedDate: '1966-12-01',
    regionIds: ['beijing'],
    description:
      '以高干子弟为核心的红卫兵组织，主张"老子英雄儿好汉"的血统论，保护老干部，与造反派对立。谭力夫、陈小鲁等参与。',
    sources: [
      {
        title: '《血统论》传单',
        type: 'media',
        date: '1966-08-01',
      },
    ],
  },
];

export default factions;
```

- [ ] **Step 3: 创建 data/people.ts（6 个示例人物）**

Create `data/people.ts`:
```typescript
/**
 * @file    people.ts
 * @brief   人物示例数据——文革关键人物及其派系隶属。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Person } from '@/lib/types';

export const people: Person[] = [
  {
    id: 'kuai-dafu',
    name: '蒯大富',
    birthYear: 1945,
    biography:
      '清华大学学生，首都三司核心人物，北京造反派红卫兵领袖。1966 年 5 月贴出清华大学第一张大字报。',
    affiliations: [
      {
        factionId: 'capital-three-headquarters',
        startDate: '1966-09-01',
        endDate: '1968-07-01',
        role: '核心成员',
      },
    ],
    sources: [
      {
        title: '《蒯大富口述：清华十年》',
        type: 'memoir',
        date: '2015-01-01',
      },
    ],
  },
  {
    id: 'tan-lifu',
    name: '谭力夫',
    birthYear: 1945,
    deathYear: 2017,
    biography:
      '北京工业大学学生，"血统论"《老子英雄儿好汉》传单作者之一，老红卫兵代表人物。',
    affiliations: [
      {
        factionId: 'beijing-red-guard',
        startDate: '1966-05-29',
        endDate: '1966-12-01',
        role: '核心成员',
      },
    ],
    sources: [
      {
        title: '《血统论》传单',
        type: 'media',
        date: '1966-08-01',
      },
    ],
  },
  {
    id: 'jiang-qing',
    name: '江青',
    birthYear: 1914,
    deathYear: 1991,
    biography:
      '毛泽东夫人，中央文革小组第一副组长，"四人帮"核心成员。',
    affiliations: [
      {
        factionId: 'central-cultural-revolution-group',
        startDate: '1966-05-28',
        endDate: '1976-10-06',
        role: '第一副组长',
      },
    ],
    sources: [
      {
        title: '《江青传》',
        type: 'academic',
        date: '1993-01-01',
      },
    ],
  },
  {
    id: 'zhang-chunqiao',
    name: '张春桥',
    birthYear: 1917,
    deathYear: 2005,
    biography:
      '中央文革小组副组长，上海市委第一书记，"四人帮"成员。',
    affiliations: [
      {
        factionId: 'central-cultural-revolution-group',
        startDate: '1966-05-28',
        endDate: '1976-10-06',
        role: '副组长',
      },
      {
        factionId: 'shanghai-worker-rebel',
        startDate: '1966-11-01',
        endDate: '1967-02-01',
        role: '顾问',
      },
    ],
    sources: [
      {
        title: '《张春桥狱中家书》',
        type: 'memoir',
        date: '2015-01-01',
      },
    ],
  },
  {
    id: 'wang-hongwen',
    name: '王洪文',
    birthYear: 1935,
    deathYear: 1992,
    biography:
      '上海国棉十七厂工人，上海"一月风暴"中崛起，中央副主席，"四人帮"成员。',
    affiliations: [
      {
        factionId: 'shanghai-worker-rebel',
        startDate: '1966-11-01',
        endDate: '1976-10-06',
        role: '核心成员',
      },
    ],
    sources: [
      {
        title: '《王洪文供词》',
        type: 'official',
        date: '1980-01-01',
      },
    ],
  },
  {
    id: 'chen-boda',
    name: '陈伯达',
    birthYear: 1904,
    deathYear: 1989,
    biography:
      '毛泽东秘书，中央文革小组组长，林彪反革命集团成员。',
    affiliations: [
      {
        factionId: 'central-cultural-revolution-group',
        startDate: '1966-05-28',
        endDate: '1970-08-01',
        role: '组长',
      },
    ],
    sources: [
      {
        title: '《陈伯达最后口述回忆》',
        type: 'memoir',
        date: '2010-01-01',
      },
    ],
  },
];

export default people;
```

- [ ] **Step 4: 创建 data/events.ts（5 个示例事件）**

Create `data/events.ts`:
```typescript
/**
 * @file    events.ts
 * @brief   事件示例数据——文革关键历史事件。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Event } from '@/lib/types';

export const events: Event[] = [
  {
    id: 'feb-outline-1966',
    title: '《关于当前学术讨论的汇报提纲》',
    alias: ['二月提纲'],
    date: '1966-02-01',
    location: { regionId: 'beijing', specific: '北京钓鱼台' },
    description:
      '彭真主持制定的汇报提纲，主张学术讨论要"放"而不"收"，要有领导、有秩序。后被毛泽东批判，成为文革导火索之一。',
    participants: ['chen-boda'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['may16-notice-1966'],
    significance: 'major',
    sources: [
      {
        title: '《关于当前学术讨论的汇报提纲》',
        type: 'official',
        date: '1966-02-01',
      },
      {
        title: '席宣、金春明《"文化大革命"简史》',
        type: 'academic',
        date: '1996-01-01',
      },
    ],
  },
  {
    id: 'may16-notice-1966',
    title: '《中国共产党中央委员会通知》（五一六通知）',
    alias: ['五一六通知'],
    date: '1966-05-16',
    location: { regionId: 'beijing', specific: '北京人民大会堂' },
    description:
      '标志着文化大革命正式开始的纲领性文件。宣布撤销"二月提纲"和原来的文化革命五人小组，成立中央文革小组。',
    participants: ['jiang-qing', 'chen-boda'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['feb-outline-1966', '11th-plenum-1966'],
    significance: 'major',
    sources: [
      {
        title: '《人民日报》1966 年 5 月 16 日',
        type: 'media',
        date: '1966-05-16',
      },
    ],
  },
  {
    id: '11th-plenum-1966',
    title: '中共八届十一中全会',
    alias: ['八届十一中全会'],
    date: '1966-08-01',
    endDate: '1966-08-12',
    location: { regionId: 'beijing', specific: '北京人民大会堂' },
    description:
      '通过《关于无产阶级文化大革命的决定》（十六条），刘少奇、邓小平受到批判，林彪成为唯一副主席。',
    participants: ['jiang-qing', 'zhang-chunqiao'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['may16-notice-1966'],
    significance: 'major',
    sources: [
      {
        title: '《关于无产阶级文化大革命的决定》',
        type: 'official',
        date: '1966-08-08',
      },
    ],
  },
  {
    id: 'jan-storm-1967',
    title: '上海"一月风暴"',
    alias: ['一月风暴', '一月夺权'],
    date: '1967-01-01',
    endDate: '1967-02-01',
    location: { regionId: 'shanghai', specific: '上海人民广场' },
    description:
      '张春桥、王洪文策划上海造反派夺取上海市党政大权，毛泽东赞扬为"全国模范"。',
    participants: ['zhang-chunqiao', 'wang-hongwen'],
    factionIds: ['shanghai-worker-rebel', 'central-cultural-revolution-group'],
    relatedEventIds: ['11th-plenum-1966'],
    significance: 'major',
    sources: [
      {
        title: '《人民日报》1967 年 1 月',
        type: 'media',
        date: '1967-01-01',
      },
      {
        title: '《上海地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    id: 'feb-adverse-current-1967',
    title: '二月逆流（二月抗争）',
    alias: ['二月逆流', '二月抗争', '大闹怀仁堂'],
    date: '1967-02-01',
    location: { regionId: 'beijing', specific: '北京怀仁堂' },
    description:
      '谭震林、陈毅、叶剑英等老同志在怀仁堂会议上激烈批评文革乱象，被毛泽东压制，后被平反。',
    participants: [],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['jan-storm-1967'],
    significance: 'major',
    sources: [
      {
        title: '《关于二月逆流的一些史料》',
        type: 'academic',
        date: '1980-01-01',
      },
    ],
  },
];

export default events;
```

- [ ] **Step 5: 创建 data/relationships.ts（示例关系）**

Create `data/relationships.ts`:
```typescript
/**
 * @file    relationships.ts
 * @brief   关系示例数据——人物-派系隶属、事件因果、派系互动。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Relationship } from '@/lib/types';

export const relationships: Relationship[] = [
  {
    id: 'rel-kuai-capital',
    type: 'membership',
    from: 'kuai-dafu',
    to: 'capital-three-headquarters',
    fromType: 'person',
    toType: 'faction',
    startDate: '1966-09-01',
    endDate: '1968-07-01',
    description: '蒯大富是首都三司核心成员',
    sources: [{ title: '《蒯大富口述》', type: 'memoir', date: '2015-01-01' }],
  },
  {
    id: 'rel-jiang-central',
    type: 'membership',
    from: 'jiang-qing',
    to: 'central-cultural-revolution-group',
    fromType: 'person',
    toType: 'faction',
    startDate: '1966-05-28',
    endDate: '1976-10-06',
    description: '江青任中央文革小组第一副组长',
    sources: [{ title: '《江青传》', type: 'academic', date: '1993-01-01' }],
  },
  {
    id: 'rel-causality-feb-may',
    type: 'causality',
    from: 'feb-outline-1966',
    to: 'may16-notice-1966',
    fromType: 'event',
    toType: 'event',
    startDate: '1966-05-16',
    description: '二月提纲被批判直接导致五一六通知发布',
    sources: [
      {
        title: '席宣、金春明《"文化大革命"简史》',
        type: 'academic',
        date: '1996-01-01',
      },
    ],
  },
  {
    id: 'rel-faction-rebel-vs-conservative-1',
    type: 'faction-interaction',
    from: 'capital-three-headquarters',
    to: 'beijing-red-guard',
    fromType: 'faction',
    toType: 'faction',
    startDate: '1966-06-01',
    endDate: '1966-12-01',
    description: '造反派与保皇派的对抗',
    sources: [{ title: '《血统论》传单', type: 'media', date: '1966-08-01' }],
  },
  {
    id: 'rel-faction-rebel-vs-conservative-2',
    type: 'faction-interaction',
    from: 'beijing-red-guard',
    to: 'capital-three-headquarters',
    fromType: 'faction',
    toType: 'faction',
    startDate: '1966-06-01',
    endDate: '1966-12-01',
    description: '造反派与保皇派的对抗',
    sources: [{ title: '《血统论》传单', type: 'media', date: '1966-08-01' }],
  },
];

export default relationships;
```

- [ ] **Step 6: 创建 data/regionControls.ts（示例控制数据）**

Create `data/regionControls.ts`:
```typescript
/**
 * @file    regionControls.ts
 * @brief   地区控制时间线示例数据——地图省份着色的核心输入。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @note 这是示例数据。完整数据需通过 Phase 0 可行性预研后填充。
 */

import { RegionControlRecord } from '@/lib/types';

export const regionControls: RegionControlRecord[] = [
  {
    regionId: 'beijing',
    startDate: '1966-05-28',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'central-cultural-revolution-group', strength: 0.9 }],
    note: '中央文革小组所在地，造反派稳固控制',
    sources: [
      {
        title: '《北京地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    regionId: 'shanghai',
    startDate: '1967-02-01',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'shanghai-worker-rebel', strength: 0.85 }],
    note: '一月风暴后造反派掌权',
    sources: [
      {
        title: '《上海地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    regionId: 'beijing',
    startDate: '1966-05-29',
    endDate: '1966-08-01',
    status: 'contested',
    factions: [
      { factionId: 'capital-three-headquarters', strength: 0.4 },
      { factionId: 'beijing-red-guard', strength: 0.4 },
    ],
    note: '造反派与保皇派争夺中',
    sources: [{ title: '《血统论》传单', type: 'media', date: '1966-08-01' }],
  },
];

export default regionControls;
```

- [ ] **Step 7: 验证数据编译**

Run: `cd D:\Code\CRMap && npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 8: 提交**

```bash
cd D:\Code\CRMap && git add data/
git commit -m "[Phase 0] feat(data): 示例数据填充（5事件/6人物/4派系/34地区/5关系/3控制记录）"
```

---

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

Run: `cd D:\Code\CRMap && npx jest lib/data.test.ts`
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

Run: `cd D:\Code\CRMap && npx jest lib/data.test.ts`
Expected: PASS（全部测试通过）

- [ ] **Step 7: 提交**

```bash
cd D:\Code\CRMap && git add lib/data.ts lib/data.test.ts jest.config.js
git commit -m "[Phase 0] feat(data): 数据查询层 + 单元测试（getEventsByDate/getRegionControl/search/getCurrentFactionIds）"
```

---

### Task 5: 状态管理（lib/store.ts）

**Files:**
- Create: `lib/store.ts`
- Test: `lib/store.test.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 中的 `TimeState` 相关类型
- Produces: Zustand store 实例，`useTimeStore` hook

- [ ] **Step 1: 编写失败测试**

Create `lib/store.test.ts`:
```typescript
import { useTimeStore } from './store';

describe('useTimeStore', () => {
  beforeEach(() => {
    useTimeStore.setState({
      currentDate: '1966-01-01',
      isPlaying: false,
      speed: 1,
      dateRange: null,
    });
  });

  it('应有正确的初始状态', () => {
    const state = useTimeStore.getState();
    expect(state.currentDate).toBe('1966-01-01');
    expect(state.isPlaying).toBe(false);
    expect(state.speed).toBe(1);
    expect(state.dateRange).toBeNull();
  });

  it('setDate 应更新 currentDate', () => {
    useTimeStore.getState().setDate('1967-01-01');
    expect(useTimeStore.getState().currentDate).toBe('1967-01-01');
  });

  it('togglePlay 应切换 isPlaying', () => {
    useTimeStore.getState().togglePlay();
    expect(useTimeStore.getState().isPlaying).toBe(true);
    useTimeStore.getState().togglePlay();
    expect(useTimeStore.getState().isPlaying).toBe(false);
  });

  it('setSpeed 应更新 speed', () => {
    useTimeStore.getState().setSpeed(2);
    expect(useTimeStore.getState().speed).toBe(2);
  });

  it('setDateRange 应更新 dateRange', () => {
    useTimeStore.getState().setDateRange(['1966-01-01', '1967-01-01']);
    expect(useTimeStore.getState().dateRange).toEqual(['1966-01-01', '1967-01-01']);
    useTimeStore.getState().setDateRange(null);
    expect(useTimeStore.getState().dateRange).toBeNull();
  });
});
```

- [ ] **Step 2: 运行测试验证失败**

Run: `cd D:\Code\CRMap && npx jest lib/store.test.ts`
Expected: FAIL — "Cannot find module './store'"

- [ ] **Step 3: 实现 lib/store.ts**

Create `lib/store.ts`:
```typescript
/**
 * @file    store.ts
 * @brief   Zustand 全局状态管理——时间轴状态（日期/播放/速度/范围）。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { create } from 'zustand';

export interface TimeState {
  currentDate: string;
  isPlaying: boolean;
  speed: number;
  dateRange: [string, string] | null;
  setDate: (date: string) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setDateRange: (range: [string, string] | null) => void;
}

export const useTimeStore = create<TimeState>((set) => ({
  currentDate: '1966-01-01',
  isPlaying: false,
  speed: 1,
  dateRange: null,
  setDate: (date) => set({ currentDate: date }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ speed }),
  setDateRange: (range) => set({ dateRange: range }),
}));
```

- [ ] **Step 4: 运行测试验证通过**

Run: `cd D:\Code\CRMap && npx jest lib/store.test.ts`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRMap && git add lib/store.ts lib/store.test.ts
git commit -m "[Phase 0] feat(store): Zustand 时间轴状态管理 + 单元测试"
```

---

### Task 6: 中国地图 GeoJSON 下载

**Files:**
- Create: `scripts/download-geojson.sh`
- Create: `public/china.json`（运行脚本后生成）

**Interfaces:**
- Consumes: nothing
- Produces: `public/china.json`（中国全境 GeoJSON，含台湾、南海诸岛）

- [ ] **Step 1: 创建下载脚本**

Create `scripts/download-geojson.sh`:
```bash
#!/bin/bash
# 下载中国全境 GeoJSON（含台湾、南海诸岛）
# 来源：阿里云 DataV.GeoAtlas

set -e

OUTPUT="public/china.json"
URL="https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"

echo "正在下载中国地图 GeoJSON..."
mkdir -p public

if command -v curl &> /dev/null; then
  curl -L -o "$OUTPUT" "$URL"
elif command -v wget &> /dev/null; then
  wget -O "$OUTPUT" "$URL"
else
  echo "错误：需要 curl 或 wget"
  exit 1
fi

echo "下载完成：$OUTPUT"
echo "文件大小：$(wc -c < "$OUTPUT") bytes"
```

- [ ] **Step 2: 运行下载脚本**

Run: `cd D:\Code\CRMap && bash scripts/download-geojson.sh`
Expected: 下载成功，`public/china.json` 创建

- [ ] **Step 3: 验证 GeoJSON 有效性**

Run: `cd D:\Code\CRMap && node -e "const d=require('./public/china.json'); console.log('类型:', d.type, '特征数:', d.features.length)"`
Expected: 输出类似 "类型: FeatureCollection 特征数: 34+"

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRMap && git add scripts/download-geojson.sh public/china.json
git commit -m "[Phase 0] chore(geojson): 中国地图 GeoJSON 下载（含台湾、南海诸岛）"
```

---

### Task 7: GitHub Actions 自动部署

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: GitHub 仓库 + GitHub Pages
- Produces: 推送到 main 分支时自动构建并部署到 GitHub Pages

- [ ] **Step 1: 创建 GitHub Actions 工作流**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Download GeoJSON
        run: npm run download-geojson

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_BASE_PATH: /CRAtlas

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 提交**

```bash
cd D:\Code\CRMap && git add .github/workflows/deploy.yml
git commit -m "[Phase 0] ci(deploy): GitHub Actions 自动部署到 Pages"
```

---

### Task 8: 基础页面骨架

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/map/page.tsx`
- Create: `components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: `lib/store.ts` 的 `useTimeStore`
- Produces: 可访问的首页 + 导航栏 + 地图页占位

- [ ] **Step 1: 创建 globals.css**

Create `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-rebel: #DC2626;
  --color-conservative: #2563EB;
  --color-military: #CA8A04;
  --color-contested: #9333EA;
  --color-nodata: #9CA3AF;
}

body {
  @apply bg-gray-50 text-gray-900 antialiased;
}
```

- [ ] **Step 2: 创建 layout.tsx**

Create `app/layout.tsx`:
```typescript
/**
 * @file    layout.tsx
 * @brief   根布局——导航栏 + 全局结构。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'CRAtlas — 文革派系势力可视化',
  description: '1966-1976 年文化大革命期间造反派与保皇派势力演变、关键事件、人物关系的可视化平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 创建 Navbar.tsx**

Create `components/layout/Navbar.tsx`:
```typescript
/**
 * @file    Navbar.tsx
 * @brief   顶部导航栏——Logo + 三大视图切换 + 关于页链接。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            CRAtlas
          </Link>
          <div className="flex space-x-6 text-sm">
            <Link href="/map" className="text-gray-600 hover:text-gray-900">
              地图
            </Link>
            <Link href="/timeline" className="text-gray-600 hover:text-gray-900">
              时间轴
            </Link>
            <Link href="/graph" className="text-gray-600 hover:text-gray-900">
              关系图
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              关于
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: 创建首页 page.tsx**

Create `app/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   首页——项目简介 + 三大视图入口。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">CRAtlas</h1>
      <p className="text-lg text-gray-600 mb-8">
        1966-1976 年文化大革命期间造反派与保皇派势力演变、关键事件、人物关系的可视化平台。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/map"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">🗺️ 地图视图</h2>
          <p className="text-gray-600">按省份查看派系势力分布与事件标注</p>
        </Link>
        <Link
          href="/timeline"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">📅 时间轴</h2>
          <p className="text-gray-600">按时间顺序浏览关键事件</p>
        </Link>
        <Link
          href="/graph"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">🔗 关系图</h2>
          <p className="text-gray-600">探索人物、派系、事件之间的关系网络</p>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 创建地图页占位**

Create `app/map/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   地图视图页——Phase 0 占位，Phase 1 实现完整功能。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">地图视图</h1>
      <p className="text-gray-600">地图组件开发中……（Phase 1 实现）</p>
    </div>
  );
}
```

- [ ] **Step 6: 验证构建**

Run: `cd D:\Code\CRMap && npm run build`
Expected: 构建成功，`out/` 目录生成静态文件

- [ ] **Step 7: 提交**

```bash
cd D:\Code\CRMap && git add app/ components/layout/
git commit -m "[Phase 0] feat(ui): 基础页面骨架（首页/导航栏/地图页占位）"
```

---

### Task 9: ECharts 中国地图渲染验证

**Files:**
- Create: `components/map/ChinaMap.tsx`（Phase 0 验证版本）

**Interfaces:**
- Consumes: `public/china.json`（GeoJSON）
- Produces: 能渲染中国地图轮廓的 ECharts 组件

- [ ] **Step 1: 创建 ChinaMap 验证组件**

Create `components/map/ChinaMap.tsx`:
```typescript
/**
 * @file    ChinaMap.tsx
 * @brief   ECharts 中国地图渲染验证——Phase 0 仅验证地图能正确渲染。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @note Phase 0 目标：验证 ECharts 能注册并渲染中国地图轮廓。
 *       省份着色和事件散点在 Phase 1 实现。
 */

'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import chinaGeoJson from '@/public/china.json';

export default function ChinaMap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 注册中国地图
    echarts.registerMap('china', chinaGeoJson as never);

    const chart = echarts.init(chartRef.current);
    instanceRef.current = chart;

    chart.setOption({
      title: {
        text: '中国地图（Phase 0 验证）',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
      },
      geo: {
        map: 'china',
        roam: true,
        itemStyle: {
          areaColor: '#E5E7EB',
          borderColor: '#9CA3AF',
        },
        emphasis: {
          itemStyle: {
            areaColor: '#C084FC',
          },
        },
      },
    });

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
}
```

- [ ] **Step 2: 在地图页使用组件**

Modify `app/map/page.tsx`:
```typescript
import ChinaMap from '@/components/map/ChinaMap';

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">地图视图</h1>
      <ChinaMap />
    </div>
  );
}
```

- [ ] **Step 3: 验证渲染**

Run: `cd D:\Code\CRMap && npm run dev`
Expected: 访问 `/map`，能看到中国地图轮廓（灰色底图），可缩放拖拽

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRMap && git add components/map/ChinaMap.tsx app/map/page.tsx
git commit -m "[Phase 0] feat(map): ECharts 中国地图渲染验证通过"
```

---

### Task 10: CLAUDE.md 与最终验证

**Files:**
- Create: `CLAUDE.md`

**Interfaces:**
- Consumes: 全部设计文档
- Produces: 项目 AI 开发指令文件

- [ ] **Step 1: 创建 CLAUDE.md**

Create `CLAUDE.md`:
```markdown
# CLAUDE.md — CRAtlas 项目开发指令

## 项目概述

CRAtlas 是 1966-1976 年文化大革命期间造反派与保皇派势力演变的可视化平台。
纯静态站点（Next.js SSG → GitHub Pages），零服务器。

## 技术栈

- Next.js 14+ (App Router, `output: 'export'`)
- TypeScript (strict mode)
- Tailwind CSS
- ECharts + echarts-for-react（地图）
- Cytoscape.js + react-cytoscapejs（关系图）
- Zustand（时间轴状态）

## 架构规则

四层架构，严格依赖方向：
- 接口层 (app/, components/) → 应用层 (lib/data.ts, lib/store.ts) → 核心层 (lib/types.ts) ← 基础设施层 (data/)
- **组件不得直接 import 数据文件**，必须通过 lib/data.ts 查询函数

## 数据规则

- 所有实体通过 id 引用，不嵌套
- sources 内嵌在每个实体中（每条信息有出处）
- affiliations 是人物派系唯一数据源（无 factionIds 冗余字段）
- 史料冲突：多说并存 > 学术共识 > 编纂立场兜底并标注

## 命名规范

- 文件夹 kebab-case
- 组件文件 PascalCase
- 类型 PascalCase 无 I 前缀
- 变量 camelCase
- 常量 UPPER_SNAKE_CASE

## 注释规范

- 文件头 @file/@brief
- 公共函数 TSDoc (@param/@returns/@throws/@example)
- 行内注释 Why > What
- TODO(author date): 描述

## Git 提交

`[Phase X] type(scope): subject` — Conventional Commits

## 地图政治正确

必须包含台湾、南海诸岛等中国领土。

## 关键文件

- 设计规范：docs/superpowers/specs/2026-07-22-cr-map-design.md
- 类型定义：lib/types.ts
- 数据查询：lib/data.ts
- 状态管理：lib/store.ts
```

- [ ] **Step 2: 最终构建验证**

Run: `cd D:\Code\CRMap && npm run build`
Expected: 构建成功，无 TypeScript 错误，`out/` 目录生成

- [ ] **Step 3: 运行全部测试**

Run: `cd D:\Code\CRMap && npx jest`
Expected: 全部测试通过

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRMap && git add CLAUDE.md
git commit -m "[Phase 0] docs: CLAUDE.md 项目 AI 开发指令"
```

---

### Task 11: 可行性预研（Feasibility Spike）

**Files:**
- Create: `docs/superpowers/specs/feasibility-spike.md`

**Interfaces:**
- Consumes: 外部史料资源
- Produces: 预研报告，决定地图着色方案（正常/降级 A/B/C）

- [ ] **Step 1: 选 5 个代表性省份**

选择：北京、上海、辽宁、广东、四川

- [ ] **Step 2: 逐省查阅史料**

对每个省份，尝试构建 1966-1976 逐季/逐年的控制时间线。
查阅来源：地方志、学术研究、官方史料汇编。

记录格式：
```markdown
## 北京
| 时间段 | 控制派系 | 依据 | 史料来源 |
|--------|----------|------|----------|
| 1966.05-1966.08 | 中央文革小组 | 五一六通知成立 | xxx |
| 1966.08-1976.10 | 中央文革小组/军方 | 八届十一中全会后 | xxx |
```

- [ ] **Step 3: 评估结果并选择方案**

根据能构建时间线的省份数量：
- ≥20 省 → 正常方案
- 10-19 省 → 降级 A
- <10 省 → 降级 B
- 完全不可得 → 降级 C

- [ ] **Step 4: 写入预研报告**

Create `docs/superpowers/specs/feasibility-spike.md`，包含：
- 各省控制时间线（能构建的部分）
- 史料可获得性评估
- 选定的地图着色方案
- 下一步行动项

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRMap && git add docs/superpowers/specs/feasibility-spike.md
git commit -m "[Phase 0] docs: 可行性预研报告（省级派系控制史料可获得性）"
```

---

## Phase 0 验收清单

完成全部 Task 后，逐项验证：

- [ ] `npm run build` 成功，`out/` 目录生成
- [ ] `npx jest` 全部测试通过
- [ ] ECharts 能渲染中国地图轮廓（`/map` 页面可见）
- [ ] Cytoscape 集成已安装（Phase 2 验证渲染）
- [ ] Zustand store 的 `currentDate` 能在组件间同步
- [ ] GitHub Actions 工作流文件已创建
- [ ] `public/china.json` 下载成功且有效
- [ ] 可行性预研完成，地图着色方案已确定
- [ ] CLAUDE.md 已创建
- [ ] 所有代码已提交到 git

---

*本计划覆盖 Phase 0（基础设施）。Phase 1-5 将在 Phase 0 完成后另行制定详细计划。*
