### Task 7: 关于页（/about）

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/about/README.md`

**Interfaces:**
- Consumes: 无（静态内容）
- Produces: 关于页

- [ ] **Step 1: 创建关于页**

Create `app/about/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   关于页——项目说明、立场声明、史料来源说明、使用指南。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">关于 CRAtlas</h1>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">项目说明</h2>
        <p className="text-gray-600 mt-2">
          CRAtlas 是 1966-1976 年文化大革命期间造反派与保皇派势力演变、关键事件、人物关系的可视化平台。本项目以马列毛主义为基本编纂立场，旨在为马列毛主义者、进步人士和历史自学者提供可靠的历史参考资料。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">意识形态立场声明</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>以马列毛主义为编纂立场</li>
          <li>区分编纂视角与史料来源</li>
          <li>不声称"价值中立"，但承诺史料准确</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">史料来源说明</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>官方档案/中央文件</li>
          <li>学术研究成果</li>
          <li>媒体报道（如《人民日报》原件）</li>
          <li>当事人回忆录</li>
          <li>地方志</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">使用指南</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>地图视图：按省份查看派系势力分布与事件标注</li>
          <li>时间轴视图：按时间顺序浏览关键事件</li>
          <li>关系图视图：探索人物、派系、事件之间的关系网络</li>
          <li>搜索：按 Cmd+K 打开全局搜索</li>
        </ul>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: 创建 app/about/README.md**

参照 `app/map/README.md` 格式。

- [ ] **Step 3: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add app/about/
git commit -m "[Phase 3] feat(about): 添加关于页 /about"
```

---
