### Task 2 Report: 全局搜索弹窗（SearchModal.tsx）

**Status:** DONE

**What I implemented:**
- Created `components/ui/SearchModal.tsx` — a client component that renders a global search modal triggered by Cmd+K / Ctrl+K
  - Keyboard listener toggles the modal open/reset on Cmd+K, closes on Escape
  - Input field with autoFocus, live search via `search()` from `@/lib/data`
  - Results list showing name + type badge (人物/事件/派系) + description
  - Click handler navigates to `/person/[id]`, `/event/[id]`, or `/faction/[id]` via `useRouter`
  - "无匹配结果" empty state when query returns nothing
  - Returns null when closed (no DOM footprint)
- Modified `app/layout.tsx` — added `<SearchModal />` inside `<ErrorBoundary>`, before `<main>`

**What I tested:**
- `npm run build` — ✅ passed, 6/6 static pages generated, no type errors, no lint warnings
- `npm test` — ✅ 33/33 tests passed (no regressions)

**Files changed:**
- `components/ui/SearchModal.tsx` (new, 101 lines)
- `app/layout.tsx` (modified — added import + component placement)

**Self-review findings:**
- Implementation matches the brief exactly
- Follows architecture rules: no direct data file imports, uses `search()` from `lib/data.ts`
- Follows naming conventions (PascalCase component, `'use client'` directive)
- File header uses @file/@brief format per project standard
- Uses `useCallback` for `handleSelect` to avoid re-creating the function on each render
- Link paths (`/person/`, `/event/`, `/faction/`) are reserved for Phase 3 Task 3-5; clicking results will 404 until those routes exist — expected and documented in brief

**Issues or concerns:**
- None. The `/person/[id]`, `/event/[id]`, `/faction/[id]` routes don't exist yet (Phase 3 Task 3-5), so navigation will 404 until those pages are built. This is expected per the task brief.
