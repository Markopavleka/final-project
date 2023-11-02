import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getAllBlogPosts } from '../../database/posts';
import { getUserBlogPosts, getUserBySessionToken } from '../../database/users';
import CreateBlogPostForm from './createBlogPostForm';

export default async function Community() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/');

  // Display the notes for the current logged in user
  await getUserBlogPosts(sessionTokenCookie.value);

  const allBlogPosts = await getAllBlogPosts();

  console.log('Checking: ', allBlogPosts);
  return (
    <div>
      <CreateBlogPostForm userId={user.id} />
      <h2 className="text-2xl text-center my-8">Community Posts</h2>
      <div className="flex justify-center">
        <div className=" w-1/2 ml-4">
          {allBlogPosts.toReversed().map((blogPost) => (
            <div
              className="card frosted z-[1] my-8 p-4"
              key={`blogPost-div-${blogPost.postId}`}
            >
              <div>
                <h2 className="text-xl text-center my-4">
                  {blogPost.username}
                </h2>
                <h3 className="mb-1 ml-8 text-md">Title:</h3>
                <p className="card frosted mb-1 mx-4 text-md p-4">
                  {blogPost.title}
                </p>
                <h3 className="mb-1 ml-8 text-md ">Description:</h3>
                <p className="card frosted my-4 mx-4 text-md p-4">
                  {blogPost.post}
                </p>
                <Link
                  className="m-8 hover:underline"
                  href={`/community/${blogPost.postId}`}
                >
                  Comment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
