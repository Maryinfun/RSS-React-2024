import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header></header>
      <main className="main">
        <h1>Welcome to Pokemon World!</h1>
        {children}
      </main>
      <footer></footer>
    </>
  );
}
