import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BadPath from './404';

test('BadPath component renders correctly', () => {
  render(<BadPath />);

  const titleText = screen.getByText('PAGE 404');
  expect(titleText).toBeInTheDocument();
});
