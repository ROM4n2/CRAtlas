/**
 * @file    TimeAxis.tsx
 * @brief   时间轴控制条——全局时间控制，联动地图和关系图。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @description
 * 订阅 Zustand useTimeStore，提供播放/暂停/速度调节/日期拖拽功能。
 * 当前日期变化时，地图和关系图通过 store 自动联动更新。
 */

'use client';

import { useEffect } from 'react';
import { useTimeStore } from '@/lib/store';

export default function TimeAxis() {
  const { currentDate, isPlaying, speed, setDate, togglePlay, setSpeed } =
    useTimeStore();

  const minDate = '1966-01-01';
  const maxDate = '1976-10-31';

  // 播放逻辑：按 speed × 30 天/秒 推进日期，到达终点自动停止
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + speed * 30);
      const maxMs = new Date(maxDate).getTime();
      if (next.getTime() >= maxMs) {
        setDate(maxDate);
        togglePlay(); // 到达终点自动暂停
      } else {
        setDate(next.toISOString().slice(0, 10));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, speed, currentDate, setDate, togglePlay]);

  const dateToPercent = (date: string): number => {
    const d = new Date(date).getTime();
    const min = new Date(minDate).getTime();
    const max = new Date(maxDate).getTime();
    return ((d - min) / (max - min)) * 100;
  };

  const percentToDate = (percent: number): string => {
    const min = new Date(minDate).getTime();
    const max = new Date(maxDate).getTime();
    const timestamp = min + (percent / 100) * (max - min);
    return new Date(timestamp).toISOString().slice(0, 10);
  };

  const currentPercent = dateToPercent(currentDate);

  const formatDate = (date: string): string => {
    const d = new Date(date);
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
  };

  return (
    <div className="w-full bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div className="flex gap-1 text-xs">
          {[1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded ${
                speed === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={currentPercent}
            onChange={(e) => setDate(percentToDate(parseFloat(e.target.value)))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div
            className="absolute -top-6 transform -translate-x-1/2 text-xs font-medium text-blue-600"
            style={{ left: `${currentPercent}%` }}
          >
            {formatDate(currentDate)}
          </div>
        </div>

        <div className="text-xs text-gray-500 whitespace-nowrap">
          1966 — 1976
        </div>
      </div>
    </div>
  );
}
