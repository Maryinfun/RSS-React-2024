import SearchInput from '../components/searchInput';
import ForceError from '../components/forceErrorButton';
import ErrorBoundary from '../components/errorBoundary';
import AllPokemons from '../components/pokemomonsList';
import { useState, useEffect } from 'react';

export default function App() {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord') || '');
  useEffect(() => {
    localStorage.setItem('searchWord', searchWord);
  }, [searchWord]);

  return (
    <>
      <header></header>
      <main className="main">
        <h1>Welcome to Pokemon World!</h1>
        <ErrorBoundary>
          <SearchInput addSearchWord={setSearchWord} />
          <AllPokemons wordForSearch={searchWord} />
          <ForceError />
        </ErrorBoundary>
      </main>
      <footer></footer>
    </>
  );
}
