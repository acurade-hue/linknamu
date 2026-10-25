import { Metadata } from 'next';
import { getDatabase } from '@/lib/mongodb';
import { ProfileCard } from '@/components/ProfileCard';
import { LinkCardList } from '@/components/LinkCardList';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { UserProfile } from '@/types';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;

  try {
    const db = await getDatabase();
    const collection = db.collection('profiles');
    const profile = (await collection.findOne({
      username,
    })) as UserProfile | null;

    if (!profile) {
      return {
        title: '사용자를 찾을 수 없습니다',
        description: '링크나무',
      };
    }

    return {
      title: profile.name,
      description: profile.bio,
      openGraph: {
        title: profile.name,
        description: profile.bio,
        images: [profile.photoUrl],
      },
    };
  } catch (error) {
    return {
      title: '링크나무',
      description: '내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하세요',
    };
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  try {
    const db = await getDatabase();
    const collection = db.collection('profiles');
    const profile = (await collection.findOne({
      username,
    })) as UserProfile | null;

    if (!profile) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
          <DarkModeToggle />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              사용자를 찾을 수 없습니다
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {username} 사용자의 프로필이 없습니다.
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <DarkModeToggle />
        <div className="w-full max-w-md">
          <ProfileCard
            name={profile.name}
            bio={profile.bio}
            photoUrl={profile.photoUrl}
          />
          <div className="mt-8">
            <LinkCardList links={profile.links} username={username} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading profile:', error);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <DarkModeToggle />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            오류가 발생했습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            프로필을 불러올 수 없습니다. 나중에 다시 시도해주세요.
          </p>
        </div>
      </main>
    );
  }
}
