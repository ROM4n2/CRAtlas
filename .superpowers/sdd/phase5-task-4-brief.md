### Task 4: SEO 每页 meta 标签

**Files:**
- Modify: `app/event/[id]/page.tsx`
- Modify: `app/person/[id]/page.tsx`
- Modify: `app/faction/[id]/page.tsx`

**Interfaces:**
- Consumes: 实体数据
- Produces: 每页独立 meta

- [ ] **Step 1: 事件详情页 meta**

Modify `app/event/[id]/page.tsx`，添加：
```typescript
export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = getEvent(params.id);
  if (!event) return { title: '事件未找到 - CRAtlas' };
  return {
    title: `${event.title} - CRAtlas`,
    description: event.description.slice(0, 160),
  };
}
```

- [ ] **Step 2: 人物详情页 meta**

Modify `app/person/[id]/page.tsx`，添加 `generateMetadata`。

- [ ] **Step 3: 派系详情页 meta**

Modify `app/faction/[id]/page.tsx`，添加 `generateMetadata`。

- [ ] **Step 4: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add app/event/ app/person/ app/faction/
git commit -m "[Phase 5] feat(seo): 详情页独立 meta 标签"
```

---
