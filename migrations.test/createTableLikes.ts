import { Sql } from 'postgres';

export type Like = {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE likes (
      id serial PRIMARY KEY,
      user_id integer NOT NULL,
      post_id integer NOT NULL,
      created_at timestamp NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE likes;
  `;
}
