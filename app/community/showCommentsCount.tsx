import React from 'react';
import { getUserCommentsByPostId } from '../../database/comment';

type Props = {
  postId: number;
};
export default async function ShowCommentsCount(props: Props) {
  const getComments = await getUserCommentsByPostId(props.postId);

  const countComments = getComments.length;

  return (
    <div className="flex align-center justify-center">
      <div className="badge badge-primary badge-lg">{countComments}</div>
    </div>
  );
}
