import { Sql } from 'postgres';

export type Comment = {
  id: number;
  userId: number;
  postId: number;
  commentText: string;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE comment (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL,
      post_id integer NOT NULL,
      comment_text text NOT NULL,
      created_at timestamp NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE comment
  `;
}
