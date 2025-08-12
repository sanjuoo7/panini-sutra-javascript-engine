import { applySutra1_2_54 } from './index.js';

describe('Sutra 1.2.54', () => {
  test('adds lup noncurrency reason', () => {
    const r = applySutra1_2_54({});
    expect(r.reasons.some(x=>x.includes('lup-elision'))).toBe(true);
  });
});
