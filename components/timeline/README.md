# components/timeline/

时间轴相关组件——全局时间控制条。所有视图（地图、关系图）通过 Zustand store 订阅当前日期，实现联动。

---

## 职责

- 提供全局时间轴控制条，用户可拖动日期、播放/暂停、调节播放速度
- 将用户操作写入 Zustand `useTimeStore`，其他视图（地图、关系图）通过同一 store 自动响应
- 不包含任何视图自身的渲染逻辑，仅作为状态输入端

## 文件清单

| 文件 | 职责 |
|------|------|
| `TimeAxis.tsx` | 时间轴控制条组件：播放/暂停按钮、速度选择（1x/2x/4x）、日期拖拽滑块、日期标签 |
| `README.md` | 本文档 |

## 数据流 / 依赖关系

```
用户操作 ──→ TimeAxis.tsx ──→ useTimeStore ──→ 地图组件 (ECharts)
                                        ├──→ 关系图组件 (Cytoscape)
                                        └──→ 事件列表侧边栏
```

### 订阅的状态字段

`TimeAxis` 通过 `useTimeStore` 订阅以下状态和操作（详见 [`lib/store.ts`](../../lib/store.ts)）：

| 状态/操作 | 类型 | 说明 |
|-----------|------|------|
| `currentDate` | `string` | 当前选中日期，格式 `YYYY-MM-DD`，默认 `1966-01-01` |
| `isPlaying` | `boolean` | 是否正在自动播放，默认 `false` |
| `speed` | `number` | 播放速度倍率，取值 1 / 2 / 4，默认 1 |
| `setDate(date)` | `(date: string) => void` | 设置当前日期 |
| `togglePlay()` | `() => void` | 切换播放/暂停 |
| `setSpeed(speed)` | `(speed: number) => void` | 设置播放速度 |

### 内部逻辑

- `dateToPercent(date)`：将 `YYYY-MM-DD` 日期映射到 1966-01-01 ~ 1976-10-31 区间内的百分比（0 ~ 100）
- `percentToDate(percent)`：将百分比反向映射回 `YYYY-MM-DD` 字符串
- `formatDate(date)`：将 `YYYY-MM-DD` 格式化为中文显示 `YYYY年M月`

### 联动机制

组件**不直接调用**地图或关系图的任何方法。所有联动通过 Zustand store 完成：

```ts
// TimeAxis 写入
const { setDate } = useTimeStore();
setDate('1967-05-01');

// 地图组件读取（在其他文件中）
const currentDate = useTimeStore((s) => s.currentDate);
```

这种设计保证四层架构的依赖方向：组件层（timeline）→ 应用层（store）← 组件层（map/force-graph），不产生跨组件的直接依赖。

## 使用方式

放在页面底部，作为全局时间控制条：

```tsx
import TimeAxis from '@/components/timeline/TimeAxis';

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1">
        {/* 地图或关系图视图 */}
      </main>
      <TimeAxis />
    </div>
  );
}
```

组件为 `'use client'` 组件，必须放在客户端渲染的上下文中。

### 交互说明

- **播放/暂停**：点击圆形按钮切换。播放状态下按钮显示暂停图标，暂停状态下显示播放图标
- **速度选择**：三档按钮 `1x` / `2x` / `4x`，选中态高亮为蓝色
- **日期拖拽**：范围滑块，拖动时顶部跟随显示当前日期中文标签
- **日期范围**：固定为 1966 年 1 月 ～ 1976 年 10 月，滑块两端标注

## 约定

### 日期格式

- 内部存储和 store 传递统一使用 `YYYY-MM-DD` 格式（ISO 8601 前 10 字符），例如 `"1966-05-16"`
- 显示时通过 `formatDate` 转为中文格式 `YYYY年M月`，例如 `"1966年5月"`
- 不允许使用 `Date` 对象直接传递，始终使用字符串

### 播放速度

- 可选值限定为 `1`、`2`、`4`（倍速）
- 默认值 `1`
- 新增速度档位需同步更新 `TimeAxis.tsx` 中的按钮渲染数组 `[1, 2, 4]` 以及 store 的默认值

### 日期范围常量

当前硬编码在 `TimeAxis.tsx` 中：

```ts
const minDate = '1966-01-01';
const maxDate = '1976-10-31';
```

如需改为动态配置，应提取到 `lib/data.ts` 或环境变量中。

### 组件定位

`TimeAxis` 是纯控制组件，不包含任何数据获取逻辑。它不关心当前日期对应的历史事件是什么——那是地图/关系图等消费端的职责。

### 无障碍

- 播放/暂停按钮包含 `aria-label` 属性（"播放" / "暂停"）
- 新增交互元素时应遵循相同规范
