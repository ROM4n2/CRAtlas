### Task 1: 自定义 404 页面 — Report

**Status:** DONE

**Commits:**
- `030784a` [Phase 5] feat(ui): 添加自定义 404 页面

**Changes:**
- 创建 `app/not-found.tsx`：自定义 404 页面组件，包含中文标题、说明文字和返回首页链接
- 创建 `app/not-found/README.md`：页面文档，遵循 `app/map/README.md` 格式

**Build:** 通过。`/_not-found` 路由已正确生成（146 B / 87.6 kB First Load JS），51 个静态页面全部生成成功。

**Self-review:**
- 文件头注释符合 `@file/@brief` 规范
- 使用 `next/link` 的 `Link` 组件，符合 Next.js 最佳实践
- 纯展示组件，无状态、无副作用，适合 SSG 导出
- README 文档结构完整（职责、文件清单、数据流、使用方式、约定）
- 代码与 brief 完全一致，无偏差

**Concerns:** 无
