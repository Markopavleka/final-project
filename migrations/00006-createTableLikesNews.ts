import { Sql } from 'postgres';

export type LikeNews = {
  id: number;
  userId: number;
  newsId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE likesnews (
      id serial PRIMARY KEY,
      user_id integer NOT NULL,
      news_id integer NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE likesnews;
  `;
}
