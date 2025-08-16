import { sutra1356 } from './index.js';

describe('Sutra 1.3.56 (upādyamaḥ svakaraṇe)', () => {
  test('applies for upa + yam in espousing sense', () => {
    const res = sutra1356('उपयच्छते', { root: 'यम्', prefixes: ['उप'], meaning: 'to espouse' });
    expect(res.applies).toBe(true);
  });

  test('does not apply without espousing semantics', () => {
    const res = sutra1356('upayacchate', { root: 'yam', prefixes: ['upa'], meaning: 'to control' });
    expect(res.applies).toBe(false);
  });
});
