/**
 * @file    data.test.ts
 * @brief   lib/data.ts 的单元测试——验证数据查询函数正确性。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import {
  getEventsByDate,
  getRegionControl,
  getCurrentFactionIds,
  search,
  getPerson,
  getEvent,
} from './data';
import { events } from '@/data/events';
import { people } from '@/data/people';

describe('getEventsByDate', () => {
  it('应返回指定日期及之前的所有事件', () => {
    const result = getEventsByDate('1966-05-16');
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.some((e) => e.id === 'feb-outline-1966')).toBe(true);
    expect(result.some((e) => e.id === 'may16-notice-1966')).toBe(true);
  });

  it('空日期应返回空数组', () => {
    const result = getEventsByDate('1965-01-01');
    expect(result).toEqual([]);
  });
});

describe('getCurrentFactionIds', () => {
  it('应返回人物在指定日期的派系 ID', () => {
    const jiangQing = people.find((p) => p.id === 'jiang-qing')!;
    const ids = getCurrentFactionIds(jiangQing, '1967-01-01');
    expect(ids).toContain('central-cultural-revolution-group');
  });

  it('日期在隶属范围外应返回空', () => {
    const kuaiDafu = people.find((p) => p.id === 'kuai-dafu')!;
    const ids = getCurrentFactionIds(kuaiDafu, '1970-01-01');
    expect(ids).toEqual([]);
  });
});

describe('search', () => {
  it('应按名称精确匹配', () => {
    const results = search('蒯大富');
    expect(results.some((r) => r.id === 'kuai-dafu')).toBe(true);
  });

  it('搜索"提纲"应匹配二月提纲事件', () => {
    const results = search('提纲');
    expect(results.some((r) => r.id === 'feb-outline-1966')).toBe(true);
  });
});

describe('getPerson / getEvent', () => {
  it('getPerson 应返回匹配的人物', () => {
    const person = getPerson('kuai-dafu');
    expect(person).toBeDefined();
    expect(person?.name).toBe('蒯大富');
  });

  it('getEvent 应返回匹配的事件', () => {
    const event = getEvent('feb-outline-1966');
    expect(event).toBeDefined();
    expect(event?.title).toContain('汇报提纲');
  });
});
