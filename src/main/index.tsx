import SearchInput from '../components/searchInput';
import ForceError from '../components/forceErrorButton';
import AllPokemons from '../components/pokemomonsList';
import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layout';
import BadPath from './404';
import CardFullData from '../components/pokemonCard/cardFullData';
import { ThemeProvider } from '../components/providers';
import ErrorBoundary from '../components/errorBoundary';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

function Main() {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord') || '');
  useEffect(() => {
    localStorage.setItem('searchWord', searchWord);
  }, [searchWord]);
  return (
    <ThemeProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Layout>
                <SearchInput addSearchWord={setSearchWord} />
                <AllPokemons wordForSearch={searchWord} />
                <ForceError />
              </Layout>
            </>
          }
        >
          <Route path="specification/:specification" element={<CardFullData />} />
        </Route>

        <Route
          path="page/:page"
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
        <Route path="*" element={<BadPath />} />
      </Routes>
    </ThemeProvider>
  );
}

const store = setupStore();

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}
