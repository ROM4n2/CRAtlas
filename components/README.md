# components/

## 职责

存放所有共享 React 组件，供 `app/` 下的页面组合使用。

## 子目录总览

| 子目录 | 说明 |
|--------|------|
| [layout/](layout/README.md) | 页面布局组件（Header、Footer、侧边栏框架等） |
| [map/](map/README.md) | 地图相关组件（ECharts 地图、事件散点、弹出卡片等） |
| [timeline/](timeline/README.md) | 时间轴组件及时间范围选择器 |
| [ui/](ui/README.md) | 通用 UI 原子组件（按钮、标签、加载状态等） |

## 架构位置

```
app/ (pages) → components/ (UI) → lib/ (data + state) → data/ (static data)
```

`components/` 位于第二层，消费 `lib/` 导出的查询函数与 Zustand store，不直接感知 `data/` 的存在。

## 使用原则

1. **导入路径** — 组件通过 `@/components/...` 别名导入，不使用相对路径。
2. **数据访问** — 组件不得直接 `import` `data/` 目录下的文件，必须通过 `lib/data.ts` 的查询函数获取数据。
3. **跨视图状态** — 跨组件共享的状态（如当前选中时间、筛选条件）通过 `lib/store.ts` 管理，不在组件内部另起 `useState` 传递。
4. **组件归属** — 仅在组件被两个或以上页面复用时放入 `components/`；单个页面专用的局部组件直接放在 `app/` 对应路由目录下。
5. **子目录划分** — 当一组组件围绕同一视觉区域或业务概念（如地图、时间轴）且存在内部依赖时，新建子目录；通用原子组件归入 `ui/`。
