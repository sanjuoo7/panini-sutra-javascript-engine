import { sutra1359 } from './index.js';

describe('Sutra 1.3.59 (pratyāṅbhyām śruvaḥ)', () => {
  test('blocks Ātmanepada for desiderative śru with prati', () => {
    const res = sutra1359('प्रतिश्रुंसति', { root: 'श्रु', prefixes: ['प्रति'], isDesiderative: true });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(false);
  });

  test('blocks Ātmanepada for desiderative śru with āṅ', () => {
    const res = sutra1359('आश्रुंसति', { root: 'śru', prefixes: ['ā'], isDesiderative: true });
    expect(res.applies).toBe(true);
  });

  test('not in scope if not desiderative or different root', () => {
    const res = sutra1359('श्रुति', { root: 'gam', prefixes: ['प्रति'], isDesiderative: true });
    expect(res.applies).toBe(false);
  });
});
