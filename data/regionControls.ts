/**
 * @file    regionControls.ts
 * @brief   地区控制时间线示例数据——地图省份着色的核心输入。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @note 这是示例数据。完整数据需通过 Phase 0 可行性预研后填充。
 */

import { RegionControlRecord } from '@/lib/types';

export const regionControls: RegionControlRecord[] = [
  {
    regionId: 'beijing',
    startDate: '1966-05-28',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'central-cultural-revolution-group', strength: 0.9 }],
    note: '中央文革小组所在地，造反派稳固控制',
    sources: [
      {
        title: '《北京地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    regionId: 'shanghai',
    startDate: '1967-02-01',
    endDate: '1976-10-01',
    status: 'controlled',
    factions: [{ factionId: 'shanghai-worker-rebel', strength: 0.85 }],
    note: '一月风暴后造反派掌权',
    sources: [
      {
        title: '《上海地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    regionId: 'beijing',
    startDate: '1966-05-29',
    endDate: '1966-08-01',
    status: 'contested',
    factions: [
      { factionId: 'capital-three-headquarters', strength: 0.4 },
      { factionId: 'beijing-red-guard', strength: 0.4 },
    ],
    note: '造反派与保皇派争夺中',
    sources: [{ title: '《血统论》传单', type: 'media', date: '1966-08-01' }],
  },
];

export default regionControls;
