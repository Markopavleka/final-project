import { Sql } from 'postgres';

export const posts = [
  {
    id: 1,
    userId: 1,
    title: 'The Future of AI in Hardware Development',
    post: 'Exploring the integration of artificial intelligence in hardware design and its impact on the future of technology.',
  },
  {
    id: 2,
    userId: 2,
    title: 'Building Scalable and Efficient Software Systems',
    post: 'Tips and best practices for building scalable and efficient software systems that can handle the demands of modern applications.',
  },
  {
    id: 3,
    userId: 3,
    title: 'Advancements in Quantum Computing',
    post: 'Exploring the recent advancements in quantum computing and its potential to revolutionize the way we solve complex problems in the future.',
  },
  {
    id: 4,
    userId: 4,
    title: 'Effective Debugging Techniques for Software Developers',
    post: 'A guide to effective debugging techniques for software developers, helping them identify and fix bugs in their code more efficiently.',
  },
  {
    id: 5,
    userId: 5,
    title: 'The Impact of 5G on Hardware Infrastructure',
    post: 'Examining the influence of 5G technology on hardware infrastructure and the implications for the development of connected devices.',
  },
  {
    id: 6,
    userId: 6,
    title: 'Continuous Integration and Deployment in Software Development',
    post: 'A comprehensive overview of continuous integration and deployment practices in software development and how they enhance the development lifecycle.',
  },
];

export async function up(sql: Sql) {
  for (const post of posts) {
    await sql`
      INSERT INTO posts
        (user_id, title, post)
      VALUES
        (${post.userId}, ${post.title}, ${post.post})
  `;
  }
}

export async function down(sql: Sql) {
  for (const post of posts) {
    await sql`
      DELETE FROM users WHERE id = ${post.id}
    `;
  }
}
