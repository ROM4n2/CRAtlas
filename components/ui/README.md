# components/ui/

通用 UI 组件——错误边界、标签、搜索弹窗等跨视图复用的基础组件。

## 文件

| 文件 | 职责 |
|------|------|
| ErrorBoundary.tsx | React 错误边界，捕获子组件异常防止白屏 |

## 使用方式

```
<ErrorBoundary fallback={<div>出错了</div>}>
  <SomeComponent />
</ErrorBoundary>
```
