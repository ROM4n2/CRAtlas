/**
 * @file    EventPopup.tsx
 * @brief   事件弹出卡片——点击地图事件散点后显示事件摘要。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import Link from 'next/link';
import type { Event } from '@/lib/types';
import { getFactionName } from '@/lib/data';

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

export default function EventPopup({ event, onClose }: EventPopupProps) {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-10 border border-gray-200">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="关闭"
      >
        ✕
      </button>
      <h3 className="font-bold text-gray-900 mb-1 pr-6">{event.title}</h3>
      <p className="text-xs text-gray-500 mb-2">{event.date}</p>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {event.description}
      </p>
      {event.factionIds.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {event.factionIds.map((id) => (
            <span
              key={id}
              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
            >
              {getFactionName(id)}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/event/${event.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        查看详情 →
      </Link>
    </div>
  );
}
