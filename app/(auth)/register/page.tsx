import Head from 'next/head';
import React from 'react';
import RegisterForm from './RegisterForm';

export default function page() {
  return (
    <div className="h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>Register| TechNewZ</title>
        <meta name="Register" content="Register" />
      </Head>
      <RegisterForm />
    </div>
  );
}
