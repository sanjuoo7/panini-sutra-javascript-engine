import { sutra1365 } from './index.js';

describe('Sutra 1.3.65 (samah kṣṇuvaḥ)', () => {
  test('applies for sam + kṣṇu', () => {
    const res = sutra1365('संक्ष्णुते', { root: 'kṣṇu', prefixes: ['sam'] });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });
  test('does not apply without sam', () => {
    const res = sutra1365('क्ष्णुते', { root: 'kṣṇu' });
    expect(res.applies).toBe(false);
  });
});
