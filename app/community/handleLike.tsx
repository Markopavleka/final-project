'use client';
import { useRouter } from 'next/navigation';
import { filledHeart } from '../Components/icons';

type LikeFormProps = {
  userId: number;
  postId: number;
};

export default function HandleLike({ userId, postId }: LikeFormProps) {
  const router = useRouter();

  async function handleCreateLike() {
    await fetch('/api/likes', {
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
        <button className="ml-2 hover:scale-125">{filledHeart}</button>
      </form>
    </div>
  );
}
