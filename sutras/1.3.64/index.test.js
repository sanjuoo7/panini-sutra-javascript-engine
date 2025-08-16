import { sutra1364 } from './index.js';

describe('Sutra 1.3.64 (pra/upā + yuj; exclude yajña-pātra)', () => {
  test('applies for yuj with pra', () => {
    const res = sutra1364('प्रयुङ्क्ते', { root: 'युज्', prefixes: ['प्र'] });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });
  test('applies for yuj with upa', () => {
    const res = sutra1364('उपयुङ्क्ते', { root: 'yuj', prefixes: ['upa'] });
    expect(res.applies).toBe(true);
  });
  test('excluded in sacrificial vessel context', () => {
    const res = sutra1364('प्रयुङ्क्ते', { root: 'yuj', prefixes: ['pra'], isSacrificialVesselContext: true });
    expect(res.applies).toBe(false);
  });
});
