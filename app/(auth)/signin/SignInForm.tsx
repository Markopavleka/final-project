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

    router.push(getSafeReturnToPath(props.returnTo) || `/profile`);

    router.refresh();
  }

  return (
    <div className="flex justify-center flex-col ">
      <h1 className="m-4 text-2xl text-center font-bold ">Sign In</h1>
      <div className="card frosted mx-auto">
        <form
          onSubmit={async (event) => await handleRegister(event)}
          className="grid justify-center align-center"
        >
          <label>
            <p className="mx-12 mt-8 mb-2 text-lg">Username</p>
            <input
              onChange={(event) => setUsername(event.currentTarget.value)}
              className="frosted p-2  mb-4 mx-8 w-80"
            />
          </label>
          <label>
            <p className="mx-12 mt-4 mb-2 text-lg">Password</p>
            <input
              type="password"
              className="frosted p-2  mb-4 mx-8 w-80"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <button className="btn btn-md btn-primary text-accent mx-auto m-4">
            Sign In
          </button>
          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              Error: {error.message}
            </div>
          ))}
        </form>
        <Link
          className="text-center mb-4 text-accent  underline hover:text-primary hover:scale-105"
          href="/register"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
