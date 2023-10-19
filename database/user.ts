import 'server-only';
import { cache } from 'react';
import { User } from '../migrations/00000-createTableUser';
import { sql } from './connect';

export const getUser = cache(async () => {
  const users = await sql<User[]>`
    SELECT * FROM users
  `;
  return users;
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

export const getUserById = cache(async (id: number) => {
  // Postgres always returns an array
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;

  return user;
});

export const createUser = cache(
  async (
    userName: string,
    email: string,
    password: string,
    createdAt: Date,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
      (user_name, email, password,created_at)
      VALUES
        (${userName}, ${email}, ${password}, ${createdAt})
      RETURNING *
    `;

    return user;
  },
);

export const updateUserById = cache(
  async (
    id: number,
    userName: string,
    email: string,
    password: string,
    createdAt: Date,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE
        users
      SET
        user_name = ${userName},
        email = ${email},
        password = ${password},
        created_at = ${createdAt}
      WHERE id = ${id}
      RETURNING *
    `;
    return user;
  },
);
