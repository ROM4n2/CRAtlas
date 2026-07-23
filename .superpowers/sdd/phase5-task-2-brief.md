### Task 2: 移动端适配

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `app/map/page.tsx`
- Modify: `app/graph/page.tsx`
- Modify: `app/timeline/page.tsx`

**Interfaces:**
- Consumes: 无
- Produces: 响应式布局

- [ ] **Step 1: Navbar 移动端 hamburger menu**

Modify `components/layout/Navbar.tsx`：
- 标记为 `'use client'`（需要 useState 控制菜单开关）
- 添加 `isMenuOpen` state
- 小屏幕（`md` 断点以下）显示汉堡按钮，点击展开/收起导航链接
- 大屏幕（`md` 及以上）保持现有水平导航

- [ ] **Step 2: 地图页面移动端适配**

Modify `app/map/page.tsx`：
- 小屏幕：侧边栏从 `w-80 fixed right` 改为全宽底部抽屉或隐藏
- 地图高度从固定 `h-[600px]` 改为自适应

- [ ] **Step 3: 关系图页面移动端适配**

Modify `app/graph/page.tsx`：
- 小屏幕：筛选面板和详情侧边栏改为可折叠/隐藏

- [ ] **Step 4: 时间轴页面移动端适配**

Modify `app/timeline/page.tsx`：
- 小屏幕：调整时间轴控件布局，按钮和滑块换行

- [ ] **Step 5: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 6: 提交**

```bash
cd D:\Code\CRAtlas && git add app/ components/layout/Navbar.tsx
git commit -m "[Phase 5] feat(responsive): 移动端响应式适配"
```

---
