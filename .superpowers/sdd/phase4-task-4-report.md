### Task 4: 关于页完善 — Report

**Status:** DONE
**Commit:** `bcc6e13` [Phase 4] feat(about): 完善关于页贡献指南

**Changes:**
- 在 `app/about/page.tsx` 末尾新增"贡献指南"section，包含三个子块：
  - **低门槛入口（推荐）**：说明详情页"建议修正"按钮跳转 GitHub Issues 预填模板，并提供直接创建 Issue 的链接（`https://github.com/ROM4n2/CRAtlas/issues/new`）
  - **正式入口**：链接到 GitHub Pull Request（`https://github.com/ROM4n2/CRAtlas/pulls`），说明适合熟悉 Git 的贡献者
  - **Issue 模板说明**：列出问题类型、涉及实体 ID、建议内容、史料来源四项必填信息
- 外链使用 `target="_blank" rel="noopener noreferrer"` 与 Tailwind `text-blue-600 hover:underline` 样式

**Build:** `npm run build` 通过，`/about` 页正常静态生成。

**Notes:**
- 贡献"建议修正"按钮本身属于详情页组件工作（其他 Task 范围），本 Task 仅完善关于页文案说明。
