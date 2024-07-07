import { Component } from 'react';
import ServerData, { Pokemon } from '../../api';

const serverData = new ServerData();

type Props = {
  name: string;
  url: string;
};

type State = {
  pokemon: Pokemon | null;
};

class PokemonCard extends Component<Props, State> {
  public state: Readonly<State> = {
    pokemon: null,
  };

  async getAllPokemonsFromServer() {
    try {
      const pokemon: Pokemon = (await serverData.getAllPokemons(this.props.url)) as Pokemon;
      console.log(pokemon);
      this.setState({ pokemon });
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  componentDidMount(): void {
    this.getAllPokemonsFromServer();
  }

  render() {
    return (
      <div className='cards-wrapper__card'>
        {!this.state.pokemon ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h2 className='card__pokemon-name'>{(this.state.pokemon.name).toUpperCase()}</h2>
            <p>Base experience - {this.state.pokemon.base_experience}</p>
            <p>Height - {this.state.pokemon.height}</p>
            <p>Order - {this.state.pokemon.order}</p>
            <p>Weight - {this.state.pokemon.weight}</p>
            <p>Height - {this.state.pokemon.height}</p>
            {/* <p>Forms - {this.state.pokemon.forms.name}</p> */}
          </>
        )}
      </div>
    );
  }
}
export default PokemonCard;
