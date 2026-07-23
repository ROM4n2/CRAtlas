/**
 * @file    not-found.tsx
 * @brief   自定义 404 页面——页面未找到时显示。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mt-4">页面未找到</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        您访问的页面不存在。可能是链接已失效，或页面已被移除。
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        返回首页
      </Link>
    </div>
  );
}
