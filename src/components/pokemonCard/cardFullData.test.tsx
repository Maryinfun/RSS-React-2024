import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import { pokemonsApi } from '../../api';
import CardFullData from './cardFullData';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../api', () => ({
  pokemonsApi: {
    useGetPokemonByIdQuery: vi.fn(),
  },
}));

describe('CardFullData', () => {
  it('renders with pokemon data', () => {
    const navigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useParams as jest.Mock).mockReturnValue({ specification: '1' });

    const mockPokemon = {
      name: 'Malibu',
      sprites: { front_default: 'http://example.com/malibu.png' },
      base_experience: 107,
      height: 7,
      order: 1,
      weight: 50,
      forms: [{ url: 'http://example.com/malibu-form' }],
    };
    (pokemonsApi.useGetPokemonByIdQuery as jest.Mock).mockReturnValue({ data: mockPokemon, isError: false });

    render(<CardFullData />);

    expect(screen.getByText('MALIBU')).toBeInTheDocument();
    expect(screen.getByText('Base experience 107')).toBeInTheDocument();
    expect(screen.getByText('Height 7')).toBeInTheDocument();
    expect(screen.getByText('Order 1')).toBeInTheDocument();
    expect(screen.getByText('Weight 50')).toBeInTheDocument();
    expect(screen.getByText('To read more: http://example.com/malibu-form')).toBeInTheDocument();

    fireEvent.click(screen.getByText('x'));
    expect(navigate).toHaveBeenCalled();
  });

  it('renders error message when there is an error', () => {
    (useNavigate as jest.Mock).mockReturnValue(vi.fn());
    (useParams as jest.Mock).mockReturnValue({ specification: '1' });
    (pokemonsApi.useGetPokemonByIdQuery as jest.Mock).mockReturnValue({ data: null, isError: true });

    render(<CardFullData />);

    expect(screen.getByText('Something is wrong...')).toBeInTheDocument();
  });
});
