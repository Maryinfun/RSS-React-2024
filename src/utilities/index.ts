export function trimUrl(path: string, word: string) {
  const arr = path.split('/');
  const index = arr.indexOf(word);
  if (index !== -1) {
    return arr.slice(0, index).join('/') + '/';
  }
  return arr.join('/') + '/';
}
