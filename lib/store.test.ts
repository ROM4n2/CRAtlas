/**
 * @file    store.test.ts
 * @brief   useTimeStore 单元测试——验证时间轴状态管理与动作。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { useTimeStore } from './store';

describe('useTimeStore', () => {
  beforeEach(() => {
    useTimeStore.setState({
      currentDate: '1966-01-01',
      isPlaying: false,
      speed: 1,
      dateRange: null,
    });
  });

  it('应有正确的初始状态', () => {
    const state = useTimeStore.getState();
    expect(state.currentDate).toBe('1966-01-01');
    expect(state.isPlaying).toBe(false);
    expect(state.speed).toBe(1);
    expect(state.dateRange).toBeNull();
  });

  it('setDate 应更新 currentDate', () => {
    useTimeStore.getState().setDate('1967-01-01');
    expect(useTimeStore.getState().currentDate).toBe('1967-01-01');
  });

  it('togglePlay 应切换 isPlaying', () => {
    useTimeStore.getState().togglePlay();
    expect(useTimeStore.getState().isPlaying).toBe(true);
    useTimeStore.getState().togglePlay();
    expect(useTimeStore.getState().isPlaying).toBe(false);
  });

  it('setSpeed 应更新 speed', () => {
    useTimeStore.getState().setSpeed(2);
    expect(useTimeStore.getState().speed).toBe(2);
  });

  it('setDateRange 应更新 dateRange', () => {
    useTimeStore.getState().setDateRange(['1966-01-01', '1967-01-01']);
    expect(useTimeStore.getState().dateRange).toEqual(['1966-01-01', '1967-01-01']);
    useTimeStore.getState().setDateRange(null);
    expect(useTimeStore.getState().dateRange).toBeNull();
  });
});
