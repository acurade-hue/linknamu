'use client';

import dynamic from 'next/dynamic';
import profileImage from '@/components/profile.jpeg';

const DarkModeToggle = dynamic(
  () => import('@/components/DarkModeToggle').then((mod) => mod.DarkModeToggle),
  { ssr: false }
);

// 더미 데이터 (실제 내용은 추후 교체)
const profile = {
  name: '김칭칭',
  bio: '그냥 요즘 좀 우울해요',
  photoUrl: profileImage.src,
};

const links = [
  { id: 'github', title: 'Github', url: 'https://github.com' },
  { id: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com' },
  { id: 'blog', title: 'Blog', url: 'https://example.com' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#fff8f1] to-[#fde3d0] px-6 py-16 transition-colors dark:from-gray-900 dark:to-gray-900">
      <DarkModeToggle />
      <div className="flex w-full max-w-sm flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="h-32 w-32 overflow-hidden rounded-full shadow-[0_12px_32px_-8px_rgba(180,83,9,0.35)] ring-4 ring-white/80 dark:ring-white/10">
            {profile.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photoUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/60 text-4xl text-gray-400" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
              {profile.name}
            </h1>
            <p className="text-base text-stone-600 dark:text-gray-400">{profile.bio}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-white/70 bg-white/40 px-6 py-4 text-center text-base font-semibold text-stone-800 shadow-[0_8px_24px_-12px_rgba(120,53,15,0.25)] backdrop-blur-md transition-colors duration-200 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
