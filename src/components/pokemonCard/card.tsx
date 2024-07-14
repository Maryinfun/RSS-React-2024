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
      console.log(pokemon);
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
          <div className="card__image" style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}></div>
          {/* <p>{pokemon.forms ? pokemon.forms[0].url : null}</p> */}

          <p className="card__base-experience">Base experience - {pokemon.base_experience}</p>
          {/* <p>Height - {pokemon.height}</p>
          <p>Order - {pokemon.order}</p>
          <p>Weight - {pokemon.weight}</p> */}
        </>
      )}
    </div>
  );
}
