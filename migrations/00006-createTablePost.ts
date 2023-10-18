import { Sql } from 'postgres';

export type Post = {
  id: number;
  userId: number;
  imageUrl: string;
  description: string;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE posts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL,
      image_url integer NOT NULL,
      description text NOT NULL,
      created_at timestamp NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE posts
  `;
}
