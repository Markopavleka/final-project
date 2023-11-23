import { cache } from 'react';
import { sql } from './connect';

export type UserWithPasswordHash = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  profilePicture: string | null;
  backgroundPicture: string | null;
  bio: string | null;
};

export type UserWithoutPasswordHash = {
  id: number;
  username: string;
  profilePicture: string | null;
  backgroundPicture: string | null;
  bio: string | null;
};

export type UserWithoutEmail = { id: number; username: string };

export type UserBlogPost = {
  postId: number;
  title: string;
  post: string;
  username: string;
  profilePicture: string | null;
};

export type UserBlogPostWithUserId = {
  postId: number;
  title: string;
  post: string;
  username: string;
  userId: number;
  profilePicture: string | null;
};

export type UserNameEmail = {
  id: number;
  username: string;
  email: string;
};

export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<UserNameEmail[]>`
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
  const [user] = await sql<UserWithoutPasswordHash[]>`
   SELECT
      users.id,
      users.username,
      users.profile_picture,
      users.background_picture,
      users.bio
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

export const getUserBlogPostBySessionToken = cache(async (token: string) => {
  const notes = await sql<UserBlogPost[]>`
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
  const notes = await sql<UserBlogPostWithUserId[]>`
    SELECT
      posts.id AS post_id,
      posts.title AS title,
      posts.post AS post,
      users.username AS username,
      users.id AS user_id,
      users.profile_picture as profile_picture
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

export type UserProfilePicture = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  profilePicture: string | null;
  backgroundPicture: string | null;
  bio: string | null;
};

export const updateUserProfilePicture = cache(
  async (userId: number, profilePicture: string) => {
    const [user] = await sql<UserProfilePicture[]>`
 UPDATE users
    SET
    profile_picture =${profilePicture}
    WHERE
      id = ${userId}
      RETURNING *
    `;
    return user;
  },
);

export const updateUserBackgroundPicture = cache(
  async (userId: number, backgroundPicture: string) => {
    const [user] = await sql<UserProfilePicture[]>`
 UPDATE users
    SET
    background_picture =${backgroundPicture}
    WHERE
      id = ${userId}
      RETURNING *
    `;
    return user;
  },
);

export const updateUserBio = cache(async (userId: number, bio: string) => {
  const [user] = await sql<UserProfilePicture[]>`
 UPDATE users
    SET
    bio =${bio}
    WHERE
      id = ${userId}
      RETURNING *
    `;
  return user;
});
