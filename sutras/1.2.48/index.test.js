import { applySutra1_2_48 } from './index.js';

describe('Sutra 1.2.48', () => {
  test('shortens feminine upasarjana final long vowel (preview mode)', () => {
    const r = applySutra1_2_48('देवी', { isUpasarjana: true, gender: 'feminine', assumePratipadika: true, script: 'Devanagari' }, { transform: false });
    expect(r.applies).toBe(true);
    expect(r.changed).toBe(false);
  });
  test('does not apply without upasarjana', () => {
    const r = applySutra1_2_48('देवी', { gender: 'feminine', assumePratipadika: true, script: 'Devanagari' });
    expect(r.applies).toBe(false);
  });
  test('go-ending upasarjana (no change if vowel unmapped)', () => {
    const r = applySutra1_2_48('गो', { isUpasarjana: true, assumePratipadika: true, script: 'Devanagari' });
    expect(r.applies === false || r.changed === false).toBe(true);
  });
  test('invalid input', () => {
    const r = applySutra1_2_48(null, { isUpasarjana: true });
    expect(r.applies).toBe(false);
  });
});
