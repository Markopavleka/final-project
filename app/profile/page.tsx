import Head from 'next/head';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBlogPosts, getUserBySessionToken } from '../../database/users';

export default async function page() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/signin');

  const userBlogPosts = await getUserBlogPosts(sessionTokenCookie.value);

  return (
    <div className="h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title> Profile | TechNewZ</title>
        <meta name="Profile" content="Profile" />
      </Head>
      <div className="flex justify-center flex-col ">
        <div className="card frosted w-1/2 mx-auto my-8 ">
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
          <p className=" ml-4 text-md font-bold text-center mt-2">
            Username: {user.username.toUpperCase()}
          </p>
          <p className=" text-md ml-[22rem] mt-2">Bio:</p>
          <div className="card border-solid border-[rgba(255, 255, 255, 0.3)] border ml-80 p-8 pr-32 mb-4 mr-4">
            <p className="text-center">{user.bio}</p>
          </div>
        </div>
        <div className="mx-auto mb-2">
          <h1 className="text-2xl">Your blog entries:</h1>
        </div>

        {userBlogPosts.toReversed().map((blogPost) => (
          <div
            className="card frosted w-1/2 mx-auto p-4"
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
