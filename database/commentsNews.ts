import 'server-only';
import { cache } from 'react';
import { CommentNews } from '../migrations/00005-createTableCommentsNews';
import { sql } from './connect';

export const createNewsComment = cache(
  async (userId: number, newsId: number, comment: string) => {
    const [comments] = await sql<CommentNews[]>`
      INSERT INTO commentsnews
      (user_id, news_id, comment)
      VALUES
        (${userId}, ${newsId},${comment})
      RETURNING *
    `;

    return comments;
  },
);
type CommentNewsWithUsername = {
  commentId: number;
  comment: string;
  newsId: number;
  username: string;
};

export const getUserNewsComments = cache(async () => {
  const comments = await sql<CommentNewsWithUsername[]>`
    SELECT
      commentsnews.id AS comment_id,
      commentsnews.comment AS comment,
      commentsnews.news_id AS news_id,
      users.username AS username
    FROM
    commentsnews
    INNER JOIN
      users ON commentsnews.user_id = users.id

  `;
  return comments;
});

export const getUserNewsCommentsByNewsId = cache(async (newsId: number) => {
  const comments = await sql<CommentNewsWithUsername[]>`
    SELECT
      commentsnews.id AS comment_id,
      commentsnews.comment AS comment,
      commentsnews.news_id AS news_id,
      users.username AS username
    FROM
    commentsnews
    INNER JOIN
      users ON commentsnews.user_id = users.id
    WHERE
    news_id = ${newsId}

  `;
  return comments;
});
