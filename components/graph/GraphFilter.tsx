/**
 * @file    GraphFilter.tsx
 * @brief   关系图筛选面板——按关系类型、布局算法筛选。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import type { RelationshipType } from '@/lib/types';

interface GraphFilterProps {
  activeTypes: RelationshipType[];
  onTypesChange: (types: RelationshipType[]) => void;
  layout: 'cose' | 'dagre' | 'concentric';
  onLayoutChange: (layout: 'cose' | 'dagre' | 'concentric') => void;
}

const ALL_TYPES: { value: RelationshipType; label: string }[] = [
  { value: 'membership', label: '隶属' },
  { value: 'causality', label: '因果' },
  { value: 'faction-interaction', label: '派系互动' },
  { value: 'social', label: '社交' },
];

const LAYOUTS: { value: 'cose' | 'dagre' | 'concentric'; label: string }[] = [
  { value: 'cose', label: '力导向' },
  { value: 'dagre', label: '层级' },
  { value: 'concentric', label: '同心圆' },
];

export default function GraphFilter({ activeTypes, onTypesChange, layout, onLayoutChange }: GraphFilterProps) {
  const toggleType = (type: RelationshipType) => {
    if (activeTypes.includes(type)) {
      onTypesChange(activeTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...activeTypes, type]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 text-sm" role="region" aria-label="关系图筛选">
      <h3 className="font-medium text-gray-700 mb-3">筛选</h3>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2" id="filter-type-label">关系类型</p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="filter-type-label"
        >
          {ALL_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => toggleType(t.value)}
              className={`px-2 py-1 rounded text-xs transition ${
                activeTypes.includes(t.value)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-pressed={activeTypes.includes(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2" id="filter-layout-label">布局</p>
        <div
          className="flex gap-2"
          role="group"
          aria-labelledby="filter-layout-label"
        >
          {LAYOUTS.map((l) => (
            <button
              key={l.value}
              onClick={() => onLayoutChange(l.value)}
              className={`px-2 py-1 rounded text-xs transition ${
                layout === l.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-pressed={layout === l.value}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
