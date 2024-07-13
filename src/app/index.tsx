import SearchInput from '../components/searchInput';
import ForceError from '../components/forceErrorButton';
import ErrorBoundary from '../components/errorBoundary';
import AllPokemons from '../components/pokemomonsList';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import BadPath from './404';

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
            <ErrorBoundary>
              <SearchInput addSearchWord={setSearchWord} />
              <AllPokemons wordForSearch={searchWord} />
              <ForceError />
            </ErrorBoundary>
          </Layout>
        }
      ></Route>
      <Route
        path="/page/:page"
        element={
          <Layout>
            <AllPokemons wordForSearch={searchWord} />
          </Layout>
        }
      />
      <Route path="*" element={<BadPath />} />
    </Routes>
  );
}
