### Task 3: 无障碍增强（ARIA）

**Files:**
- Modify: `components/timeline/TimeAxis.tsx`（如需要补充）
- Modify: `components/graph/GraphFilter.tsx`
- Modify: `components/ui/SearchModal.tsx`
- Modify: `components/timeline/EventCard.tsx`
- Modify: `components/map/EventSidebar.tsx`
- Modify: `components/map/EventPopup.tsx`

**Interfaces:**
- Consumes: 无
- Produces: ARIA 属性增强

- [ ] **Step 1: 逐文件添加 ARIA 属性**

检查并添加：
- `SearchModal.tsx`: 弹窗添加 `role="dialog"` `aria-modal="true"` `aria-labelledby`
- `GraphFilter.tsx`: 按钮组添加 `role="group"` `aria-label`
- `EventCard.tsx`: 卡片添加 `role="article"` 或适当角色
- `EventSidebar.tsx`: 列表添加 `role="list"`，项添加 `role="listitem"`
- `EventPopup.tsx`: 卡片添加 `role="region"` `aria-label`
- 所有图标按钮确保 `aria-label` 存在

- [ ] **Step 2: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add components/
git commit -m "[Phase 5] feat(a11y): 无障碍 ARIA 属性增强"
```

---
