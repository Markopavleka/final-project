'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function SignInForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(getSafeReturnToPath(props.returnTo) || `/news`);

    router.refresh();
  }

  return (
    <div className="flex justify-center ">
      <div className="card frosted z-[1] p-8 w-96">
        <form
          onSubmit={async (event) => await handleRegister(event)}
          className="grid justify-center align-center"
        >
          <h1 className="m-4 text-2xl text-center">Sign In</h1>
          <label>
            <p className="mb-1 ml-4 text-md">Username</p>
            <input
              onChange={(event) => setUsername(event.currentTarget.value)}
              placeholder="lisa.simpson@springfield.com"
              className="frosted p-2  mt-1 mb-2"
            />
          </label>
          <label>
            <p className="mb-1 ml-4 text-md">Password</p>
            <input
              type="password"
              placeholder="Do not use 1234"
              className="frosted p-2  mt-1 mb-2"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <button className="btn btn-md btn-primary text-[#F5F5F5] mx-auto m-4">
            Sign In
          </button>
          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              Error: {error.message}
            </div>
          ))}
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
