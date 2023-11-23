import 'server-only';
import { cache } from 'react';
import { Like } from '../migrations/00004-createTableLikes';
import { sql } from './connect';

export const getLikeById = cache(async (id: number) => {
  const [like] = await sql<Like[]>`
    SELECT
      *
    FROM
      likes
    WHERE
      id = ${id}
  `;
  return like;
});

export const updateLikeById = cache(
  async (id: number, userId: number, postId: number) => {
    const [like] = await sql<Like[]>`
      UPDATE
        likes
      SET
        user_id = ${userId},
        post_id = ${postId}
      WHERE id = ${id}
      RETURNING *
    `;
    return like;
  },
);

export const createLike = cache(async (userId: number, postId: number) => {
  const [like] = await sql<Like[]>`
      INSERT INTO likes
      (user_id, post_id)
      VALUES
        (${userId}, ${postId})
      RETURNING *
    `;
  return like;
});

export const deleteLikeById = cache(async (userId: number, postId: number) => {
  const [likes] = await sql<Like[]>`
    DELETE FROM likes
    WHERE post_id = ${postId} AND user_id = ${userId} RETURNING *
  `;

  return likes;
});

export const getLikeWhereIdsMatch = cache(
  async (userId: number, postId: number) => {
    const likes = await sql<Like[]>`
      SELECT *
      FROM likes
      WHERE post_id = ${postId} AND user_id = ${userId}
    `;
    return likes;
  },
);

export const getLikeByPostId = cache(async (postId: number) => {
  const likes = await sql<Like[]>`
SELECT *
FROM likes
WHERE post_id = ${postId}
  `;
  return likes;
});
