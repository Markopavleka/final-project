import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id serial PRIMARY KEY,
      username varchar(80) NOT NULL UNIQUE,
      email varchar(80) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
