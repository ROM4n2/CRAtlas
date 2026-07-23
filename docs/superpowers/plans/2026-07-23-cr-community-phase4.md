# CRAtlas Phase 4 — 交流功能实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** 社区互动 — 评论、笔记、内容贡献。

**Tech Stack:** Next.js 14+ · TypeScript · Giscus (GitHub Discussions) · localStorage

## Global Constraints

- **零服务器**：纯静态站点，`output: 'export'`
- **命名规范**：文件夹 kebab-case / 组件文件 PascalCase
- **代码注释**：每个源文件顶部 @file/@brief；公共函数 TSDoc
- **Git 提交**：`[Phase X] type(scope): subject` 格式
- **依赖方向**：接口层 → 应用层 → 核心层 ← 基础设施层
- **Ponytail**：YAGNI, stdlib first
- **每个文件夹必须包含 README.md**
- **SDD 文档**：每个 Task 前写 brief，每个 Task 后写 report

## 前置条件

- [ ] GitHub Discussions 已在 CRAtlas 仓库启用
- [ ] 获取 Giscus 配置（repo ID, category ID, repo 名）
- [ ] 创建三个 Discussion 分类：事件讨论、人物讨论、派系讨论

## 任务依赖

```
Task 1 (Giscus) ──→ Task 4 (关于页完善)
Task 2 (笔记) ────→ 独立
Task 3 (贡献指南) ─→ 独立
```

---

### Task 1: Giscus 评论集成

**Files:**
- Create: `components/comments/GiscusComments.tsx`
- Modify: `app/event/[id]/page.tsx`
- Modify: `app/person/[id]/page.tsx`
- Modify: `app/faction/[id]/page.tsx`
- Create: `components/comments/README.md`

**Interfaces:**
- Consumes: Giscus 配置（环境变量）
- Produces: `GiscusComments` 组件

- [ ] **Step 1: 创建 GiscusComments 组件**

Create `components/comments/GiscusComments.tsx`:
```typescript
/**
 * @file    GiscusComments.tsx
 * @brief   Giscus 评论集成——基于 GitHub Discussions 的每实体评论区。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 *
 * @description
 * 每个实体（事件/人物/派系）页面一个独立评论区。
 * 使用 pathname 作为 discussion 匹配键。
 */

'use client';

import Giscus from '@giscus/react';

interface GiscusCommentsProps {
  category: string;
}

export default function GiscusComments({ category }: GiscusCommentsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <Giscus
        id="comments"
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID as string}
        category={category}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID as string}
        mapping="pathname"
        term="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
```

- [ ] **Step 2: 安装 giscus**

```bash
cd D:\Code\CRAtlas && npm install @giscus/react@^3.1.0
```

- [ ] **Step 3: 在各详情页集成**

在 `app/event/[id]/page.tsx`、`app/person/[id]/page.tsx`、`app/faction/[id]/page.tsx` 末尾添加 `<GiscusComments category="..." />`。

- [ ] **Step 4: 更新 .env.example**

添加 Giscus 配置项。

- [ ] **Step 5: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功（Giscus 是客户端组件，SSG 兼容）

- [ ] **Step 6: 提交**

```bash
cd D:\Code\CRAtlas && git add components/comments/ app/event/ app/person/ app/faction/ .env.example package.json package-lock.json
git commit -m "[Phase 4] feat(comments): 添加 Giscus 评论集成"
```

---

### Task 2: 笔记/标注功能

**Files:**
- Create: `components/ui/NotesPanel.tsx`
- Create: `lib/notes.ts`
- Modify: `app/event/[id]/page.tsx`
- Modify: `app/person/[id]/page.tsx`
- Modify: `app/faction/[id]/page.tsx`

**Interfaces:**
- Consumes: localStorage
- Produces: `NotesPanel` 组件 + 笔记 CRUD 函数

- [ ] **Step 1: 创建笔记工具函数**

Create `lib/notes.ts`：
```typescript
export interface Note {
  id: string;
  entityId: string;
  entityType: 'event' | 'person' | 'faction';
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function getNotes(): Note[];
export function getNote(entityId: string): Note | undefined;
export function saveNote(entityId: string, entityType: 'event' | 'person' | 'faction', content: string): Note;
export function deleteNote(entityId: string): void;
```

- [ ] **Step 2: 创建 NotesPanel 组件**

Create `components/ui/NotesPanel.tsx` — 客户端组件，显示/编辑当前实体笔记。

- [ ] **Step 3: 在各详情页集成**

- [ ] **Step 4: 验证构建和测试**

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add lib/notes.ts components/ui/NotesPanel.tsx app/event/ app/person/ app/faction/
git commit -m "[Phase 4] feat(notes): 添加 localStorage 笔记功能"
```

---

### Task 3: 内容贡献指南 + PR 模板

**Files:**
- Create: `.github/ISSUE_TEMPLATE/correction.md`
- Create: `.github/ISSUE_TEMPLATE/addition.md`
- Create: `.github/PULL_REQUEST_TEMPLATE.md`
- Modify: `docs/superpowers/specs/2026-07-22-cr-map-design.md`（§5.5 关于页内容）

**Interfaces:**
- Consumes: 无
- Produces: GitHub 模板文件

- [ ] **Step 1: 创建 Issue 模板**

`correction.md`（修正）：问题类型、涉及实体 ID、当前内容、建议修正、史料来源

`addition.md`（新增）：实体类型、实体 ID、名称、描述、史料来源

- [ ] **Step 2: 创建 PR 模板**

`PULL_REQUEST_TEMPLATE.md`：变更类型、涉及实体、史料来源、自查清单

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add .github/
git commit -m "[Phase 4] docs: 添加 Issue 模板和 PR 模板"
```

---

### Task 4: 关于页完善 + 笔记入口

**Files:**
- Modify: `app/about/page.tsx`

**Interfaces:**
- Consumes: 无
- Produces: 完善的关于页

- [ ] **Step 1: 补充贡献指南**

在 `/about` 页添加：
- 低门槛入口：每个详情页底部"建议修正"按钮 → 跳转 GitHub Issues 预填模板
- 正式入口：GitHub Pull Request
- Issue 模板说明

- [ ] **Step 2: 验证构建**

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add app/about/
git commit -m "[Phase 4] feat(about): 完善关于页贡献指南"
```

---

### Task 5: 最终验证

**Files:**
- 无新建文件，全量验证

- [ ] **Step 1: 运行测试**
- [ ] **Step 2: 运行构建**
- [ ] **Step 3: 运行类型检查**
- [ ] **Step 4: 提交（如有修复）**

```bash
cd D:\Code\CRAtlas && git add -A
git commit -m "[Phase 4] fix: 集成验证修复"
```

---

## Phase 4 验收清单

- [ ] Giscus 评论在详情页正常加载
- [ ] 笔记功能 CRUD 正常，localStorage 持久化
- [ ] Issue 模板在 GitHub 上可用
- [ ] PR 模板在 GitHub 上可用
- [ ] 关于页贡献指南完整
- [ ] `npm run build` 成功
- [ ] `npx jest` 全部通过
- [ ] SDD brief + report 齐全
- [ ] progress.md 更新

---

*本计划覆盖 Phase 4（交流功能）。*
