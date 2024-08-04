// import { combineReducers, configureStore, PayloadAction } from '@reduxjs/toolkit';
// import cardReducer from './reducers/CardSlice';
// import { pokemonsApi } from '../api/index';
// import { HYDRATE, createWrapper } from 'next-redux-wrapper';

// const rootReducer = combineReducers({
//   cardReducer,
//   [pokemonsApi.reducerPath]: pokemonsApi.reducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// const combinedReducer = (state: RootState | undefined, action: PayloadAction): RootState => {
//   if (action.type === HYDRATE) {
//     return {
//       ...state,
//       ...action.payload,
//     };
//   }
//   return rootReducer(state, action);
// };

// const makeStore = () =>
//   configureStore({
//     reducer: combinedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({ serializableCheck: false }).concat(pokemonsApi.middleware),
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppDispatch = AppStore['dispatch'];

// export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
