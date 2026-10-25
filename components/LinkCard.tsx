'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LinkCardProps {
  title: string;
  url: string;
  clickCount: number;
  linkId: string;
  username: string;
  onClickTracked?: () => void;
}

export function LinkCard({
  title,
  url,
  clickCount,
  linkId,
  username,
  onClickTracked,
}: LinkCardProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await fetch('/api/clicks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, linkId }),
      });
      onClickTracked?.();
    } catch (error) {
      console.error('Failed to track click:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <div
        onClick={handleClick}
        className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg dark:hover:shadow-gray-700/50 transition-shadow cursor-pointer"
      >
        <div className="flex justify-between items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {title}
            </p>
          </div>
          {loading && (
            <span className="text-sm text-gray-500">이동중...</span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          클릭 수: {clickCount}
        </p>
      </div>
    </Link>
  );
}
