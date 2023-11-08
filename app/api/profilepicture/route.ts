import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  updateUserProfilePicture,
  UserProfilePicture,
} from '../../../database/users';

const updateUserSchema = z.object({
  userId: z.number(),
  profilePicture: z.string(),
});

export type PictureResponseBodyPost =
  | {
      user: UserProfilePicture;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PictureResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data
  const result = updateUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }
  console.log(typeof result.data.userId);
  console.log(typeof result.data.profilePicture);
  const newUpdatedUser = await updateUserProfilePicture(
    result.data.userId,
    result.data.profilePicture,
  );
  console.log(newUpdatedUser);
  if (!newUpdatedUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the picture' }] },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json({
    user: newUpdatedUser,
  });
}
