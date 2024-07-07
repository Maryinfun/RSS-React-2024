import { Component } from 'react';
type Props = {
    name: string;
    url: string;
}

type State = {
  error: Error | null;
  pokemonData: Pokemon | null;
}

class Card extends Component<Props, State>  {

}
export default Card;
