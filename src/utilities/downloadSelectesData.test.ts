import { describe, it, expect, vi } from 'vitest';
import { downloadSelectedData } from './index';
import { Pokemon } from '../api/index';

const mockPokemon: Pokemon[] = [
  {
    name: 'Malibu',
    id: '1',
    base_experience: 107,
    height: 7,
    weight: 50,
    order: 1,
    sprites: {
      front_default: '',
    },
    forms: [{ name: 'Malibu', url: 'http://example.com/malibu' }],
  },
];

describe('downloadSelectedData', () => {
  it('should create CSV file and start download', () => {
    const createObjectURLMock = vi.fn().mockReturnValue('blob:http://example.com/blob');
    global.URL.createObjectURL = createObjectURLMock;
    const revokeObjectURLMock = vi.fn();
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const mockAnchor = {
      href: '',
      download: '',
      click: vi.fn(),
    };

    vi.spyOn(document, 'createElement').mockImplementation(() => mockAnchor as unknown as HTMLAnchorElement);

    downloadSelectedData(mockPokemon, 'test.csv');

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(mockAnchor.click).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledTimes(1);
    expect(mockAnchor.href).toBe('blob:http://example.com/blob');
    expect(mockAnchor.download).toBe('test.csv');
  });
});
