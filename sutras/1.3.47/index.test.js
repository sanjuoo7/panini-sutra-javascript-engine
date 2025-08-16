import { sutra1347 } from './index.js';

describe('Sutra 1.3.47 (vadaḥ senses)', () => {
  test('applies for वद् with pacifying sense', () => {
    const res = sutra1347('वदते', { root: 'वद्', meaning: 'to pacify someone by speech' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('applies for vad with flattering sense', () => {
    const res = sutra1347('vadate', { root: 'vad', meaning: 'to flatter the king' });
    expect(res.applies).toBe(true);
  });

  test('does not apply for unrelated sense', () => {
    const res = sutra1347('वदति', { root: 'वद्', meaning: 'to narrate a story plainly' });
    expect(res.applies).toBe(false);
  });
});
