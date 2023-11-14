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

export const createLikeNews = cache(
  async (userId: number, newsId: number, liked: boolean) => {
    const [like] = await sql<LikeNews[]>`
      INSERT INTO likesnews
      (user_id, news_id, liked)
      VALUES
        (${userId}, ${newsId}, ${liked})
      RETURNING *

    `;

    return like;
  },
);

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

export const updateLikeNews = cache(
  async (userId: number, newsId: number, liked: boolean) => {
    const like = await sql<LikeNews[]>`
      UPDATE likesnews
      SET liked = ${liked}
      WHERE news_id = ${newsId} AND user_id = ${userId}
      RETURNING *;
    `;
    return like;
  },
);

export type LikesWithIds = {
  id: number;
  userId: number;
  newsId: number;
  liked: boolean | null;
};
export const getLikeNewsWhereIdsMatch = cache(
  async (newsId: number, userId: number) => {
    const likes = await sql<LikesWithIds[]>`
      SELECT *
      FROM likesnews
      WHERE news_id = ${newsId} AND user_id = ${userId}
    `;
    return likes;
  },
);

export const getLikeNews = cache(async (newsId: number) => {
  const likes = await sql<LikesNewsWithoutId[]>`
SELECT *
FROM likesnews
WHERE news_id = ${newsId} AND liked = true
  `;
  return likes;
});
