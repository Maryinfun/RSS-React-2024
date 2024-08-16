import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  controlledFormData: null,
  uncontrolledFormData: null,
  countries: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setControlledFormData: (state, action) => {
      state.controlledFormData = action.payload;
    },
    setUncontrolledFormData: (state, action) => {
      state.uncontrolledFormData = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { setControlledFormData, setUncontrolledFormData, setCountries } = formSlice.actions;
export default formSlice.reducer;