import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { ClientOnly } from './client';

vi.mock('../../main/index', () => ({
  __esModule: true,
  default: () => <div>Mocked Component</div>,
}));

describe('ClientOnly', () => {
  it('renders the dynamic component', async () => {
    render(<ClientOnly />);
    const textElement = await screen.findByText('Mocked Component');
    expect(textElement).toBeInTheDocument();
  });
});
