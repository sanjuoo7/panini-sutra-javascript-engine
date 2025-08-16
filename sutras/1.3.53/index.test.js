import { sutra1353 } from './index.js';

describe('Sutra 1.3.53 (udaś caraḥ akarmakāt)', () => {
  test('applies for ud + car, intransitive', () => {
    const res = sutra1353('उदचरते', { root: 'चर्', prefixes: ['उद्'], transitivity: 'intransitive' });
    expect(res.applies).toBe(true);
  });

  test('does not apply if transitive', () => {
    const res = sutra1353('udcarati', { root: 'car', prefixes: ['ud'], isTransitive: true });
    expect(res.applies).toBe(false);
  });
});
