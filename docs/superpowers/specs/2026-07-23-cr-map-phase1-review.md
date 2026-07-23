# Phase 1 总体检验报告

> 审查日期：2026-07-23
> 审查范围：Phase 1（核心可视化）交付物 vs 设计规范 `2026-07-22-cr-map-design.md`
> HEAD：`7e4f7e9`（含 README 完善提交）
> 基准：构建 5/5 页面 ✅ · 测试 24/24 ✅

---

## 1. 结论摘要

Phase 1 **核心目标基本达成**：地图渲染 + 省份着色 + 时间轴 + 事件散点 + 弹出卡片 + 侧边栏 + 图例 + Error Boundary 均已实现，四层架构执行正确，数据查询层封装良好。

存在 **2 个功能缺陷（Bug）** 和若干与规范的偏差，需在 Phase 2 前或同期修复。无阻塞性问题，项目可进入 Phase 2。

---

## 2. 设计规范逐项审查

### 2.1 数据模型（§3）

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 核心类型定义完整 | ✅ | `Faction`/`Person`/`Event`/`Region`/`Relationship`/`Source` 等全部定义 |
| 文件头 @file/@brief | ✅ | 所有 `lib/`、`data/`、组件文件均有规范文件头 |
| 公共函数 TSDoc | ✅ | `lib/data.ts` 全部公共函数含 `@param`/`@returns` |
| `factionIds` 冗余字段 | ⚠️ 偏差 | 规范 §3.2 方案 A 选定"删除 factionIds"，但 `Event.factionIds` 仍保留，且 `EventPopup` 使用它显示关联派系 |

**偏差说明**：`factionIds` 与 `affiliations` 存在数据冗余风险。当前示例数据量小未触发不一致，但长期应删除 `factionIds`，改用 `participants` → `getCurrentFactionIds()` 推导。

### 2.2 示例数据（§3.5）

| 实体 | 规范要求 | 实际 | 状态 |
|------|----------|------|------|
| 事件 | ≥ 9 个关键事件 | 10 个 | ✅ |
| 人物 | 11 人（毛/林/江/张/王/陈/康/戚/蒯/谭） | 11 人 | ✅ |
| 派系 | 4 个 | 4 个 | ✅ |
| 地区 | 34 省级 | 34 | ✅ |
| 关系 | Phase 2 重点 | 5 条 | ✅（可接受） |
| regionControls | 降级方案决定 | 2 条（北京/上海） | ⚠️ 见下文 |

**regionControls 说明**：仅 2 个省有控制数据，按 §3.4.4 降级规则属降级 B 区间（<10 省）。当前实现采用降级 A 方式（有数据的着色，其余灰底 `#E5E7EB`）。数据稀缺是已知最高优先级风险，当前处理方式合理，但地图可视化效果有限（绝大部分省份灰色）。

### 2.3 地图组件（§4.1）

| 检查项 | 状态 | 说明 |
|--------|------|------|
| ECharts 注册中国地图 | ✅ | `echarts.registerMap('china', chinaGeoJson)` |
| 省份按派系着色 | ✅ | 通过 `getFactionColor(getFactionType(...))` 映射 |
| 颜色方案一致 | ✅ | rebel `#DC2626` / conservative `#2563EB` / military `#CA8A04` / nodata `#9CA3AF` |
| 事件散点 | 🔴 Bug | 见 F1 |
| 点击事件 → EventPopup | ✅ | 通过 `onEventSelect` 回调 |
| 悬停 Tooltip | ✅ | 显示控制强度 |
| Props 接口 | ⚠️ 简化 | 规范要求 5 个 props，实际仅 `onEventSelect`；组件从 store 自取数据 |

**Props 简化评估**：当前设计（组件从 store 读取 `currentDate`，自行调用查询函数）减少了 prop 注射，更简洁。但 `onRegionClick` 未实现（点击省份无跳转），规范要求的功能缺失。

