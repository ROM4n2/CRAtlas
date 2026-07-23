### Task 1: Giscus 评论集成 — Report

**Status:** DONE
**Commit:** `3f1e9dd [Phase 4] feat(comments): 添加 Giscus 评论集成`

---

#### 完成项

1. **安装 @giscus/react**
   - `npm install @giscus/react@^3.1.0` — 新增 8 个包，无冲突。

2. **创建 `components/comments/GiscusComments.tsx`**
   - 客户端组件（`use client`），使用 `usePathname()` 获取当前路径。
   - 读取 4 个环境变量：`NEXT_PUBLIC_GISCUS_REPO` / `REPO_ID` / `CATEGORY` / `CATEGORY_ID`。
   - 配置缺失时静默返回 `null`，不破坏静态构建与默认页面展示。
   - Giscus 参数：`mapping="pathname"`、`term={pathname}`、`lang="zh-CN"`、`theme="light"`、`loading="lazy"`、`inputPosition="top"`。

3. **创建 `components/comments/README.md`**
   - 说明组件用途、环境变量清单、使用方式。

4. **集成到三个详情页**
   - `app/event/[id]/page.tsx` — 在 SourceList 下方追加 `<GiscusComments />`。
   - `app/person/[id]/page.tsx` — 同上。
   - `app/faction/[id]/page.tsx` — 同上。
   - 组件外层加了分隔线与「评论」标题，视觉上与正文内容区隔。

5. **`.env.example`**
   - 已有完整的 Giscus 配置段，无需修改。

6. **构建验证**
   - `npm run build` 通过，51 个静态页面全部生成，无错误。

---

#### 文件清单

| 操作 | 文件 |
| --- | --- |
| 新增 | `components/comments/GiscusComments.tsx` |
| 新增 | `components/comments/README.md` |
| 修改 | `app/event/[id]/page.tsx` |
| 修改 | `app/person/[id]/page.tsx` |
| 修改 | `app/faction/[id]/page.tsx` |
| 修改 | `package.json`（新增 `@giscus/react` 依赖） |
| 修改 | `package-lock.json` |

---

#### 备注

- Giscus 配置需在生产环境 `.env` / GitHub Secrets 中填入真实值（仓库、Repo ID、分类、分类 ID），否则评论区静默隐藏。
- 使用 `pathname` 映射确保每个事件/人物/派系页面对应独立的 GitHub Discussion 主题。
