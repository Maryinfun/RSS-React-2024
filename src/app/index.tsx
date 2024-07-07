import { Component, ReactNode } from 'react';
import SearchInput from '../components/searchInput';
import ForceError from '../components/forceErrorButton';
import ErrorBoundary from '../components/errorBoundary';
import AllPokemons from '../components/pokemomonsList';

type State = {
  wordForSearch: string;
};

class App extends Component {
  public state: Readonly<State> = { wordForSearch: localStorage.getItem('searchWord') || '' };

  render(): ReactNode {
    return (
      <>
        <header></header>
        <main className="main">
          <h1>Welcome to Pokemon World!</h1>
          <ErrorBoundary>
            <SearchInput
              addSearchWord={(searchWord) => {
                this.setState({ wordForSearch: searchWord });
                localStorage.setItem('searchWord', searchWord);
              }}
            />
            <AllPokemons wordForSearch={this.state.wordForSearch} />
            <ForceError />
          </ErrorBoundary>
        </main>
        <footer></footer>
      </>
    );
  }
}

export default App;
