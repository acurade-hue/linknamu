export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">링크나무</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하세요
        </p>
        <p className="text-sm text-gray-500">
          /[username] 으로 이동하여 프로필을 확인해보세요
        </p>
      </div>
    </main>
  );
}
