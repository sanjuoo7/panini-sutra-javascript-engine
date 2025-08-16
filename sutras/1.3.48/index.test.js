import { sutra1348 } from './index.js';

describe('Sutra 1.3.48 (vyaktavācāṃ samuccāraṇe)', () => {
  test('applies for articulate/unison speaking', () => {
    const res = sutra1348('वदते', { root: 'वद्', meaning: 'to pronounce clearly in unison' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('does not apply for generic speaking', () => {
    const res = sutra1348('vadati', { root: 'vad', meaning: 'to speak casually' });
    expect(res.applies).toBe(false);
  });
});
