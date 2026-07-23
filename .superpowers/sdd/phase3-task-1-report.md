### Task 1: 史料出处组件（SourceList.tsx）— Report

**Status:** DONE

#### 实现内容

1. **创建 `components/ui/SourceList.tsx`**
   - 纯展示组件，接收 `Source[]` 数组
   - 空数组时显示 "暂无史料出处"
   - 非空时显示标题 + 类型标签（中文映射）+ 日期 + 可选链接
   - 类型标签映射：official→官方档案, academic→学术研究, media→媒体报道, memoir→回忆录, local-gazetteer→地方志
   - 链接使用 `target="_blank"` + `rel="noopener noreferrer"`

2. **更新 `components/ui/README.md`**
   - 文件清单表格新增 SourceList.tsx 行

#### 测试结果

- `npm run build` — 构建成功，无类型错误，无 lint 警告
- 静态页面生成 6/6 全部成功

#### 变更文件

- `components/ui/SourceList.tsx` (新增)
- `components/ui/README.md` (修改)

#### 自查结果

- 完全按照 brief 中的代码实现，未偏离 spec
- 遵循现有 `ErrorBoundary.tsx` 的文件头注释风格
- 遵循 ui/ 层约定：纯展示组件，无业务逻辑，通过 props 接收数据
- 使用 `import type` 仅引入类型，无运行时耦合
- 无 concerns

#### 提交

- `e64d620` [Phase 3] feat(ui): 添加史料出处展示组件 SourceList
