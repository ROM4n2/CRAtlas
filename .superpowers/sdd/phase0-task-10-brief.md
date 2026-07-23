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

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，无 TypeScript 错误，`out/` 目录生成

- [ ] **Step 3: 运行全部测试**

Run: `cd D:\Code\CRAtlas && npx jest`
Expected: 全部测试通过

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add CLAUDE.md
git commit -m "[Phase 0] docs: CLAUDE.md 项目 AI 开发指令"
```

---

