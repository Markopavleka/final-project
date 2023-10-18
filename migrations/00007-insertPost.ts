import { Sql } from 'postgres';
import { Post } from './00006-createTablePost';

export const testPosts: Post[] = [
  {
    id: 1,
    adminUserId: 1,
    imageUrl: 'https://example.com/post1.jpg',
    description: 'This is the first test post.',
    createdAt: new Date('2023-10-18T17:00:00'),
  },
  {
    id: 2,
    adminUserId: 2,
    imageUrl: 'https://example.com/post2.jpg',
    description: 'Another test post with a description.',
    createdAt: new Date('2023-10-18T17:30:00'),
  },
  {
    id: 3,
    adminUserId: 3,
    imageUrl: 'https://example.com/post3.jpg',
    description: 'Test post number three.',
    createdAt: new Date('2023-10-18T18:15:00'),
  },
  {
    id: 4,
    adminUserId: 1,
    imageUrl: 'https://example.com/post4.jpg',
    description: 'A post by the first user.',
    createdAt: new Date('2023-10-18T18:45:00'),
  },
  {
    id: 5,
    adminUserId: 2,
    imageUrl: 'https://example.com/post5.jpg',
    description: 'A test post with an image.',
    createdAt: new Date('2023-10-18T19:00:00'),
  },
];

export async function up(sql: Sql) {
  for (const testPost of testPosts) {
    await sql`
      INSERT INTO posts
        (admin_user_id, image_url, description, created_at)
      VALUES
        (${testPost.adminUserId}, ${testPost.imageUrl}, ${testPost.description}, ${testPost.createdAt});
    `;
  }
}

export async function down(sql: Sql) {
  for (const testPost of testPosts) {
    await sql`
      DELETE FROM posts WHERE id = ${testPost.id};
    `;
  }
}
