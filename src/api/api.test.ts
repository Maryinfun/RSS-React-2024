import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import ServerData from './index';

describe('ServerData', () => {
  describe('getAllPokemons', () => {
    it('should return all pokemons', async () => {
      const mockData = { results: [{ name: 'Bulbasaur' }, { name: 'Charmander' }] };
      vi.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
      const serverData = new ServerData();

      const result = await serverData.getAllPokemons('https://pokeapi.co/api/v2/pokemon');

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon', { params: { limit: 100 } });
    });

    it('should return a pokemon', async () => {
      const mockData = { name: 'Bulbasaur' };
      vi.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
      const serverData = new ServerData();

      const result = await serverData.getAllPokemons('https://pokeapi.co/api/v2/pokemon/1');

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1', { params: { limit: 100 } });
    });
  });
});
