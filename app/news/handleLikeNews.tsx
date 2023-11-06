'use client';
import { useRouter } from 'next/navigation';

// import { useState } from 'react';

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
        onSubmit={async (event) => {
          event.preventDefault();
          await handleCreateLike();
        }}
      >
        <button className="ml-2">Like</button>
      </form>
    </div>
  );
}
