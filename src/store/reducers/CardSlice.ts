import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ICard {
  id: number;
}
export interface CardState {
  cards: ICard[];
}

export const initialState: CardState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    pushCard(state, action: PayloadAction<number>) {
      state.cards.push({ id: action.payload });
    },
    removeCard(state, action: PayloadAction<number>) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    unselectAllCards(state) {
      state.cards = [];
    },
  },
});
export default cardSlice.reducer;
