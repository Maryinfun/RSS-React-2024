import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../components/providers';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const changeTheme = () => {
    setTheme(theme === 'light' ? null : 'light');
  };
  return (
    <div className="app">
      <header className="header">
        {' '}
        <h1>Welcome to Pokemon World!</h1>
        <button className="button theme-button" onClick={changeTheme}>
          Change Theme
        </button>
      </header>
      <main className="main">{children}</main>
      <footer></footer>
    </div>
  );
}
