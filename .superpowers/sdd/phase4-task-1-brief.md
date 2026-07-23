### Task 1: Giscus 评论集成

**Files:**
- Create: `components/comments/GiscusComments.tsx`
- Create: `components/comments/README.md`
- Modify: `app/event/[id]/page.tsx`
- Modify: `app/person/[id]/page.tsx`
- Modify: `app/faction/[id]/page.tsx`
- Modify: `.env.example`
- Modify: `package.json`（安装 @giscus/react）

**Interfaces:**
- Consumes: Giscus 配置（环境变量）
- Produces: `GiscusComments` 组件

- [ ] **Step 1: 安装 @giscus/react**

```bash
cd D:\Code\CRAtlas && npm install @giscus/react@^3.1.0
```

- [ ] **Step 2: 创建 GiscusComments 组件**

Create `components/comments/GiscusComments.tsx`（代码见计划文档）

- [ ] **Step 3: 在各详情页集成**

- [ ] **Step 4: 更新 .env.example**

- [ ] **Step 5: 验证构建**

- [ ] **Step 6: 提交**

```bash
cd D:\Code\CRAtlas && git add components/comments/ app/event/ app/person/ app/faction/ .env.example package.json package-lock.json
git commit -m "[Phase 4] feat(comments): 添加 Giscus 评论集成"
```

---
