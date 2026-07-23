### Task 4: 扩展示例数据 — 补齐缺失事件和人物

**Files:**
- Modify: `data/events.ts`
- Modify: `data/people.ts`
- Modify: `data/relationships.ts`
- Modify: `data/README.md`

**Interfaces:**
- Consumes: `lib/types.ts`
- Produces: 10 个事件、11 个人物（满足设计规范 §3.5 最低要求）

- [ ] **Step 1: 补齐 5 个缺失事件**

在 `data/events.ts` 的 `events` 数组末尾追加：

```typescript
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
```

- [ ] **Step 2: 补齐 5 个缺失人物**

在 `data/people.ts` 的 `people` 数组末尾追加：

```typescript
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
```

- [ ] **Step 3: 验证编译和测试**

Run: `cd D:\Code\CRAtlas && npx tsc --noEmit && npx jest`
Expected: 无错误，全部测试通过

- [ ] **Step 4: 提交**

```bash
cd D:\Code/CRAtlas && git add data/events.ts data/people.ts data/README.md
git commit -m "[Phase 1] feat(data): 补齐示例数据（10事件/11人物，满足设计规范最低要求）"
```

---

