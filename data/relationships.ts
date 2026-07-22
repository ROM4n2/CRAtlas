/**
 * @file    relationships.ts
 * @brief   关系示例数据——人物-派系隶属、事件因果、派系互动。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Relationship } from '@/lib/types';

export const relationships: Relationship[] = [
  {
    id: 'rel-kuai-capital',
    type: 'membership',
    from: 'kuai-dafu',
    to: 'capital-three-headquarters',
    fromType: 'person',
    toType: 'faction',
    startDate: '1966-09-01',
    endDate: '1968-07-01',
    description: '蒯大富是首都三司核心成员',
    sources: [{ title: '《蒯大富口述》', type: 'memoir', date: '2015-01-01' }],
  },
  {
    id: 'rel-jiang-central',
    type: 'membership',
    from: 'jiang-qing',
    to: 'central-cultural-revolution-group',
    fromType: 'person',
    toType: 'faction',
    startDate: '1966-05-28',
    endDate: '1976-10-06',
    description: '江青任中央文革小组第一副组长',
    sources: [{ title: '《江青传》', type: 'academic', date: '1993-01-01' }],
  },
  {
    id: 'rel-causality-feb-may',
    type: 'causality',
    from: 'feb-outline-1966',
    to: 'may16-notice-1966',
    fromType: 'event',
    toType: 'event',
    startDate: '1966-05-16',
    description: '二月提纲被批判直接导致五一六通知发布',
    sources: [
      {
        title: '席宣、金春明《"文化大革命"简史》',
        type: 'academic',
        date: '1996-01-01',
      },
    ],
  },
  {
    id: 'rel-faction-rebel-vs-conservative-1',
    type: 'faction-interaction',
    from: 'capital-three-headquarters',
    to: 'beijing-red-guard',
    fromType: 'faction',
    toType: 'faction',
    startDate: '1966-06-01',
    endDate: '1966-12-01',
    description: '造反派与保皇派的对抗',
    sources: [{ title: '《血统论》传单', type: 'media', date: '1966-08-01' }],
  },
  {
    id: 'rel-faction-rebel-vs-conservative-2',
    type: 'faction-interaction',
    from: 'beijing-red-guard',
    to: 'capital-three-headquarters',
    fromType: 'faction',
    toType: 'faction',
    startDate: '1966-06-01',
    endDate: '1966-12-01',
    description: '造反派与保皇派的对抗',
    sources: [{ title: '《血统论》传单', type: 'media', date: '1966-08-01' }],
  },
];

export default relationships;
