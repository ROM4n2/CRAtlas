### Task 5: 状态管理（lib/store.ts）

**Files:**
- Create: `lib/store.ts`
- Test: `lib/store.test.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 中的 `TimeState` 相关类型
- Produces: Zustand store 实例，`useTimeStore` hook

- [ ] **Step 1: 编写失败测试**

Create `lib/store.test.ts`:
```typescript
import { useTimeStore } from './store';

describe('useTimeStore', () => {
  beforeEach(() => {
    useTimeStore.setState({
      currentDate: '1966-01-01',
      isPlaying: false,
      speed: 1,
      dateRange: null,
    });
  });

  it('应有正确的初始状态', () => {
    const state = useTimeStore.getState();
    expect(state.currentDate).toBe('1966-01-01');
    expect(state.isPlaying).toBe(false);
    expect(state.speed).toBe(1);
    expect(state.dateRange).toBeNull();
  });

  it('setDate 应更新 currentDate', () => {
    useTimeStore.getState().setDate('1967-01-01');
    expect(useTimeStore.getState().currentDate).toBe('1967-01-01');
  });

  it('togglePlay 应切换 isPlaying', () => {
    useTimeStore.getState().togglePlay();
    expect(useTimeStore.getState().isPlaying).toBe(true);
    useTimeStore.getState().togglePlay();
    expect(useTimeStore.getState().isPlaying).toBe(false);
  });

  it('setSpeed 应更新 speed', () => {
    useTimeStore.getState().setSpeed(2);
    expect(useTimeStore.getState().speed).toBe(2);
  });

  it('setDateRange 应更新 dateRange', () => {
    useTimeStore.getState().setDateRange(['1966-01-01', '1967-01-01']);
    expect(useTimeStore.getState().dateRange).toEqual(['1966-01-01', '1967-01-01']);
    useTimeStore.getState().setDateRange(null);
    expect(useTimeStore.getState().dateRange).toBeNull();
  });
});
```

- [ ] **Step 2: 运行测试验证失败**

Run: `cd D:\Code\CRAtlas && npx jest lib/store.test.ts`
Expected: FAIL — "Cannot find module './store'"

- [ ] **Step 3: 实现 lib/store.ts**

Create `lib/store.ts`:
```typescript
/**
 * @file    store.ts
 * @brief   Zustand 全局状态管理——时间轴状态（日期/播放/速度/范围）。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { create } from 'zustand';

export interface TimeState {
  currentDate: string;
  isPlaying: boolean;
  speed: number;
  dateRange: [string, string] | null;
  setDate: (date: string) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setDateRange: (range: [string, string] | null) => void;
}

export const useTimeStore = create<TimeState>((set) => ({
  currentDate: '1966-01-01',
  isPlaying: false,
  speed: 1,
  dateRange: null,
  setDate: (date) => set({ currentDate: date }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ speed }),
  setDateRange: (range) => set({ dateRange: range }),
}));
```

- [ ] **Step 4: 运行测试验证通过**

Run: `cd D:\Code\CRAtlas && npx jest lib/store.test.ts`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add lib/store.ts lib/store.test.ts
git commit -m "[Phase 0] feat(store): Zustand 时间轴状态管理 + 单元测试"
```

---

