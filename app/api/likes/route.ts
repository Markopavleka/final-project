import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLike } from '../../../database/likes';
import { getValidSessionByToken } from '../../../database/sessions';
import { Like } from '../../../migrations/00004-createTableLikes';

const likeSchema = z.object({
  userId: z.number(),
  postId: z.number(),
});

export type LikesResponseBodyPost =
  | {
      like: Like;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LikesResponseBodyPost>> {
  const body = await request.json();
  const result = likeSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }
  // 1. get the token from the cookie
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

  const newLike = await createLike(result.data.userId, result.data.postId);

  if (!newLike) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new Post' }] },
      { status: 406 },
    );
  }
  return NextResponse.json({
    like: newLike,
  });
}
