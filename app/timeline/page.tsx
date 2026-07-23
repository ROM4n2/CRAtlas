/**
 * @file    page.tsx
 * @brief   时间轴视图页——横向时间轴 + 事件卡片流。
 * @author  CRAtlas Team
 * @version 1.1.0
 * @date    2026-07-23
 *
 * @description
 * 桌面端（md+）：标准布局。
 * 移动端（<md）：内边距缩小，标题字号调整。
 * 时间轴控件响应式由 TimeAxis 组件处理。
 */

'use client';

import TimeAxis from '@/components/timeline/TimeAxis';
import EventCard from '@/components/timeline/EventCard';
import { useTimeStore } from '@/lib/store';
import { getEventsByDate } from '@/lib/data';

export default function TimelinePage() {
  const currentDate = useTimeStore((s) => s.currentDate);
  const events = getEventsByDate(currentDate);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 overflow-y-auto p-3 md:p-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
            时间轴
          </h1>
          <div className="space-y-2 md:space-y-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {events.length === 0 && (
            <p className="text-gray-500 text-sm">当前时间点暂无事件</p>
          )}
        </div>
      </div>
      <TimeAxis />
    </div>
  );
}
