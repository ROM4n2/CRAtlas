# components/map/

地图可视化组件——基于 ECharts 的中国地图渲染、派系着色、事件标注与交互。

## 职责

| 组件 | 职责 |
|------|------|
| **ChinaMap.tsx** | ECharts 中国地图渲染：省份按派系着色 + 重大事件散点标注 + 点击事件散点触发弹窗。动态导入（`next/dynamic`, `ssr: false`）避免 SSR 时 ECharts 报错 |
| **MapLegend.tsx** | 静态图例组件，显示派系颜色与标签的对应关系 |
| **EventPopup.tsx** | 事件弹出卡片：点击事件散点后显示事件标题、日期、摘要、关联派系。含关闭按钮和「查看详情」链接 |
| **EventSidebar.tsx** | 事件列表侧边栏：显示当前时间点及之前的所有事件，支持点击选中和高亮 |

## 文件清单

| 文件 | 职责 | 输入 | 输出 | 依赖 |
|------|------|------|------|------|
| ChinaMap.tsx | 地图渲染 + 交互 | `onEventSelect` 回调 | 点击事件散点 → 调用 `onEventSelect` | `@/lib/store`, `@/lib/data`, `echarts`, `@/public/china.json` |
| MapLegend.tsx | 图例展示 | 无（硬编码） | 渲染颜色标签列表 | 无 |
| EventPopup.tsx | 事件弹出卡片 | `event: Event`, `onClose` | 渲染卡片 + 关闭按钮 | `@/lib/data`（`getFactionName`）, `@/lib/types`（`Event`） |
| EventSidebar.tsx | 事件列表侧边栏 | `events: Event[]`, `onEventClick` | 渲染事件列表 + 点击回调 | `@/lib/types`（`Event`） |

## 数据流 / 依赖关系

```
┌──────────────────────────────────────────────────────────────────┐
│                        app/map/page.tsx                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  状态源: useTimeStore (来自 @/lib/store.ts)              │    │
│  │    - currentDate: string (默认 '1966-01-01')             │    │
│  │    - isPlaying / speed / dateRange                       │    │
│  │    通过 setDate(date) 更新 → 触发所有订阅组件重渲染      │    │
│  └──────────────────────────────────────────────────────────┘    │
│                              │                                     │
│                              ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  数据查询: @/lib/data.ts                                 │    │
│  │    - getEventsByDate(date) → Event[]                     │    │
│  │      筛选 date <= 参数的事件，按日期升序排列              │    │
│  │    - getRegionControl(date) → RegionControlMap            │    │
│  │      遍历 regionControls，取当前生效且 strength 最高的    │    │
│  │      派系作为该地区的控制方                               │    │
│  │    - getFactionColor(factionType) → HEX color             │    │
│  │      rebel→#DC2626, conservative→#2563EB,                 │    │
│  │      military→#CA8A04, other→#9333EA, undefined→#9CA3AF  │    │
│  │    - getFactionType(factionId) → FactionType              │    │
│  │    - getFactionName(factionId) → string                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                              │                                     │
│        ┌─────────────────────┼─────────────────────┐              │
│        ▼                     ▼                     ▼              │
│  ┌──────────┐         ┌────────────┐        ┌──────────────┐     │
│  │ ChinaMap │         │ MapLegend  │        │ EventSidebar │     │
│  │  .tsx    │         │   .tsx     │        │    .tsx      │     │
│  └────┬─────┘         └────────────┘        └──────┬───────┘     │
│       │                                            │              │
│       │  onEventSelect(event)                      │              │
│       ▼                                            │              │
│  ┌──────────┐                                      │              │
│  │EventPopup│                                      │              │
│  │  .tsx    │                                      │              │
│  └──────────┘                                      │              │
│                                                    │              │
└────────────────────────────────────────────────────────────────────┘
```

### 组件关系详解

1. **ChinaMap.tsx 订阅 Zustand**
   - 通过 `useTimeStore((s) => s.currentDate)` 订阅 `currentDate` 切片
   - `currentDate` 变化时，`updateMap` 回调被触发，重新调用 `getRegionControl(date)` 和 `getEventsByDate(date)` 更新 ECharts option
   - ECharts 实例通过 `useRef` 持有，只在 `useEffect([], [])` 中初始化一次

2. **点击事件散点 → EventPopup**
   - ChinaMap 注册 ECharts `click` 事件监听
   - 判断点击目标 `params.data.eventId` 是否存在
   - 存在则通过 `getEventsByDate(currentDate).find(e => e.id === data.eventId)` 找到事件对象
   - 调用 `onEventSelect(event)` 回调
   - 父组件 `MapPage` 将 `setSelectedEvent` 传入作为 `onEventSelect`
   - `selectedEvent` 非 null 时渲染 `EventPopup`，传入 `onClose={() => setSelectedEvent(null)}` 关闭

