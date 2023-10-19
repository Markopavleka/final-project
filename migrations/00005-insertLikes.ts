import { Sql } from 'postgres';
import { Like } from './00004-createTableLikes';

const testLikes: Like[] = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    createdAt: new Date('2023-10-18T20:00:00'),
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
    createdAt: new Date('2023-10-18T20:15:00'),
  },
  {
    id: 3,
    userId: 3,
    postId: 2,
    createdAt: new Date('2023-10-18T20:30:00'),
  },
  {
    id: 4,
    userId: 1,
    postId: 3,
    createdAt: new Date('2023-10-18T20:45:00'),
  },
  {
    id: 5,
    userId: 2,
    postId: 3,
    createdAt: new Date('2023-10-18T21:00:00'),
  },
];

export async function up(sql: Sql) {
  for (const testLike of testLikes) {
    await sql`
      INSERT INTO likes
        (user_id, post_id, created_at)
      VALUES
        (${testLike.userId}, ${testLike.postId}, ${testLike.createdAt});
    `;
  }
}

export async function down(sql: Sql) {
  for (const testLike of testLikes) {
    await sql`
      DELETE FROM likes WHERE id = ${testLike.id};
    `;
  }
}
