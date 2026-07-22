/**
 * @file    ErrorBoundary.tsx
 * @brief   React 错误边界——捕获子组件渲染异常，防止白屏。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">渲染出错</h2>
            <p className="text-gray-600 text-sm">
              {this.state.error?.message || '未知错误'}
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
