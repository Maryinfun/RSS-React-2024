import { describe, it, expect } from 'vitest';
import { cardSlice, initialState } from './CardSlice';
import { Pokemon } from '../../api';

const { actions } = cardSlice;

describe('cardSlice', () => {
  it('should handle pushCard', () => {
    const newPokemon: Pokemon = {
      name: 'Pikachu',
      sprites: {
        front_default: '',
      },
      id: '1',
    };
    const state = cardSlice.reducer(initialState, actions.pushCard(newPokemon));
    expect(state.cards).toContainEqual(newPokemon);
  });
});
