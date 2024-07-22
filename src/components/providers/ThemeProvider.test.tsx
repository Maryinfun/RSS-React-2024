import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';

import { ThemeProvider } from './index';

describe('ThemeProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>ThemeProvider</div>
      </ThemeProvider>
    );
    expect(getByText('ThemeProvider')).toBeInTheDocument();
  });
});
