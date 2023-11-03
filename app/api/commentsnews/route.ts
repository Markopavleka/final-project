import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createNewsComment } from '../../../database/commentsNews';
import { getValidSessionByToken } from '../../../database/sessions';
import { CommentNews } from '../../../migrations/00005-createTableCommentsNews';

const commentNewsSchema = z.object({
  userId: z.number(),
  newsId: z.number(),
  comment: z.string().min(1),
});

export type CommentNewsResponseBodyPost =
  | {
      commentnews: CommentNews;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentNewsResponseBodyPost>> {
  const body = await request.json();
  const result = commentNewsSchema.safeParse(body);
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

  const newCommentNews = await createNewsComment(
    result.data.userId,
    result.data.newsId,
    result.data.comment,
  );

  if (!newCommentNews) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new Post' }] },
      { status: 406 },
    );
  }
  return NextResponse.json({
    commentnews: newCommentNews,
  });
}
