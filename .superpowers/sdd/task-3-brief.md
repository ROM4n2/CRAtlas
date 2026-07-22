### Task 3: 示例数据填充

**Files:**
- Create: `data/events.ts`
- Create: `data/people.ts`
- Create: `data/factions.ts`
- Create: `data/regions.ts`
- Create: `data/relationships.ts`
- Create: `data/regionControls.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 中的类型
- Produces: 符合类型的示例数据集，供 Phase 1 可视化使用

- [ ] **Step 1: 创建 data/regions.ts（34 省级行政区）**

Create `data/regions.ts`:
```typescript
/**
 * @file    regions.ts
 * @brief   中国 34 省级行政区基础数据。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Region } from '@/lib/types';

export const regions: Region[] = [
  { id: 'beijing', name: '北京', level: 'province' },
  { id: 'shanghai', name: '上海', level: 'province' },
  { id: 'tianjin', name: '天津', level: 'province' },
  { id: 'chongqing', name: '重庆', level: 'province' },
  { id: 'heilongjiang', name: '黑龙江', level: 'province' },
  { id: 'jilin', name: '吉林', level: 'province' },
  { id: 'liaoning', name: '辽宁', level: 'province' },
  { id: 'inner-mongolia', name: '内蒙古', level: 'province' },
  { id: 'hebei', name: '河北', level: 'province' },
  { id: 'xinjiang', name: '新疆', level: 'province' },
  { id: 'gansu', name: '甘肃', level: 'province' },
  { id: 'qinghai', name: '青海', level: 'province' },
  { id: 'ningxia', name: '宁夏', level: 'province' },
  { id: 'shaanxi', name: '陕西', level: 'province' },
  { id: 'shanxi', name: '山西', level: 'province' },
  { id: 'henan', name: '河南', level: 'province' },
  { id: 'shandong', name: '山东', level: 'province' },
  { id: 'sichuan', name: '四川', level: 'province' },
  { id: 'hubei', name: '湖北', level: 'province' },
  { id: 'anhui', name: '安徽', level: 'province' },
  { id: 'jiangsu', name: '江苏', level: 'province' },
  { id: 'zhejiang', name: '浙江', level: 'province' },
  { id: 'fujian', name: '福建', level: 'province' },
  { id: 'jiangxi', name: '江西', level: 'province' },
  { id: 'hunan', name: '湖南', level: 'province' },
  { id: 'guizhou', name: '贵州', level: 'province' },
  { id: 'yunnan', name: '云南', level: 'province' },
  { id: 'guangdong', name: '广东', level: 'province' },
  { id: 'guangxi', name: '广西', level: 'province' },
  { id: 'hainan', name: '海南', level: 'province' },
  { id: 'xizang', name: '西藏', level: 'province' },
  { id: 'taiwan', name: '台湾', level: 'province' },
  { id: 'hongkong', name: '香港', level: 'province' },
  { id: 'macau', name: '澳门', level: 'province' },
];

export default regions;
```

- [ ] **Step 2: 创建 data/factions.ts（4 个示例派系）**

Create `data/factions.ts`:
```typescript
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
```

- [ ] **Step 3: 创建 data/people.ts（6 个示例人物）**

Create `data/people.ts`:
```typescript
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
```

- [ ] **Step 4: 创建 data/events.ts（5 个示例事件）**

Create `data/events.ts`:
```typescript
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
```

- [ ] **Step 5: 创建 data/relationships.ts（示例关系）**

Create `data/relationships.ts`:
```typescript
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
```

- [ ] **Step 6: 创建 data/regionControls.ts（示例控制数据）**

Create `data/regionControls.ts`:
```typescript
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
```

- [ ] **Step 7: 验证数据编译**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 8: 提交**

```bash
cd D:\Code\CRAtlas && git add data/
git commit -m "[Phase 0] feat(data): 示例数据填充（5事件/6人物/4派系/34地区/5关系/3控制记录）"
```

---

