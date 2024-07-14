import React, { useState } from 'react';

type Props = {
  addSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchInput(props: Props) {
  const [wordForSearch, setWordForSearch] = useState(localStorage.getItem('searchWord') || '');

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
