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
  {
    id: 'wuhan-incident-1967',
    title: '武汉七二〇事件',
    alias: ['七二〇事件', '武汉事件'],
    date: '1967-07-20',
    location: { regionId: 'hubei', specific: '武汉' },
    description:
      '武汉军区支持"百万雄狮"保守派，扣押中央文革小组代表谢富治、王力。毛泽东亲自处理，周恩来赴武汉调解。此事件后被定性为"反革命兵变"，标志着军方与造反派矛盾的公开化。',
    participants: [],
    factionIds: [],
    relatedEventIds: ['feb-adverse-current-1967'],
    significance: 'major',
    sources: [
      { title: '《武汉地方志·文革卷》', type: 'local-gazetteer', date: '2000-01-01' },
      { title: '《王力反思录》', type: 'memoir', date: '1993-01-01' },
    ],
  },
  {
    id: 'sent-down-youth-1968',
    title: '上山下乡运动开始',
    alias: ['上山下乡'],
    date: '1968-12-22',
    location: { regionId: 'beijing' },
    description:
      '毛泽东号召"知识青年到农村去，接受贫下中农的再教育"，大规模上山下乡运动启动。1700 万城镇青年被送往农村，深刻改变了一代人的命运。',
    participants: [],
    factionIds: [],
    relatedEventIds: [],
    significance: 'major',
    sources: [
      { title: '《人民日报》1968 年 12 月 22 日', type: 'media', date: '1968-12-22' },
    ],
  },
  {
    id: 'lin-biao-incident-1971',
    title: '林彪事件（九一三事件）',
    alias: ['九一三事件', '林彪坠机'],
    date: '1971-09-13',
    location: { regionId: 'inner-mongolia', specific: '温都尔汗' },
    description:
      '林彪及其妻叶群、子林立果等乘三叉戟飞机外逃，坠毁于蒙古温都尔汗。林彪被定性为"反革命集团"头目，此事件客观上宣告了文化大革命的理论和实践的失败。',
    participants: [],
    factionIds: [],
    relatedEventIds: [],
    significance: 'major',
    sources: [
      { title: '《关于林彪、陈伯达反党集团的反革命政变的审查报告》', type: 'official', date: '1973-08-01' },
    ],
  },
  {
    id: 'april-5th-movement-1976',
    title: '四五运动（天安门事件）',
    alias: ['四五运动', '天安门事件'],
    date: '1976-04-05',
    location: { regionId: 'beijing', specific: '天安门广场' },
    description:
      '群众自发聚集天安门广场悼念周恩来、反对四人帮。被定性为"反革命事件"，邓小平被撤销党内外职务。此为粉碎四人帮的民意先声。',
    participants: [],
    factionIds: [],
    relatedEventIds: [],
    significance: 'major',
    sources: [
      { title: '《天安门诗抄》', type: 'media', date: '1976-04-01' },
    ],
  },
  {
    id: 'smash-gang-of-four-1976',
    title: '粉碎四人帮',
    alias: ['粉碎四人帮', '十月政变'],
    date: '1976-10-06',
    location: { regionId: 'beijing', specific: '中南海' },
    description:
      '华国锋、叶剑英等采取行动，将江青、张春桥、姚文元、王洪文隔离审查。文化大革命实际结束。',
    participants: ['jiang-qing', 'zhang-chunqiao', 'wang-hongwen'],
    factionIds: ['central-cultural-revolution-group'],
    relatedEventIds: ['april-5th-movement-1976'],
    significance: 'major',
    sources: [
      { title: '《人民日报》1976 年 10 月', type: 'media', date: '1976-10-22' },
    ],
  },
];

export default events;
