'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(savedTheme || (prefersDark ? 'dark' : 'light')); // Default to system preference
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) return null; // Avoid rendering until theme is initialized

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-card text-card-foreground rounded-md shadow"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112.001 21c-5.523 0-10-4.477-10-10 0-4.324 2.753-8.065 6.716-9.418a.75.75 0 01.942.941A7.501 7.501 0 0012 20.501a7.482 7.482 0 007.477-6.342.75.75 0 011.275-.597z"
          />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25M12 18.75V21M4.219 4.219l1.591 1.591M17.192 17.192l1.591 1.591M3 12h2.25M18.75 12H21M4.219 19.781l1.591-1.591M17.192 6.808l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"
          />
        </svg>
      )}
    </button>
  );
}
