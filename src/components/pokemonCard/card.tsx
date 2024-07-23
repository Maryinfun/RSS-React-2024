import { useEffect, useState } from 'react';
import ServerData, { Pokemon } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cardSlice } from '../../store/reducers/CardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const serverData = new ServerData();

export type Props = {
  url: string;
};

export default function PokemonCard(props: Props) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pushCard, removeCard } = cardSlice.actions;
  const showCheckedState = useSelector((state: RootState) => state.cardReducer.cards);

  const getAllPokemonsFromServer = async () => {
    try {
      const pokemon: Pokemon = (await serverData.getAllPokemons(props.url)) as Pokemon;
      setPokemon(pokemon);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const getPokemonId = () =>
    props.url
      .split('/')
      .filter((str) => str)
      .slice(-1)
      .toString();

  useEffect(() => {
    getAllPokemonsFromServer();
  }, [props.url]);

  return (
    <div
      className="cards-wrapper__card"
      onClick={(event) => {
        event.stopPropagation();
        navigate(`specification/${getPokemonId()}`);
      }}
    >
      {!pokemon ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2 className="card__pokemon-name" onClick={() => console.log(showCheckedState)}>
            {pokemon.name.toUpperCase()}
          </h2>
          <div className="card__image" style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}></div>
          <p className="card__base-experience">Base experience - {pokemon.base_experience}</p>
          <input
            className="card__checkbox"
            checked={showCheckedState.some((card) => card.id === +getPokemonId())}
            type="checkbox"
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => {
              const checkCell: HTMLInputElement = event.target as HTMLInputElement;
              if (checkCell.checked) {
                console.log(getPokemonId());
                dispatch(pushCard(+getPokemonId()));
              } else {
                dispatch(removeCard(+getPokemonId()));
              }
            }}
          ></input>
        </>
      )}
    </div>
  );
}
