'use client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { getUserBySessionToken } from '../../database/users';
import LogoutButton from '../api/(auth)/logout/LogoutButton';

export default async function Navbar() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light',
  );

  // update state on toggle
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme('myThemeDark');
    } else {
      setTheme('myThemeLight');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');

    if (localTheme !== null) {
      document.documentElement.setAttribute('data-theme', localTheme);
    }
  }, [theme]);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <header className="mx-10 z-[9999]">
      <div className="navbar frosted  mb-10 mt-5">
        <div className="navbar-start">
          <div className="dropdown ml-2">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <ul className="menu menu-lg frosted dropdown-content mt-3 z-[999] p-2 rounded-box w-52">
              <li>
                <Link href="/" tabIndex={0}>
                  News
                </Link>
              </li>
              <li>
                <Link href="/" tabIndex={0} data-test-id="products-link">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/" tabIndex={0}>
                  Messages
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" tabIndex={0} className="normal-case text-xl">
            TechNewZ
          </Link>
        </div>

        {user ? (
          <LogoutButton />
        ) : (
          <div className="navbar-end mr-2">
            <div className="flex-none">
              <Link href="/signin" tabIndex={0}>
                Sign In
              </Link>
            </div>
            <div className="mx-2"> | </div>
            <Link href="/register" tabIndex={0}>
              Sign Up
            </Link>
          </div>
        )}

        <input
          onChange={handleToggle}
          type="checkbox"
          className="toggle mr-2"
        />
      </div>
    </header>
  );
}
