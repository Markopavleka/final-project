import 'server-only';
import { cache } from 'react';
import { Comment } from '../migrations/00008-createTableComment';
import { sql } from './connect';

export const getComments = cache(async () => {
  const comments = await sql<Comment[]>`
    SELECT * FROM comments
  `;
  return comments;
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

export const getCommentById = cache(async (id: number) => {
  // Postgres always returns an array
  const [comment] = await sql<Comment[]>`
    SELECT
      *
    FROM
      comments
    WHERE
      id = ${id}
  `;
  return comment;
});

export const deleteCommentById = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
    DELETE FROM
      comments
    WHERE
      id = ${id}
    RETURNING *
  `;

  return comment;
});

export const createComment = cache(
  async (
    userId: number,
    postId: number,
    commentText: string,
    createdAt: Date,
  ) => {
    const [comment] = await sql<Comment[]>`
      INSERT INTO comments
      (user_id, post_id, comment_text, created_at)
      VALUES
        (${userId}, ${postId},${commentText}, ${createdAt})
      RETURNING *
    `;

    return comment;
  },
);

export const updateCommentById = cache(
  async (
    id: number,
    userId: number,
    postId: number,
    commentText: string,
    createdAt: Date,
  ) => {
    const [comment] = await sql<Comment[]>`
      UPDATE
        comments
      SET
        user_id = ${userId},
        post_id = ${postId},
        comment_text = ${commentText},
        created_at = ${createdAt}
      WHERE id = ${id}
      RETURNING *
    `;
    return comment;
  },
);
