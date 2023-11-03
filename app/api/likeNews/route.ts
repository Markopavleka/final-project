import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLikeNews } from '../../../database/likenews';
import { getValidSessionByToken } from '../../../database/sessions';
import { LikeNews } from '../../../migrations/00006-createTableLikesNews';

const likeNewsSchema = z.object({
  userId: z.number(),
  newsId: z.number(),
});

export type LikesNewsResponseBodyPost =
  | {
      likenews: LikeNews;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LikesNewsResponseBodyPost>> {
  const body = await request.json();
  const result = likeNewsSchema.safeParse(body);
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

  const newLikeNews = await createLikeNews(
    result.data.userId,
    result.data.newsId,
  );

  if (!newLikeNews) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new Post' }] },
      { status: 406 },
    );
  }
  return NextResponse.json({
    likenews: newLikeNews,
  });
}
