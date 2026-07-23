/**
 * @file    EventSidebar.tsx
 * @brief   事件列表侧边栏——显示当前时间点及之前的所有事件。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import Link from 'next/link';
import type { Event } from '@/lib/types';

interface EventSidebarProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
}

export default function EventSidebar({ events, onEventClick }: EventSidebarProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-500">
        当前时间点暂无事件
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-medium text-gray-700 text-sm">
          事件列表 ({events.length})
        </h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition"
            onClick={() => onEventClick(event.id)}
          >
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                {event.title}
              </h4>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                  event.significance === 'major'
                    ? 'bg-red-100 text-red-700'
                    : event.significance === 'significant'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {event.significance === 'major'
                  ? '重大'
                  : event.significance === 'significant'
                  ? '重要'
                  : '一般'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{event.date}</p>
            <Link
              href={`/event/${event.id}`}
              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              查看详情 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
