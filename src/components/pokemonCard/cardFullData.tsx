import { useNavigate, useParams } from 'react-router-dom';
import { trimUrl } from '../../utilities';
import { pokemonsApi } from '../../api/index';

export default function CardFullData() {
  const navigate = useNavigate();
  const { specification } = useParams();

  const { data: pokemon, isError } = pokemonsApi.useGetPokemonByIdQuery(+`${specification}`);

  return (
    <div className="card__specification">
      {isError && <h2>Something is wrong...</h2>}
      {pokemon && (
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
      )}
    </div>
  );
}
