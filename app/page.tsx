'use client';

import dynamic from 'next/dynamic';

const DarkModeToggle = dynamic(
  () => import('@/components/DarkModeToggle').then((mod) => mod.DarkModeToggle),
  { ssr: false }
);

// 더미 데이터 (실제 내용은 추후 교체)
const profile = {
  name: '김신환',
  bio: '괜찮다 괜찮아',
  photoUrl: '',
};

const links = [
  { id: 'github', title: 'Github', url: 'https://github.com' },
  { id: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com' },
  { id: 'blog', title: 'Blog', url: 'https://example.com' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-gray-900 transition-colors">
      <DarkModeToggle />
      <div className="flex w-full max-w-sm flex-col items-center gap-8 rounded-3xl border-2 border-gray-800 dark:border-gray-300 px-6 py-10 text-gray-900 dark:text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-gray-800 dark:border-gray-300 bg-gray-100 dark:bg-gray-800 text-4xl text-gray-400">
            {profile.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photoUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              '👤'
            )}
          </div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{profile.bio}</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border-2 border-gray-800 dark:border-gray-300 px-6 py-5 text-center text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
