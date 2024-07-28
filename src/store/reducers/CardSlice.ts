import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '../../api';

export interface ICard {
  id: number;
}
export interface CardState {
  cards: Pokemon[];
}

export const initialState: CardState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    pushCard(state, action: PayloadAction<Pokemon>) {
      state.cards.push(action.payload);
    },
    removeCard(state, action: PayloadAction<Pokemon>) {
      state.cards = state.cards.filter((card) => card.name !== action.payload.name);
    },
    unselectAllCards(state) {
      state.cards = [];
    },
  },
});
export default cardSlice.reducer;
