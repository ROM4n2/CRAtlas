### Task 3: 无障碍增强（ARIA）— Report

**Status:** DONE
**Commit:** `4f536e8` [Phase 5] feat(a11y): 无障碍 ARIA 属性增强

---

#### 变更概览

为 6 个交互组件添加了 ARIA 属性，覆盖 dialog、group、list、article、region 五种角色模式，并确保所有图标按钮和交互控件具备可访问标签。

#### 逐文件变更

| 文件 | 变更内容 |
|------|----------|
| `components/ui/SearchModal.tsx` | 弹窗容器添加 `role="dialog"` `aria-modal="true"` `aria-labelledby`；输入框升级为 `role="combobox"` + `aria-expanded` + `aria-controls`；结果容器添加 `role="listbox"`；结果项添加 `role="option"` + `aria-posinset`/`aria-setsize`；空结果添加 `role="status"` `aria-live="polite"` |
| `components/graph/GraphFilter.tsx` | 外层添加 `role="region"`；关系类型/布局按钮组添加 `role="group"` + `aria-labelledby`；所有按钮添加 `aria-pressed` 状态 |
| `components/timeline/EventCard.tsx` | 卡片添加 `role="article"` + `aria-label`；重要程度标签添加 `aria-label`；详情链接添加描述性 `aria-label` |
| `components/map/EventSidebar.tsx` | 外层添加 `role="region"`；列表容器添加 `role="list"` + `aria-labelledby`；每项添加 `role="listitem"`；详情链接添加 `aria-label` |
| `components/map/EventPopup.tsx` | 弹出层添加 `role="region"` + `aria-label`；派系标签组添加 `role="group"`；详情链接添加 `aria-label`（关闭按钮原有 `aria-label` 保留） |
| `components/timeline/TimeAxis.tsx` | 控件区添加 `role="region"`；速度按钮组添加 `role="group"` + `aria-pressed`；滑块添加 `aria-label` + `aria-valuetext`；当前日期添加 `aria-live="polite"` |

#### 构建修复

构建过程中发现 `openhistory/` 目录（gitignore 的外部项目）被 `tsconfig.json` 的 `**/*.ts` 包含规则命中，导致 `maplibre-gl` 模块缺失错误。该问题与本任务无关（已确认 stash 后同样失败），通过将 `openhistory` 加入 `tsconfig.json` 的 `exclude` 解决。

#### 验证

- `npm run build` — 通过（51 个静态页面生成成功）
- 类型检查 — 通过
- 所有图标按钮均具备 `aria-label`
