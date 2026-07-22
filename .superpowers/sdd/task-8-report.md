# Task 8 Report: 基础页面骨架

## Status: DONE_WITH_CONCERNS

## Commits Created

- `7412f95` — `[Phase 0] feat(ui): 基础页面骨架（首页/导航栏/地图页占位）`
  - 7 files changed, 196 insertions(+), 1 deletion(-)
  - Includes the `lib/data.ts` type fix (see concerns)

## Files Created

| File | Purpose |
| --- | --- |
| `app/globals.css` | Tailwind directives + faction color CSS variables |
| `app/layout.tsx` | Root layout — Navbar + `<main>` slot |
| `components/layout/Navbar.tsx` | Top nav — logo + 3 view links + about |
| `app/page.tsx` | Home page — project intro + 3 view entry cards |
| `app/map/page.tsx` | Map view placeholder (Phase 1 implementation) |
| `components/layout/README.md` | Layout component folder documentation |

## Build Result

**Success** after one fix.

```
Route (app)                              Size     First Load JS
┌ ○ /                                    172 B          93.9 kB
├ ○ /_not-found                          871 B          87.8 kB
└ ○ /map                                 137 B          87.1 kB
+ First Load JS shared by all            87 kB
○  (Static)  prerendered as static content
```

All 5 routes statically prerendered to `out/`.

## Concerns

1. **Pre-existing type error in `lib/data.ts:181`** — The brief's Step 6 (`npm run build`) failed initially because `search()`'s sort comparator accessed `a._rank` on the optional `_rank?: number` field from `SearchResult`. Fixed in-place with nullish coalescing: `(a._rank ?? 999) - (b._rank ?? 999)`. This was a latent bug from Task 7 (data layer) that only surfaced once the App Router pulled `lib/data.ts` into the build graph. The fix is included in the same commit since the build could not pass without it.

2. **Brief mentions `useTimeStore` consumption** — The brief's "Interfaces" section notes the layout/page "Consumes: `lib/store.ts` 的 `useTimeStore`", but the provided code for `layout.tsx`, `Navbar.tsx`, `page.tsx`, and `map/page.tsx` does not actually import or use `useTimeStore`. The current implementation is a static shell; the store will be wired in when interactive features (timeline slider, view filters) are added in later phases. No action needed now.

3. **CRLF warnings** — Git emits `LF will be replaced by CRLF` warnings on Windows. Cosmetic only; does not affect build or content.

## Verification

- [x] All 5 brief files created with exact content
- [x] `components/layout/README.md` created per additional requirement
- [x] `npm run build` succeeds, `out/` generated
- [x] Committed per brief
