import Head from 'next/head';
import React from 'react';
import SignInForm from './SignInForm';

export default function page() {
  return (
    <div className="h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>Login| TechNewZ</title>
        <meta name="Login" content="Login" />
      </Head>
      <SignInForm />
    </div>
  );
}
