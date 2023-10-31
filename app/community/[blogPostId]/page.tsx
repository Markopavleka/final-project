import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import React from 'react';
import { getBlogPostsById } from '../../../database/posts';
import {
  getUserBySessionToken,
  UserBlogPostWithoutUserId,
} from '../../../database/users';
import CommentForm from './commentForm';
import DisplayComments from './displayComments';

type Props = {
  params: {
    blogPostId: number;
  };
};

export default async function BlogPostPage(props: Props) {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/');

  console.log(user);

  const singleBlogPost: postgres.RowList<UserBlogPostWithoutUserId[]> =
    await getBlogPostsById(props.params.blogPostId);
  /*   console.log('checking singleBlogPost: ', singleBlogPost[0]);
  console.log('checking props: ', props.params.blogPostId);

  console.log('checking Api', await getBlogPostsById(29)); */

  if (singleBlogPost[0]) {
    return (
      <div className="flex justify-center">
        <div className="w-1/2 ml-4 ">
          <div className="card frosted z-[1] my-8">
            <div>
              <h2 className="text-xl text-center my-4">
                {singleBlogPost[0].username}
              </h2>
              <h3 className="mb-1 ml-8 text-md">Title:</h3>
              <p className="card frosted mb-1 mx-4 text-md p-4">
                {singleBlogPost[0].title}
              </p>
              <h3 className="mb-1 ml-8 text-md">Description:</h3>
              <p className="card frosted my-4 mx-4 text-md p-4">
                {singleBlogPost[0].post}
              </p>
              <div className="divider " />
              <div className="divider " />

              <h3 className="mb-1 ml-8 text-md">Comments:</h3>
              <DisplayComments />
            </div>
          </div>
          <CommentForm userId={user.id} postId={singleBlogPost[0].postId} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-[87.3vh]">
        <h1 className="text-4xl text-center">Blog post not found!</h1>
      </div>
    );
  }
}
