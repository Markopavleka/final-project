import React from 'react';
import { getLikeNews } from '../../database/likenews';

export default async function ShowLike({ postId }: { postId: number }) {
  const like = await getLikeNews(postId);

  const likeCounter = like.length;
  console.log(likeCounter);
  return (
    <div className="flex align-center justify-center">
      <div className="badge badge-primary badge-lg">{likeCounter}</div>
    </div>
  );
}
