import React, { useState, useEffect } from 'react';

type Props = {
  addSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchInput(props: Props) {
  // Состояние для хранения значения из localStorage
  const [wordForSearch, setWordForSearch] = useState<string>('');

  // Используем useEffect для доступа к localStorage только на клиентской стороне
  useEffect(() => {
    const storedSearchWord = localStorage.getItem('searchWord');
    if (storedSearchWord) {
      setWordForSearch(storedSearchWord);
    }
  }, []);

  // Функция для обработки изменения текста в поле ввода
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWordForSearch(event.currentTarget.value);
  };

  // Функция для обработки клика по кнопке
  const handleClick = () => {
    props.addSearchWord(wordForSearch);
    localStorage.setItem('searchWord', wordForSearch); // Обновляем localStorage при клике
  };

  return (
    <div className="search-wrapper">
      <input
        value={wordForSearch}
        className="search-wrapper__input"
        onChange={handleChange}
        placeholder="Enter search term"
      />
      <button onClick={handleClick} className="search-wrapper__button">
        Show me
      </button>
    </div>
  );
}
