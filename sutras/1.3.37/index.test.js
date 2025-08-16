import { sutra1337 } from './index.js';

describe('Sutra 1.3.37 (kartṛsthe cāśarīre karmaṇi)', () => {
  test('applies for nī with incorporeal object located in agent', () => {
    const res = sutra1337('नयते', { objectType: 'aśarīra', kartrstha: true });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('does not apply when object is corporeal', () => {
    const res = sutra1337('नयति', { objectType: 'body', kartrstha: true });
    expect(res.applies).toBe(false);
  });

  test('does not apply when not kartrstha', () => {
    const res = sutra1337('नयते', { objectType: 'incorporeal', kartrstha: false });
    expect(res.applies).toBe(false);
  });

  test('IAST input supported', () => {
    const res = sutra1337('nayate', { objectType: 'incorporeal', kartrstha: true });
    expect(res.isAtmanepada).toBe(true);
  });
});
