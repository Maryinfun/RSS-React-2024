import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './index';
import '@testing-library/jest-dom/vitest';

const localStorageMock = {
  getItem: vi.fn().mockReturnValue(''),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

globalThis.localStorage = localStorageMock as unknown as Storage;

describe('Main Component', () => {
  it('should render Main component correctly', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /Show me/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make ERROR/i })).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Change Theme/i })).toBeInTheDocument();
  });
});
