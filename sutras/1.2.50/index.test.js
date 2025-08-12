import { applySutra1_2_50 } from './index.js';

describe('Sutra 1.2.50', () => {
  test('shortens final ī with luk', () => {
    const r = applySutra1_2_50('देवी', { taddhitaElisionType: 'luk', script: 'Devanagari' }, { transform: false });
    expect(r.applies).toBe(true);
  });
  test('no apply without elision', () => {
    const r = applySutra1_2_50('देवी', {});
    expect(r.applies).toBe(false);
  });
  test('no apply if not ī final', () => {
    const r = applySutra1_2_50('देव', { taddhitaElisionType: 'luk' });
    expect(r.applies).toBe(false);
  });
});
