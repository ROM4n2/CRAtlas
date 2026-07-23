# components/map/

地图可视化组件——ECharts 中国地图渲染、图例、事件标注。

## 文件

| 文件 | 职责 |
|------|------|
| ChinaMap.tsx | ECharts 中国地图：省份着色 + 事件散点 + 点击交互，订阅 Zustand store |
| MapLegend.tsx | 地图图例：显示派系颜色对应关系 |
| EventPopup.tsx | 事件弹出卡片：点击事件散点后显示摘要 |
| EventSidebar.tsx | 事件列表侧边栏：显示当前时间点及之前的所有事件 |

## 数据流

```
Zustand store (currentDate)
  → getRegionControl(date) → 省份着色
  → getEventsByDate(date)  → 事件散点
  → 用户点击事件 → onEventSelect → EventPopup 显示详情
```
