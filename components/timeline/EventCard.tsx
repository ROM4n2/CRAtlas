/**
 * @file    EventCard.tsx
 * @brief   事件卡片——在时间轴页面中显示事件摘要。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import Link from 'next/link';
import type { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{event.title}</h3>
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
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {event.description}
      </p>
      <Link
        href={`/event/${event.id}`}
        className="text-xs text-blue-600 hover:underline mt-2 inline-block"
      >
        查看详情 →
      </Link>
    </div>
  );
}
