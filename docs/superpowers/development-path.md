# CRAtlas 开发路径（Development Path）

> 本文档定义 CRAtlas 项目的标准开发流程，是 superpowers 技能体系与项目 SDD 规范的结合。
> 所有开发活动必须遵循此流程。

---

## 总览

```
using-superpowers (会话起点)
    ↓
writing-plans (制定实施计划)
    ↓
subagent-driven-development (逐任务执行):
  每个 Task:
    ① 写 brief (开发前)
    ② 派 implementer subagent (标准模板)
    ③ implementer 实现 + 测试 + 自审 + 写 report
    ④ 生成 diff 文件 (scripts/review-package)
    ⑤ 派 task reviewer subagent (标准模板)
    ⑥ reviewer 给出 spec compliance + quality verdict
    ⑦ 不通过 → fix subagent → 回到 ⑤
    ⑧ 通过 → 更新 progress.md
  全部完成后:
    ⑨ whole-branch final review
    ⑩ finishing-a-development-branch
```

---

## 阶段 1：会话起点（using-superpowers）

每次会话开始时，检查是否有适用的 superpowers 技能。

| 场景 | 应调用的技能 |
|------|-------------|
| 创建新功能/组件 | `brainstorming` → `writing-plans` |
| 修复 Bug | `systematic-debugging` |
| 执行已有计划 | `subagent-driven-development` |
| 完成开发分支 | `finishing-a-development-branch` |
| 代码审查 | `requesting-code-review` |

---

## 阶段 2：制定计划（writing-plans）

### 计划文件位置
`docs/superpowers/plans/{date}-{phase-name}.md`

### 计划文档结构
```markdown
# {Phase 名称} 实施计划

**Goal:** 一句话目标
**Architecture:** 技术方案概述
**Tech Stack:** 使用的技术

## Global Constraints
- 零服务器、命名规范、Git 格式、依赖方向、Ponytail 原则...

## File Structure
（树形展示新建/修改的文件）

### Task 1: 任务标题
**Files:**
- Create/Modify: 文件路径
**Interfaces:**
- Consumes: 输入
- Produces: 输出
- [ ] Step 1: 操作
- [ ] Step 2: 验证 (Run/Expected)
- [ ] Step 3: 提交

### Task 2: ...
```

### 计划验收标准
- 每个 Task 独立、可测试、有明确的验证步骤
- Task 之间依赖关系清晰
- Global Constraints 覆盖所有强制规则

---

## 阶段 3：逐任务执行（subagent-driven-development）

### 3.1 每个 Task 的 SDD 文档

#### Brief（开发前创建）
- **路径**: `.superpowers/sdd/phase{N}-task-{M}-brief.md`
- **时机**: implementer subagent 派发前（可由主代理或 implementer 自己写）
- **内容**:
  ```
  ### Task M: 标题
  **Files:** Create/Modify 列表
  **Interfaces:** Consumes / Produces
  - [ ] Step 1: 具体操作
  - [ ] Step 2: 验证 (Run/Expected)
  - [ ] Step 3: 提交命令
  ```

#### Report（开发后创建）
- **路径**: `.superpowers/sdd/phase{N}-task-{M}-report.md`
- **时机**: implementer 完成后
- **内容**:
  ```markdown
  # Task M Report: 标题
  ## Status: DONE | DONE_WITH_CONCERNS | BLOCKED
  ## Summary
  ## Changes（文件变更列表）
  ## Verification（测试/构建/类型检查结果）
  ## Commit: hash + message
  ## Concerns（遗留问题）
  ```

### 3.2 Implementer Subagent 派发

使用 `~/.claude/skills/subagent-driven-development/implementer-prompt.md` 模板。

**关键要素**:
- 指定 model（按 SKILL.md Model Selection 规则）
- 提供 brief 文件路径
- 提供 scene-setting 上下文
- 明确要求 TDD（如适用）
- 要求自审（self-review）
- 指定 report 文件路径

### 3.3 Task Reviewer Subagent 派发

