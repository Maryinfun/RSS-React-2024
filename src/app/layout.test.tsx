import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Layout from './layout';

test('Layout component renders correctly', () => {
  render(<Layout>Content</Layout>);

  const headerText = screen.getByText('Welcome to Pokemon World!');
  expect(headerText).toBeInTheDocument();

  const themeButton = screen.getByRole('button', { name: 'Change Theme' });
  expect(themeButton).toBeInTheDocument();

  fireEvent.click(themeButton);
});