### 2.4 时间轴组件（§4.3）

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 播放/暂停按钮 | ✅ 外观 / 🔴 逻辑 | 见 F2 |
| 速度调节 1x/2x/4x | ✅ 外观 / 🔴 逻辑 | 按钮渲染正确，但播放逻辑未实现 |
| 日期拖拽滑块 | ✅ | `dateToPercent`/`percentToDate` 映射正确 |
| 日期标签跟随 | ✅ | `formatDate` 中文格式 |
| 日期范围 1966-1976 | ✅ | 硬编码常量正确 |
| keyMarkers 关键事件标记 | ❌ 缺失 | 规范要求时间轴上的小三角 + 标签 |
| 月/季/年缩放 | ❌ 缺失 | 规范要求支持缩放 |
| 拖拽选择时间范围 | ❌ 缺失 | 规范要求 `dateRange` 选择 |
| Props 接口 | ⚠️ 简化 | 规范要求 7 个 props，实际 0 个（全部从 store 读取） |

### 2.5 其他组件

| 组件 | 状态 | 说明 |
|------|------|------|
| MapLegend | ✅ | 5 项颜色标签，与规范一致 |
| EventPopup | ✅ | 标题/日期/摘要/派系标签/查看详情链接 |
| EventSidebar | ✅ | 事件列表 + 重要性徽章 + 点击选中 |
| Navbar | ⚠️ | 链接到 /timeline /graph /about — 这些路由不存在（404） |
| ErrorBoundary | ⚠️ | 基础实现 ✅，缺 `componentDidCatch` 日志和 `window.onerror` 全局兜底（§8.6） |

### 2.6 页面与路由（§5）

| 路由 | 规范 Phase 1 要求 | 实际 | 状态 |
|------|-------------------|------|------|
| `/` 首页 | ✅ | ✅ | ✅ |
| `/map` 地图视图 | ✅ | ✅ | ✅ |
| `/timeline` 时间轴视图 | Phase 3 | ❌ 不存在 | ⚠️ Navbar 链接 404 |
| `/graph` 关系图 | Phase 2 | ❌ 不存在 | ⚠️ Navbar 链接 404 |
| `/about` 关于页 | Phase 1 静态内容 | ❌ 不存在 | ⚠️ Navbar 链接 404 |
| `/event/[id]` 等详情页 | Phase 3 | ❌ 不存在 | ✅ 符合阶段规划 |

### 2.7 架构合规（§8.1）

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 四层架构依赖方向 | ✅ | 组件 → lib/data.ts → lib/types.ts ← data/ |
| 组件不直接 import 数据文件 | ✅ | 全部通过 `lib/data.ts` 查询函数 |
| Zustand 状态集中 | ✅ | `useTimeStore` 统一管理时间状态 |
| 查询封装 | ✅ | `lib/data.ts` 封装全部数据访问 |

---

## 3. 缺陷清单（按严重性排序）

### F1 🔴 事件散点坐标全部为 [0, 0]（Bug）

**位置**：`components/map/ChinaMap.tsx` 第 49 行

```ts
coord: [0, 0] as [number, number],
```

**现象**：所有事件散点被放置在坐标 (0, 0)（几内亚湾，非洲西海岸），而非其所在省份。在中国地图视口内，事件标记不可见或堆叠在地图外。

**影响**：地图核心功能"事件标注"失效。用户无法在地图上看到事件散点。

**修复建议**：
- 方案 A：在 `Event` 类型中增加 `coordinates: [lng, lat]` 字段，从 GeoJSON 省份质心计算或手动标注
- 方案 B：使用 ECharts `geoIndex` + 省份名自动定位（`coord` 改为省份中心坐标）
- 当前 `name: e.id` 无法被 ECharts 匹配到地理坐标（id 不是地名）

### F2 🔴 播放按钮不推进日期（Bug）

**位置**：`components/timeline/TimeAxis.tsx` + `lib/store.ts`

**现象**：点击播放按钮切换 `isPlaying` 状态，但无 `setInterval` 或 `useEffect` 监听 `isPlaying` 并推进 `currentDate`。播放状态下日期不变化。

**影响**：时间轴核心功能"自动播放"失效。用户无法观看派系势力随时间的自动演变。

**修复建议**：在 `TimeAxis.tsx` 中添加 `useEffect`：
```ts
useEffect(() => {
  if (!isPlaying) return;
  const interval = setInterval(() => {
    // 按 speed × 30 天/秒 推进
    setDate(advanceDate(currentDate, speed * 30));
  }, 1000);
  return () => clearInterval(interval);
}, [isPlaying, speed, currentDate]);
```

### F3 🟡 关于页缺失（规范偏差）

