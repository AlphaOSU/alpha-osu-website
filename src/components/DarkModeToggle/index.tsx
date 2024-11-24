import { ReactNode, useEffect, useState } from 'react';
import { ThemeSwitcherProvider, useThemeSwitcher } from 'react-css-theme-switcher';
import { useDarkMode } from './helper';
import { DarkModeToggle } from './styles';

// Need better solution
const themes = {
  dark: '/styles/antd.dark.min.css',
  light: '/styles/antd.min.css',
};

export const DarkModeProvider = ({ children }: { children: ReactNode}) => {
  const [darkMode] = useDarkMode();

  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={darkMode ? 'dark' : 'light'}>
      {children}
    </ThemeSwitcherProvider>
  );
};

export const DarkModeToggleComp = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const { switcher } = useThemeSwitcher();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    if (!isMounted) {
      return;
    }
    switcher({ theme: darkMode ? 'light' : 'dark' });
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeToggle>
      <div className="dark-mode-icon-container">
        <div
          className="dark-mode-icon"
          onClick={handleToggle}
        >
          {
            darkMode
              ?
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2
                          12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></g>
              </svg>

              : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2" d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9" /></svg>
          }
        </div>
      </div>
    </DarkModeToggle>
  );

};
