import { combineReducers, configureStore, PayloadAction } from '@reduxjs/toolkit';
import cardReducer from './reducers/CardSlice';
import { Pokemon, pokemonsApi } from '../api/index';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  cardReducer,
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

type HydrateAction = {
  type: typeof HYDRATE;
  payload: RootState;
};

type AppPayloadAction = PayloadAction<Pokemon> | HydrateAction;

const combinedReducer = (state: RootState | undefined, action: AppPayloadAction): RootState => {
  if (action.type === HYDRATE) {
    const hydratePayload = action.payload as RootState;
    return {
      ...state,
      ...hydratePayload,
      cardReducer: hydratePayload.cardReducer ?? state?.cardReducer,
      [pokemonsApi.reducerPath]: hydratePayload[pokemonsApi.reducerPath] ?? state?.[pokemonsApi.reducerPath],
    };
  }

  return rootReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(pokemonsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
