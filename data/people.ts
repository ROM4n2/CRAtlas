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
  {
    id: 'mao-zedong',
    name: '毛泽东',
    birthYear: 1893,
    deathYear: 1976,
    biography: '中国共产党、中国人民解放军、中华人民共和国的主要缔造者，文化大革命的发动者。',
    affiliations: [],
    sources: [{ title: '《毛泽东传》', type: 'academic', date: '2003-01-01' }],
  },
  {
    id: 'lin-biao',
    name: '林彪',
    birthYear: 1907,
    deathYear: 1971,
    biography: '中共中央副主席，毛泽东的接班人，1971 年九一三事件中坠机身亡。',
    affiliations: [],
    sources: [{ title: '《林彪传》', type: 'academic', date: '2000-01-01' }],
  },
  {
    id: 'yao-wenyuan',
    name: '姚文元',
    birthYear: 1931,
    deathYear: 2005,
    biography: '中央文革小组成员，"四人帮"成员，笔杆子。',
    affiliations: [
      { factionId: 'central-cultural-revolution-group', startDate: '1966-05-28', endDate: '1976-10-06', role: '成员' },
    ],
    sources: [{ title: '《姚文元传》', type: 'academic', date: '2000-01-01' }],
  },
  {
    id: 'kang-sheng',
    name: '康生',
    birthYear: 1898,
    deathYear: 1975,
    biography: '中央文革小组顾问，在文革中负责"抓叛徒"等工作，迫害大批干部。',
    affiliations: [
      { factionId: 'central-cultural-revolution-group', startDate: '1966-05-28', endDate: '1975-12-16', role: '顾问' },
    ],
    sources: [{ title: '《康生传》', type: 'academic', date: '2000-01-01' }],
  },
  {
    id: 'qi-benyu',
    name: '戚本禹',
    birthYear: 1931,
    biography: '毛泽东秘书，中央文革小组成员，1968 年被隔离审查。',
    affiliations: [
      { factionId: 'central-cultural-revolution-group', startDate: '1966-05-28', endDate: '1968-01-01', role: '成员' },
    ],
    sources: [{ title: '《戚本禹回忆录》', type: 'memoir', date: '2016-01-01' }],
  },
  {
    id: 'zhou-enlai',
    name: '周恩来',
    birthYear: 1898,
    deathYear: 1976,
    biography: '国务院总理，文革期间尽力保护大批老干部和民主人士，维系国家运转。',
    affiliations: [],
    sources: [{ title: '《周恩来传》', type: 'academic', date: '1998-01-01' }],
  },
  {
    id: 'liu-shaoqi',
    name: '刘少奇',
    birthYear: 1898,
    deathYear: 1969,
    biography: '国家主席，中共中央副主席。文革中被错误批判为"叛徒、内奸、工贼"，1969 年病逝河南开封。',
    affiliations: [],
    sources: [{ title: '《刘少奇传》', type: 'academic', date: '2008-01-01' }],
  },
  {
    id: 'deng-xiaoping',
    name: '邓小平',
    birthYear: 1904,
    deathYear: 1997,
    biography: '中共中央总书记，文革中被打倒"第二走资派"。1975 年主持中央工作推行全面整顿，1976 年被撤销职务。',
    affiliations: [],
    sources: [{ title: '《邓小平传》', type: 'academic', date: '2014-01-01' }],
  },
  {
    id: 'ye-jianying',
    name: '叶剑英',
    birthYear: 1897,
    deathYear: 1986,
    biography: '元帅，中央军委副主席。1967 年二月抗争中批评文革乱象，1976 年参与粉碎四人帮。',
    affiliations: [],
    sources: [{ title: '《叶剑英传》', type: 'academic', date: '2005-01-01' }],
  },
  {
    id: 'hua-guofeng',
    name: '华国锋',
    birthYear: 1921,
    deathYear: 2008,
    biography: '1976 年周恩来逝世后任国务院代总理，同年 10 月与叶剑英等一举粉碎四人帮。',
    affiliations: [],
    sources: [{ title: '《华国锋传》', type: 'academic', date: '2010-01-01' }],
  },
  {
    id: 'chen-yi',
    name: '陈毅',
    birthYear: 1901,
    deathYear: 1972,
    biography: '元帅，外交部长。1967 年二月抗争（大闹怀仁堂）中激烈批评文革乱象。',
    affiliations: [],
    sources: [{ title: '《陈毅传》', type: 'academic', date: '2006-01-01' }],
  },
  {
    id: 'tan-zhenlin',
    name: '谭震林',
    birthYear: 1902,
    deathYear: 1983,
    biography: '中共中央政治局委员。1967 年二月抗争中猛烈抨击文革，被谭立夫称为"谭大炮"。',
    affiliations: [],
    sources: [{ title: '《谭震林传》', type: 'academic', date: '2007-01-01' }],
  },
];

export default people;
