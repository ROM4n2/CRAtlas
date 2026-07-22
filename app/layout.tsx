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
