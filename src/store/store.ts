import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/CardSlice';
import { pokemonsApi } from '../api/index';

const rootReducer = combineReducers({
  cardReducer,
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(pokemonsApi.middleware),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
