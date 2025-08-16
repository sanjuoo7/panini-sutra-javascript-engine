import { sutra1366 } from './index.js';

describe('Sutra 1.3.66 (bhujonavane)', () => {
  test('applies for bhuj in non-protection sense', () => {
    const res = sutra1366('भुज्यते', { root: 'भुज्', meaning: 'to enjoy, partake' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });
  test('does not apply in protection sense', () => {
    const res = sutra1366('भुज्यते', { root: 'bhuj', meaning: 'to protect/guard' });
    expect(res.applies).toBe(false);
  });
});
