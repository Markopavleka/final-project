import Head from 'next/head';
import React from 'react';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'TechNewZ|| SignUp',
  description:
    'Stay ahead of the curve with TechNewZ, your source for the latest in the ever in the ever-evolving world of technology. At TechNewZ we pride ourselves on delivering unbiased and objective news coverage, ensuring you get an accurate and balanced insight into the fast-paced the fast-paced technology landscape.',
};

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
