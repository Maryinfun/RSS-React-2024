import axios from 'axios';

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
class ServerData {
  async getAllPokemons(api: string, limit: number = 100): Promise<ListOfAllPokemons | Pokemon> {
    const result = (
      await axios.get(api, {
        params: { limit },
      })
    ).data;
    return result;
  }
}

export default ServerData;
