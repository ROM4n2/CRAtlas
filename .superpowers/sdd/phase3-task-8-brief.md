### Task 8: 内容扩充

**Files:**
- Modify: `data/events.ts`
- Modify: `data/people.ts`
- Modify: `data/factions.ts`
- Modify: `data/relationships.ts`

**Interfaces:**
- Consumes: `lib/types.ts`
- Produces: 扩充后的数据集

- [ ] **Step 1: 扩充事件数据**

在 `data/events.ts` 中追加更多关键事件。目标：覆盖 1966-1976 每年至少 1-2 个事件。

可参考的历史事件（部分已有，需补充）：
- 1966: 二月提纲(已有)、五一六通知(已有)
- 1967: 上海一月风暴、二月逆流、武汉七二〇事件(已有)
- 1968: 上山下乡运动(已有)
- 1971: 林彪事件(已有)
- 1976: 四五运动(已有)、粉碎四人帮(已有)

根据设计规范 §3.5，Phase 3 完成时预期事件 50-100 个。本次至少扩充到 15-20 个。

- [ ] **Step 2: 扩充人物数据**

在 `data/people.ts` 中追加更多关键人物。每条人物必须有至少一个 sources 条目。

- [ ] **Step 3: 扩充派系数据**

在 `data/factions.ts` 中追加更多派系。

- [ ] **Step 4: 扩充关系数据**

在 `data/relationships.ts` 中追加更多关系（membership/causality/faction-interaction/social）。

- [ ] **Step 5: 验证构建和测试**

Run: `cd D:\Code\CRAtlas && npm run build && npx jest`
Expected: 构建成功，测试通过

- [ ] **Step 6: 提交**

```bash
cd D:\Code\CRAtlas && git add data/
git commit -m "[Phase 3] feat(data): 扩充事件/人物/派系/关系数据"
```

---
