import React, { useState, createContext, useEffect, useCallback } from 'react';

type Theme = null | 'light';

export const ThemeContext = createContext<{ theme: Theme; setTheme: (newTheme: Theme) => void }>({
  theme: null,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    if (theme === 'light') document.body.classList.add('light');
    else document.body.classList.remove('light');

    return () => {
      if (document.body.classList.contains('light')) document.body.classList.remove('light');
    };
  }, [theme]);

  const memoizedSetTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  return <ThemeContext.Provider value={{ theme, setTheme: memoizedSetTheme }}>{children}</ThemeContext.Provider>;
};
