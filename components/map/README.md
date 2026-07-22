# components/map

本目录存放地图可视化组件，基于 ECharts 渲染中国地图及事件数据。

## 文件列表

| 文件 | 状态 | 说明 |
| --- | --- | --- |
| `ChinaMap.tsx` | 已实现 | ECharts 中国地图渲染组件（Phase 0 验证版，仅渲染轮廓） |
| `MapLegend.tsx` | 未来 | 地图图例组件，展示事件数量/严重度色阶 |
| `EventPopup.tsx` | 未来 | 事件详情弹窗，点击省份或散点后展示 |

## ECharts 集成方式

- **注册地图**：在客户端组件（`'use client'`）中通过 `echarts.registerMap('china', geoJson)` 注册。
- **GeoJSON 来源**：`public/china.json`，由构建时静态导入（`import chinaGeoJson from '@/public/china.json'`）。
- **渲染入口**：`echarts.init(dom)` → `chart.setOption(option)`，配合 `useRef` 持有实例。
- **生命周期**：`useEffect` 初始化并监听 `resize`，卸载时调用 `chart.dispose()` 释放资源。
- **交互**：`geo.roam: true` 开启鼠标滚轮缩放与拖拽平移。

## 后续计划（Phase 1）

- 省份按事件数量着色（visualMap）
- 事件散点图层（scatter / effectScatter）
- 点击省份下钻或弹出详情
