import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '../app/layout';

describe('RootLayout', () => {
  it('renders the children inside the root div', () => {
    document.documentElement.setAttribute('lang', 'en');

    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    const htmlElement = document.documentElement;
    expect(htmlElement.getAttribute('lang')).toBe('en');

    expect(document.title).toBe('React');

    expect(document.getElementById('root')).toHaveTextContent('Test Child');
  });
});
