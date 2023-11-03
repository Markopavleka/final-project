import React from 'react';
import { getNoDuplicateLikeNews } from '../../database/likenews';

export default async function ShowLike({ postId }: { postId: number }) {
  const like = await getNoDuplicateLikeNews(postId);

  const likeCounter = like.length;
  return (
    <div className="flex align-center justify-center">
      <div className="badge badge-primary badge-lg">{likeCounter}</div>
    </div>
  );
}
