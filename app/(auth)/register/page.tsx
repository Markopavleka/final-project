import React from 'react';

export default function page() {
  return (
    <div className="flex justify-center ">
      <div className="card frosted z-[1] p-8 w-96">
        <h1 className="m-4 text-lg text-center">Create a account</h1>

        <form action="/accountsetup" className="grid">
          <p className="mb-1 ml-4 text-md">User Name</p>
          <input className="frosted p-2  mt-1" placeholder="Maggie Simpson" />
          <p className="mb-1 mt-4 ml-4 text-md">E-Mail</p>
          <input
            className="frosted p-2  mt-1"
            placeholder="magie.simpson@springfield.com"
          />
          <p className="mb-1 mt-4 ml-4 text-md">Password</p>
          <input
            placeholder="Do not use password as your password"
            className="frosted p-2  mt-1"
          />
          <p className="mb-1 mt-4 ml-4 text-md">Shop Name</p>
          <input placeholder="Kwik-E-Mart" className="frosted p-2  mt-1" />
          <button className="btn btn-md btn-primary text-[#F5F5F5] mx-auto m-4">
            Sign Up
          </button>
        </form>
        <div>
          <ul className="steps">
            <li className="step step-primary">Register</li>
            <li className="step ">Account Setup</li>
            <li className="step">Ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
