import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../database/users';
import Upload from './uploadPictureForm1';

export default async function AccountSetup() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/');
  return (
    <div className="h-screen">
      <div className="flex justify-center ">
        <div className="card frosted z-[1] p-8 w-1/2">
          <form action="/" className="grid">
            <h1 className="m-4 text-lg text-center">Create your profile</h1>
          </form>
          <Upload userId={user.id} />
          <ul className="steps">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Profile Picture</li>
            <li className="step">Ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
