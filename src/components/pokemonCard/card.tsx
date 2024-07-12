import { useEffect, useState } from 'react';
import ServerData, { Pokemon } from '../../api';

const serverData = new ServerData();

type Props = {
  url: string;
};

export default function PokemonCard(props: Props) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getAllPokemonsFromServer = async () => {
    try {
      const pokemon: Pokemon = (await serverData.getAllPokemons(props.url)) as Pokemon;
      setPokemon(pokemon);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    getAllPokemonsFromServer();
  }, [props.url]);

  return (
    <div className="cards-wrapper__card">
      {!pokemon ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2 className="card__pokemon-name">{pokemon.name.toUpperCase()}</h2>
          <p>Base experience - {pokemon.base_experience}</p>
          <p>Height - {pokemon.height}</p>
          <p>Order - {pokemon.order}</p>
          <p>Weight - {pokemon.weight}</p>
        </>
      )}
    </div>
  );
}
