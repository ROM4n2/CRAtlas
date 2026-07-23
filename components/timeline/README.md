# components/timeline/

时间轴相关组件——全局时间控制条。

## 文件

| 文件 | 职责 |
|------|------|
| TimeAxis.tsx | 时间轴控制条：播放/暂停/速度/日期拖拽，订阅 Zustand store |

## 使用方式

放在页面底部，自动与地图和关系图联动：

```tsx
import TimeAxis from '@/components/timeline/TimeAxis';

<TimeAxis />
```
