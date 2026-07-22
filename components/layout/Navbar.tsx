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
