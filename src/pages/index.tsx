import { useState, useEffect } from 'react';
import Layout from '../components/wrap/wrap';
import SearchInput from '../components/searchInput';
import ForceError from '../components/forceErrorButton';
import AllPokemons from '../components/pokemomonsList';
import { ListOfAllPokemons, pokemonsApi } from '@/api';
import { useRouter } from 'next/router';
import BadPath from '@/components/404/404';
import CardFullData from '@/components/pokemonCard/cardFullData';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

interface HomePageProps {
  initialPokemonsData: ListOfAllPokemons | undefined;
}

const HomePage = ({ initialPokemonsData }: HomePageProps) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const router = useRouter();
  const { slug } = router.query;

  const route = Array.isArray(slug) ? slug.join('/') : slug || '';
  const currentPage = route.startsWith('page/') ? parseInt(route.split('/')[1], 10) || 1 : 1;

  const {
    data: fetchedPokemons,
    error,
    isLoading,
  } = pokemonsApi.useGetAllPokemonsQuery(100, {
    skip: !!initialPokemonsData,
  });

  useEffect(() => {
    const storedSearchWord = localStorage.getItem('searchWord');
    if (storedSearchWord) {
      setSearchWord(storedSearchWord);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchWord', searchWord);
  }, [searchWord]);

  return (
    <Layout>
      {route.startsWith('specification/') && <CardFullData />}
      {(route.startsWith('page/') || route === '') && (
        <>
          <SearchInput addSearchWord={setSearchWord} />
          <AllPokemons
            wordForSearch={searchWord}
            currentPage={currentPage}
            fetchedPokemons={fetchedPokemons ?? initialPokemonsData}
            isLoading={isLoading}
            error={error}
          />
          <ForceError />
        </>
      )}
      {route !== '' && !route.startsWith('page/') && !route.startsWith('specification/') && <BadPath />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(pokemonsApi.endpoints.getAllPokemons.initiate(100));
  const initialPokemonsData = store.getState().pokemonsApi.queries['getAllPokemons(100)']?.data || undefined;

  return {
    props: {
      initialPokemonsData,
    },
  };
});

export default HomePage;