**位置**：`app/about/page.tsx` 不存在

**说明**：规范 §7 Phase 1 交付清单明确包含"首页 + 导航栏 + **关于页（静态内容）**"。关于页内容在 §5.5 有详细定义（立场声明、史料说明、使用指南、贡献指南）。

**影响**：Navbar "关于"链接 404；用户无法了解项目立场和史料来源。

### F4 🟡 Navbar 链接到不存在的路由

**位置**：`components/layout/Navbar.tsx`

**现象**："时间轴"→`/timeline`、"关系图"→`/graph`、"关于"→`/about` 均无对应页面，点击后 404。

**修复建议**：
- 短期：移除或禁用未实现的路由链接（添加 `aria-disabled` 或 tooltip "即将推出"）
- 长期：Phase 2/3 实现对应页面

### F5 🟡 `factionIds` 冗余字段未删除

**位置**：`lib/types.ts` `Event` 接口 + `EventPopup.tsx`

**说明**：规范 §3.2 方案 A 选定删除 `factionIds`，但实现中保留且被 `EventPopup` 使用。与 `affiliations` 存在数据冗余风险。

**修复建议**：Phase 3 填充数据前删除该字段，改用 `participants` + `getCurrentFactionIds()` 推导。

### F6 🟡 缺少组件渲染测试

**位置**：测试仅覆盖 `lib/data.test.ts` + `lib/store.test.ts`

**说明**：规范 §8.7 要求"关键组件（ChinaMap、FactionGraph）至少一个渲染测试"。当前无组件测试。

**修复建议**：Phase 2 前为 `ChinaMap`、`TimeAxis` 添加基础渲染测试（验证组件挂载不抛错）。

### F7 🟡 ErrorBoundary 缺日志与全局兜底

**位置**：`components/ui/ErrorBoundary.tsx`

**说明**：规范 §8.6 要求 `componentDidCatch` 日志 + `window.onerror` 全局捕获。当前仅有 `getDerivedStateFromError` 降级 UI。

---

## 4. 规范中未实现但 Phase 1 范围外的功能

以下功能规范标注为 Phase 2/3/4，**不记为偏差**：

| 功能 | 规范 Phase | 状态 |
|------|------------|------|
| 关系图（Cytoscape） | Phase 2 | 待开发 |
| 事件/人物/派系详情页 | Phase 3 | 待开发 |
| 全局搜索弹窗 | Phase 3 | `search()` 函数已实现，UI 待建 |
| 时间轴视图页 /timeline | Phase 3 | 待开发 |
| Giscus 评论 | Phase 4 | 待开发 |
| 笔记/标注 | Phase 4 | 待开发 |

---

## 5. 质量评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 架构合规 | ⭐⭐⭐⭐⭐ | 四层架构严格执行，依赖方向正确 |
| 代码规范 | ⭐⭐⭐⭐⭐ | 文件头、TSDoc、命名规范齐全 |
| 功能完整性 | ⭐⭐⭐ | 核心功能框架齐全，但 2 个关键 Bug 影响可用性 |
| 测试覆盖 | ⭐⭐⭐ | 数据层覆盖好，缺组件测试 |
| 文档 | ⭐⭐⭐⭐⭐ | README 体系完善，数据流图清晰 |

---

## 6. 修复优先级建议

| 优先级 | 缺陷 | 建议处理时机 |
|--------|------|--------------|
| P0 | F1 事件散点坐标 | Phase 2 前修复（地图核心功能） |
| P0 | F2 播放逻辑 | Phase 2 前修复（时间轴核心功能） |
| P1 | F3 关于页 | Phase 2 期间实现（Navbar 已有链接） |
| P1 | F4 Navbar 404 | 短期禁用链接，长期随页面实现 |
| P2 | F5 factionIds 冗余 | Phase 3 数据填充前 |
| P2 | F6 组件测试 | Phase 2 前 |
| P3 | F7 ErrorBoundary 日志 | Phase 5 打磨期 |

---

## 7. 最终结论

Phase 1 **通过**，可进入 Phase 2。建议在 Phase 2 启动前修复 P0 缺陷（F1、F2），使地图和时间轴达到可用状态。架构基础扎实，代码规范良好，为后续 Phase 奠定可靠地基。

---

*审查人：Claude (code review) · 2026-07-23*
