import { Component } from 'react';

type Props = {
  addSearchWord: (wordForSearch: string) => void;
};

type State = {
    wordForSearch: string;
};

class SearchInput extends Component<Props, State> {
  public state: Readonly<State> = { wordForSearch: '' };
  componentDidMount(): void {
    const defaultSearchWord = localStorage.getItem('searchWord');
    if (defaultSearchWord) {
      this.setState({ wordForSearch: defaultSearchWord });
    }
  }

  render() {
    return (
      <div className="search-wrapper">
        <input
          value={this.state.wordForSearch}
          className="search-wrapper__input"
          onChange={(event) => {
            this.setState({ wordForSearch: event.currentTarget.value });
          }}
        ></input>
        <button
          onClick={() => {
            this.props.addSearchWord(this.state.wordForSearch);
          }}
          className="search-wrapper__button"
        >
          Show me
        </button>
      </div>
    );
  }
}

export default SearchInput;
