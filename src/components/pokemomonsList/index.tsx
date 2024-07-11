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

  return (
    <div className="cards-wrapper">
      {error ? (
        <h2>Error: {error.message}</h2>
      ) : !pokemons ? (
        <h2>Loading...</h2>
      ) : !searchResult ? (
        <h2>Sorry, not found.</h2>
      ) : (
        pokemons.results.map((pokemon) => <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />)
      )}
    </div>
  );
}
