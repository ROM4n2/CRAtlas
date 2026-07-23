# types/

项目级 TypeScript 类型声明文件。

## 文件清单

| 文件 | 职责 |
|------|------|
| `cytoscape-dagre.d.ts` | 为 `cytoscape-dagre` 扩展提供类型声明（该包无官方类型定义） |

## 说明

`cytoscape-dagre` 是 Cytoscape.js 的 Dagre 布局扩展，发布时未携带 TypeScript 类型声明。此文件通过 `declare module` 提供最小类型定义，使 `import dagre from 'cytoscape-dagre'` 能通过类型检查。

## 约定

- 仅用于为无类型声明的第三方包提供兜底声明
- 项目核心类型定义位于 `lib/types.ts`，不在本目录
