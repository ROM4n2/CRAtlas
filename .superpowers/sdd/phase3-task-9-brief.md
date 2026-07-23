### Task 9: 最终验证与集成

**Files:**
- 无新建文件，全量验证

**Interfaces:**
- Consumes: 全部 Phase 3 交付物
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

- [ ] **Step 4: 检查 Navbar 所有链接**

确认 Navbar 中所有路由（地图/时间轴/关系图/关于）对应的页面均存在，无 404。

- [ ] **Step 5: 检查目录 README 完整性**

确认所有新建目录都有 README.md：
- `app/event/[id]/`
- `app/person/[id]/`
- `app/faction/[id]/`
- `app/timeline/`
- `app/about/`
- `components/ui/`
- `components/timeline/`

- [ ] **Step 6: 提交（如有修复）**

如有修复，提交：
```bash
cd D:\Code\CRAtlas && git add -A
git commit -m "[Phase 3] fix: 集成验证修复"
```

---
