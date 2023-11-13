'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

type Props = { returnTo?: string | string[] };

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(getSafeReturnToPath(props.returnTo) || `/profilepicture`);

    router.refresh();
  }
  return (
    <div className="flex justify-center flex-col ">
      <h1 className="m-4 text-2xl text-center font-bold">Create a account</h1>
      <div className="card frosted mx-auto">
        <div className="grid justify-center justify-items-center ">
          <form
            onSubmit={async (event) => await handleRegister(event)}
            className="grid justify-center align-center"
          >
            <label>
              <p className="mx-12 mt-8 mb-2 text-lg">User Name</p>
              <input
                className="frosted p-2  mb-4 mx-8 w-80"
                placeholder="Maggie Simpson"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
            <label>
              <p className="mx-12 mt-8 mb-2 text-lg">E-Mail</p>
              <input
                className="frosted p-2  mb-4 mx-8 w-80"
                placeholder="magie.simpson@springfield.com"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>
            <label>
              <p className="mx-12 mt-8 mb-2 text-lg">Password</p>
              <input
                type="password"
                placeholder="Do not use password as your password"
                className="frosted p-2  mb-4 mx-8 w-80"
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>

            <button className="btn btn-md btn-primary text-accent mx-auto m-4">
              Sign Up
            </button>
            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                Error: {error.message}
              </div>
            ))}
          </form>
          <Link
            className="text-center mb-4 text-accent  underline hover:text-primary hover:scale-105"
            href="/signin"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
