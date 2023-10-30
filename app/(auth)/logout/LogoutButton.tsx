'use client';
import React from 'react';
import { logout } from './action';

export default function LogoutButton() {
  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    await logout(); // Call the logout function
  };

  return (
    <form onSubmit={handleLogout}>
      <button className="hover:underline mr-2 text-xl">Logout</button>
    </form>
  );
}
