import { Sql } from 'postgres';

export type AdminUser = {
  id: number;
  userName: string;
  email: string;
  password: string;
  profilePictureUrl: string;
  shopName: string;
  shopDescription: string;
  shopLink: string;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE adminusers (
        id serial PRIMARY KEY,
        user_name varchar(30) NOT NULL,
        email varchar(30) NOT NULL,
        password varchar(30) NOT NULL,
        profile_picture_url varchar(30) NOT NULL,
        shop_name varchar(30) NOT NULL,
        shop_description varchar(30) NOT NULL,
        shop_link varchar(30) NOT NULL,
        created_at timestamp NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE adminusers
  `;
}
