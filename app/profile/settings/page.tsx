import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { getUserBySessionToken } from '../../../database/users';

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
            Change your profile
          </h1>
        </div>
        <div className="card frosted mx-auto p-8">
          <label>
            <p className="mx-12 mt-8 mb-2 text-lg">Username</p>
            <input
              placeholder="lisa.simpson@springfield.com"
              className="frosted p-2  mb-4 mx-8 w-80"
            />
          </label>
          <label>
            <p className="mx-12 mt-4 mb-2 text-lg">Password</p>
            <input
              type="password"
              placeholder="Do not use 1234"
              className="frosted p-2  mb-4 mx-8 w-80"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
