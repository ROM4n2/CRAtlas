/**
 * @file    TimeAxis.tsx
 * @brief   时间轴控制条——全局时间控制，联动地图和关系图。
 * @author  CRAtlas Team
 * @version 1.1.0
 * @date    2026-07-23
 *
 * @description
 * 订阅 Zustand useTimeStore，提供播放/暂停/速度调节/日期拖拽功能。
 * 当前日期变化时，地图和关系图通过 store 自动联动更新。
 * 移动端（<md）：控件换行排列，按钮组与滑块分行显示。
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
    <div className="w-full bg-white border-t border-gray-200 px-3 md:px-4 py-2 md:py-3">
      {/* 移动端：垂直堆叠；桌面端：水平排列 */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        {/* 第一行：播放按钮 + 速度选择 */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button
            onClick={togglePlay}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
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

          {/* 桌面端日期标签 */}
          <span className="hidden md:inline text-xs text-gray-500 whitespace-nowrap">
            1966 — 1976
          </span>
        </div>

        {/* 第二行：滑块 + 当前日期 */}
        <div className="flex-1 relative flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={currentPercent}
            onChange={(e) => setDate(percentToDate(parseFloat(e.target.value)))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-xs font-medium text-blue-600 whitespace-nowrap shrink-0">
            {formatDate(currentDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
