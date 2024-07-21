import { cardSlice } from './CardSlice';

describe('cardSlice reducer', () => {
  const initialState = {
    cards: [],
  };

  const { pushCard, removeCard, unselectAllCards } = cardSlice.actions;
  let state = cardSlice.reducer(initialState, {
    type: '',
  });

  it('should push a new card', () => {
    state = cardSlice.reducer(state, pushCard(1));
    expect(state.cards.length).toBe(1);
  });

  it('should remove a card', () => {
    state = cardSlice.reducer(state, pushCard(2));
    state = cardSlice.reducer(state, removeCard(1));
    expect(state.cards.length).toBe(1);
  });

  it('should unselect all cards', () => {
    state = cardSlice.reducer(state, unselectAllCards());
    expect(state.cards.length).toBe(0);
  });
});
