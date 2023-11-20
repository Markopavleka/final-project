import { Sql } from 'postgres';

export const comments = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    comment: 'Great insights into the future of AI in hardware development!',
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
    comment: "I'm excited to see how AI will shape the hardware industry.",
  },
  {
    id: 3,
    userId: 3,
    postId: 2,
    comment: 'Excellent tips for building scalable software systems.',
  },
  {
    id: 4,
    userId: 4,
    postId: 2,
    comment: "Scalability is crucial in today's fast-paced tech landscape.",
  },
  {
    id: 5,
    userId: 5,
    postId: 3,
    comment: 'Quantum computing is a fascinating field with immense potential.',
  },
  {
    id: 6,
    userId: 6,
    postId: 3,
    comment: 'I wonder how quantum computing will impact various industries.',
  },
  {
    id: 7,
    userId: 1,
    postId: 4,
    comment: 'Debugging is an art, and this guide is a masterpiece!',
  },
  {
    id: 8,
    userId: 2,
    postId: 4,
    comment:
      'As a developer, effective debugging is key to writing quality code.',
  },
  {
    id: 9,
    userId: 3,
    postId: 5,
    comment:
      'The influence of 5G on hardware is a topic that needs more attention.',
  },
  {
    id: 10,
    userId: 4,
    postId: 5,
    comment: 'Exciting times ahead for the hardware industry!',
  },
  {
    id: 11,
    userId: 5,
    postId: 6,
    comment: 'CI/CD practices have transformed software development.',
  },
  {
    id: 12,
    userId: 6,
    postId: 6,
    comment: 'Continuous integration and deployment are game-changers.',
  },
];

export async function up(sql: Sql) {
  for (const comment of comments) {
    await sql`
      INSERT INTO comments
        (user_id, post_id, comment)
      VALUES
        (${comment.userId}, ${comment.postId}, ${comment.comment})
  `;
  }
}

export async function down(sql: Sql) {
  for (const comment of comments) {
    await sql`
      DELETE FROM users WHERE id = ${comment.id}
    `;
  }
}
