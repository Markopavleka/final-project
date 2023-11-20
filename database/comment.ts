import 'server-only';
import { cache } from 'react';
import { sql } from './connect';

export type Comment = {
  id: number | null;
  userId: number | null;
  postId: number | null;
  comment: string | null;
};

export const createComment = cache(
  async (userId: number, postId: number, comment: string) => {
    const [comments] = await sql<Comment[]>`
      INSERT INTO comments
      (user_id, post_id, comment)
      VALUES
        (${userId}, ${postId},${comment})
      RETURNING *
    `;

    return comments;
  },
);
type CommentWithUsername = {
  commentId: number | null;
  comment: string | null;
  postId: number | null;
  username: string | null;
  profilePicture: string | null;
};

export const getUserComments = cache(async () => {
  const comments = await sql<CommentWithUsername[]>`
    SELECT
      comments.id AS comment_id,
      comments.comment AS comment,
      comments.post_id AS post_id,
      users.username AS username,
      users.profile_picture as profile_picture

    FROM
    comments
    INNER JOIN
      users ON comments.user_id = users.id

  `;
  return comments;
});

export const getUserCommentsByPostId = cache(async (postId: number) => {
  const comments = await sql<CommentWithUsername[]>`
    SELECT
      comments.id AS comment_id,
      comments.comment AS comment,
      comments.post_id AS post_id,
      users.username AS username,
      users.profile_picture as profile_picture
    FROM
    comments
    INNER JOIN
      users ON comments.user_id = users.id
      WHERE
      post_id = ${postId}

  `;
  return comments;
});
