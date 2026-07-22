/**
 * @file    people.ts
 * @brief   人物示例数据——文革关键人物及其派系隶属。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Person } from '@/lib/types';

export const people: Person[] = [
  {
    id: 'kuai-dafu',
    name: '蒯大富',
    birthYear: 1945,
    biography:
      '清华大学学生，首都三司核心人物，北京造反派红卫兵领袖。1966 年 5 月贴出清华大学第一张大字报。',
    affiliations: [
      {
        factionId: 'capital-three-headquarters',
        startDate: '1966-09-01',
        endDate: '1968-07-01',
        role: '核心成员',
      },
    ],
    sources: [
      {
        title: '《蒯大富口述：清华十年》',
        type: 'memoir',
        date: '2015-01-01',
      },
    ],
  },
  {
    id: 'tan-lifu',
    name: '谭力夫',
    birthYear: 1945,
    deathYear: 2017,
    biography:
      '北京工业大学学生，"血统论"《老子英雄儿好汉》传单作者之一，老红卫兵代表人物。',
    affiliations: [
      {
        factionId: 'beijing-red-guard',
        startDate: '1966-05-29',
        endDate: '1966-12-01',
        role: '核心成员',
      },
    ],
    sources: [
      {
        title: '《血统论》传单',
        type: 'media',
        date: '1966-08-01',
      },
    ],
  },
  {
    id: 'jiang-qing',
    name: '江青',
    birthYear: 1914,
    deathYear: 1991,
    biography:
      '毛泽东夫人，中央文革小组第一副组长，"四人帮"核心成员。',
    affiliations: [
      {
        factionId: 'central-cultural-revolution-group',
        startDate: '1966-05-28',
        endDate: '1976-10-06',
        role: '第一副组长',
      },
    ],
    sources: [
      {
        title: '《江青传》',
        type: 'academic',
        date: '1993-01-01',
      },
    ],
  },
  {
    id: 'zhang-chunqiao',
    name: '张春桥',
    birthYear: 1917,
    deathYear: 2005,
    biography:
      '中央文革小组副组长，上海市委第一书记，"四人帮"成员。',
    affiliations: [
      {
        factionId: 'central-cultural-revolution-group',
        startDate: '1966-05-28',
        endDate: '1976-10-06',
        role: '副组长',
      },
      {
        factionId: 'shanghai-worker-rebel',
        startDate: '1966-11-01',
        endDate: '1967-02-01',
        role: '顾问',
      },
    ],
    sources: [
      {
        title: '《张春桥狱中家书》',
        type: 'memoir',
        date: '2015-01-01',
      },
    ],
  },
  {
    id: 'wang-hongwen',
    name: '王洪文',
    birthYear: 1935,
    deathYear: 1992,
    biography:
      '上海国棉十七厂工人，上海"一月风暴"中崛起，中央副主席，"四人帮"成员。',
    affiliations: [
      {
        factionId: 'shanghai-worker-rebel',
        startDate: '1966-11-01',
        endDate: '1976-10-06',
        role: '核心成员',
      },
    ],
    sources: [
      {
        title: '《王洪文供词》',
        type: 'official',
        date: '1980-01-01',
      },
    ],
  },
  {
    id: 'chen-boda',
    name: '陈伯达',
    birthYear: 1904,
    deathYear: 1989,
    biography:
      '毛泽东秘书，中央文革小组组长，林彪反革命集团成员。',
    affiliations: [
      {
        factionId: 'central-cultural-revolution-group',
        startDate: '1966-05-28',
        endDate: '1970-08-01',
        role: '组长',
      },
    ],
    sources: [
      {
        title: '《陈伯达最后口述回忆》',
        type: 'memoir',
        date: '2010-01-01',
      },
    ],
  },
];

export default people;
