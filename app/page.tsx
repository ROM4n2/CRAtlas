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
