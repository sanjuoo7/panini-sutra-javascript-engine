import { sutra1354 } from './index.js';

describe('Sutra 1.3.54 (samastṛtīyāyuktāt)', () => {
  test('applies for sam + car with instrumental linkage', () => {
    const res = sutra1354('समचरते', { root: 'चर्', prefixes: ['सम्'], cases: [{ case: 'instrumental' }] });
    expect(res.applies).toBe(true);
  });

  test('does not apply without instrumental', () => {
    const res = sutra1354('samcarate', { root: 'car', prefixes: ['sam'] });
    expect(res.applies).toBe(false);
  });
});
