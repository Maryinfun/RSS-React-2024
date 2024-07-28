import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cardSlice } from '../../store/reducers/CardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { pokemonsApi } from '../../api/index';

export type Props = {
  url: string;
};

export default function PokemonCard(props: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pushCard, removeCard } = cardSlice.actions;
  const showCheckedState = useSelector((state: RootState) => state.cardReducer.cards);
  const getPokemonId = () =>
    props.url
      .split('/')
      .filter((str) => str)
      .slice(-1)
      .toString();

  const { data: pokemon, isFetching, isError } = pokemonsApi.useGetPokemonByIdQuery(+`${getPokemonId()}`);

  return (
    <div
      className="cards-wrapper__card"
      onClick={(event) => {
        event.stopPropagation();
        navigate(`specification/${getPokemonId()}`);
      }}
    >
      {isError && <h2>Something is wrong...</h2>}
      {isFetching && <h2>Loading...</h2>}
      {pokemon && (
        <>
          <h2 className="card__pokemon-name" onClick={() => console.log(showCheckedState)}>
            {pokemon.name.toUpperCase()}
          </h2>
          <div className="card__image" style={{ backgroundImage: `url(${pokemon?.sprites.front_default})` }}></div>
          <p className="card__base-experience">Base experience - {pokemon?.base_experience}</p>
          <input
            className="card__checkbox"
            checked={showCheckedState.some((card) => +card.id === +getPokemonId())}
            type="checkbox"
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => {
              const checkCell: HTMLInputElement = event.target as HTMLInputElement;
              if (checkCell.checked) {
                dispatch(pushCard(pokemon));
              } else {
                dispatch(removeCard(pokemon));
              }
            }}
          ></input>
        </>
      )}
    </div>
  );
}
