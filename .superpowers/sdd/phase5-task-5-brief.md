### Task 5: 性能懒加载

**Files:**
- Modify: `app/map/page.tsx`（如需要补充）
- Modify: `app/graph/page.tsx`（如需要补充）

**Interfaces:**
- Consumes: 无
- Produces: dynamic import 懒加载

- [ ] **Step 1: 确认地图页面 Chart 懒加载**

确认 `ChinaMap` 已使用 `dynamic(() => import(...), { ssr: false })`（Phase 1 已实现）。如未完全，补充 `loading` 占位。

- [ ] **Step 2: 确认关系图页面懒加载**

确认 `FactionGraph` 已使用 `dynamic(() => import(...), { ssr: false })`（Phase 2 已实现）。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/
git commit -m "[Phase 5] perf: 图表组件懒加载优化"
```

---
