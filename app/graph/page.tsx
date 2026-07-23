/**
 * @file    page.tsx
 * @brief   关系图视图页——Cytoscape 图谱 + 筛选面板 + 节点详情侧边栏。
 * @author  CRAtlas Team
 * @version 1.1.0
 * @date    2026-07-23
 *
 * @description
 * 桌面端（md+）：右侧固定面板（筛选 + 详情）。
 * 移动端（<md）：面板可折叠/隐藏，通过按钮切换。
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import GraphFilter from '@/components/graph/GraphFilter';
import NodeDetail from '@/components/graph/NodeDetail';
import type { RelationshipType } from '@/lib/types';

const FactionGraph = dynamic(() => import('@/components/graph/FactionGraph'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 animate-pulse" />,
});

export default function GraphPage() {
  const [activeTypes, setActiveTypes] = useState<RelationshipType[]>([
    'membership',
    'causality',
    'faction-interaction',
    'social',
  ]);
  const [layout, setLayout] = useState<'cose' | 'dagre' | 'concentric'>('cose');
  const [selectedNode, setSelectedNode] = useState<{ id: string; type: string } | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex-1 p-2 md:p-4">
        <FactionGraph
          activeTypes={activeTypes}
          layout={layout}
          onNodeClick={(id, type) => {
            setSelectedNode({ id, type });
            // 移动端点击节点时自动展开面板
            setPanelOpen(true);
          }}
        />
      </div>

      {/* 桌面端：固定右侧面板 */}
      <div className="hidden md:block w-80 border-l border-gray-200 p-4 overflow-y-auto space-y-4">
        <GraphFilter
          activeTypes={activeTypes}
          onTypesChange={setActiveTypes}
          layout={layout}
          onLayoutChange={setLayout}
        />
        <NodeDetail
          nodeId={selectedNode?.id ?? null}
          nodeType={selectedNode?.type ?? null}
          onClose={() => setSelectedNode(null)}
        />
      </div>

      {/* 移动端：浮动按钮 */}
      <button
        onClick={() => setPanelOpen((prev) => !prev)}
        className="md:hidden fixed bottom-20 right-4 z-40 bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg text-sm hover:bg-blue-700 transition"
        aria-label={panelOpen ? '收起面板' : '打开面板'}
      >
        {panelOpen ? '收起' : '筛选/详情'}
      </button>

      {/* 移动端：底部抽屉面板 */}
      {panelOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
        >
          {/* 遮罩层 */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPanelOpen(false)}
            aria-hidden="true"
          />
          {/* 抽屉内容 */}
          <div className="relative bg-white rounded-t-xl max-h-[70vh] overflow-y-auto p-4 shadow-xl space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-700">筛选 / 详情</h2>
              <button
                onClick={() => setPanelOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label="关闭"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <GraphFilter
              activeTypes={activeTypes}
              onTypesChange={setActiveTypes}
              layout={layout}
              onLayoutChange={setLayout}
            />
            <NodeDetail
              nodeId={selectedNode?.id ?? null}
              nodeType={selectedNode?.type ?? null}
              onClose={() => setSelectedNode(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
