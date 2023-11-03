/* import React from 'react';
import { getUserCommentsByPostId } from '../../database/comment';

type Props = {
  newsId: number;
};
export default async function ShowCommentsNewsCount(props: Props) {
  const getComments = await getUserCommentsByPostId(props.newsId);
  console.log(props.newsId);

  const countComments = getComments.length;

  return (
    <div className="flex align-center justify-center">
      <div className="badge badge-primary badge-lg">{countComments}</div>
    </div>
  );
}
 */
