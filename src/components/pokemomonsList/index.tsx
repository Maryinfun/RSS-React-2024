import { useEffect, useState } from 'react';
import ServerData, { ListOfAllPokemons } from '../../api';
import PokemonCard from '../pokemonCard/card';

const serverData = new ServerData();
interface Props {
  wordForSearch: string;
}

export default function AllPokemons(props: Props) {
  const [error, setError] = useState<Error | ''>('');
  const [pokemons, setPokemons] = useState<ListOfAllPokemons | null>(null);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const getAllPokemonsFromServer = async () => {
    try {
      setPokemons(null);
      const allPokemons: ListOfAllPokemons = (await serverData.getAllPokemons(
        'https://pokeapi.co/api/v2/pokemon'
      )) as ListOfAllPokemons;
      setTimeout(() => {
        setPokemons(filterPokemons(allPokemons, props.wordForSearch));
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

  const lastCardInd: number = currentPage * cardsPerPage;
  const firstCardInd: number = lastCardInd - cardsPerPage;
  const currentCards = pokemons ? pokemons.results.slice(firstCardInd, lastCardInd) : [];

  const nextPage = () => {
    if (currentPage < Math.ceil((pokemons?.results.length || 0) / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="cards-wrapper">
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
