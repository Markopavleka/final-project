import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../../database/users';
import UploadPictureForm from './uploadPictureForm';

export default async function AccountSetup() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/signin');

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Background Image | Customize your profile</title>
        <meta name="Setup Profile" content="Customize your background image" />
      </Head>
      <div className="flex justify-center flex-col">
        <h1 className="m-2 text-xl font-bold text-center">
          Create your background image
        </h1>
        <div className="card frosted p-8 mx-auto  mb-12">
          <UploadPictureForm
            username={user.username}
            profilePicture={user.profilePicture}
            userId={user.id}
          />

          <ul className="steps my-8">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Profile Picture</li>
            <li className="step step-primary">Background Image</li>
            <li className="step">Bio</li>
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
