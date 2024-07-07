import { Component } from 'react';



class SearchInput extends Component {
  
    render() {
      return (
        <div className="search-wrapper">
          <input
            value=''
            className="search-wrapper__input"
          ></input>
          <button
          onClick = {() => console.log('Hello')}
            className="search-wrapper__button"
          >
            Show me
          </button>
        </div>
      );
    }
  }
  
  export default SearchInput;