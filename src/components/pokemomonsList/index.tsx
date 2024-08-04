import { useEffect, useState } from 'react';
import { ListOfAllPokemons } from '../../api';
import PokemonCard from '../pokemonCard/card';
import { downloadSelectedData } from '../../utilities';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { cardSlice } from '../../store/reducers/CardSlice';
import { useRouter } from 'next/router';

export interface Props {
  wordForSearch: string;
  currentPage: number;
  isLoading: boolean;
  fetchedPokemons?: ListOfAllPokemons;
  error?: { message: string };
}

export default function AllPokemons({ wordForSearch, currentPage, isLoading, fetchedPokemons, error }: Props) {
  const router = useRouter();
  const [filteredPokemons, setFilteredPokemons] = useState<ListOfAllPokemons | null>(null);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const [page, setPage] = useState<number>(currentPage);

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
    setFilteredPokemons(filterPokemons(fetchedPokemons, wordForSearch));
  }, [wordForSearch, fetchedPokemons]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const lastCardInd: number = page * cardsPerPage;
  const firstCardInd: number = lastCardInd - cardsPerPage;
  const currentCards = filteredPokemons?.results.length
    ? filteredPokemons.results.slice(firstCardInd, lastCardInd)
    : [];

  const nextPage = () => {
    if (page < Math.ceil((filteredPokemons?.results.length || 0) / cardsPerPage)) {
      router.push(`/page/${page + 1}`);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      router.push(`/page/${page - 1}`);
    }
  };

  const showCheckedState = useSelector((state: RootState) => state.cardReducer.cards);
  const dispatch = useDispatch();
  const { unselectAllCards } = cardSlice.actions;

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;
  if (!filteredPokemons || !filteredPokemons.results.length) return <h2>No pokemons found</h2>;

  return (
    <>
      <div className="wrapper">
        <div className="cards-wrapper">
          {!searchResult && <h2>Sorry, not found.</h2>}
          {currentCards.map((pokemon) => (
            <PokemonCard key={pokemon.name} url={pokemon.url} />
          ))}
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
          <button onClick={prevPage} disabled={page === 1}>
            Previous
          </button>
          <div className="pagination-wrapper__page-number">{page}</div>
          <button
            onClick={nextPage}
            disabled={page === Math.ceil((filteredPokemons?.results.length || 0) / cardsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
