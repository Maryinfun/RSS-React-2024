import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Page from '../[[...slug]]/page';
import '@testing-library/jest-dom/vitest';

vi.mock('./client', () => ({
  ClientOnly: () => <div>Mocked ClientOnly Component</div>,
}));

describe('Page component', () => {
  it('renders the ClientOnly component', () => {
    render(<Page />);

    const clientOnlyElement = screen.getByText(/Mocked ClientOnly Component/i);

    expect(clientOnlyElement).toBeInTheDocument();
  });
});
