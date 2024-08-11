import React, { useState, createContext, useEffect, useCallback } from 'react';

type Theme = null | 'light';

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}>({
  theme: null,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  const memoizedSetTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme: memoizedSetTheme }}>{children}</ThemeContext.Provider>;
};
