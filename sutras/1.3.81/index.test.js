import sutra1381 from './index.js';

describe('Sutra 1.3.81 प्राद्वहः', () => {
  test('pra + vah → Parasmaipada', () => {
    const res = sutra1381('प्रवहति', { root: 'वह्' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  test('no pra prefix → no apply', () => {
    const res = sutra1381('वहति', { root: 'vah' });
    expect(res.applies).toBe(false);
  });
});
