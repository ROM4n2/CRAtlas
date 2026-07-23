### Task 3: 事件详情页（/event/[id]）— Report

**Status:** DONE

**What I implemented:**
- `app/event/[id]/page.tsx` — 事件详情页，包含标题、别名、日期、描述、地点、参与者（链接到 /person/[id]）、相关事件（链接到 /event/[id]）、史料出处（SourceList）
- `app/event/[id]/README.md` — 页面文档，描述职责、文件清单、数据流、使用方式、约定

**What I tested and test results:**
- `npm run build` — 构建成功，生成 10 个静态事件页面（SSG），全部 16 个页面正常生成
- 路由表显示 `/event/[id]` 标记为 SSG，包含 10 条预生成路径

**Files changed:**
- Create: `app/event/[id]/page.tsx`
- Create: `app/event/[id]/README.md`

**Self-review findings:**
- 代码与 brief 完全一致
- 遵循四层架构：组件通过 `getEvent()`/`getPerson()` 查询数据，未直接 import 数据文件
- `generateStaticParams` 适配 `output: 'export'` 静态导出
- `notFound()` 处理不存在的 ID
- 参与者/相关事件链接使用 Next.js `Link` 组件
- 复用 `SourceList` 组件显示史料出处

**Issues or concerns:**
- 无
