/**
 * @file    ChinaMap.tsx
 * @brief   ECharts 中国地图——省份着色 + 事件散点 + 交互。
 * @author  CRAtlas Team
 * @version 2.0.0
 * @date    2026-07-22
 *
 * @description
 * 订阅 Zustand store 的 currentDate，根据 getRegionControl 着色省份，
 * 根据 getEventsByDate 显示事件散点。点击事件散点触发 onEventSelect。
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import chinaGeoJson from '@/public/china.json';
import { useTimeStore } from '@/lib/store';
import { getRegionControl, getEventsByDate, getFactionColor, getFactionType } from '@/lib/data';
import type { Event } from '@/lib/types';

interface ChinaMapProps {
  onEventSelect: (event: Event) => void;
}

export default function ChinaMap({ onEventSelect }: ChinaMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);
  const currentDate = useTimeStore((s) => s.currentDate);

  const updateMap = useCallback(() => {
    const chart = instanceRef.current;
    if (!chart) return;

    const regionControl = getRegionControl(currentDate);
    const events = getEventsByDate(currentDate);

    const mapData = Object.entries(regionControl).map(([regionId, ctrl]) => ({
      name: regionId,
      value: ctrl.strength,
      itemStyle: {
        areaColor: getFactionColor(getFactionType(ctrl.factionId)),
      },
    }));

    const majorEvents = events.filter((e) => e.significance === 'major');
    const markPoints = majorEvents.map((e) => ({
      name: e.id,
      coord: [0, 0] as [number, number],
      symbolSize: 8,
      itemStyle: { color: '#F59E0B' },
      eventId: e.id,
    }));

    chart.setOption({
      title: {
        text: `中国地图 — ${currentDate}`,
        left: 'center',
        textStyle: { fontSize: 14 },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: { name: string; value?: number; seriesType?: string }) => {
          if (params.seriesType === 'map') {
            const ctrl = regionControl[params.name];
            if (ctrl) {
              return `${params.name}<br/>控制强度: ${(ctrl.strength * 100).toFixed(0)}%`;
            }
          }
          return params.name;
        },
      },
      geo: {
        map: 'china',
        roam: true,
        itemStyle: {
          areaColor: '#E5E7EB',
          borderColor: '#9CA3AF',
        },
        emphasis: {
          itemStyle: { areaColor: '#C084FC' },
        },
      },
      series: [
        {
          name: '地区控制',
          type: 'map',
          geoIndex: 0,
          data: mapData,
          markPoint: {
            symbol: 'circle',
            symbolSize: 6,
            data: markPoints,
            itemStyle: { color: '#F59E0B' },
            tooltip: {
              formatter: (params: { name: string }) => {
                const ev = events.find((e) => e.id === params.name);
                return ev ? `${ev.title}<br/>${ev.date}` : params.name;
              },
            },
          },
        },
      ],
    });
  }, [currentDate]);

  useEffect(() => {
    if (!chartRef.current) return;

    echarts.registerMap('china', chinaGeoJson as never);
    const chart = echarts.init(chartRef.current);
    instanceRef.current = chart;

    chart.on('click', (params: Record<string, unknown>) => {
      const data = params.data as { eventId?: string } | undefined;
      if (data?.eventId) {
        const event = getEventsByDate(currentDate).find(
          (e) => e.id === data.eventId
        );
        if (event) onEventSelect(event);
      }
    });

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateMap();
  }, [updateMap]);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
}
