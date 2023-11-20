import React from 'react';
import { getUserCommentsByPostId } from '../../../database/comment';

type Props = {
  postId: number;
};

export default async function DisplayComments(props: Props) {
  const allComments = await getUserCommentsByPostId(props.postId);

  return (
    <div>
      {allComments.toReversed().map((comment) => (
        <div key={`blogPost-div-${comment.commentId}`}>
          <div>
            <div className="flex items-center m-4">
              <img
                alt="Profile"
                src={comment.profilePicture ?? ''}
                className="w-16 h-16 rounded-full object-cover m-2"
              />

              <h2 className="text-xl text-center my-4">{comment.username}</h2>
            </div>
            <p className="card frosted mb-8 mx-4 text-md p-4">
              {comment.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
