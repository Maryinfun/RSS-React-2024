import SearchInput from '../components/searchInput';
import ForceError from '../components/forceErrorButton';
import AllPokemons from '../components/pokemomonsList';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import BadPath from './404';
import CardFullData from '../components/pokemonCard/cardFullData';

export default function App() {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord') || '');

  useEffect(() => {
    localStorage.setItem('searchWord', searchWord);
  }, [searchWord]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <SearchInput addSearchWord={setSearchWord} />
            <AllPokemons wordForSearch={searchWord} />
            <ForceError />
          </Layout>
        }
      >
        <Route path="specification/:specification" element={<CardFullData />} />
      </Route>
      <Route
        path="/page/:page"
        element={
          <Layout>
            <AllPokemons wordForSearch={searchWord} />
          </Layout>
        }
      >
        <Route path="specification/:specification" element={<CardFullData />} />
      </Route>
      <Route path="*" element={<BadPath />} />
    </Routes>
  );
}
