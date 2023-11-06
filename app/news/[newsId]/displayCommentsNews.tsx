import React from 'react';
import { getUserNewsCommentsByNewsId } from '../../../database/commentsNews';

type Props = {
  newsId: number;
};
export default async function DisplayComments(props: Props) {
  const allNewsComments = await getUserNewsCommentsByNewsId(props.newsId);
  return (
    <div>
      {allNewsComments.toReversed().map((comment) => (
        <div key={`blogPost-div-${comment.commentId}`}>
          <div>
            <h2 className="text-md ml-8 my-4">{comment.username}</h2>
            <p className="card frosted mb-8 mx-4 text-md p-4">
              {comment.comment}
            </p>
            <div className="divider " />
          </div>
        </div>
      ))}
    </div>
  );
}
