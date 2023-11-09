import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  backgroundPicture: string | undefined;
  bio: string | undefined;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id serial PRIMARY KEY,
      username varchar(80) NOT NULL UNIQUE,
      email varchar(80) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL,
      profile_picture varchar(250),
      background_picture varchar(250),
      bio text
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
