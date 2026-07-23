/**
 * @file    page.tsx
 * @brief   事件详情页——全文、参与者、相关事件、史料出处。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { events } from '@/data/events';
import { getEvent, getPerson, getFactionName } from '@/lib/data';
import SourceList from '@/components/ui/SourceList';

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEvent(params.id);
  if (!event) notFound();

  const participants = event.participants
    .map((id) => getPerson(id))
    .filter(Boolean);

  const relatedEvents = event.relatedEventIds
    .map((id) => getEvent(id))
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
      {event.alias && event.alias.length > 0 && (
        <p className="text-sm text-gray-500 mt-1">
          别名：{event.alias.join('、')}
        </p>
      )}
      <p className="text-sm text-gray-500 mt-1">{event.date}</p>

      <div className="mt-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">事件描述</h2>
          <p className="text-gray-600 mt-2">{event.description}</p>
        </section>

        {event.location.specific && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">地点</h2>
            <p className="text-gray-600 mt-2">{event.location.specific}</p>
          </section>
        )}

        {participants.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">参与者</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {participants.map((p) => (
                <Link
                  key={p!.id}
                  href={`/person/${p!.id}`}
                  className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  {p!.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedEvents.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800">相关事件</h2>
            <div className="space-y-1 mt-2">
              {relatedEvents.map((e) => (
                <Link
                  key={e!.id}
                  href={`/event/${e!.id}`}
                  className="block text-sm text-blue-600 hover:underline"
                >
                  {e!.title} ({e!.date})
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <SourceList sources={event.sources} />
        </section>
      </div>
    </div>
  );
}
