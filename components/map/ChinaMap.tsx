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
