import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE sessions
      ADD csrf_secret varchar(80) NOT NULL DEFAULT ''
  `;
  await sql`
    ALTER TABLE sessions
      ALTER COLUMN csrf_secret DROP DEFAULT
  `;
}
