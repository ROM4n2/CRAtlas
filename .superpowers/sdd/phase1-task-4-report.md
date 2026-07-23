# Task 4 Report: 扩展示例数据 — 补齐缺失事件和人物

## Status: Complete (pending verification)

## Changes Made

1. **data/events.ts** — Appended 5 events (武汉七二〇事件, 上山下乡运动开始, 林彪事件, 四五运动, 粉碎四人帮) to the events array. Total: 10 events.

2. **data/people.ts** — Appended 5 people (毛泽东, 林彪, 姚文元, 康生, 戚本禹) to the people array. Total: 11 people.

3. **data/README.md** — Updated record counts: events 5→10, people 6→11.

## Verification

- `npx tsc --noEmit`: Not run (safety classifier unavailable)
- `npx jest`: Not run (safety classifier unavailable)

Data matches task brief exactly. All new entities use the correct `Event`/`Person` types from `lib/types.ts`. The existing tests in `lib/data.test.ts` and `lib/store.test.ts` should pass as they only test existing entities (蒯大富, 江青, 张春桥, 二月提纲, etc.) — new data does not affect their assertions.

## Concerns

- `smash-gang-of-four-1976` event has `participants: ['jiang-qing', 'zhang-chunqiao', 'wang-hongwen']` — missing `yao-wenyuan` in the participants array even though he was also arrested. This matches the task brief data exactly.
- `wuhan-incident-1967` has `relatedEventIds: ['feb-adverse-current-1967']` — establishes a cross-reference to an existing event.
- `smash-gang-of-four-1976` has `factionIds: ['central-cultural-revolution-group']` and `relatedEventIds: ['april-5th-movement-1976']` — establishes cross-references.

## Commits

Pending: `git add data/events.ts data/people.ts data/README.md && git commit -m "[Phase 1] feat(data): 补齐示例数据（10事件/11人物，满足设计规范最低要求）"`
