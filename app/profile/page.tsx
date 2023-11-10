import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBlogPosts, getUserBySessionToken } from '../../database/users';

export default async function page() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/app');

  const userBlogPosts = await getUserBlogPosts(sessionTokenCookie.value);

  console.log(userBlogPosts);
  return (
    <div className="h-screen">
      <div className="flex justify-center flex-col ">
        <div className="card frosted w-1/2 mx-auto my-8">
          <div className="card frosted w-full h-64 bg-[#545454b2]">
            <img
              src={user.backgroundPicture}
              alt=""
              className="w-full h-72 rounded-xl overflow-hidden"
            />
          </div>
          <div className="avatar rounded-full w-52 h-52 bg-[#545454b2] absolute bottom-4 left-16">
            <img
              className="avatar rounded-full w-52 h-52 "
              src={user.profilePicture}
              alt=""
            />
          </div>
          <p className=" ml-4 text-md text-center mt-2">
            {user.username.toUpperCase()}
          </p>

          <div className="card frosted ml-80 p-8 pr-32 m-4">
            <p className="text-center">{user.bio}</p>
          </div>
        </div>
        <h1 className="text-2xl">Your blog entries:</h1>
        {userBlogPosts.toReversed().map((blogPost) => (
          <div
            className="card frosted w-1/2 mx-auto"
            key={`blogPost-div-${blogPost.postId}`}
          >
            <div>
              <h3 className="mb-1 ml-8 text-md">Title:</h3>
              <p className="card frosted mb-1 mx-4 text-md p-4">
                {blogPost.title}
              </p>
              <h3 className="mb-1 ml-8 text-md ">Description:</h3>
              <p className="card frosted my-4 mx-4 text-md p-4">
                {blogPost.post}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
