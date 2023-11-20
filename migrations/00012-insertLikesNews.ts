import { Sql } from 'postgres';

export const likesnews = [
  {
    id: 1,
    userId: 1,
    newsId: 1,
  },
  {
    id: 2,
    userId: 2,
    newsId: 1,
  },
  {
    id: 3,
    userId: 3,
    newsId: 2,
  },
  {
    id: 4,
    userId: 4,
    newsId: 2,
  },
  {
    id: 5,
    userId: 5,
    newsId: 3,
  },
  {
    id: 6,
    userId: 6,
    newsId: 3,
  },
  {
    id: 7,
    userId: 1,
    newsId: 4,
  },
  {
    id: 8,
    userId: 2,
    newsId: 4,
  },
  {
    id: 9,
    userId: 3,
    newsId: 5,
  },
  {
    id: 10,
    userId: 4,
    newsId: 5,
  },
  {
    id: 11,
    userId: 5,
    newsId: 6,
  },
  {
    id: 12,
    userId: 6,
    newsId: 6,
  },
  {
    id: 13,
    userId: 1,
    newsId: 7,
  },
  {
    id: 14,
    userId: 2,
    newsId: 7,
  },
  {
    id: 15,
    userId: 3,
    newsId: 8,
  },
  {
    id: 16,
    userId: 4,
    newsId: 8,
  },
  {
    id: 17,
    userId: 5,
    newsId: 9,
  },
  {
    id: 18,
    userId: 6,
    newsId: 9,
  },
  {
    id: 19,
    userId: 1,
    newsId: 10,
  },
  {
    id: 20,
    userId: 2,
    newsId: 10,
  },
  {
    id: 21,
    userId: 3,
    newsId: 11,
  },
  {
    id: 22,
    userId: 4,
    newsId: 11,
  },
  {
    id: 23,
    userId: 5,
    newsId: 12,
  },
  {
    id: 24,
    userId: 6,
    newsId: 12,
  },
  {
    id: 25,
    userId: 1,
    newsId: 13,
  },
  {
    id: 26,
    userId: 2,
    newsId: 13,
  },
];

export async function up(sql: Sql) {
  for (const likenews of likesnews) {
    await sql`
      INSERT INTO likesnews
        (user_id, news_id)
      VALUES
        (${likenews.userId}, ${likenews.newsId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const likenews of likesnews) {
    await sql`
      DELETE FROM users WHERE id = ${likenews.id}
    `;
  }
}
