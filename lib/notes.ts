/**
 * @file    notes.ts
 * @brief   笔记 CRUD 工具函数——基于 localStorage 的实体笔记管理。
 *          每个实体（事件/人物/派系）可保存一条笔记，以 entityId 为唯一键。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

export interface Note {
  id: string;
  entityId: string;
  entityType: 'event' | 'person' | 'faction';
  content: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'cratlas-notes';

/**
 * 获取全部笔记。
 * 服务端环境（无 window）返回空数组，避免 SSR 阶段访问 localStorage 报错。
 */
export function getNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * 根据实体 ID 获取单条笔记。
 */
export function getNote(entityId: string): Note | undefined {
  return getNotes().find((n) => n.entityId === entityId);
}

/**
 * 保存笔记。已有则更新内容与时间戳，否则新建。
 */
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

/**
 * 删除指定实体的笔记。
 */
export function deleteNote(entityId: string): void {
  const notes = getNotes().filter((n) => n.entityId !== entityId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
