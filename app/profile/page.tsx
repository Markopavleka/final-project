import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../database/users';

export default async function page() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/app');
  return (
    <div className="h-screen">
      <div className="flex justify-center ">
        <div className="card frosted w-1/2">
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
      </div>
    </div>
  );
}
