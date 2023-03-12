import {createContext, ReactNode, useState} from 'react';

interface Children {
  children: ReactNode;
}
interface ContextData {
  themeLight: boolean;
  ChangeTheme: () => void;
}

const initalValue = {
  themeLight: false,
  ChangeTheme: () => {},
};

export const ThemeContext = createContext<ContextData>(initalValue);

export function ThemeProviderMode({children}: Children) {
  const [themeLight, setThemeLight] = useState(initalValue.themeLight);
  function ChangeTheme() {
    setThemeLight(!themeLight);
  }
  return (
    <ThemeContext.Provider value={{themeLight, ChangeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
