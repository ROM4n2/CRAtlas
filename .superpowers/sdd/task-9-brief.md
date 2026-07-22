### Task 9: ECharts 中国地图渲染验证

**Files:**
- Create: `components/map/ChinaMap.tsx`（Phase 0 验证版本）

**Interfaces:**
- Consumes: `public/china.json`（GeoJSON）
- Produces: 能渲染中国地图轮廓的 ECharts 组件

- [ ] **Step 1: 创建 ChinaMap 验证组件**

Create `components/map/ChinaMap.tsx`:
```typescript
/**
 * @file    ChinaMap.tsx
 * @brief   ECharts 中国地图渲染验证——Phase 0 仅验证地图能正确渲染。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 *
 * @note Phase 0 目标：验证 ECharts 能注册并渲染中国地图轮廓。
 *       省份着色和事件散点在 Phase 1 实现。
 */

'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import chinaGeoJson from '@/public/china.json';

export default function ChinaMap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 注册中国地图
    echarts.registerMap('china', chinaGeoJson as never);

    const chart = echarts.init(chartRef.current);
    instanceRef.current = chart;

    chart.setOption({
      title: {
        text: '中国地图（Phase 0 验证）',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
      },
      geo: {
        map: 'china',
        roam: true,
        itemStyle: {
          areaColor: '#E5E7EB',
          borderColor: '#9CA3AF',
        },
        emphasis: {
          itemStyle: {
            areaColor: '#C084FC',
          },
        },
      },
    });

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
}
```

- [ ] **Step 2: 在地图页使用组件**

Modify `app/map/page.tsx`:
```typescript
import ChinaMap from '@/components/map/ChinaMap';

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">地图视图</h1>
      <ChinaMap />
    </div>
  );
}
```

- [ ] **Step 3: 验证渲染**

Run: `cd D:\Code\CRAtlas && npm run dev`
Expected: 访问 `/map`，能看到中国地图轮廓（灰色底图），可缩放拖拽

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add components/map/ChinaMap.tsx app/map/page.tsx
git commit -m "[Phase 0] feat(map): ECharts 中国地图渲染验证通过"
```

---

