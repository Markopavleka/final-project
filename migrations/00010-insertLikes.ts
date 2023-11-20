import { Sql } from 'postgres';

export const likes = [
  {
    id: 1,
    userId: 1,
    postId: 1,
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
  },
  {
    id: 3,
    userId: 3,
    postId: 2,
  },
  {
    id: 4,
    userId: 4,
    postId: 2,
  },
  {
    id: 5,
    userId: 5,
    postId: 3,
  },
  {
    id: 6,
    userId: 6,
    postId: 3,
  },
  {
    id: 7,
    userId: 1,
    postId: 4,
  },
  {
    id: 8,
    userId: 2,
    postId: 4,
  },
  {
    id: 9,
    userId: 3,
    postId: 5,
  },
  {
    id: 10,
    userId: 4,
    postId: 5,
  },
  {
    id: 11,
    userId: 5,
    postId: 6,
  },
  {
    id: 12,
    userId: 6,
    postId: 6,
  },
];

export async function up(sql: Sql) {
  for (const like of likes) {
    await sql`
      INSERT INTO likes
        (user_id, post_id)
      VALUES
        (${like.userId}, ${like.postId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const like of likes) {
    await sql`
      DELETE FROM users WHERE id = ${like.id}
    `;
  }
}
