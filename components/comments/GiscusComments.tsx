/**
 * @file    GiscusComments.tsx
 * @brief   Giscus 评论组件——基于 GitHub Discussions 的客户端评论区。
 *          使用 pathname 作为 discussion 匹配键，SSG 兼容。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

'use client';

import Giscus from '@giscus/react';
import { usePathname } from 'next/navigation';

/**
 * Giscus 评论组件。
 * 读取环境变量中的仓库配置，以当前路径作为 discussion 匹配键。
 * 配置缺失时静默隐藏，避免破坏静态构建与未配置状态下的页面展示。
 */
export default function GiscusComments() {
  const pathname = usePathname();

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  // 任一必要配置缺失时，不渲染评论组件
  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">评论</h2>
      <Giscus
        id="comments"
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        term={pathname}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="zh-CN"
        loading="lazy"
      />
    </section>
  );
}