3. **MapLegend 获取派系颜色**
   - MapLegend 是纯展示组件，颜色与标签硬编码在 `legendItems` 数组中
   - 颜色值必须与 `lib/data.ts` 中 `getFactionColor()` 返回的颜色一致
   - 对应关系：`rebel → 造反派 (#DC2626)`, `conservative → 保皇派 (#2563EB)`, `military → 军方 (#CA8A04)`, `other → 争夺中 (#9333EA)`, `nodata → 无数据 (#9CA3AF)`

4. **EventSidebar 过滤事件**
   - EventSidebar 接收 `events` 作为 prop，不关心过滤逻辑
   - 过滤发生在父组件 `MapPage`：`const events = getEventsByDate(currentDate)`
   - 当用户拖动时间轴改变 `currentDate` 时，Zustand 状态更新 → `MapPage` 重渲染 → `getEventsByDate` 返回不同结果 → 传给 `EventSidebar`
   - 点击侧边栏事件项时，通过 `onEventClick(id)` 回调，父组件找到对应事件并设置 `selectedEvent`

5. **谁导入谁**
   - `app/map/page.tsx` 导入 `ChinaMap`（动态）、`MapLegend`、`EventPopup`、`EventSidebar`、`useTimeStore`、`getEventsByDate`
   - `ChinaMap.tsx` 导入 `useTimeStore`、`getRegionControl`、`getEventsByDate`、`getFactionColor`、`getFactionType`
   - `EventPopup.tsx` 导入 `getFactionName`
   - `MapLegend.tsx` 和 `EventSidebar.tsx` 不导入 data/store（通过 props 接收数据）

## 使用方式

### 在页面中组装（`app/map/page.tsx` 示例）

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TimeAxis from '@/components/timeline/TimeAxis';
import MapLegend from '@/components/map/MapLegend';
import EventPopup from '@/components/map/EventPopup';
import EventSidebar from '@/components/map/EventSidebar';
import { useTimeStore } from '@/lib/store';
import { getEventsByDate } from '@/lib/data';
import type { Event } from '@/lib/types';

const ChinaMap = dynamic(() => import('@/components/map/ChinaMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 animate-pulse" />,
});

export default function MapPage() {
  const currentDate = useTimeStore((s) => s.currentDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events = getEventsByDate(currentDate);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative p-4">
          <ChinaMap onEventSelect={setSelectedEvent} />
          <div className="absolute bottom-8 left-8">
            <MapLegend />
          </div>
          {selectedEvent && (
            <EventPopup
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>

        <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
          <EventSidebar
            events={events}
            onEventClick={(id) => {
              const event = events.find((e) => e.id === id);
              if (event) setSelectedEvent(event);
            }}
          />
        </div>
      </div>

      <TimeAxis />
    </div>
  );
}
```

## 约定

### ECharts 初始化
- ChinaMap 使用 `echarts.init()` 在 `useEffect([], [])` 中一次性初始化
- 实例通过 `useRef` 持有，组件卸载时调用 `chart.dispose()` 清理
- 窗口 `resize` 事件绑定 `chart.resize()` 实现自适应
- 必须使用 `next/dynamic` + `ssr: false` 动态导入，因为 ECharts 依赖浏览器 API

### GeoJSON 加载
- GeoJSON 数据从 `@/public/china.json` 导入（含台湾、南海诸岛等中国领土）
- 通过 `echarts.registerMap('china', chinaGeoJson)` 注册
- 注册只需一次，放在初始化 `useEffect` 中执行
- GeoJSON 文件需维护最新版本，确保省份 ID 与数据层 `regions.ts` 中的 id 一致

### 地图更新策略
- 不重建 ECharts 实例，只通过 `chart.setOption()` 更新数据
- `setOption` 使用默认的 `merge` 行为（不重置已有配置）
- 更新逻辑封装在 `updateMap` 回调中，依赖 `currentDate` 变化触发

### 颜色一致性
- `MapLegend.tsx` 中的硬编码颜色必须与 `lib/data.ts` 的 `getFactionColor()` 返回值保持一致
- 添加新派系类型时，两处需要同步更新
- 省着色使用 `getFactionColor(getFactionType(ctrl.factionId))` 保证颜色来源唯一

### 事件标注规则
- 仅 `significance === 'major'` 的事件显示为地图散点
- 散点使用 `markPoint` 实现，不单独创建 series
- `markPoint.data` 中的 `name` 字段存储事件 id，用于点击交互

### 数据流向约束
- 组件不得直接 import `@/data/*` 文件，必须通过 `@/lib/data.ts` 查询
- 状态管理统一通过 `@/lib/store.ts` 的 `useTimeStore` hook
- 子组件尽量无状态，数据通过 props 传入
- `EventSidebar` 和 `MapLegend` 不依赖任何外部状态（纯展示组件）
