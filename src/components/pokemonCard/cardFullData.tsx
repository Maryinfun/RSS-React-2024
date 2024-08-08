import { useRouter } from 'next/router';
import { pokemonsApi } from '@/api';
import { trimUrl } from '@/utilities';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

const CardFullData = () => {
  const router = useRouter();
  const { slug } = router.query;

  const pokemonIdString = Array.isArray(slug) ? slug[1] : null;

  const pokemonIdNumber = pokemonIdString && !isNaN(Number(pokemonIdString)) ? parseInt(pokemonIdString, 10) : NaN;

  const {
    data: pokemon,
    error,
    isLoading,
  } = pokemonsApi.useGetPokemonByIdQuery(pokemonIdNumber, {
    skip: isNaN(pokemonIdNumber),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  const handleClose = () => {
    const newPath = trimUrl(router.pathname, 'specification');
    router.push(newPath);
  };

  return (
    <div className="card__specification">
      {pokemon && (
        <>
          <div className="specification__close" onClick={handleClose}>
            x
          </div>
          <div
            className="card__image"
            style={{
              backgroundImage: `url(${pokemon.sprites.front_default})`,
            }}
          ></div>
          <h2 className="card__pokemon-name">{pokemon.name.toUpperCase()}</h2>
          <p>Base experience {pokemon.base_experience}</p>
          <p>Height {pokemon.height}</p>
          <p>Order {pokemon.order}</p>
          <p>Weight {pokemon.weight}</p>
          <p>To read more: {pokemon.forms ? pokemon.forms[0].url : null}</p>
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const pokemonId = parseInt(context.params?.id as string, 10);

  if (isNaN(pokemonId)) {
    return {
      notFound: true,
    };
  }

  store.dispatch(pokemonsApi.endpoints.getPokemonById.initiate(pokemonId));

  await store.dispatch(pokemonsApi.util.getRunningQueryThunk('getPokemonById', pokemonId));

  return {
    props: {
      pokemonId,
    },
  };
});

export default CardFullData;
