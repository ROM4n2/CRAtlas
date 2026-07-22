/**
 * @file    events.ts
 * @brief   事件示例数据——文革关键历史事件。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Event } from '@/lib/types';

export const events: Event[] = [
  {
    id: 'feb-outline-1966',
    title: '《关于当前学术讨论的汇报提纲》',
    alias: ['二月提纲'],
    date: '1966-02-01',
    location: { regionId: 'beijing', specific: '北京钓鱼台' },
    description:
      '彭真主持制定的汇报提纲，主张学术讨论要"放"而不"收"，要有领导、有秩序。后被毛泽东批判，成为文革导火索之一。',
    participants: ['chen-boda'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['may16-notice-1966'],
    significance: 'major',
    sources: [
      {
        title: '《关于当前学术讨论的汇报提纲》',
        type: 'official',
        date: '1966-02-01',
      },
      {
        title: '席宣、金春明《"文化大革命"简史》',
        type: 'academic',
        date: '1996-01-01',
      },
    ],
  },
  {
    id: 'may16-notice-1966',
    title: '《中国共产党中央委员会通知》（五一六通知）',
    alias: ['五一六通知'],
    date: '1966-05-16',
    location: { regionId: 'beijing', specific: '北京人民大会堂' },
    description:
      '标志着文化大革命正式开始的纲领性文件。宣布撤销"二月提纲"和原来的文化革命五人小组，成立中央文革小组。',
    participants: ['jiang-qing', 'chen-boda'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['feb-outline-1966', '11th-plenum-1966'],
    significance: 'major',
    sources: [
      {
        title: '《人民日报》1966 年 5 月 16 日',
        type: 'media',
        date: '1966-05-16',
      },
    ],
  },
  {
    id: '11th-plenum-1966',
    title: '中共八届十一中全会',
    alias: ['八届十一中全会'],
    date: '1966-08-01',
    endDate: '1966-08-12',
    location: { regionId: 'beijing', specific: '北京人民大会堂' },
    description:
      '通过《关于无产阶级文化大革命的决定》（十六条），刘少奇、邓小平受到批判，林彪成为唯一副主席。',
    participants: ['jiang-qing', 'zhang-chunqiao'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['may16-notice-1966'],
    significance: 'major',
    sources: [
      {
        title: '《关于无产阶级文化大革命的决定》',
        type: 'official',
        date: '1966-08-08',
      },
    ],
  },
  {
    id: 'jan-storm-1967',
    title: '上海"一月风暴"',
    alias: ['一月风暴', '一月夺权'],
    date: '1967-01-01',
    endDate: '1967-02-01',
    location: { regionId: 'shanghai', specific: '上海人民广场' },
    description:
      '张春桥、王洪文策划上海造反派夺取上海市党政大权，毛泽东赞扬为"全国模范"。',
    participants: ['zhang-chunqiao', 'wang-hongwen'],
    factionIds: ['shanghai-worker-rebel', 'central-cultural-revolution-group'],
    relatedEventIds: ['11th-plenum-1966'],
    significance: 'major',
    sources: [
      {
        title: '《人民日报》1967 年 1 月',
        type: 'media',
        date: '1967-01-01',
      },
      {
        title: '《上海地方志·文革卷》',
        type: 'local-gazetteer',
        date: '2000-01-01',
      },
    ],
  },
  {
    id: 'feb-adverse-current-1967',
    title: '二月逆流（二月抗争）',
    alias: ['二月逆流', '二月抗争', '大闹怀仁堂'],
    date: '1967-02-01',
    location: { regionId: 'beijing', specific: '北京怀仁堂' },
    description:
      '谭震林、陈毅、叶剑英等老同志在怀仁堂会议上激烈批评文革乱象，被毛泽东压制，后被平反。',
    participants: [],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['jan-storm-1967'],
    significance: 'major',
    sources: [
      {
        title: '《关于二月逆流的一些史料》',
        type: 'academic',
        date: '1980-01-01',
      },
    ],
  },
];

export default events;
