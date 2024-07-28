import { useEffect, useState } from 'react';
import { ListOfAllPokemons } from '../../api';
import PokemonCard from '../pokemonCard/card';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { downloadSelectedData, trimUrl } from '../../utilities';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { cardSlice } from '../../store/reducers/CardSlice';
import { pokemonsApi } from '../../api/index';

export interface Props {
  wordForSearch: string;
}

export default function AllPokemons(props: Props) {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const [filteredPokemons, setFilteredPokemons] = useState<ListOfAllPokemons | null>(null);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || '1', 10));
  const { data: fetchedPokemons, isFetching, isError } = pokemonsApi.useGetAllPokemonsQuery(100);

  const cardsPerPage = 6;

  const filterPokemons = (pokemons: ListOfAllPokemons, wordForSearch: string): ListOfAllPokemons => {
    const results = pokemons.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(wordForSearch.toLowerCase().trimStart())
    );
    const filteredPokemons: ListOfAllPokemons = { ...pokemons, results };

    results.length ? setSearchResult(true) : setSearchResult(false);
    return filteredPokemons;
  };

  useEffect(() => {
    if (!fetchedPokemons) return;
    setFilteredPokemons(filterPokemons(fetchedPokemons, props.wordForSearch));
  }, [props.wordForSearch, fetchedPokemons]);

  useEffect(() => {
    setCurrentPage(parseInt(page || '1', 10));
  }, [page]);

  const lastCardInd: number = currentPage * cardsPerPage;
  const firstCardInd: number = lastCardInd - cardsPerPage;
  const currentCards = filteredPokemons?.results.length
    ? filteredPokemons.results.slice(firstCardInd, lastCardInd)
    : [];
  const nextPage = () => {
    if (currentPage < Math.ceil((filteredPokemons?.results.length || 0) / cardsPerPage)) {
      navigate(`/page/${currentPage + 1}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      navigate(`/page/${currentPage - 1}`);
    }
  };
  const showCheckedState = useSelector((state: RootState) => state.cardReducer.cards);
  const dispatch = useDispatch();
  const { unselectAllCards } = cardSlice.actions;
  return (
    <>
      <div className="wrapper">
        <div className="cards-wrapper" onClick={() => navigate(trimUrl(location.pathname, 'specification'))}>
          {isError && <h2>Something is wrong...</h2>}
          {!searchResult && <h2>Sorry, not found.</h2>}
          {isFetching && <h2>Loading...</h2>}
          {currentCards.map((pokemon) => (
            <PokemonCard key={pokemon.name} url={pokemon.url} />
          ))}
        </div>
        <Outlet />
      </div>
      {showCheckedState.length > 0 && (
        <div className="checked-result">
          <div className="checked-result__score">
            <div className="checked-result__score">{showCheckedState.length}</div>
          </div>
          <div className="checked-result__manage">
            <button
              className="button button__clear-checked-score"
              onClick={() => {
                dispatch(unselectAllCards());
              }}
            >
              Unselect all
            </button>
            <button
              className="button button__download-checked-data"
              onClick={() => downloadSelectedData(showCheckedState, `${showCheckedState.length}_pokemons`)}
            >
              Download
            </button>
          </div>
        </div>
      )}
      <div className="pagination-wrapper">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <div className="pagination-wrapper__page-number">{currentPage}</div>

        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil((fetchedPokemons?.results.length || 0) / cardsPerPage)}
        >
          Next
        </button>
      </div>
    </>
  );
}
