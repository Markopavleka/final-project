'use client';

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

    router.push(getSafeReturnToPath(props.returnTo) || `/news`);

    router.refresh();
  }
  return (
    <div className="flex justify-center">
      <div className="card frosted z-[1] p-8 w-96">
        <h1 className="m-4 text-lg text-center">Create a account</h1>

        <form
          onSubmit={async (event) => await handleRegister(event)}
          className="grid"
        >
          <label>
            <p className="mb-1 ml-4 text-md">User Name</p>
            <input
              className="frosted p-2  mt-1"
              placeholder="Maggie Simpson"
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label>
            <p className="mb-1 ml-4 text-md">E-Mail</p>
            <input
              className="frosted p-2  mt-1"
              placeholder="magie.simpson@springfield.com"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </label>
          <label>
            <p className="mb-1 ml-4 text-md">Password</p>
            <input
              type="password"
              placeholder="Do not use password as your password"
              className="frosted p-2  mt-1"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>

          <button className="btn btn-md btn-primary text-[#F5F5F5] mx-auto m-4">
            Sign Up
          </button>
          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              Error: {error.message}
            </div>
          ))}
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
