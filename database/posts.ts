import 'server-only';
import { cache } from 'react';
import { Post } from '../migrations/00006-createTablePost';
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

export const deletePostById = cache(async (id: number) => {
  const [post] = await sql<Post[]>`
    DELETE FROM
      posts
    WHERE
      id = ${id}
    RETURNING *
  `;

  return post;
});

export const createPost = cache(
  async (
    adminUserId: number,
    imageUrl: string,
    description: string,
    createdAt: Date,
  ) => {
    const [post] = await sql<Post[]>`
      INSERT INTO posts
      (admin_user_id, image_url, description, created_at)
      VALUES
        (${adminUserId}, ${imageUrl}, ${description}, ${createdAt})
      RETURNING *
    `;

    return post;
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
        admin_user_id = ${adminUserId},
        image_url = ${imageUrl},
        description = ${description},
        created_at = ${createdAt}
      WHERE id = ${id}
      RETURNING *
    `;
    return post;
  },
);
