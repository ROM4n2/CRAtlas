### Task 1: 安装 Cytoscape 依赖与类型

**Files:**
- Modify: `package.json`（通过 npm install）

**Interfaces:**
- Consumes: 无
- Produces: 可用的 Cytoscape 布局扩展和类型定义

- [ ] **Step 1: 安装 dagre 布局扩展和 Cytoscape 类型**

```bash
cd D:\Code\CRAtlas && npm install --save cytoscape-dagre@^2.5.0 && npm install --save-dev @types/cytoscape@^3.21.0
```

- [ ] **Step 2: 验证安装**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code\CRAtlas && git add package.json package-lock.json
git commit -m "[Phase 2] chore: 安装 cytoscape-dagre 布局扩展和 @types/cytoscape"
```

---
