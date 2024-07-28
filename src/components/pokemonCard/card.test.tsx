import { render, screen } from '@testing-library/react';
import PokemonCard from './card';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

test('PokemonCard component renders correctly', () => {
  const store = setupStore();

  render(
    <Provider store={store}>
      <Router>
        <PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />
      </Router>
    </Provider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
