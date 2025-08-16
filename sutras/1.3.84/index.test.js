import sutra1384 from './index.js';

describe('Sutra 1.3.84 उपाच्च', () => {
  test('upa + ram → Parasmaipada', () => {
    const res = sutra1384('उपरमति', { root: 'रम्', prefix: 'उप' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  test('no upa prefix → no apply', () => {
    const res = sutra1384('रमति', { root: 'ram' });
    expect(res.applies).toBe(false);
  });
});
