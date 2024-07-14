import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ErrorBoundary from './index';

describe('ErrorBoundary', () => {
  it('rendering children with no errors', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('catching errors, displaying error message', () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error: Test Error')).toBeInTheDocument();
  });

  it('logging error and errorInfo', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith('Handle error:', expect.any(Error), expect.any(Object));
  });
});
