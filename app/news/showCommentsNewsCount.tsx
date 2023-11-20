import React from 'react';
import { getUserNewsCommentsByNewsId } from '../../database/commentsNews';

type Props = {
  newsId: number;
};
export default async function ShowCommentsNewsCount(props: Props) {
  const getComments = await getUserNewsCommentsByNewsId(props.newsId);

  const countComments = getComments.length;

  return (
    <div className="flex align-center justify-center">
      <div className="badge badge-primary badge-lg p-2">{countComments}</div>
    </div>
  );
}
