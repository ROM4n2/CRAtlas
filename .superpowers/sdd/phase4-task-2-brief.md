### Task 2: 笔记/标注功能

**Files:**
- Create: `lib/notes.ts`
- Create: `components/ui/NotesPanel.tsx`
- Modify: `app/event/[id]/page.tsx`
- Modify: `app/person/[id]/page.tsx`
- Modify: `app/faction/[id]/page.tsx`

**Interfaces:**
- Consumes: localStorage
- Produces: `NotesPanel` 组件 + 笔记 CRUD 函数

- [ ] **Step 1: 创建笔记工具函数**

Create `lib/notes.ts`：
```typescript
export interface Note {
  id: string;
  entityId: string;
  entityType: 'event' | 'person' | 'faction';
  content: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'cratlas-notes';

export function getNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getNote(entityId: string): Note | undefined {
  return getNotes().find((n) => n.entityId === entityId);
}

export function saveNote(entityId: string, entityType: 'event' | 'person' | 'faction', content: string): Note {
  const notes = getNotes();
  const existing = notes.find((n) => n.entityId === entityId);
  const now = new Date().toISOString();
  if (existing) {
    existing.content = content;
    existing.updatedAt = now;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return existing;
  }
  const note: Note = { id: `${entityType}-${entityId}`, entityId, entityType, content, createdAt: now, updatedAt: now };
  notes.push(note);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return note;
}

export function deleteNote(entityId: string): void {
  const notes = getNotes().filter((n) => n.entityId !== entityId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
```

- [ ] **Step 2: 创建 NotesPanel 组件**

Create `components/ui/NotesPanel.tsx` — 客户端组件，显示/编辑当前实体笔记。

- [ ] **Step 3: 在各详情页集成**

- [ ] **Step 4: 验证构建和测试**

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add lib/notes.ts components/ui/NotesPanel.tsx app/event/ app/person/ app/faction/
git commit -m "[Phase 4] feat(notes): 添加 localStorage 笔记功能"
```

---
