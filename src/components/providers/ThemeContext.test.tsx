import { describe, it, expect } from 'vitest';
import { ThemeContext } from './index';
import { useContext } from 'react';
import { act, renderHook } from '@testing-library/react';

describe('ThemeContext', () => {
  it('should provide the initial theme and setTheme function', () => {
    const { result } = renderHook(() => useContext(ThemeContext));

    expect(result.current.theme).toBeNull();
    expect(typeof result.current.setTheme).toBe('function');
  });

  it('should update the theme when setTheme is called', () => {
    const { result } = renderHook(() => useContext(ThemeContext));

    act(() => {
      result.current.setTheme(null);
    });

    expect(result.current.theme).toBe(null);
  });
});
