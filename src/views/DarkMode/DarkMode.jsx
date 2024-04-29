import React, { useState, useEffect } from 'react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (localStorageTheme === 'dark' || (!localStorageTheme && prefersDarkMode)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div>
      <button
        className="fixed bottom-20 top-2 right-20 rounded-full bg-white-0 dark:bg-gray-500 flex items-center justify-center p-1"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <RiSunLine className="h-6 w-6 text-yellow-300 dark:text-white-0" />
        ) : (
          <RiMoonLine className="h-6 w-6 text-gray-600 dark:text-gray-100" />
        )}
      </button>
    </div>
  );
}

export default DarkMode;
