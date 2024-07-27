import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type ListOfAllPokemons = {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
};
export type Sprites = {
  front_default: string;
};
export type Form = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  sprites: Sprites;
  forms?: Array<Form>;
  base_experience?: number;
  height?: number;
  order?: number;
  weight?: number;
};

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPokemonById: builder.query<Pokemon, number>({
      query: (id: number) => ({
        url: `/pokemon/${id}`,
      }),
    }),
    getAllPokemons: builder.query<ListOfAllPokemons, number>({
      query: (limit: number = 100) => ({
        url: `/pokemon?limit=100`,
        params: {
          limit: limit,
        },
      }),
    }),
  }),
});
