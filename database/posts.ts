import 'server-only';
import { cache } from 'react';
import { Post } from '../migrations/00002-createTablePosts';
import { sql } from './connect';

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

type UserBlogPostWithUserData = {
  postId: number;
  title: string;
  post: string;
  username: string | null;
  profilePicture: string | null;
};

export const getAllBlogPosts = cache(async () => {
  const notes = await sql<UserBlogPostWithUserData[]>`

SELECT
  posts.id AS post_id,
  posts.title AS title,
  posts.post AS post,
  users.username AS username,
  users.profile_picture as profile_picture
FROM
  posts
LEFT JOIN
  users ON posts.user_id = users.id;
  `;
  return notes;
});

type UserBlogPostWithUserDataById = {
  postId: number;
  title: string;
  post: string;
  username: string;
  profilePicture: string | null;
};

export const getBlogPostsById = cache(async (id: number) => {
  const notes = await sql<UserBlogPostWithUserDataById[]>`
    SELECT
      posts.id AS post_id,
      posts.title AS title,
      posts.post AS post,
      users.username AS username,
      users.profile_picture as profile_picture
    FROM
      posts
    INNER JOIN
      users ON posts.user_id = users.id
    WHERE
      posts.id = ${id}
  `;
  return notes;
});
