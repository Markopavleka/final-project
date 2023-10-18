import { Sql } from 'postgres';
import { Comment } from './00008-createTableComment';

const testComments: Comment[] = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    commentText: 'This is a test comment on the first post.',
    createdAt: new Date('2023-10-18T22:00:00'),
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
    commentText: 'Another comment on the first post.',
    createdAt: new Date('2023-10-18T22:15:00'),
  },
  {
    id: 3,
    userId: 3,
    postId: 2,
    commentText: 'A comment on the second post.',
    createdAt: new Date('2023-10-18T22:30:00'),
  },
  {
    id: 4,
    userId: 1,
    postId: 3,
    commentText: 'Comment on the third post by the first user.',
    createdAt: new Date('2023-10-18T22:45:00'),
  },
  {
    id: 5,
    userId: 2,
    postId: 3,
    commentText: 'Comment on the third post by the second user.',
    createdAt: new Date('2023-10-18T23:00:00'),
  },
];

export async function up(sql: Sql) {
  for (const testComment of testComments) {
    await sql`
      INSERT INTO user
        (user_id,post_id,comment_text,created_at)
      VALUES
        (${testComment.userId}, ${testComment.postId}, ${testComment.commentText},${testComment.createdAt})
  `;
  }
}

export async function down(sql: Sql) {
  for (const testComment of testComments) {
    await sql`
      DELETE FROM testComments WHERE id = ${testComment.id}
    `;
  }
}
