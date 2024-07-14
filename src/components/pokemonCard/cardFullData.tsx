import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ServerData, { Pokemon } from '../../api';
import { trimUrl } from '../../utilities';

const serverData = new ServerData();

export default function CardFullData() {
  const navigate = useNavigate();
  const { specification } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getAllPokemonsFromServer = async () => {
    try {
      setPokemon(null);
      const pokemon: Pokemon = (await serverData.getAllPokemons(
        `https://pokeapi.co/api/v2/pokemon/${specification}`
      )) as Pokemon;
      setPokemon(pokemon);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    if (!specification) {
      return;
    }
    getAllPokemonsFromServer();
  }, [specification]);

  return (
    <div className="card__specification">
      {pokemon ? (
        <>
          <div className="specification__close" onClick={() => navigate(trimUrl(location.pathname, 'specification'))}>
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
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
