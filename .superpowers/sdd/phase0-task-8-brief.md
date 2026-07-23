### Task 8: 基础页面骨架

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/map/page.tsx`
- Create: `components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: `lib/store.ts` 的 `useTimeStore`
- Produces: 可访问的首页 + 导航栏 + 地图页占位

- [ ] **Step 1: 创建 globals.css**

Create `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-rebel: #DC2626;
  --color-conservative: #2563EB;
  --color-military: #CA8A04;
  --color-contested: #9333EA;
  --color-nodata: #9CA3AF;
}

body {
  @apply bg-gray-50 text-gray-900 antialiased;
}
```

- [ ] **Step 2: 创建 layout.tsx**

Create `app/layout.tsx`:
```typescript
/**
 * @file    layout.tsx
 * @brief   根布局——导航栏 + 全局结构。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'CRAtlas — 文革派系势力可视化',
  description: '1966-1976 年文化大革命期间造反派与保皇派势力演变、关键事件、人物关系的可视化平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 创建 Navbar.tsx**

Create `components/layout/Navbar.tsx`:
```typescript
/**
 * @file    Navbar.tsx
 * @brief   顶部导航栏——Logo + 三大视图切换 + 关于页链接。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            CRAtlas
          </Link>
          <div className="flex space-x-6 text-sm">
            <Link href="/map" className="text-gray-600 hover:text-gray-900">
              地图
            </Link>
            <Link href="/timeline" className="text-gray-600 hover:text-gray-900">
              时间轴
            </Link>
            <Link href="/graph" className="text-gray-600 hover:text-gray-900">
              关系图
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              关于
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: 创建首页 page.tsx**

Create `app/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   首页——项目简介 + 三大视图入口。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">CRAtlas</h1>
      <p className="text-lg text-gray-600 mb-8">
        1966-1976 年文化大革命期间造反派与保皇派势力演变、关键事件、人物关系的可视化平台。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/map"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">🗺️ 地图视图</h2>
          <p className="text-gray-600">按省份查看派系势力分布与事件标注</p>
        </Link>
        <Link
          href="/timeline"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">📅 时间轴</h2>
          <p className="text-gray-600">按时间顺序浏览关键事件</p>
        </Link>
        <Link
          href="/graph"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">🔗 关系图</h2>
          <p className="text-gray-600">探索人物、派系、事件之间的关系网络</p>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 创建地图页占位**

Create `app/map/page.tsx`:
```typescript
/**
 * @file    page.tsx
 * @brief   地图视图页——Phase 0 占位，Phase 1 实现完整功能。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">地图视图</h1>
      <p className="text-gray-600">地图组件开发中……（Phase 1 实现）</p>
    </div>
  );
}
```

- [ ] **Step 6: 验证构建**

Run: `cd D:\Code\CRAtlas && npm run build`
Expected: 构建成功，`out/` 目录生成静态文件

- [ ] **Step 7: 提交**

```bash
cd D:\Code\CRAtlas && git add app/ components/layout/
git commit -m "[Phase 0] feat(ui): 基础页面骨架（首页/导航栏/地图页占位）"
```

---

