/**
 * @file    MapLegend.tsx
 * @brief   地图图例——显示派系颜色对应关系。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

interface LegendItem {
  color: string;
  label: string;
}

const legendItems: LegendItem[] = [
  { color: '#DC2626', label: '造反派控制' },
  { color: '#2563EB', label: '保皇派控制' },
  { color: '#CA8A04', label: '军方控制' },
  { color: '#9333EA', label: '争夺中' },
  { color: '#9CA3AF', label: '无数据' },
];

export default function MapLegend() {
  return (
    <div className="bg-white rounded-lg shadow p-3 text-sm">
      <h3 className="font-medium mb-2 text-gray-700">图例</h3>
      <div className="space-y-1">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-sm border border-gray-300"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