使用 `~/.claude/skills/subagent-driven-development/task-reviewer-prompt.md` 模板。

**关键要素**:
- 提供 brief 文件路径
- 提供 implementer report 文件路径
- 提供 diff 文件路径（由 `scripts/review-package BASE HEAD` 生成）
- 提供 global constraints
- Reviewer 给出两个 verdict：spec compliance + code quality

### 3.4 审查闭环

```
reviewer 不通过 → 派 fix subagent（附 reviewer 报告）→ implementer 修复 → 重新 review
reviewer 通过 → 标记 task 完成 → 更新 progress.md → 下一个 task
```

### 3.5 进度台账更新

每个 Task 完成后更新 `.superpowers/sdd/progress.md`：

```markdown
## Phase N: 阶段名称 — IN PROGRESS

- [x] Task 1: 标题 — commit_hash (验证说明)
- [ ] Task 2: 标题
```

---

## 阶段 4：完成开发（finishing-a-development-branch）

所有 Task 完成后：

1. **Whole-branch final review**: 派 code reviewer subagent 审查整个分支
2. **运行完整验证**: `npm run build && npx jest && npx tsc --noEmit`
3. **更新 progress.md**: 标记 Phase 为 COMPLETE
4. **生成 handoff 文档**: 如需要，更新 `docs/superpowers/handoff-{date}.md`

---

## SDD 文件命名规范

| 文件类型 | 命名模式 | 路径 |
|----------|----------|------|
| Brief | `phase{N}-task-{M}-brief.md` | `.superpowers/sdd/` |
| Report | `phase{N}-task-{M}-report.md` | `.superpowers/sdd/` |
| 计划 | `{date}-{phase-name}.md` | `docs/superpowers/plans/` |
| 审查报告 | `task-{M}-{commits|diff|stat|package}.txt` | `.superpowers/sdd/review/` |
| 进度台账 | `progress.md` | `.superpowers/sdd/` |
| 设计规范 | `{date}-{name}.md` | `docs/superpowers/specs/` |
| 检验报告 | `{date}-{phase}-review.md` | `docs/superpowers/specs/` |

---

## 项目特有约束

### 架构（四层，严格依赖方向）
```
接口层 (app/, components/) → 应用层 (lib/data.ts, lib/store.ts) → 核心层 (lib/types.ts) ← 基础设施层 (data/)
```
- **组件不得直接 import 数据文件**，必须通过 `lib/data.ts` 查询函数

### Git 提交
`[Phase X] type(scope): subject` — Conventional Commits

### 代码注释
- 文件头 `@file/@brief`
- 公共函数 TSDoc（`@param`/`@returns`/`@throws`/`@example`）
- 行内注释 Why > What

### 命名
- 文件夹 kebab-case
- 组件文件 PascalCase
- 类型 PascalCase 无 I 前缀
- 变量 camelCase

### 地图政治正确
必须包含台湾、南海诸岛等中国领土。

### Ponytail 原则
YAGNI、stdlib first、最短 diff、无未请求的抽象。

---

## 子代理安全注意事项

- 安全分类器（LongCat/kimi）间歇性不可用，导致子代理无法 commit/verify
- 主代理需补验补提交
- 如子代理被分类器阻断，主代理用 Write/Edit 工具直接创建文件，Bash 恢复后批量验证提交

---

## 技能优先级

| 优先级 | 技能 | 用途 |
|--------|------|------|
| 1 | `using-superpowers` | 会话起点，检查适用技能 |
| 2 | `writing-plans` | 制定实施计划 |
| 3 | `subagent-driven-development` | 逐任务执行计划 |
| 4 | `test-driven-development` | 子代理实现时遵循 TDD |
| 5 | `verification-before-completion` | 任何完成前的验证 |
| 6 | `ponytail` | 开发时保持 YAGNI |
| 7 | `finishing-a-development-branch` | 完成开发分支 |
| 8 | `requesting-code-review` | 代码审查 |

---

*本文档是 CRAtlas 项目开发的"合同"，任何设计变更需先更新本文档。*
