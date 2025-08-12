import { applySutra1_2_47 } from './index.js';

describe('Sutra 1.2.47', () => {
  test('shortens final ā in neuter (preview transform false)', () => {
    const r = applySutra1_2_47('देवा', { gender: 'neuter', assumePratipadika: true, script: 'Devanagari' }, { transform: false });
    expect(r.applies).toBe(true);
    expect(r.changed).toBe(false);
  });
  test('no application masculine', () => {
    const r = applySutra1_2_47('देवा', { gender: 'masculine', assumePratipadika: true, script: 'Devanagari' });
    expect(r.applies).toBe(false);
  });
  test('no change if already short', () => {
    const r = applySutra1_2_47('देव', { gender: 'neuter', assumePratipadika: true, script: 'Devanagari' });
    expect(r.applies).toBe(false);
  });
  test('invalid input', () => {
    const r = applySutra1_2_47(null, { gender: 'neuter' });
    expect(r.applies).toBe(false);
  });
});
