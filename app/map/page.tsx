/**
 * @file    page.tsx
 * @brief   地图视图页——中国地图 + 时间轴 + 事件侧边栏 + 图例。
 * @author  CRAtlas Team
 * @version 1.1.0
 * @date    2026-07-23
 *
 * @description
 * 桌面端（md+）：右侧固定侧边栏。
 * 移动端（<md）：侧边栏折叠为底部抽屉按钮，点击展开。
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const events = getEventsByDate(currentDate);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative p-2 md:p-4">
          <ChinaMap onEventSelect={setSelectedEvent} />
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <MapLegend />
          </div>
          {selectedEvent && (
            <EventPopup
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>

        {/* 桌面端：固定右侧边栏 */}
        <div className="hidden md:block w-80 border-l border-gray-200 p-4 overflow-y-auto">
          <EventSidebar
            events={events}
            onEventClick={(id) => {
              const event = events.find((e) => e.id === id);
              if (event) setSelectedEvent(event);
            }}
          />
        </div>

        {/* 移动端：底部抽屉按钮 */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed bottom-20 right-4 z-40 bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg text-sm hover:bg-blue-700 transition"
          aria-label="打开事件列表"
        >
          事件 ({events.length})
        </button>

        {/* 移动端：底部抽屉 */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 flex flex-col justify-end"
            role="dialog"
            aria-modal="true"
          >
            {/* 遮罩层 */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            {/* 抽屉内容 */}
            <div className="relative bg-white rounded-t-xl max-h-[70vh] overflow-y-auto p-4 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-medium text-gray-700">事件列表</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="关闭"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <EventSidebar
                events={events}
                onEventClick={(id) => {
                  const event = events.find((e) => e.id === id);
                  if (event) setSelectedEvent(event);
                  setSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <TimeAxis />
    </div>
  );
}
