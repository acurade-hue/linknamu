import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  bio: string;
  photoUrl: string;
}

export function ProfileCard({ name, bio, photoUrl }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Image
        src={photoUrl}
        alt={name}
        width={120}
        height={120}
        className="rounded-full w-24 h-24 object-cover border-4 border-gray-300 dark:border-gray-600"
      />
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          {bio}
        </p>
      </div>
    </div>
  );
}
