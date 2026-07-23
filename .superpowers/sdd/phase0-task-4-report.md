# Task 4 Report — 数据查询层（lib/data.ts）

**Date:** 2026-07-22
**Status:** DONE
**Commit:** `09b6125` — `[Phase 0] feat(data): 数据查询层 + 单元测试（getEventsByDate/getRegionControl/search/getCurrentFactionIds）`

## TDD Evidence

### RED Phase — Tests fail before implementation

```
FAIL lib/data.test.ts
  ● Test suite failed to run

    Cannot find module './data' from 'lib/data.test.ts'

Test Suites: 1 failed, 1 total
Tests:       0 total
```

Root cause: `lib/data.ts` does not exist yet — expected failure confirms tests are wired correctly.

### GREEN Phase — Implementation passes all tests

```
PASS lib/data.test.ts
  getEventsByDate
    √ 应返回指定日期及之前的所有事件 (7 ms)
    √ 空日期应返回空数组 (1 ms)
  getCurrentFactionIds
    √ 应返回人物在指定日期的派系 ID
    √ 日期在隶属范围外应返回空
  search
    √ 应按名称精确匹配 (1 ms)
    √ 搜索"提纲"应匹配二月提纲事件
  getPerson / getEvent
    √ getPerson 应返回匹配的人物
    √ getEvent 应返回匹配的事件

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Time:        0.511 s
```

## Files Changed

| File | Action | Purpose |
| --- | --- | --- |
| `lib/types.ts` | Modified | Added `_rank?: number` to `SearchResult` (search-sort scratch field) |
| `lib/data.ts` | Created | Data query layer — 10 exported query functions + 4 single-entity lookups |
| `lib/data.test.ts` | Created | 8 unit tests covering `getEventsByDate`, `getCurrentFactionIds`, `search`, `getPerson`, `getEvent` |
| `jest.config.js` | Created | Jest config (ts-jest preset, `@/` path alias mapper) |
| `lib/README.md` | Modified | Documented `data.ts` in file list + updated dependency graph |

## Test Summary

8/8 tests pass — `getEventsByDate` (date filtering + sort), `getCurrentFactionIds` (affiliation windowing), `search` (name/alias substring matching), `getPerson`/`getEvent` (single-entity lookup) all verified against sample data.

## Concerns

None. Brief followed verbatim; all functions implemented as specified. The `_rank` scratch field is correctly stripped from `search` results via destructuring before return.
