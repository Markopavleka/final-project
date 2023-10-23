import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="flex justify-center ">
      <div className="card frosted z-[1] p-8 w-96">
        <form action="/" className="grid">
          <h1 className="m-4 text-lg text-center">Sign In</h1>
          <p className="mb-1 ml-4 text-md">E-Mail</p>
          <input
            placeholder="lisa.simpson@springfield.com"
            className="frosted p-2  mt-1"
          />
          <p className="mb-1 mt-4 ml-4 text-md">Password</p>
          <input placeholder="Do not use 1234" className="frosted p-2  mt-1" />
          <button className="btn btn-md btn-primary text-[#F5F5F5] mx-auto m-4">
            Sign In
          </button>
        </form>
        <Link
          className="text-primary text-center underline mb-4"
          href="/register"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
