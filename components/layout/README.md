# components/layout

## Purpose

This folder contains **layout components** — structural UI pieces that define the
shell of the application across multiple pages. Examples include:

- `Navbar` — top navigation bar with logo and view switching links
- `Footer` (future) — bottom info bar with credits / version / links
- `Sidebar` (future) — side panel for filters or secondary navigation

These components are **not** tied to a single page; they are consumed by the
root layout (`app/layout.tsx`) and therefore appear on every route.

## File List

| File            | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `Navbar.tsx`    | Top navigation bar — logo + 三大视图 (地图/时间轴/关系图) + 关于 |
| `README.md`     | This file — folder documentation                                |

## How They're Used

Layout components are imported once into `app/layout.tsx` and rendered around
the `{children}` slot:

```tsx
// app/layout.tsx
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({ children }) {
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

This guarantees a consistent chrome (nav, footer, etc.) across all pages while
each page only needs to supply its own content.

## Conventions

- One component per file, named in PascalCase matching the file name.
- Components are client components only when they use interactivity
  (`useState`, event handlers, etc.). Purely structural components stay as
  server components by default.
- Use Tailwind utility classes for styling; keep custom CSS in `globals.css`
  CSS variables (e.g. faction colors).
