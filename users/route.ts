import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUser } from '../database/users';
import { User } from '../migrations/00000-createTableUsers';

export type Error = {
  error: string;
};

type UsersResponseBodyGet =
  | {
      users: User[];
    }
  | Error;

type UsersResponseBodyPost =
  | {
      users: User;
    }
  | Error;

const userSchema = z.object({
  userName: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.date(),
});

export async function GET(): Promise<NextResponse<UsersResponseBodyGet>> {
  const users = await getUser();

  return NextResponse.json({
    users: users,
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyPost>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  // Get the animals from the database
  const user = await createUser(body.userName, body.email, body.passwordHash);

  if (!user) {
    return NextResponse.json(
      {
        error: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    users: user,
  });
}
