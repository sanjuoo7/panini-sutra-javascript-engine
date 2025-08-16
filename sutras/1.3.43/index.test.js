import { sutra1343 } from './index.js';

describe('Sutra 1.3.43 (anupasargād vā)', () => {
  test('applies optionally when kram has no prefix', () => {
    const res = sutra1343('क्रमते', { meaning: 'to proceed', prefixes: [] });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
    expect(res.optional).toBe(true);
  });

  test('does not apply when a prefix is present', () => {
    const res = sutra1343('विक्रमते', { prefixes: ['वि'] });
    expect(res.applies).toBe(false);
  });
});
