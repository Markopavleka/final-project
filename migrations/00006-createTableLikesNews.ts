import { Sql } from 'postgres';

export type LikeNews = {
  id: number;
  userId: number;
  newsId: number;
  liked: boolean | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE likesnews (
      id serial PRIMARY KEY,
      user_id integer NOT NULL,
      news_id integer NOT NULL,
      liked BOOLEAN,
      CONSTRAINT unique_user_news_pair UNIQUE (user_id, news_id)
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE likesnews;
  `;
}
