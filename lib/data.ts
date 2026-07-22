/**
 * @file    data.ts
 * @brief   数据查询层——所有组件访问数据的唯一入口。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @description
 * 封装所有数据查询逻辑，组件不得直接 import 数据文件。
 * 遵循依赖倒置：接口层 → 应用层 → 核心层 ← 基础设施层。
 */

import { events } from '@/data/events';
import { people } from '@/data/people';
import { factions } from '@/data/factions';
import { regions } from '@/data/regions';
import { relationships } from '@/data/relationships';
import { regionControls } from '@/data/regionControls';
import type {
  Event,
  Person,
  Faction,
  Region,
  Relationship,
  RegionControlMap,
  SearchResult,
  Affiliation,
  FactionType,
} from '@/lib/types';

/**
 * 获取指定日期及之前发生的所有事件（按日期升序）。
 *
 * @param date - ISO 格式日期 (YYYY-MM-DD)
 * @returns 事件数组，无匹配返回空数组
 */
export function getEventsByDate(date: string): Event[] {
  return events
    .filter((e) => e.date <= date)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * 获取指定日期的地区控制状态映射。
 *
 * @param date - ISO 格式日期
 * @returns RegionControlMap（regionId → { factionId, strength }）
 */
export function getRegionControl(date: string): RegionControlMap {
  const result: RegionControlMap = {};
  for (const rc of regionControls) {
    if (rc.startDate <= date && (!rc.endDate || rc.endDate >= date)) {
      // contested 状态取 strength 最高的派系着色
      const dominant = rc.factions.reduce((max, f) =>
        f.strength > max.strength ? f : max,
        rc.factions[0]
      );
      if (dominant) {
        result[rc.regionId] = {
          factionId: dominant.factionId,
          strength: dominant.strength,
        };
      }
    }
  }
  return result;
}

/**
 * 获取所有关系（可按类型过滤）。
 *
 * @param filter - 可选过滤条件
 * @returns Relationship 数组
 */
export function getRelationships(filter?: {
  type?: Relationship['type'];
  date?: string;
}): Relationship[] {
  let result = relationships;
  if (filter?.type) {
    result = result.filter((r) => r.type === filter.type);
  }
  if (filter?.date) {
    const d = filter.date;
    result = result.filter(
      (r) => r.startDate <= d && (!r.endDate || r.endDate >= d)
    );
  }
  return result;
}

/**
 * 获取人物在指定日期的隶属关系。
 *
 * @param person - 人物对象
 * @param date - ISO 格式日期（默认今天）
 * @returns Affiliation 数组
 */
export function getCurrentAffiliations(
  person: Person,
  date: string = new Date().toISOString().slice(0, 10)
): Affiliation[] {
  return person.affiliations.filter(
    (a) => a.startDate <= date && (!a.endDate || a.endDate >= date)
  );
}

/**
 * 获取人物在指定日期的派系 ID 列表。
 *
 * @param person - 人物对象
 * @param date - ISO 格式日期（默认今天）
 * @returns 派系 ID 数组
 */
export function getCurrentFactionIds(
  person: Person,
  date: string = new Date().toISOString().slice(0, 10)
): string[] {
  return getCurrentAffiliations(person, date).map((a) => a.factionId);
}

/**
 * 全局搜索——搜索人物/事件/派系。
 *
 * 排序规则：精确匹配 > 前缀匹配 > 子串匹配；
 * 同等级内按重要性 major > significant > minor（事件）或类型优先级。
 *
 * @param query - 搜索关键词
 * @returns SearchResult 数组
 */
export function search(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  // 搜索人物
  for (const p of people) {
    const nameLower = p.name.toLowerCase();
    if (nameLower === q) {
      results.push({ id: p.id, type: 'person', name: p.name, description: p.biography, _rank: 0 });
    } else if (nameLower.startsWith(q)) {
      results.push({ id: p.id, type: 'person', name: p.name, description: p.biography, _rank: 1 });
    } else if (nameLower.includes(q)) {
      results.push({ id: p.id, type: 'person', name: p.name, description: p.biography, _rank: 2 });
    }
  }

  // 搜索事件
  for (const e of events) {
    const titleLower = e.title.toLowerCase();
    const aliasLower = (e.alias || []).map((a) => a.toLowerCase());
    const allNames = [titleLower, ...aliasLower];
    for (const name of allNames) {
      if (name === q) {
        results.push({ id: e.id, type: 'event', name: e.title, description: e.description, _rank: 0 });
        break;
      } else if (name.startsWith(q)) {
        results.push({ id: e.id, type: 'event', name: e.title, description: e.description, _rank: 1 });
        break;
      } else if (name.includes(q)) {
        results.push({ id: e.id, type: 'event', name: e.title, description: e.description, _rank: 2 });
        break;
      }
    }
  }

  // 搜索派系
  for (const f of factions) {
    const nameLower = f.name.toLowerCase();
    if (nameLower === q) {
      results.push({ id: f.id, type: 'faction', name: f.name, description: f.description, _rank: 0 });
    } else if (nameLower.startsWith(q)) {
      results.push({ id: f.id, type: 'faction', name: f.name, description: f.description, _rank: 1 });
    } else if (nameLower.includes(q)) {
      results.push({ id: f.id, type: 'faction', name: f.name, description: f.description, _rank: 2 });
    }
  }

  // 排序：精确 > 前缀 > 子串
  return results
    .sort((a, b) => (a._rank ?? 999) - (b._rank ?? 999))
    .map(({ _rank, ...rest }) => rest);
}

// === 单实体查询 ===

export function getPerson(id: string): Person | undefined {
  return people.find((p) => p.id === id);
}

export function getEvent(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function getFaction(id: string): Faction | undefined {
  return factions.find((f) => f.id === id);
}

export function getRegion(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

/**
 * 根据派系类型返回对应颜色（用于地图着色和图例）。
 *
 * @param factionType - 派系类型
 * @returns HEX 颜色字符串
 */
export function getFactionColor(factionType: FactionType | undefined): string {
  switch (factionType) {
    case 'rebel': return '#DC2626';
    case 'conservative': return '#2563EB';
    case 'military': return '#CA8A04';
    case 'other': return '#9333EA';
    default: return '#9CA3AF'; // nodata
  }
}

/**
 * 根据派系 ID 返回派系名称（用于显示）。
 *
 * @param factionId - 派系 ID
 * @returns 派系名称，未找到返回 "未知"
 */
export function getFactionName(factionId: string): string {
  return factions.find((f) => f.id === factionId)?.name ?? '未知';
}

/**
 * 根据派系 ID 返回派系类型。
 *
 * @param factionId - 派系 ID
 * @returns FactionType，未找到返回 undefined
 */
export function getFactionType(factionId: string): FactionType | undefined {
  return factions.find((f) => f.id === factionId)?.factionType;
}
