/**
 * @file    page.tsx
 * @brief   派系详情页——概述、组织演变、史料出处。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { factions } from '@/data/factions';
import { getFaction } from '@/lib/data';
import SourceList from '@/components/ui/SourceList';
import NotesPanel from '@/components/ui/NotesPanel';
import GiscusComments from '@/components/comments/GiscusComments';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const faction = getFaction(params.id);
  if (!faction) return { title: '派系未找到 - CRAtlas' };
  return {
    title: `${faction.name} - CRAtlas`,
    description: `${faction.name}（${faction.factionType}）${faction.description.slice(0, 120)}`,
  };
}

export function generateStaticParams() {
  return factions.map((f) => ({ id: f.id }));
}

export default function FactionPage({ params }: { params: { id: string } }) {
  const faction = getFaction(params.id);
  if (!faction) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{faction.name}</h1>
      <p className="text-sm text-gray-500 mt-1">{faction.factionType}</p>

      <div className="mt-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">概述</h2>
          <p className="text-gray-600 mt-2">{faction.description}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">组织信息</h2>
          <p className="text-sm text-gray-600 mt-2">
            成立：{faction.foundedDate}
            {faction.dissolvedDate && ` · 解散：${faction.dissolvedDate}`}
          </p>
        </section>

        <section>
          <SourceList sources={faction.sources} />
        </section>

        <NotesPanel entityId={faction.id} entityType="faction" />

        <GiscusComments />
      </div>
    </div>
  );
}
