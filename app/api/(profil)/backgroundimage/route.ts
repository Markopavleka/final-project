import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../../database/sessions';
import {
  updateUserBackgroundPicture,
  UserProfilePicture,
} from '../../../../database/users';
import { validateTokenAgainstSecret } from '../../../../util/csrf';

const updateUserSchema = z.object({
  userId: z.number(),
  backgroundPicture: z.string(),
  csrfToken: z.string(),
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
  const body = await request.json();
  const result = updateUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Authentication token is invalid' }] },
      { status: 401 },
    );
  }

  const csrfToken = result.data.csrfToken;

  if (!csrfToken) {
    return NextResponse.json(
      { errors: [{ message: 'CSRF token is missing' }] },
      { status: 401 },
    );
  }

  const isValidCsrfToken = validateTokenAgainstSecret(
    session.csrfSecret,
    csrfToken,
  );

  if (!isValidCsrfToken) {
    return NextResponse.json(
      { errors: [{ message: 'CSRF token is not valid' }] },
      { status: 401 },
    );
  }

  const newUpdatedUser = await updateUserBackgroundPicture(
    result.data.userId,
    result.data.backgroundPicture,
  );

  if (!newUpdatedUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error updating the picture' }] },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user: newUpdatedUser,
  });
}
