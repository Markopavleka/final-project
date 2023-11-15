'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LikeFormProps = {
  userId: number;
  newsId: number;
};

const filledHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#F5F5F5"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Outlined Heart with Custom Color
const outlinedHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="#F5F5F5"
    strokeWidth="2"
    fill="none"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function HandleLike({ userId, newsId }: LikeFormProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  async function handleCreateLike(likedValue: boolean) {
    await fetch('/api/likenews', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        newsId,
        liked: likedValue,
      }),
    });
    router.refresh();
  }

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleCreateLike(liked);
        }}
      >
        <button
          onClick={() => setLiked((like) => !like)}
          className="ml-2 hover:scale-125"
        >
          {liked ? filledHeart : outlinedHeart}
        </button>
      </form>
    </div>
  );
}
