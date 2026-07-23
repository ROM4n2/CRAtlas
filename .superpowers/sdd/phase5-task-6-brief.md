### Task 6: 最终验证与发布准备

**Files:**
- 无新建文件，全量验证

**Interfaces:**
- Consumes: 全部 Phase 5 交付物
- Produces: 验证通过的完整构建

- [ ] **Step 1: 运行完整测试套件**

Run: `cd D:\Code\CRAtlas && npx jest`
Expected: 全部测试通过

- [ ] **Step 2: 运行构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，所有静态页面生成

- [ ] **Step 3: 运行类型检查**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 4: 检查所有页面可访问**

确认所有路由页面可访问，无 404（除测试 404 页面本身）。

- [ ] **Step 5: 提交（如有修复）**

如有修复，提交：
```bash
cd D:\Code\CRAtlas && git add -A
git commit -m "[Phase 5] fix: 发布前验证修复"
```

---
