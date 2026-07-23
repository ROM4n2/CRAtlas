### Task 2: 笔记/标注功能 — Report

**Status:** DONE
**Commit:** `0d658d5` — [Phase 4] feat(notes): 添加 localStorage 笔记功能

#### Summary

Implemented a localStorage-based notes system for all three entity types (event/person/faction): a CRUD utility module, a client-side editing panel, and integration into the three detail pages.

#### Files changed

| File | Action |
|------|--------|
| `lib/notes.ts` | Created — `getNotes` / `getNote` / `saveNote` / `deleteNote` + `Note` interface |
| `components/ui/NotesPanel.tsx` | Created — client component with textarea, save/delete buttons, "已保存" feedback |
| `app/event/[id]/page.tsx` | Modified — import + `<NotesPanel entityId={event.id} entityType="event" />` |
| `app/person/[id]/page.tsx` | Modified — import + `<NotesPanel entityId={person.id} entityType="person" />` |
| `app/faction/[id]/page.tsx` | Modified — import + `<NotesPanel entityId={faction.id} entityType="faction" />` |

#### Key decisions

- **SSR safety:** `getNotes()` returns `[]` when `typeof window === 'undefined'`, and `NotesPanel` reads from localStorage inside `useEffect` — avoids hydration errors in SSG.
- **Upsert semantics:** `saveNote` updates an existing note's content + `updatedAt` in place rather than replacing the object, preserving `createdAt`.
- **Empty = delete:** Saving an empty/whitespace-only note calls `deleteNote` to keep storage clean.
- **Transient feedback:** Save button shows "已保存" for 1.5s then auto-hides, no toast library needed.

#### Verification

- `npm run build` — passed, all 51 static pages generated (event/person/faction detail pages emit as SSG).
- `npx tsc --noEmit` — passed, zero type errors.
- `npm run lint` — skipped (project has no ESLint config yet; build's built-in lint pass already succeeded).

#### Notes

- No ESLint config exists in the repo; `next lint` triggers an interactive setup prompt that can't be answered non-interactively. Recommend adding an `.eslintrc.json` in a future task to enable standalone lint runs.
