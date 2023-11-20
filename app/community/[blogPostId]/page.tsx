import Head from 'next/head';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import React from 'react';
import { getBlogPostsById } from '../../../database/posts';
import {
  getUserBySessionToken,
  UserBlogPostWithoutUserId,
} from '../../../database/users';
import HandleLike from '../handleLike';
import ShowLike from '../showLike';
import CommentForm from './commentForm';
import DisplayComments from './displayComments';

type Props = {
  params: {
    blogPostId: number;
  };
};

export const metadata = {
  title: 'TechNewZ|| Community',
  description:
    'Stay ahead of the curve with TechNewZ, your source for the latest in the ever in the ever-evolving world of technology. At TechNewZ we pride ourselves on delivering unbiased and objective news coverage, ensuring you get an accurate and balanced insight into the fast-paced the fast-paced technology landscape.',
};

export default async function BlogPostPage(props: Props) {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/signin');

  const singleBlogPost: postgres.RowList<UserBlogPostWithoutUserId[]> =
    await getBlogPostsById(props.params.blogPostId);

  if (singleBlogPost[0]) {
    return (
      <div className="flex justify-center">
        <Head>
          <meta charSet="utf-8" />
          <title>Community| TechNewZ</title>
          <meta name="Community" content="Community" />
        </Head>
        <div className="w-1/2 ml-4 ">
          <div className="card frosted z-[1] my-8">
            <div>
              <div className="flex items-center m-4">
                <img
                  alt="Profile"
                  src={singleBlogPost[0].profilePicture}
                  className="w-16 h-16 rounded-full object-cover m-2"
                />

                <h2 className="text-xl text-center my-4">
                  {singleBlogPost[0].username}
                </h2>
              </div>

              <h3 className="mb-1 ml-8 text-md">Title:</h3>
              <p className="card frosted mb-1 mx-4 text-md p-4">
                {singleBlogPost[0].title}
              </p>
              <h3 className="mb-1 ml-8 text-md">Description:</h3>
              <p className="card frosted my-4 mx-4 text-md p-4">
                {singleBlogPost[0].post}
              </p>
            </div>
            <div className="divider m-0" />
            <div className="flex items-center justify-start my-1 ml-8">
              <div className="mx-4">
                <ShowLike postId={singleBlogPost[0].postId} />
              </div>
              <div>
                <HandleLike
                  userId={user.id}
                  postId={singleBlogPost[0].postId}
                />
              </div>
            </div>
            <div className="divider m-0" />

            <h3 className="mb-1 ml-8 text-md">Comments:</h3>
            <DisplayComments postId={singleBlogPost[0].postId} />
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
