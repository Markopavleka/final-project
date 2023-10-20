import { Sql } from 'postgres';
import { AdminUser } from './00002-createTableAdminUser';

const testAdminUsers: AdminUser[] = [
  {
    id: 1,
    userName: 'admin1',
    email: 'admin1@example.com',
    password: 'adminPass123',
    profilePictureUrl: 'https://example.com/admin1.jpg',
    shopName: 'Admin Shop 1',
    shopDescription: 'This is the description for Admin Shop 1.',
    shopLink: 'https://adminshop1.example.com',
    createdAt: new Date('2023-10-18T14:00:00'),
  },
  {
    id: 2,
    userName: 'admin2',
    email: 'admin2@example.com',
    password: 'adminSecurePass',
    profilePictureUrl: 'https://example.com/admin2.jpg',
    shopName: 'Admin Shop 2',
    shopDescription: 'This is the description for Admin Shop 2.',
    shopLink: 'https://adminshop2.example.com',
    createdAt: new Date('2023-10-18T15:15:00'),
  },
  {
    id: 3,
    userName: 'admin3',
    email: 'admin3@example.com',
    password: 'adminSecretPwd',
    profilePictureUrl: 'https://example.com/admin3.jpg',
    shopName: 'Admin Shop 3',
    shopDescription: 'This is the description for Admin Shop 3.',
    shopLink: 'https://adminshop3.example.com',
    createdAt: new Date('2023-10-18T16:30:00'),
  },
];

export async function up(sql: Sql) {
  for (const testAdminUser of testAdminUsers) {
    await sql`
      INSERT INTO adminusers
        (user_name, email, password,
          profile_picture_url,shop_name,shop_description,shop_link,created_at)
      VALUES
        (${testAdminUser.userName}, ${testAdminUser.email}, ${testAdminUser.password},${testAdminUser.profilePictureUrl},${testAdminUser.shopName},
          ${testAdminUser.shopDescription}, ${testAdminUser.shopLink}, ${testAdminUser.createdAt})
  `;
  }
}

export async function down(sql: Sql) {
  for (const testAdminUser of testAdminUsers) {
    await sql`
      DELETE FROM adminusers WHERE id = ${testAdminUser.id}
    `;
  }
}
