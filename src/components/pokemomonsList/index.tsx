import { Component } from 'react';
// import PokeCard from '../PokeCard';
// import data from '../../data';
import ServerData, { ListOfAllPokemons } from '../../api';
import PokemonCard from '../pokemonCard/card';

const serverData = new ServerData();
interface Props {
  wordForSearch: string;
}

interface State {
  pokemons: ListOfAllPokemons | null;
  error: Error | '';
  searchResult: boolean;
}

class AllPokemons extends Component<Props, State> {
  public state: Readonly<State> = {
    pokemons: null,
    error: '',
    searchResult: true,
  };

  filterPokemons(pokemons: ListOfAllPokemons, wordForSearch: string): ListOfAllPokemons {
    const filteredPokemons: ListOfAllPokemons = Object.create(pokemons);
    const results = pokemons.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(wordForSearch.toLowerCase().trimStart())
    );
    filteredPokemons.results = results;
    results.length ? this.setState({ searchResult: true }) : this.setState({ searchResult: false });
    return filteredPokemons;
  }

  async getAllPokemonsFromServer() {
    try {
      this.setState({ pokemons: null });
      const allPokemons: ListOfAllPokemons = (await serverData.getAllPokemons(
        'https://pokeapi.co/api/v2/pokemon'
      )) as ListOfAllPokemons;
      setTimeout(() => {
        this.setState({ pokemons: this.filterPokemons(allPokemons, this.props.wordForSearch) });
      }, 300);
    } catch (error) {
      this.setState({ error: error as Error });
    }
  }

  componentDidMount(): void {
    this.getAllPokemonsFromServer();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (prevProps.wordForSearch === this.props.wordForSearch || !prevState.pokemons) {
      return;
    }
    this.getAllPokemonsFromServer();
  }

  render() {
    return (
      <div className="cards-wrapper">
        {this.state.error ? (
          <h2>Error: {this.state.error.message}</h2>
        ) : !this.state.pokemons ? (
          <h2>Loading...</h2>
        ) : !this.state.searchResult ? (
          <h2>Sorry, not found.</h2>
        ) : (
          this.state.pokemons.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))
        )}
      </div>
    );
  }
}

export default AllPokemons;
