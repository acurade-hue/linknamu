'use client';

import { DarkModeToggle } from '@/components/DarkModeToggle';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 transition-colors">
      <DarkModeToggle />
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          링크나무
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하세요
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            프로필 보기:
          </p>
          <code className="text-sm font-mono bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded text-gray-900 dark:text-white block break-words">
            /{'{username}'}
          </code>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            예: /demo
          </p>
        </div>
      </div>
    </main>
  );
}
