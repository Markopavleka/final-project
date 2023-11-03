import { Sql } from 'postgres';

export type CommentNews = {
  id: number;
  userId: number;
  newsId: number;
  comment: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE commentsnews (
      id serial PRIMARY KEY,
      user_id integer NOT NULL,
      news_id integer NOT NULL,
      comment text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE commentsnews;
  `;
}
