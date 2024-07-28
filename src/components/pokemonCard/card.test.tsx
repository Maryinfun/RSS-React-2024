import PokemonCard, { Props } from './card';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonsApi } from '../../api';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../api', () => ({
  pokemonsApi: {
    useGetPokemonByIdQuery: vi.fn(),
  },
}));

describe('PokemonCard', () => {
  it('renders with pokemon data', () => {
    const mockNavigate = vi.fn();
    const mockDispatch = vi.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    const mockPokemon = {
      name: 'Malibu',
      id: '1',
      base_experience: 107,
      height: 7,
      order: 1,
      weight: 50,
      sprites: { front_default: 'http://example.com/malibu.png' },
      forms: [{ name: 'Malibu', url: 'http://example.com/malibu-form' }],
    };
    (pokemonsApi.useGetPokemonByIdQuery as unknown as jest.Mock).mockReturnValue({
      data: mockPokemon,
      isFetching: false,
      isError: false,
    });

    (useSelector as unknown as jest.Mock).mockReturnValue([{ id: 1 }]);

    const props: Props = { url: 'http://example.com/pokemon/1' };

    render(<PokemonCard {...props} />);

    expect(screen.getByText('MALIBU')).toBeInTheDocument();
    expect(screen.getByText('Base experience - 107')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders error message when there is an error', () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    (useDispatch as unknown as jest.Mock).mockReturnValue(vi.fn());
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    (pokemonsApi.useGetPokemonByIdQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
    });

    const props: Props = { url: 'http://example.com/pokemon/1' };

    render(<PokemonCard {...props} />);

    expect(screen.getByText('Something is wrong...')).toBeInTheDocument();
  });

  it('renders loading message when data is being fetched', () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    (useDispatch as unknown as jest.Mock).mockReturnValue(vi.fn());
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    (pokemonsApi.useGetPokemonByIdQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
    });

    const props: Props = { url: 'http://example.com/pokemon/1' };

    render(<PokemonCard {...props} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
