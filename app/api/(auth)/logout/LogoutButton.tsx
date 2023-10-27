import React from 'react';
import { logout } from './action';

export default function LogoutButton() {
  return (
    <form>
      <button className="hover:underline mr-2 text-xl" formAction={logout}>
        {' '}
        Logout{' '}
      </button>
    </form>
  );
}
