import { test } from 'vitest';
import { trimUrl } from './index';

test('trimUrl - url found in path', () => {
  const url = 'some/url/to/trim';
  const word = 'to';
  const result = trimUrl(url, word);
  return result === 'some/url/' ? true : `Expected: some/url/; Received: ${result}`;
});

test('trimUrl - url not found in path', () => {
  const url = 'some/url/to/trim';
  const word = 'rainbow';
  const result = trimUrl(url, word);
  return result === 'some/url/to/trim' ? true : `Expected: some/url/to/trim; Received: ${result}`;
});
