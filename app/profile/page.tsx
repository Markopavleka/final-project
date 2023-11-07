import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import UploadForm from '../(auth)/profilepicture/uploadPictureForm';
import { getUserBlogPosts, getUserBySessionToken } from '../../database/users';

export default async function page() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/');

  // Display the notes for the current logged in user
  await getUserBlogPosts(sessionTokenCookie.value);
  return (
    <div className="flex justify-center">
      <div className=" w-1/2 ml-4">
        <div className="card frosted z-[1] my-8 p-4">
          <h1>{user.username}</h1>
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
