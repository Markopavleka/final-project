'use client';
import { useRouter } from 'next/navigation';

type LikeFormProps = {
  userId: number;
  newsId: number;
};

export default function HandleLike({ userId, newsId }: LikeFormProps) {
  const router = useRouter();

  async function handleCreateLike() {
    await fetch('/api/likenews', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        newsId,
      }),
    });

    router.refresh();
  }

  return (
    <div>
      <form
        className="mt-1 p-0"
        onSubmit={async (event) => {
          event.preventDefault();
          await handleCreateLike();
        }}
      >
        <button>Like</button>
      </form>
    </div>
  );
}
