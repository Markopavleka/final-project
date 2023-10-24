import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};
export type UserwithoutEmail = {
  id: number;
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
  const [user] = await sql<UserwithoutEmail[]>`
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
  const [user] = await sql<UserwithoutEmail[]>`
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
