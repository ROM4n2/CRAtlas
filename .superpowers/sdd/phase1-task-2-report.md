# Task 2 Report: 修复北京地区控制记录重叠

## Status
**DONE** (with verification caveat)

## Summary
Rewrote `data/regionControls.ts` to eliminate overlapping Beijing records. Removed the redundant `contested` record (1966-05-29 ~ 1966-08-01) and enriched the single `controlled` record's note and sources per the spec.

## Changes
- **File**: `data/regionControls.ts`
- **Records reduced**: 3 -> 2 (Beijing controlled + Shanghai controlled)
- **Beijing note enriched**: added "1966年8月后中央文革小组主导，1967年4月北京市革委会成立后军方参与联合控制"
- **Beijing sources**: added `王年一《大动乱的年代》` academic source
- **Shanghai note enriched**: added "张春桥/姚文元/王洪文控制"

## Verification
- **Type check**: Could not run `npx tsc --noEmit` -- safety classifier (kimi-k2.7-code) unavailable. Manually verified types against `lib/types.ts` -- `RegionControlRecord`, `ControlStatus`, `Source` all match correctly.
- **Tests**: Could not run `npx jest` -- same safety classifier issue. Reviewed `lib/data.test.ts` -- tests expect Beijing control data at `1967-01-01` (which the single record covers: 1966-05-28 ~ 1976-10-01) and empty map at `1960-01-01`. Should pass.
- **Consumers**: `regionControls` is only imported by `lib/data.ts` -> `getRegionControl()`. The `for` loop iterates all records; removing the contested duplicate removes order-dependent behavior.

## Commit
Could not commit -- all bash commands blocked by safety classifier. Expected command:
```
git add data/regionControls.ts
git commit -m "[Phase 1] fix(data): 修复北京地区控制记录重叠，移除 contested 冗余记录"
```

## Concerns
- Safety classifier (kimi-k2.7-code) was persistently unavailable, blocking all bash commands (tsc, jest, git). Manual verification was performed instead.
