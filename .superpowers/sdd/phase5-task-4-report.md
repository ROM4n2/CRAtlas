### Task 4: SEO 每页 meta 标签 — Report

**Status:** DONE
**Commit:** e5fbb50 [Phase 5] feat(seo): 详情页独立 meta 标签

**Changes:**
- `app/event/[id]/page.tsx` — 添加 `generateMetadata`，标题 `${event.title} - CRAtlas`，描述取 description 前 160 字符
- `app/person/[id]/page.tsx` — 添加 `generateMetadata`，标题 `${person.name} - CRAtlas`，描述含生卒年 + biography 前 120 字符
- `app/faction/[id]/page.tsx` — 添加 `generateMetadata`，标题 `${faction.name} - CRAtlas`，描述含派系类型 + description 前 120 字符

**Build:** ✓ `npm run build` 通过，51 个静态页全部生成成功。

**Notes:**
- 三个页面找不到实体时均返回兜底 title（"未找到 - CRAtlas"）。
- 使用 Next.js 14 `generateMetadata` 标准模式，`params` 同步读取（App Router SSG 兼容）。
