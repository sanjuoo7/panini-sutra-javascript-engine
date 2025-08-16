import { sutra1368 } from './index.js';

describe('Sutra 1.3.68 (bhīsmayor hetubhaye)', () => {
  test('applies for causative of bhi with direct-cause fear', () => {
    const res = sutra1368('भययते', { root: 'भी', isCausative: true, directCauseFear: true });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });
  test('does not apply when not causative', () => {
    const res = sutra1368('smiati', { root: 'smi', directCauseFear: true });
    expect(res.applies).toBe(false);
  });
});
