import { useState } from 'react';

type Props = {
  addSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchInput(props: Props) {
  const [wordForSearch, setWordForSearch] = useState('');

  return (
    <div className="search-wrapper">
      <input
        value={wordForSearch}
        className="search-wrapper__input"
        onChange={(event) => {
          setWordForSearch(event.currentTarget.value);
        }}
      ></input>
      <button
        onClick={() => {
          props.addSearchWord(wordForSearch);
        }}
        className="search-wrapper__button"
      >
        Show me
      </button>
    </div>
  );
}
// class SearchInput extends Component<Props, State> {
//   public state: Readonly<State> = { wordForSearch: '' };
//   componentDidMount(): void {
//     const defaultSearchWord = localStorage.getItem('searchWord');
//     if (defaultSearchWord) {
//       this.setState({ wordForSearch: defaultSearchWord });
//     }
//   }

//   render() {
//     return (
//       <div className="search-wrapper">
//         <input
//           value={this.state.wordForSearch}
//           className="search-wrapper__input"
//           onChange={(event) => {
//             this.setState({ wordForSearch: event.currentTarget.value });
//           }}
//         ></input>
//         <button
//           onClick={() => {
//             this.props.addSearchWord(this.state.wordForSearch);
//           }}
//           className="search-wrapper__button"
//         >
//           Show me
//         </button>
//       </div>
//     );
//   }
// }

// export default SearchInput;
