import React from 'react';
import { getNoDuplicateLike } from '../../database/likes';

export default async function ShowLike({ postId }: { postId: number }) {
  const like = await getNoDuplicateLike(postId);

  const likeCounter = like.length;
  return (
    <div className="flex align-center justify-center">
      <div className="badge badge-primary badge-lg">{likeCounter}</div>
    </div>
  );
}
