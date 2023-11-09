import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../../database/users';
import UploadPictureForm from './uploadPictureForm';

// import Upload from './uploadPictureForm1';

export default async function AccountSetup() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/app');
  return (
    <div className="h-screen">
      <div className="flex justify-center ">
        <div className="card frosted z-[1] p-8 w-1/2">
          <form action="/" className="grid">
            <h1 className="m-4 text-lg text-center">Create your profile</h1>
          </form>

          <UploadPictureForm userId={user.id} />
          <ul className="steps my-4">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Profile Picture</li>
            <li className="step">Background Image</li>
            <li className="step">Bio</li>
            <li className="step">Ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
