import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LikeFormProps = {
  userId: number;
  postId: number;
};

export default function handleLike({ userId, postId }: LikeFormProps) {
  const [like, setlike] = useState();

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
        <button>Like</button>
      </form>
    </div>
  );
}
