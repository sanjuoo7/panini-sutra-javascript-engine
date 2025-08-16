import sutra1383 from './index.js';

describe('Sutra 1.3.83 व्याङ्परिभ्यो रमः', () => {
  test('vi + ram → Parasmaipada', () => {
    const res = sutra1383('विरमति', { root: 'रम्', prefix: 'वि' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  test('āṅ + ram (via context) → Parasmaipada', () => {
    const res = sutra1383('आरमति', { root: 'ram', prefix: 'āṅ' });
    expect(res.applies).toBe(true);
  });
  test('no qualifying prefix → no apply', () => {
    const res = sutra1383('रमते', { root: 'रम्' });
    expect(res.applies).toBe(false);
  });
  test('IAST vi + ram via context → Parasmaipada', () => {
    const res = sutra1383('viramati', { root: 'ram', prefix: 'vi' });
    expect(res.applies).toBe(true);
  });
});
