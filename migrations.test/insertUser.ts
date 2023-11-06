import { Sql } from 'postgres';
import { User } from './00000-createTableUser';

const testUsers: User[] = [
  {
    id: 1,
    userName: 'user1',
    email: 'user1@example.com',
    password: 'password123',
    createdAt: new Date('2023-10-18T08:00:00'),
  },
  {
    id: 2,
    userName: 'user2',
    email: 'user2@example.com',
    password: 'securePass',
    createdAt: new Date('2023-10-18T09:15:00'),
  },
  {
    id: 3,
    userName: 'user3',
    email: 'user3@example.com',
    password: 'mySecretPwd',
    createdAt: new Date('2023-10-18T10:30:00'),
  },
  {
    id: 4,
    userName: 'user4',
    email: 'user4@example.com',
    password: 'test12345',
    createdAt: new Date('2023-10-18T11:45:00'),
  },
  {
    id: 5,
    userName: 'user5',
    email: 'user5@example.com',
    password: 'p@ssw0rd',
    createdAt: new Date('2023-10-18T13:00:00'),
  },
];

export async function up(sql: Sql) {
  for (const testUser of testUsers) {
    await sql`
      INSERT INTO users
        (user_name, email, password,created_at)
      VALUES
        (${testUser.userName}, ${testUser.email}, ${testUser.password},${testUser.createdAt})
  `;
  }
}

export async function down(sql: Sql) {
  for (const testUser of testUsers) {
    await sql`
      DELETE FROM users WHERE id = ${testUser.id}
    `;
  }
}
