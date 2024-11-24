import { useEffect, useState } from 'react';

const DARK_MODE = 'dark-mode';

const getDarkMode = () => JSON.parse(localStorage.getItem(DARK_MODE) || 'false');

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(getDarkMode);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save the theme preference in localStorage
    localStorage.setItem(DARK_MODE, JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
};
