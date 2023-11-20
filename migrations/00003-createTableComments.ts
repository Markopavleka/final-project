import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE comments (
      id serial PRIMARY KEY,
      user_id integer NOT NULL,
      post_id integer NOT NULL,
      comment text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE comments;
  `;
}
