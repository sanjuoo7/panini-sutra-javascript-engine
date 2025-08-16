import { sutra1360 } from './index.js';

describe('Sutra 1.3.60 (śadeḥ śitaḥ)', () => {
  test('applies for śad with śit affix', () => {
    const res = sutra1360('शिद्यते', { root: 'शद्', affixIndicators: 'श', isShitAffix: true });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('does not apply without śit', () => {
    const res = sutra1360('śadati', { root: 'śad' });
    expect(res.applies).toBe(false);
  });
});
