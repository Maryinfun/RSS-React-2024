import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ForceError from './index';
import '@testing-library/jest-dom';

describe('ForceError', () => {
  it('should render the button', () => {
    const { getByText } = render(<ForceError />);
    const button = getByText('Make ERROR');
    expect(button).toBeInTheDocument();
  });

  it('should throw an error when the button is clicked', () => {
    const { getByText } = render(<ForceError />);
    const button = getByText('Make ERROR');
    expect(() => {
      fireEvent.click(button);
    }).toThrow("It's just a prank. Don't worry! Everything is fine!");
  });
});
