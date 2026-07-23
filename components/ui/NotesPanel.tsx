/**
 * @file    NotesPanel.tsx
 * @brief   笔记编辑面板——客户端组件，显示/编辑当前实体的本地笔记。
 *          基于 localStorage，无需后端；支持新建、编辑、删除。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import { useState, useEffect } from 'react';
import { getNote, saveNote, deleteNote } from '@/lib/notes';

interface NotesPanelProps {
  entityId: string;
  entityType: 'event' | 'person' | 'faction';
}

/**
 * 笔记面板组件。
 * 读取 localStorage 中对应实体的笔记并以 textarea 编辑，
 * 保存/删除操作即时同步到 localStorage。
 */
export default function NotesPanel({ entityId, entityType }: NotesPanelProps) {
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  // 客户端挂载后读取笔记，避免 SSR 阶段访问 localStorage
  useEffect(() => {
    const note = getNote(entityId);
    if (note) setContent(note.content);
  }, [entityId]);

  const handleSave = () => {
    if (!content.trim()) {
      deleteNote(entityId);
      setSaved(false);
      return;
    }
    saveNote(entityId, entityType, content);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleDelete = () => {
    setContent('');
    deleteNote(entityId);
    setSaved(false);
  };

  return (
    <section className="mt-6 pt-6 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">我的笔记</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="在此记录关于该实体的笔记…"
        className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded resize-y focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          保存
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
        >
          删除
        </button>
        {saved && <span className="text-xs text-green-600">已保存</span>}
      </div>
    </section>
  );
}
