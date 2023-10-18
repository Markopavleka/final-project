import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE user (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name varchar(30) NOT NULL,
      email varchar(30) NOT NULL,
      password varchar(30) NOT NULL,
      created_at timestamp NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE user
  `;
}
