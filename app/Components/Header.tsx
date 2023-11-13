import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';

export default async function Navbar() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <header className="mb-8">
      <div className="navbar frosted rounded-t-[0]">
        <div className="navbar-start">
          {user ? (
            <Link
              href="/profile"
              tabIndex={0}
              className="normal-case font-bold text-2xl ml-4"
            >
              TechNewZ
            </Link>
          ) : (
            <h1 className="normal-case font-bold text-2xl ml-4">TechNewZ</h1>
          )}
        </div>

        {user ? (
          <>
            <div className="navbar-center ">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link
                    className="hover:underline hover:text-accent text-lg"
                    href="/profile"
                    tabIndex={0}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline hover:text-accent text-lg"
                    href="/news"
                    tabIndex={0}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline hover:text-accent text-lg"
                    href="/community"
                    tabIndex={0}
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar frosted rounded-full hover:scale-110 mr-4"
                >
                  <div className="w-16 rounded-full ">
                    <img alt="Profile" src={user.profilePicture} />
                  </div>
                </button>
                <ul className="menu menu-lg frosted dropdown-content mt-3 z-[999] p-2 rounded-box w-52 hover:text-accent">
                  <li>
                    <a className="hover:text-accent">Settings</a>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="navbar-end ml-2">
            <div className="hover:scale-110 hover:animate-bounce">
              <Link href="/signin" tabIndex={0} className="mr-2 text-xl ">
                Sign In
              </Link>
            </div>
            |
            <div className="hover:scale-110 hover:animate-bounce">
              <Link href="/register" tabIndex={0} className=" ml-2 text-xl">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
