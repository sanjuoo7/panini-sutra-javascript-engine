import { sutra1351 } from './index.js';

describe('Sutra 1.3.51 (avādgraḥ)', () => {
  test('applies for ava + gṝ (to swallow)', () => {
    const res = sutra1351('अवगृते', { root: 'गॄ', prefixes: ['अव'] });
    expect(res.applies).toBe(true);
  });

  test('does not apply without ava prefix', () => {
    const res = sutra1351('gṛṇāti', { root: 'gṝ' });
    expect(res.applies).toBe(false);
  });
});
