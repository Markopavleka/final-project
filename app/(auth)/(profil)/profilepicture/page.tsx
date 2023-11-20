import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../../database/users';
import UploadPictureForm from './uploadPictureForm';

export const metadata = {
  title: 'TechNewZ|| Profile picture',
  description:
    'Stay ahead of the curve with TechNewZ, your source for the latest in the ever in the ever-evolving world of technology. At TechNewZ we pride ourselves on delivering unbiased and objective news coverage, ensuring you get an accurate and balanced insight into the fast-paced the fast-paced technology landscape.',
};

export default async function AccountSetup() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/app');
  return (
    <div className="h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>Profile Picture | Customize your profile</title>
        <meta name="Setup Profile" content="Customize your profile picture" />
      </Head>
      <div className="flex justify-center flex-col">
        <div className="mt-8">
          <h1 className="m-2 text-xl font-medium text-center">
            Create your profile picture
          </h1>
        </div>
        <div className="card frosted mx-auto p-8">
          <UploadPictureForm userId={user.id} />
          <ul className="steps my-4">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Profile Picture</li>
            <li className="step">Background Image</li>
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
