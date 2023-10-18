import { Sql } from 'postgres';

export type Post = {
  id: number;
  adminUserId: number;
  imageUrl: string;
  description: string;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE posts (
      id serial PRIMARY KEY,
      admin_user_id integer NOT NULL,
      image_url text NOT NULL,
      description text NOT NULL,
      created_at timestamp NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE posts;
  `;
}
