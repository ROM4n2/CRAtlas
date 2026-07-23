/**
 * @file    page.tsx
 * @brief   人物详情页——生平、派系隶属时间线、史料出处。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { people } from '@/data/people';
import { getPerson, getFactionName } from '@/lib/data';
import SourceList from '@/components/ui/SourceList';
import GiscusComments from '@/components/comments/GiscusComments';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const person = getPerson(params.id);
  if (!person) return { title: '人物未找到 - CRAtlas' };
  const lifeRange = `${person.birthYear ?? '?'}–${person.deathYear ?? '?'}`;
  return {
    title: `${person.name} - CRAtlas`,
    description: `${person.name}（${lifeRange}）${person.biography.slice(0, 120)}`,
  };
}

export function generateStaticParams() {
  return people.map((p) => ({ id: p.id }));
}

export default function PersonPage({ params }: { params: { id: string } }) {
  const person = getPerson(params.id);
  if (!person) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{person.name}</h1>
      <p className="text-sm text-gray-500 mt-1">
        {person.birthYear ?? '?'} — {person.deathYear ?? '?'}
      </p>

      <div className="mt-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">生平</h2>
          <p className="text-gray-600 mt-2">{person.biography}</p>
        </section>

        {person.affiliations.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">派系隶属</h2>
            <div className="space-y-1 mt-2">
              {person.affiliations.map((aff, idx) => (
                <div key={idx} className="text-sm text-gray-600">
                  <Link
                    href={`/faction/${aff.factionId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {getFactionName(aff.factionId)}
                  </Link>
                  <span className="text-gray-400 ml-2">
                    {aff.startDate} ~ {aff.endDate ?? '至今'} · {aff.role}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <SourceList sources={person.sources} />
        </section>

        <GiscusComments />
      </div>
    </div>
  );
}
