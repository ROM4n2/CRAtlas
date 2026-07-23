# Task 7 Report: 组件文档（components/graph/README.md）

## Status
**DONE**

## Summary
创建 `components/graph/README.md` 文档，说明图谱组件目录的职责、数据流、节点/边样式规则、布局算法说明和开发约定。

## Changes
- **components/graph/README.md**（+72 行，新建）:
  - 职责表：FactionGraph / GraphFilter / NodeDetail 三个组件的功能说明
  - 数据流图（ASCII）：展示 page.tsx 与三个子组件的状态传递和依赖关系
  - 节点样式表：人物（圆形/蓝）、事件（菱形/橙）、派系（方形/按类型着色）
  - 边样式表：隶属（实线/有箭头）、因果（虚线/有箭头）、派系互动（粗实线/双向）、社交（点线/无箭头）
  - 布局算法表：cose（力导向）、dagre（层级）、concentric（同心圆）
  - 约定：Cytoscape 必须 ssr: false、布局切换通过 cy.layout().run()、节点点击通过 tap 事件

## Verification
- **文档创建完成**: 结构清晰，内容覆盖全部组件和样式规则

## Commit
c0551a2 — [Phase 2] docs: 添加 components/graph/README.md

## Concerns
无
