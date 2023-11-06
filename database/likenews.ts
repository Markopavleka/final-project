import 'server-only';
import { cache } from 'react';
import { LikeNews } from '../migrations/00006-createTableLikesNews';
import { sql } from './connect';

export const getLike = cache(async () => {
  const likes = await sql<LikeNews[]>`
    SELECT * FROM likesnews
  `;
  return likes;
});

export const createLikeNews = cache(async (userId: number, newsId: number) => {
  const [like] = await sql<LikeNews[]>`
      INSERT INTO likesnews
      (user_id, news_id)
      VALUES
        (${userId}, ${newsId})
      RETURNING *
    `;

  return like;
});

type LikesNewsWithoutId = { userId: number; newsId: number };

export const getNoDuplicateLikeNews = cache(async (newsId: number) => {
  const likes = await sql<LikesNewsWithoutId[]>`
SELECT DISTINCT user_id, news_id
FROM likesnews
WHERE news_id = ${newsId}
ORDER BY user_id, news_id
  `;
  return likes;
});
