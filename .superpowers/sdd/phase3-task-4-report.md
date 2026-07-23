### Task 4: 人物详情页（/person/[id]）— Report

**Status:** DONE

**What was implemented:**
- `app/person/[id]/page.tsx` — 人物详情页，包含姓名、生卒年、生平、派系隶属时间线（链接到 /faction/[id]）、史料出处（SourceList 组件）
- `app/person/[id]/README.md` — 页面文档，参照 app/event/[id]/README.md 格式

**What was tested and results:**
- `npm run build` — 构建成功，所有 11 个人物页面（kuai-dafu, tan-lifu, jiang-qing, zhang-chunqiao, wang-hongwen, chen-boda, mao-zedong, lin-biao, yao-wenyuan, kang-sheng, qi-benyu）均作为 SSG 静态页面生成
- 类型检查通过，无 lint 错误

**Files changed:**
- Create: `app/person/[id]/page.tsx` (65 行)
- Create: `app/person/[id]/README.md` (55 行)

**Self-review findings:**
- 页面严格遵循四层架构：组件通过 `getPerson()` / `getFactionName()` 查询数据，未直接 import 数据文件（除 `people` 用于 `generateStaticParams`，与 event 页一致）
- `notFound()` 处理不存在的 ID
- 派系名称通过 `getFactionName()` 显示，链接到 `/faction/[id]`
- 布局与 event 页一致：`max-w-3xl mx-auto` 居中阅读布局
- 无 concerns

**Commits:**
- `7c9ba27` [Phase 3] feat(person): 添加人物详情页 /person/[id]
