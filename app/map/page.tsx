/**
 * @file    page.tsx
 * @brief   地图视图页——中国地图 + 时间轴 + 事件侧边栏 + 图例。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TimeAxis from '@/components/timeline/TimeAxis';
import MapLegend from '@/components/map/MapLegend';
import EventPopup from '@/components/map/EventPopup';
import EventSidebar from '@/components/map/EventSidebar';
import { useTimeStore } from '@/lib/store';
import { getEventsByDate } from '@/lib/data';
import type { Event } from '@/lib/types';

// 动态导入 ECharts 组件（避免 SSR 问题）
const ChinaMap = dynamic(() => import('@/components/map/ChinaMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 animate-pulse" />,
});

export default function MapPage() {
  const currentDate = useTimeStore((s) => s.currentDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events = getEventsByDate(currentDate);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative p-4">
          <ChinaMap onEventSelect={setSelectedEvent} />
          <div className="absolute bottom-8 left-8">
            <MapLegend />
          </div>
          {selectedEvent && (
            <EventPopup
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>

        <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
          <EventSidebar
            events={events}
            onEventClick={(id) => {
              const event = events.find((e) => e.id === id);
              if (event) setSelectedEvent(event);
            }}
          />
        </div>
      </div>

      <TimeAxis />
    </div>
  );
}
