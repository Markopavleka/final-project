import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateUserProfil } from '../../../database/users';

const pictureSchema = z.object({
  userId: z.number(),
  profilePicture: z.string().nullable(),
  backgroundPicture: z.string().nullable(),
  bio: z.string().nullable(),
});

export type PictureResponseBodyPost =
  | {
      user: UpdatedUser;
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
  const result = pictureSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const newPicture = await updateUserProfil(
    result.data.userId,
    result.data.profilePicture,
    result.data.backgroundPicture,
    result.data.bio,
  );

  if (!newPicture) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the picture' }] },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json({
    user: newPicture,
  });
}
