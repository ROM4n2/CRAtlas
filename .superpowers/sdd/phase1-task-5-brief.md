### Task 5: 添加 getFactionColor 辅助函数

**Files:**
- Modify: `lib/data.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `FactionType`
- Produces: `getFactionColor(factionType)` 函数

- [ ] **Step 1: 在 lib/data.ts 末尾添加 getFactionColor**

```typescript
/**
 * 根据派系类型返回对应颜色（用于地图着色和图例）。
 *
 * @param factionType - 派系类型
 * @returns HEX 颜色字符串
 */
export function getFactionColor(factionType: FactionType | undefined): string {
  switch (factionType) {
    case 'rebel': return '#DC2626';
    case 'conservative': return '#2563EB';
    case 'military': return '#CA8A04';
    case 'other': return '#9333EA';
    default: return '#9CA3AF'; // nodata
  }
}

/**
 * 根据派系 ID 返回派系名称（用于显示）。
 *
 * @param factionId - 派系 ID
 * @returns 派系名称，未找到返回 "未知"
 */
export function getFactionName(factionId: string): string {
  return factions.find((f) => f.id === factionId)?.name ?? '未知';
}

/**
 * 根据派系 ID 返回派系类型。
 *
 * @param factionId - 派系 ID
 * @returns FactionType，未找到返回 undefined
 */
export function getFactionType(factionId: string): FactionType | undefined {
  return factions.find((f) => f.id === factionId)?.factionType;
}
```

同时需要在 import 中添加 `FactionType`：
```typescript
import type {
  Event,
  Person,
  Faction,
  Region,
  Relationship,
  RegionControlMap,
  SearchResult,
  Affiliation,
  FactionType,
} from '@/lib/types';
```

- [ ] **Step 2: 验证编译**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 3: 提交**

```bash
cd D:\Code/CRAtlas && git add lib/data.ts
git commit -m "[Phase 1] feat(data): 添加 getFactionColor/getFactionName/getFactionType 辅助函数"
```

---

