### Task 8: 最终验证与集成

**Files:**
- 无新建文件，全量验证

**Interfaces:**
- Consumes: 全部 Phase 2 交付物
- Produces: 验证通过的完整构建

- [ ] **Step 1: 运行完整测试套件**

Run: `cd D:\Code\CRAtlas && npx jest`
Expected: 全部测试通过（含新增图谱查询测试）

- [ ] **Step 2: 运行构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，6/6 页面（含 `/graph`）

- [ ] **Step 3: 运行类型检查**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 4: 验证 Navbar 链接**

确认 Navbar 中"关系图"链接指向 `/graph` 且页面可访问。

- [ ] **Step 5: 最终提交（如有修复）**

如有修复，提交：
```bash
cd D:\Code\CRAtlas && git add -A
git commit -m "[Phase 2] fix(graph): 集成验证修复"
```

---
