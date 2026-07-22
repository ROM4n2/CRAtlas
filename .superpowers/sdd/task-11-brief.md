### Task 11: 可行性预研（Feasibility Spike）

**Files:**
- Create: `docs/superpowers/specs/feasibility-spike.md`

**Interfaces:**
- Consumes: 外部史料资源
- Produces: 预研报告，决定地图着色方案（正常/降级 A/B/C）

- [ ] **Step 1: 选 5 个代表性省份**

选择：北京、上海、辽宁、广东、四川

- [ ] **Step 2: 逐省查阅史料**

对每个省份，尝试构建 1966-1976 逐季/逐年的控制时间线。
查阅来源：地方志、学术研究、官方史料汇编。

记录格式：
```markdown
## 北京
| 时间段 | 控制派系 | 依据 | 史料来源 |
|--------|----------|------|----------|
| 1966.05-1966.08 | 中央文革小组 | 五一六通知成立 | xxx |
| 1966.08-1976.10 | 中央文革小组/军方 | 八届十一中全会后 | xxx |
```

- [ ] **Step 3: 评估结果并选择方案**

根据能构建时间线的省份数量：
- ≥20 省 → 正常方案
- 10-19 省 → 降级 A
- <10 省 → 降级 B
- 完全不可得 → 降级 C

- [ ] **Step 4: 写入预研报告**

Create `docs/superpowers/specs/feasibility-spike.md`，包含：
- 各省控制时间线（能构建的部分）
- 史料可获得性评估
- 选定的地图着色方案
- 下一步行动项

- [ ] **Step 5: 提交**

```bash
cd D:\Code\CRAtlas && git add docs/superpowers/specs/feasibility-spike.md
git commit -m "[Phase 0] docs: 可行性预研报告（省级派系控制史料可获得性）"
```

---

