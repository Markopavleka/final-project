'use client';
import { useRouter } from 'next/navigation';

// import { useState } from 'react';

type LikeFormProps = {
  userId: number;
  postId: number;
};

export default function HandleLike({ userId, postId }: LikeFormProps) {
  const router = useRouter();

  async function handleCreateLike() {
    await fetch('/api/likesnews', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        postId,
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
