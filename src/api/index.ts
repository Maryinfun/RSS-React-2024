import axios from 'axios';

export type ListOfAllPokemons = {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
};
export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
};

class ServerData {
  async getAllPokemons(api: string): Promise<ListOfAllPokemons | Pokemon> {
    const result = (
      await axios.get(api, {
        params: {},
      })
    ).data;
    return result;
  }
}

export default ServerData;
