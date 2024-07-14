import { useEffect, useState } from 'react';
import ServerData, { ListOfAllPokemons } from '../../api';
import PokemonCard from '../pokemonCard/card';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { trimUrl } from '../../utilities';

const serverData = new ServerData();
interface Props {
  wordForSearch: string;
}

export default function AllPokemons(props: Props) {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<Error | ''>('');
  const [pokemons, setPokemons] = useState<ListOfAllPokemons | null>(null);
  const [noFilterPokemons, setNoFilterPokemons] = useState<ListOfAllPokemons | null>(null);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || '1', 10));
  const cardsPerPage = 6;

  const getAllPokemonsFromServer = async () => {
    try {
      setPokemons(null);
      const allPokemons: ListOfAllPokemons = (await serverData.getAllPokemons(
        'https://pokeapi.co/api/v2/pokemon'
      )) as ListOfAllPokemons;
      setTimeout(() => {
        setPokemons(filterPokemons(allPokemons, props.wordForSearch));
        setNoFilterPokemons(allPokemons);
      }, 300);
    } catch (error) {
      setError(error as Error);
    }
  };

  const filterPokemons = (pokemons: ListOfAllPokemons, wordForSearch: string): ListOfAllPokemons => {
    const filteredPokemons: ListOfAllPokemons = Object.create(pokemons);
    const results = pokemons.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(wordForSearch.toLowerCase().trimStart())
    );
    filteredPokemons.results = results;
    results.length ? setSearchResult(true) : setSearchResult(false);
    return filteredPokemons;
  };

  useEffect(() => {
    getAllPokemonsFromServer();
  }, [props.wordForSearch]);

  useEffect(() => {
    setCurrentPage(parseInt(page || '1', 10));
  }, [page]);

  useEffect(() => {
    if (noFilterPokemons) {
      const totalPages = noFilterPokemons && Math.ceil(noFilterPokemons.results.length / cardsPerPage);
      console.log(totalPages);
      if (totalPages && currentPage > totalPages) {
        navigate('/404');
      }
    }
  }, [noFilterPokemons, currentPage]);

  const lastCardInd: number = currentPage * cardsPerPage;
  const firstCardInd: number = lastCardInd - cardsPerPage;
  const currentCards = pokemons ? pokemons.results.slice(firstCardInd, lastCardInd) : [];

  const nextPage = () => {
    if (currentPage < Math.ceil((pokemons?.results.length || 0) / cardsPerPage)) {
      navigate(`/page/${currentPage + 1}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      navigate(`/page/${currentPage - 1}`);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="cards-wrapper" onClick={() => navigate(trimUrl(location.pathname, 'specification'))}>
          {error ? (
            <h2>Error: {error.message}</h2>
          ) : !pokemons ? (
            <h2>Loading...</h2>
          ) : !searchResult ? (
            <h2>Sorry, not found.</h2>
          ) : (
            <>
              {currentCards.map((pokemon) => (
                <PokemonCard key={pokemon.name} url={pokemon.url} />
              ))}
            </>
          )}
        </div>
        <Outlet />
      </div>
      <div className="pagination-wrapper">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <div className="pagination-wrapper__page-number">{currentPage}</div>

        <button onClick={nextPage} disabled={currentPage === Math.ceil((pokemons?.results.length || 0) / cardsPerPage)}>
          Next
        </button>
      </div>
    </>
  );
}
