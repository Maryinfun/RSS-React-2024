import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import SearchInput from './index';
import { vi } from 'vitest';

describe('SearchInput', () => {
  it('should update input value and call addSearchWord on button click', () => {
    const addSearchWord = vi.fn();
    render(<SearchInput addSearchWord={addSearchWord} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /show me/i });
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
    fireEvent.click(button);
    expect(addSearchWord).toHaveBeenCalledWith('test');
  });
});
