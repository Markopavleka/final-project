'use client';
import React, { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<string>(
    (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) ||
      'light',
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
  return (
    <div>
      {' '}
      <input onChange={handleToggle} type="checkbox" className="toggle mr-2" />
    </div>
  );
}
