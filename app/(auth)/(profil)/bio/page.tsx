import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
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
      <Head>
        <meta charSet="utf-8" />
        <title>Bio | Customize your profile</title>
        <meta name="Setup Profile" content="Customize your bio" />
      </Head>
      <div className="flex justify-center flex-col ">
        <h1 className="m-4 text-xl font-bold text-center">
          Create your biography
        </h1>
        <div className="card frosted p-8 mx-auto h-auto mb-12">
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
          <Link
            className="text-center mt-4 text-accent  underline hover:text-primary hover:scale-105"
            href="/profile"
          >
            Skip and set up your profile later
          </Link>
        </div>
      </div>
    </div>
  );
}
