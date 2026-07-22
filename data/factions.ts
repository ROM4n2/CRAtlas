/**
 * @file    factions.ts
 * @brief   派系示例数据——造反派/保皇派/军方组织。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Faction } from '@/lib/types';

export const factions: Faction[] = [
  {
    id: 'central-cultural-revolution-group',
    name: '中央文革小组',
    factionType: 'rebel',
    foundedDate: '1966-05-28',
    dissolvedDate: '1969-04-01',
    regionIds: ['beijing'],
    description:
      '1966 年 5 月成立的中央文化革命小组，在文革初期实际取代中央政治局成为最高权力机构。组长陈伯达，顾问康生，副组长江青、张春桥等。',
    sources: [
      {
        title: '《关于无产阶级文化大革命的决定》（五一六通知）',
        type: 'official',
        date: '1966-05-16',
      },
      {
        title: '金冲及主编《二十世纪中国史纲》',
        type: 'academic',
        date: '2009-01-01',
      },
    ],
  },
  {
    id: 'capital-three-headquarters',
    name: '首都三司（首都大专院校红卫兵革命造反总司令部）',
    factionType: 'rebel',
    foundedDate: '1966-09-01',
    regionIds: ['beijing'],
    description:
      '北京高等院校造反派红卫兵组织，蒯大富等参与领导。与谭力夫为首的"老红卫兵"（保皇派）形成对立。',
    sources: [
      {
        title: '《蒯大富回忆录》',
        type: 'memoir',
        date: '2000-01-01',
      },
    ],
  },
  {
    id: 'shanghai-worker-rebel',
    name: '上海工人革命造反派联合司令部',
    factionType: 'rebel',
    foundedDate: '1966-11-01',
    regionIds: ['shanghai'],
    description:
      '上海工人造反派组织，1967 年"一月风暴"中参与夺权，是张春桥、王洪文依靠的重要力量。',
    sources: [
      {
        title: '《上海地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    id: 'beijing-red-guard',
    name: '北京老红卫兵（西城纠察队等）',
    factionType: 'conservative',
    foundedDate: '1966-05-29',
    dissolvedDate: '1966-12-01',
    regionIds: ['beijing'],
    description:
      '以高干子弟为核心的红卫兵组织，主张"老子英雄儿好汉"的血统论，保护老干部，与造反派对立。谭力夫、陈小鲁等参与。',
    sources: [
      {
        title: '《血统论》传单',
        type: 'media',
        date: '1966-08-01',
      },
    ],
  },
];

export default factions;
