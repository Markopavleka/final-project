import { cache } from 'react';
import { sql } from './connect';

type UserAdminPosts = {
  adminId: number;
  createdAt: Date;
  postsId: number;
};

export const getUserAdminsPosts = cache(async (id: number) => {
  const userAdminsPosts = await sql<UserAdminPosts[]>`
  SELECT
      adminusers.id AS adminId,
      adminusers.created_at AS createdAt,
      posts.id AS postsId
  FROM
      adminusers
  INNER JOIN
      posts ON adminusers.id = posts.admin_user_id
  WHERE
      adminusers.id = ${id}
`;
  return userAdminsPosts;
});
