import { sutra1344 } from './index.js';

describe('Sutra 1.3.44 (apahanave jñaḥ)', () => {
  test('applies for jñā in denying sense', () => {
    const res = sutra1344('जानाते', { meaning: 'to deny knowledge' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('does not apply when not denying', () => {
    const res = sutra1344('जानाति', { meaning: 'to know affirmatively' });
    expect(res.applies).toBe(false);
  });
});
