import { Sql } from 'postgres';

export type Post = {
  id: number;
  userId: number;
  title: string;
  post: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE posts (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      title varchar(80) NOT NULL UNIQUE,
      post text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE posts
  `;
}
