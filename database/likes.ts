import 'server-only';
import { cache } from 'react';
import { Like } from '../migrations.test/00004-createTableLikes';
import { sql } from './connect';

export const getLike = cache(async () => {
  const likes = await sql<Like[]>`
    SELECT * FROM likes
  `;
  return likes;
});

/* export const getAnimalsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    // return animals;
    const animals = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    Limit ${limit}
    OFFSET ${offset}
  `;
    return animals;
  },
); */

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

export const createLike = cache(
  async (userId: number, postId: number, createdAt: Date) => {
    const [like] = await sql<Like[]>`
      INSERT INTO likes
      (user_id, post_id, created_at)
      VALUES
        (${userId}, ${postId}, ${createdAt})
      RETURNING *
    `;

    return like;
  },
);

export const updateLikeById = cache(
  async (id: number, userId: number, postId: number, createdAt: Date) => {
    const [like] = await sql<Like[]>`
      UPDATE
        likes
      SET
        user_id = ${userId},
        post_id = ${postId},
        created_at = ${createdAt}
      WHERE id = ${id}
      RETURNING *
    `;
    return like;
  },
);
