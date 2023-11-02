import React from 'react';
import { getUserComments } from '../../../database/comment';

export default async function DisplayComments() {
  const allComments = await getUserComments();

  console.log(allComments);

  return (
    <div>
      {allComments.toReversed().map((comment) => (
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
