import 'server-only';
import { cache } from 'react';
import { AdminUser } from '../migrations.test/00002-createTableAdminUser';
import { sql } from './connect';

export const getAdminUser = cache(async () => {
  const adminUsers = await sql<AdminUser[]>`
    SELECT * FROM adminusers
  `;
  return adminUsers;
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

export const getAdminUserById = cache(async (id: number) => {
  // Postgres always returns an array
  const [adminUser] = await sql<AdminUser[]>`
    SELECT
      *
    FROM
      adminusers
    WHERE
      id = ${id}
  `;
  return adminUser;
});

export const deleteAdminUserById = cache(async (id: number) => {
  const [adminUser] = await sql<AdminUser[]>`
    DELETE FROM
      adminusers
    WHERE
      id = ${id}
    RETURNING *
  `;

  return adminUser;
});

export const createAdminUser = cache(
  async (
    userName: string,
    email: string,
    password: string,
    profilePictureUrl: string,
    shopName: string,
    shopDescription: string,
    shopLink: string,
    createdAt: Date,
  ) => {
    const [adminUser] = await sql<AdminUser[]>`
      INSERT INTO adminusers
        (user_name, email, password,
          profile_picture_url,shop_name,shop_description,shop_link,created_at)
      VALUES
        (${userName}, ${email}, ${password}, ${profilePictureUrl}, ${shopName}, ${shopDescription}, ${shopLink}, ${createdAt})
      RETURNING *
    `;

    return adminUser;
  },
);

export const updateAdminUserById = cache(
  async (
    id: number,
    userName: string,
    email: string,
    password: string,
    profilePictureUrl: string,
    shopName: string,
    shopDescription: string,
    shopLink: string,
    createdAt: Date,
  ) => {
    const [adminUser] = await sql<AdminUser[]>`
      UPDATE adminusers
      SET
        user_name = ${userName},
        email = ${email},
        password = ${password},
        profile_picture_url = ${profilePictureUrl},
        shop_name = ${shopName},
        shop_description = ${shopDescription},
        shop_link = ${shopLink},
        created_at = ${createdAt}
      WHERE id = ${id}
      RETURNING *
    `;
    return adminUser;
  },
);
