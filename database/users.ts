import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};
export type UserWithoutEmail = {
  id: number;
  username: string;
};

export type UserBlogPost = {
  postId: number;
  title: string;
  post: string;
  username: string;
  userId: number;
};

export type UserBlogPostWithoutUserId = {
  postId: number;
  title: string;
  post: string;
  username: string;
};

export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
    INSERT INTO users
      (username, email, password_hash)
    VALUES
      (${username.toLowerCase()},
      ${email},
      ${passwordHash})
    RETURNING
      id,
      username,
      email
  `;
    return user;
  },
);

export const getUserByUsername = cache(async (userName: string) => {
  const [user] = await sql<UserWithoutEmail[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${userName.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (userName: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${userName.toLowerCase()}
  `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<UserWithoutEmail[]>`
   SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const updateUserByUsername = cache(
  async (id: number, username: string, email: string, passwordHash: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      UPDATE
        users
      SET
        id = ${id},
        email = ${email},
        password_hash = ${passwordHash}

      WHERE username = ${username.toLowerCase()}
      RETURNING *
    `;
    return user;
  },
);

export const getUserBlogPostBySessionToken = cache(async (token: string) => {
  const notes = await sql<UserBlogPostWithoutUserId[]>`
   SELECT
      posts.id AS post_id,
      posts.title AS title,
      posts.post AS post,
      users.username AS username
    FROM
      posts
    INNER JOIN
      users ON posts.user_id = users.id
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return notes;
});

export const getUserBlogPosts = cache(async (token: string) => {
  const notes = await sql<UserBlogPost[]>`
    SELECT
      posts.id AS post_id,
      posts.title AS title,
      posts.post AS post,
      users.username AS username,
      users.id AS user_id
    FROM
      posts
    INNER JOIN
      users ON posts.user_id = users.id
    WHERE
      users.id IN (
        SELECT user_id
        FROM sessions
        WHERE token = ${token}
      )
  `;
  return notes;
});

type UpdatedUser = {
  userId: number;
  profilePicture: string | null | undefined;
  backgroundPicture: string | null | undefined;
  bio: string | null | undefined;
};

export const updateUserProfil = cache(
  async (
    userId: number,
    profilePicture: string | null | undefined,
    backgroundPicture: string | null | undefined,
    bio: string | null | undefined,
  ) => {
    const [user] = await sql<UpdatedUser[]>`
    UPDATE users
    SET
    profile_picture =${profilePicture},
    background_picture=${backgroundPicture},
    bio=${bio}
    WHERE
      id = ${userId}
  `;
    return user;
  },
);
