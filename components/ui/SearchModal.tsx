/**
 * @file    SearchModal.tsx
 * @brief   全局搜索弹窗——Cmd+K 触发，搜索人物/事件/派系。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { search } from '@/lib/data';
import type { SearchResult } from '@/lib/types';

export default function SearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setResults([]);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setResults(search(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = useCallback((result: SearchResult) => {
    const paths: Record<SearchResult['type'], string> = {
      person: '/person/',
      event: '/event/',
      faction: '/faction/',
    };
    router.push(`${paths[result.type]}${result.id}`);
    setIsOpen(false);
  }, [router]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center border-b border-gray-200 px-4">
          <h2 id="search-modal-title" className="sr-only">
            全局搜索
          </h2>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索人物、事件、派系..."
            className="flex-1 py-3 text-sm outline-none"
            autoFocus
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results-list"
            aria-label="搜索人物、事件、派系"
          />
          <span className="text-xs text-gray-400" aria-hidden="true">ESC 关闭</span>
        </div>
        {results.length > 0 && (
          <div
            id="search-results-list"
            className="max-h-80 overflow-y-auto"
            role="listbox"
            aria-label="搜索结果"
          >
            {results.map((result, index) => (
              <div
                key={`${result.type}-${result.id}`}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
                onClick={() => handleSelect(result)}
                role="option"
                aria-selected={false}
                aria-posinset={index + 1}
                aria-setsize={results.length}
              >
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {result.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {result.type === 'person' ? '人物' : result.type === 'event' ? '事件' : '派系'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div className="px-4 py-3 text-sm text-gray-500" role="status" aria-live="polite">
            无匹配结果
          </div>
        )}
      </div>
    </div>
  );
}
