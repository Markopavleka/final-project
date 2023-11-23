import 'server-only';
import { cache } from 'react';
import { LikeNews } from '../migrations/00006-createTableLikesNews';
import { sql } from './connect';

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

export type LikesWithIds = { id: number; userId: number; newsId: number };

export const getLikeNewsWhereIdsMatch = cache(
  async (userId: number, newsId: number) => {
    const likes = await sql<LikesWithIds[]>`
      SELECT *
      FROM likesnews
      WHERE news_id = ${newsId} AND user_id = ${userId}
    `;
    return likes;
  },
);

export const getLikeNews = cache(async (newsId: number) => {
  const likes = await sql<LikesWithIds[]>`
SELECT *
FROM likesnews
WHERE news_id = ${newsId}
  `;
  return likes;
});

export const deleteLikeNewsById = cache(
  async (userId: number, newsId: number) => {
    const [likes] = await sql<LikesWithIds[]>`
    DELETE FROM likesnews
    WHERE news_id = ${newsId} AND user_id = ${userId} RETURNING *
  `;

    return likes;
  },
);
