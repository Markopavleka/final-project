import 'server-only';
import { cache } from 'react';
import { Post } from '../migrations/00002-createTablePosts';
import { sql } from './connect';

export const getPosts = cache(async () => {
  const posts = await sql<Post[]>`
    SELECT * FROM posts
  `;
  return posts;
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

export const getPostById = cache(async (id: number) => {
  // Postgres always returns an array
  const [post] = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      id = ${id}
  `;
  return post;
});

export const deletePostByUserId = cache(async (userId: number) => {
  const [post] = await sql<Post[]>`
    DELETE FROM
      posts
    WHERE
      user_id = ${userId}
    RETURNING *
  `;

  return post;
});

export const createBlogPost = cache(
  async (userId: number, title: string, post: string) => {
    const [posts] = await sql<Post[]>`
      INSERT INTO posts
      (user_id, title, post)
      VALUES
        (${userId},${title}, ${post})
      RETURNING *
    `;

    return posts;
  },
);

export const updatePostById = cache(
  async (
    id: number,
    adminUserId: number,
    imageUrl: string,
    description: string,
    createdAt: Date,
  ) => {
    const [post] = await sql<Post[]>`
      UPDATE
        posts
      SET
        user_id = ${adminUserId},
        image_url = ${imageUrl},
        description = ${description},
        created_at = ${createdAt}
      WHERE id = ${id}
      RETURNING *
    `;
    return post;
  },
);
