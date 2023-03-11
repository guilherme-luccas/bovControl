import {createContext, ReactNode, useState} from 'react';

export const ThemeContext = createContext({});

export function ThemeProviderMode({children}) {
  const [themeLight, setThemeLight] = useState(true);
  function ChangeTheme() {
    setThemeLight(!themeLight);
  }
  return (
    <ThemeContext.Provider value={{themeLight, ChangeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
