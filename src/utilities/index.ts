import { Pokemon } from '../api';

export function trimUrl(path: string, word: string) {
  const arr = path.split('/');
  const index = arr.indexOf(word);
  if (index !== -1) {
    return arr.slice(0, index).join('/') + '/';
  }
  return arr.join('/') + '/';
}

export function downloadSelectedData(cards: Pokemon[], filename: string): void {
  const header = 'Name;ID;Base experience;Height;Weight;Order;URL\n';
  const content = cards
    .map(
      (item) =>
        `${item.name};${item.id};${item.base_experience};${item.height};${item.weight};${item.order};${item.forms && item.forms[0].url}`
    )
    .join('\n');
  const blobObj = new Blob(['\uFEFF' + header + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blobObj);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
