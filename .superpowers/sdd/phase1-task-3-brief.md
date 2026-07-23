### Task 3: 修复 Phase 0 — 添加 React Error Boundary

**Files:**
- Create: `components/ui/ErrorBoundary.tsx`
- Create: `components/ui/README.md`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: React
- Produces: `ErrorBoundary` 组件

- [ ] **Step 1: 创建 ErrorBoundary 组件**

Create `components/ui/ErrorBoundary.tsx`:
```typescript
/**
 * @file    ErrorBoundary.tsx
 * @brief   React 错误边界——捕获子组件渲染异常，防止白屏。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">渲染出错</h2>
            <p className="text-gray-600 text-sm">
              {this.state.error?.message || '未知错误'}
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
```

- [ ] **Step 2: 创建 components/ui/README.md**

Create `components/ui/README.md`:
```markdown
# components/ui/

通用 UI 组件——错误边界、标签、搜索弹窗等跨视图复用的基础组件。

## 文件

| 文件 | 职责 |
|------|------|
| ErrorBoundary.tsx | React 错误边界，捕获子组件异常防止白屏 |

## 使用方式

```<ErrorBoundary fallback={<div>出错了</div>}>
  <SomeComponent />
</ErrorBoundary>
```
```

- [ ] **Step 3: 在 layout.tsx 中使用 ErrorBoundary**

Modify `app/layout.tsx`，将 `{children}` 包裹在 ErrorBoundary 中：
```typescript
import ErrorBoundary from '@/components/ui/ErrorBoundary';

// 在 return 中：
<ErrorBoundary>
  <main className="min-h-screen">{children}</main>
</ErrorBoundary>
```

- [ ] **Step 4: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功

- [ ] **Step 5: 提交**

```bash
cd D:\Code/CRAtlas && git add components/ui/ app/layout.tsx
git commit -m "[Phase 1] feat(ui): 添加 React Error Boundary，防止组件崩溃白屏"
```

---

