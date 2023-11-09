import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../../database/users';
import CreateBio from './setupBio';

export default async function AccountSetup() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/app');

  return (
    <div>
      <div className="flex justify-center ">
        <div className="card frosted z-[1] p-8 w-1/2 h-auto mb-12">
          <form action="/" className="grid">
            <h1 className="m-4 text-lg text-center">Create your profile</h1>
          </form>
          <CreateBio
            username={user.username}
            profilePicture={user.profilePicture}
            userId={user.id}
            backgroundPicture={user.backgroundPicture}
          />
          <ul className="steps mt-32 mb-16">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Profile Picture</li>
            <li className="step step-primary">Background Image</li>
            <li className="step step-primary">Bio</li>
            <li className="step">Ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
