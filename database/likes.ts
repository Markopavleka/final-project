import 'server-only';
import { cache } from 'react';
import { Like } from '../migrations/00004-createTableLikes';
import { sql } from './connect';

export const getLike = cache(async () => {
  const likes = await sql<Like[]>`
    SELECT * FROM likes
  `;
  return likes;
});

export const getLikeById = cache(async (id: number) => {
  // Postgres always returns an array
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

export const deleteLikeById = cache(async (id: number) => {
  const [like] = await sql<Like[]>`
    DELETE FROM
      likes
    WHERE
      id = ${id}
    RETURNING *
  `;

  return like;
});

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

export const getNoDuplicateLike = cache(async (postId: number) => {
  const likes = await sql<Like[]>`
SELECT DISTINCT user_id, post_id
FROM likes
WHERE post_id = ${postId}
ORDER BY user_id, post_id
  `;
  return likes;
});
