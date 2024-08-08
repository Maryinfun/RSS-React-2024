import { useRouter } from 'next/router';
import AllPokemons from '../components/pokemomonsList';
import SearchInput from '../components/searchInput';
import Layout from '../components/wrap/wrap';
import ForceError from '../components/forceErrorButton';
import { useEffect, useState } from 'react';
import BadPath from './404';
import CardFullData from '@/components/pokemonCard/cardFullData';
import { ListOfAllPokemons, pokemonsApi } from '@/api';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

interface DynamicPageProps {
  initialData: ListOfAllPokemons | undefined;
}

const DynamicPage = ({ initialData }: DynamicPageProps) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const router = useRouter();
  const { slug } = router.query;
  const route = Array.isArray(slug) ? slug.join('/') : slug || '';

  const {
    data: fetchedPokemons,
    isLoading,
    error,
  } = pokemonsApi.useGetAllPokemonsQuery(100, {
    skip: !!initialData,
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
            currentPage={route.startsWith('page/') ? parseInt(route.split('/')[1], 10) || 1 : 1}
            fetchedPokemons={fetchedPokemons ?? initialData}
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
  const initialData = store.getState().pokemonsApi.queries['getAllPokemons(100)']?.data || undefined;

  return {
    props: {
      initialData,
    },
  };
});

export default DynamicPage;
