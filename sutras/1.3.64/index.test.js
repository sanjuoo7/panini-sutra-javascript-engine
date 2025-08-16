import { sutra1364 } from './index.js';

describe('Sutra 1.3.64 (pra/upā + yuj; exclude yajña-pātra)', () => {
  test('applies for yuj with pra', () => {
    const res = sutra1364('प्रयुङ्क्ते', { root: 'युज्', prefixes: ['प्र'] });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
    expect(res.confidence).toBeGreaterThan(0.7);
  });

  test('applies for yuj with upa', () => {
    const res = sutra1364('उपयुङ्क्ते', { root: 'yuj', prefixes: ['upa'] });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('excluded in sacrificial vessel context', () => {
    const res = sutra1364('प्रयुङ्क्ते', { root: 'yuj', prefixes: ['pra'], isSacrificialVesselContext: true });
    expect(res.applies).toBe(false);
    expect(res.reason).toContain('sacrificial vessel');
  });

  test('does not apply without required prefix', () => {
    const res = sutra1364('युनक्ति', { root: 'युज्' });
    expect(res.applies).toBe(false);
    expect(res.reason).toContain('प्र/उप prefix');
  });

  test('does not apply with wrong root', () => {
    const res = sutra1364('प्रगच्छति', { root: 'गम्', prefixes: ['प्र'] });
    expect(res.applies).toBe(false);
    expect(res.reason).toContain('युज्');
  });

  test('handles IAST input with surface detection', () => {
    const res = sutra1364('prayukte', { root: 'yuj' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('excludes via domain context pattern', () => {
    const res = sutra1364('प्रयुक्ते', { root: 'yuj', prefixes: ['pra'], domain: 'yajña-pātra ritual' });
    expect(res.applies).toBe(false);
  });
});
