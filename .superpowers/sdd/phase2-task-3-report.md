# Task 3 Report: 关系图核心组件（FactionGraph.tsx）

## Status
**DONE**

## Summary
创建 `FactionGraph.tsx` —— Cytoscape 关系图核心渲染组件，订阅 Zustand store 的 currentDate，通过 getGraphNodes/getGraphEdges 获取数据，支持三种布局（cose/dagre/concentric）和节点点击交互。同时创建 `types/cytoscape-dagre.d.ts` 为 cytoscape-dagre 扩展提供类型声明。

## Changes
- **components/graph/FactionGraph.tsx**（+127 行，新建）:
  - Cytoscape 实例通过 `useRef` 持有，容器通过 `useRef` 绑定
  - `updateGraph` 回调：根据 currentDate 和 activeTypes 获取数据，移除旧元素后重新添加并运行布局
  - `useEffect` 初始化：创建 Cytoscape 实例，配置节点/边样式（颜色、形状、箭头），注册 `tap` 事件监听触发 `onNodeClick`
  - `getLayoutConfig` 辅助函数：将布局名称映射到 Cytoscape 布局配置
  - 订阅 `useTimeStore.currentDate` 实现时间轴联动
- **types/cytoscape-dagre.d.ts**（+11 行，新建）:
  - cytoscape-dagre 模块的类型声明

## Verification
- **构建**: `npm run build` 通过

## Commit
4fa1887 — [Phase 2] feat(graph): Cytoscape 关系图核心组件（节点/边渲染 + 布局）

## Concerns
无
