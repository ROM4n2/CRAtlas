/**
 * @file    store.ts
 * @brief   Zustand 全局状态管理——时间轴状态（日期/播放/速度/范围）。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @description
 * 为地图、时间轴、图谱三个视图提供共享的时间控制状态。
 * 通过 zustand 的 create 生成 hook，组件以 useTimeStore 订阅切片。
 */

import { create } from 'zustand';

export interface TimeState {
  currentDate: string;
  isPlaying: boolean;
  speed: number;
  dateRange: [string, string] | null;
  setDate: (date: string) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setDateRange: (range: [string, string] | null) => void;
}

export const useTimeStore = create<TimeState>((set) => ({
  currentDate: '1966-01-01',
  isPlaying: false,
  speed: 1,
  dateRange: null,
  setDate: (date) => set({ currentDate: date }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ speed }),
  setDateRange: (range) => set({ dateRange: range }),
}));
