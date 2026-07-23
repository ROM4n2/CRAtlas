### Task 2: 修复 Phase 0 — 北京地区控制记录重叠

**Files:**
- Modify: `data/regionControls.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `RegionControlRecord`
- Produces: 无重叠的地区控制数据

- [ ] **Step 1: 修复北京重叠记录**

当前 `data/regionControls.ts` 有两条北京记录在 1966-05-29 ~ 1966-08-01 重叠。删除 contested 那条（它已被 controlled 记录覆盖），保留一条完整的北京记录。

修改 `data/regionControls.ts`，将三条记录改为：
```typescript
export const regionControls: RegionControlRecord[] = [
  {
    regionId: 'beijing',
    startDate: '1966-05-28',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'central-cultural-revolution-group', strength: 0.9 }],
    note: '中央文革小组所在地，造反派稳固控制。1966年8月后中央文革小组主导，1967年4月北京市革委会成立后军方参与联合控制。',
    sources: [
      { title: '《北京地方志·文革卷》', type: 'local-gazetteer', date: '2000-01-01' },
      { title: '王年一《大动乱的年代》', type: 'academic', date: '1988-01-01' },
    ],
  },
  {
    regionId: 'shanghai',
    startDate: '1967-02-01',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'shanghai-worker-rebel', strength: 0.85 }],
    note: '一月风暴后造反派掌权，张春桥/姚文元/王洪文控制',
    sources: [
      { title: '《上海地方志·文革卷》', type: 'local-gazetteer', date: '2000-01-01' },
    ],
  },
];
```

- [ ] **Step 2: 验证编译**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code/CRAtlas && git add data/regionControls.ts
git commit -m "[Phase 1] fix(data): 修复北京地区控制记录重叠，移除 contested 冗余记录"
```

---

