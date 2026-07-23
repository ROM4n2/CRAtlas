### Task 3: 内容贡献指南 + PR 模板

**Status:** DONE

**Commits:**
- `650db70` [Phase 4] docs: 添加 Issue 模板和 PR 模板

**Created Files:**
- `.github/ISSUE_TEMPLATE/correction.md` — 修正现有内容的 Issue 模板（低门槛入口）
- `.github/ISSUE_TEMPLATE/addition.md` — 新增内容的 Issue 模板
- `.github/PULL_REQUEST_TEMPLATE.md` — PR 模板（正式入口）

**Design Decisions:**
- 遵循设计规范 §5.5 的双路径贡献策略：Issue 为低门槛入口，PR 为正式入口
- Issue 模板字段覆盖规范要求的全部要素：问题类型、涉及实体 ID、建议内容、史料来源
- 史料来源字段细化到来源名称、作者、页码、出版信息和可访问链接
- PR 模板增加实体 ID 表格和自查清单，确保贡献质量
- 标签预设为 `correction` 和 `addition`，便于自动分类

**Notes:**
- 无阻塞问题，模板内容与设计规范完全对齐
