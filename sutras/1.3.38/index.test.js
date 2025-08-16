import { sutra1338 } from './index.js';

describe('Sutra 1.3.38 (vṛttisargatāyaneṣu kramaḥ)', () => {
  test('applies for kram in continuity sense', () => {
    const res = sutra1338('क्रमते', { semanticContext: 'continuity' });
    expect(res.applies).toBe(true);
  });

  test('applies for sarga (energy/production)', () => {
    const res = sutra1338('vikramate', { semanticContext: 'sarga energy' });
    expect(res.isAtmanepada).toBe(true);
  });

  test('does not apply for unrelated sense', () => {
    const res = sutra1338('क्रमते', { semanticContext: 'attack' });
    expect(res.applies).toBe(false);
  });
});
