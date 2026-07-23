/**
 * @file    data.test.ts
 * @brief   lib/data.ts 的单元测试——验证数据查询函数正确性。
 *           所有测试通过 lib/data.ts 访问数据，不直接 import 数据文件。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import {
  getEventsByDate,
  getRegionControl,
  getRelationships,
  getCurrentFactionIds,
  getCurrentAffiliations,
  search,
  getPerson,
  getEvent,
  getFaction,
  getRegion,
  getRegionCoordinates,
} from './data';

// 辅助：通过查询函数获取测试数据（不直接 import）
function getPersonById(id: string) {
  return getPerson(id);
}

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

  it('应按日期升序排列', () => {
    const result = getEventsByDate('1976-12-31');
    for (let i = 1; i < result.length; i++) {
      expect(result[i].date >= result[i - 1].date).toBe(true);
    }
  });
});

describe('getRegionControl', () => {
  it('应返回指定日期的地区控制映射', () => {
    const result = getRegionControl('1967-01-01');
    expect(result).toBeDefined();
    // 北京在 1967 年应有控制记录
    expect(result['beijing']).toBeDefined();
  });

  it('无数据日期应返回空映射', () => {
    const result = getRegionControl('1960-01-01');
    expect(Object.keys(result).length).toBe(0);
  });
});

describe('getRelationships', () => {
  it('应按类型过滤', () => {
    const memberships = getRelationships({ type: 'membership' });
    expect(memberships.length).toBeGreaterThan(0);
    expect(memberships.every((r) => r.type === 'membership')).toBe(true);
  });

  it('无过滤应返回全部', () => {
    const all = getRelationships();
    expect(all.length).toBeGreaterThan(0);
  });
});

describe('getCurrentFactionIds', () => {
  it('应返回人物在指定日期的派系 ID', () => {
    const person = getPersonById('jiang-qing');
    expect(person).toBeDefined();
    const ids = getCurrentFactionIds(person!, '1967-01-01');
    expect(ids).toContain('central-cultural-revolution-group');
  });

  it('日期在隶属范围外应返回空', () => {
    const person = getPersonById('kuai-dafu');
    expect(person).toBeDefined();
    const ids = getCurrentFactionIds(person!, '1970-01-01');
    expect(ids).toEqual([]);
  });
});

describe('getCurrentAffiliations', () => {
  it('应返回指定日期的隶属关系', () => {
    const person = getPersonById('zhang-chunqiao');
    expect(person).toBeDefined();
    const affs = getCurrentAffiliations(person!, '1967-01-01');
    expect(affs.length).toBeGreaterThan(0);
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

  it('搜索别名应匹配', () => {
    const results = search('二月提纲');
    expect(results.some((r) => r.id === 'feb-outline-1966')).toBe(true);
  });

  it('空搜索应返回空', () => {
    expect(search('')).toEqual([]);
    expect(search('   ')).toEqual([]);
  });
});

describe('单实体查询', () => {
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

  it('getFaction 应返回匹配的派系', () => {
    const faction = getFaction('central-cultural-revolution-group');
    expect(faction).toBeDefined();
    expect(faction?.name).toContain('中央文革');
  });

  it('getRegion 应返回匹配的地区', () => {
    const region = getRegion('beijing');
    expect(region).toBeDefined();
    expect(region?.name).toBe('北京');
  });

  it('不存在的 ID 应返回 undefined', () => {
    expect(getPerson('nonexistent')).toBeUndefined();
    expect(getEvent('nonexistent')).toBeUndefined();
  });
});

describe('getRegionCoordinates', () => {
  it('应返回地区中心坐标', () => {
    const coords = getRegionCoordinates('beijing');
    expect(coords).toBeDefined();
    expect(coords).toHaveLength(2);
    // 北京中心约 [116.4, 39.9]
    expect(coords![0]).toBeCloseTo(116.4, 0);
    expect(coords![1]).toBeCloseTo(39.9, 0);
  });

  it('上海坐标应正确', () => {
    const coords = getRegionCoordinates('shanghai');
    expect(coords).toBeDefined();
    expect(coords![0]).toBeCloseTo(121.5, 0);
    expect(coords![1]).toBeCloseTo(31.2, 0);
  });

  it('不存在的 ID 应返回 undefined', () => {
    expect(getRegionCoordinates('nonexistent')).toBeUndefined();
  });
});
